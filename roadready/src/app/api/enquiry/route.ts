import { NextRequest, NextResponse, after } from "next/server";
import { createHash } from "node:crypto";
import { sendMetaLeadCapi } from "@/lib/meta-capi";
import { courseLeadValue, LEAD_VALUE_CURRENCY } from "@/lib/data";
import { CONTACT } from "@/lib/contact";

// Deliberate cap (not the 300s Fluid Compute default) so a runaway is killed early, with
// room for the CRM forward (up to CRM_TIMEOUT_MS) plus the post-response CAPI in after().
export const maxDuration = 30;

type AttributionPayload = {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    fbclid?: string;
};

type EnquiryPayload = {
    name?: string;
    phone?: string;
    email?: string;
    course?: string;
    message?: string;
    hearAbout?: string;
    website?: string;
    formStartedAt?: number;
    eventId?: string;
    formType?: string;
    attribution?: AttributionPayload;
    consent?: boolean;
};

const CRM_ENQUIRY_URL = process.env.CRM_ENQUIRY_URL;
const CRM_ENQUIRY_TOKEN = process.env.CRM_ENQUIRY_TOKEN;
const MIN_FORM_FILL_MS = 3000;
// Bound the CRM forward so a slow/cold CRM aborts cleanly instead of hanging the function.
// 15s gives a cold Amplify Lambda room to wake and succeed (a warm CRM returns <2s), well
// within maxDuration (30s), leaving room for the post-response CAPI.
const CRM_TIMEOUT_MS = 15000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 8;
const recentByIp = new Map<string, { count: number; windowStartMs: number }>();
const recentPayloads = new Map<string, number>();

function getClientIp(req: NextRequest): string {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0]?.trim() || "unknown";
    }
    return "unknown";
}

function normalize(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function cleanupMaps(nowMs: number) {
    for (const [ip, state] of recentByIp.entries()) {
        if (nowMs - state.windowStartMs > WINDOW_MS) {
            recentByIp.delete(ip);
        }
    }
    for (const [key, ts] of recentPayloads.entries()) {
        if (nowMs - ts > WINDOW_MS) {
            recentPayloads.delete(key);
        }
    }
}

function sanitizeAttribution(raw: AttributionPayload | undefined): AttributionPayload {
    if (!raw || typeof raw !== "object") return {};
    const out: AttributionPayload = {};
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid"] as const;
    for (const k of keys) {
        const v = raw[k];
        if (typeof v === "string" && v.length > 0 && v.length < 2048) {
            out[k] = v;
        }
    }
    return out;
}

export async function POST(request: NextRequest) {
    try {
        const nowMs = Date.now();
        cleanupMaps(nowMs);
        const clientIp = getClientIp(request);
        const userAgent = request.headers.get("user-agent") || "";
        const eventSourceUrl =
            request.headers.get("referer") || request.nextUrl?.origin || "https://www.roadreadyhgv.com";

        const ipState = recentByIp.get(clientIp);
        if (!ipState) {
            recentByIp.set(clientIp, { count: 1, windowStartMs: nowMs });
        } else if (nowMs - ipState.windowStartMs > WINDOW_MS) {
            recentByIp.set(clientIp, { count: 1, windowStartMs: nowMs });
        } else {
            ipState.count += 1;
            if (ipState.count > MAX_REQUESTS_PER_IP) {
                return NextResponse.json({ error: "Too many requests" }, { status: 429 });
            }
        }

        const body = (await request.json()) as EnquiryPayload;
        const name = normalize(body.name);
        const phone = normalize(body.phone);
        const email = normalize(body.email);
        const course = normalize(body.course);
        const message = normalize(body.message);
        const hearAbout = normalize(body.hearAbout);
        const website = normalize(body.website);
        const formStartedAt = Number(body.formStartedAt || 0);
        const eventId = normalize(body.eventId);
        const formTypeRaw = normalize(body.formType);
        const formType =
            formTypeRaw === "inline" || formTypeRaw === "modal" || formTypeRaw === "contact"
                ? formTypeRaw
                : undefined;
        const attribution = sanitizeAttribution(body.attribution);
        const consent = body.consent === true;

        // Basic validation
        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and phone number are required" },
                { status: 400 }
            );
        }

        // Honeypot field should always be empty for real users.
        if (website) {
            return NextResponse.json({ success: true, leadStored: false });
        }

        if (formStartedAt && nowMs - formStartedAt < MIN_FORM_FILL_MS) {
            return NextResponse.json({ error: "Form submitted too quickly" }, { status: 400 });
        }

        if (name.length > 120 || phone.length > 32 || email.length > 254 || course.length > 120 || message.length > 4000) {
            return NextResponse.json({ error: "Invalid enquiry payload" }, { status: 400 });
        }

        if (eventId.length > 200) {
            return NextResponse.json({ error: "Invalid enquiry payload" }, { status: 400 });
        }

        const fingerprint = createHash("sha256")
            .update(`${name}|${phone}|${email}|${course}|${message}`)
            .digest("hex");
        if (recentPayloads.has(fingerprint)) {
            return NextResponse.json({ success: true, leadStored: false });
        }
        recentPayloads.set(fingerprint, nowMs);

        console.log("📩 New Enquiry:", {
            name,
            phone,
            email: email || "Not provided",
            course: course || "Not specified",
            hearAbout: hearAbout || "Not provided",
            message: message || "No message",
            ip: clientIp,
            timestamp: new Date().toISOString(),
        });

        if (!CRM_ENQUIRY_URL || !CRM_ENQUIRY_TOKEN) {
            return NextResponse.json(
                { error: "CRM integration is not configured" },
                { status: 500 }
            );
        }

        const leadAttributionPayload = {
            eventId: eventId || undefined,
            formType: formType || undefined,
            ...attribution,
        };
        const leadAttributionJson =
            Object.keys(leadAttributionPayload).length > 0
                ? JSON.stringify(leadAttributionPayload)
                : undefined;

        const metadata: Record<string, string | undefined> = {
            ip: clientIp,
            userAgent,
            submittedAt: new Date(nowMs).toISOString(),
            eventId: eventId || undefined,
            formType: formType || undefined,
            ...attribution,
        };

        // ── Lead capture: forward to the CRM, bounded by CRM_TIMEOUT_MS ─────────────
        // This is the lead, so we await it (success depends on it) — but with a hard
        // timeout so a slow/cold CRM can't hang the function into a 502. A non-ok response,
        // an abort (timeout), or a network throw all funnel into the one graceful path below.
        let crmOk = false;
        const crmController = new AbortController();
        const crmTimer = setTimeout(() => crmController.abort(), CRM_TIMEOUT_MS);
        try {
            const upstream = await fetch(CRM_ENQUIRY_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${CRM_ENQUIRY_TOKEN}`,
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email: email || undefined,
                    course: course || undefined,
                    message: message || undefined,
                    hearAbout: hearAbout || undefined,
                    source: "roadready-website",
                    leadAttribution: leadAttributionJson,
                    metadata,
                }),
                signal: crmController.signal,
            });
            crmOk = upstream.ok;
        } catch {
            crmOk = false; // abort (timeout) or network error
        } finally {
            clearTimeout(crmTimer);
        }

        if (!crmOk) {
            // Release the dedup claim so the user's retry isn't deduped away before it
            // reaches the CRM, then log the COMPLETE lead (greppable) for manual recovery.
            recentPayloads.delete(fingerprint);
            console.error(
                "LEAD_CAPTURE_FAILED",
                JSON.stringify({
                    name,
                    phone,
                    email: email || undefined,
                    course: course || undefined,
                    message: message || undefined,
                    hearAbout: hearAbout || undefined,
                    formType: formType || undefined,
                    eventId: eventId || undefined,
                    ip: clientIp,
                    at: new Date(nowMs).toISOString(),
                }),
            );
            return NextResponse.json(
                {
                    error: `We couldn't submit your enquiry just now — please try again, or call us on ${CONTACT.phone.display}.`,
                },
                { status: 503 },
            );
        }

        // CRM confirmed receipt → the lead is captured. Fire the Meta CAPI AFTER the
        // response is sent (analytics must never block or fail a submission). Consent gate
        // intact: only scheduled when eventId && consent.
        if (eventId && consent) {
            const value = courseLeadValue(course);
            after(async () => {
                await sendMetaLeadCapi({
                    eventId,
                    eventSourceUrl,
                    email: email || undefined,
                    phone,
                    clientIp,
                    userAgent,
                    value,
                    currency: value !== undefined ? LEAD_VALUE_CURRENCY : undefined,
                }).catch((err) => console.error("Meta CAPI error", err));
            });
        }

        return NextResponse.json({ success: true, leadStored: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to process enquiry" },
            { status: 500 }
        );
    }
}
