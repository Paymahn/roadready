import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

type EnquiryPayload = {
    name?: string;
    phone?: string;
    email?: string;
    course?: string;
    message?: string;
    hearAbout?: string;
    website?: string;
    formStartedAt?: number;
};

const CRM_ENQUIRY_URL = process.env.CRM_ENQUIRY_URL;
const CRM_ENQUIRY_TOKEN = process.env.CRM_ENQUIRY_TOKEN;
const MIN_FORM_FILL_MS = 3000;
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

export async function POST(request: NextRequest) {
    try {
        const nowMs = Date.now();
        cleanupMaps(nowMs);
        const clientIp = getClientIp(request);
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

        // Basic validation
        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and phone number are required" },
                { status: 400 }
            );
        }

        // Honeypot field should always be empty for real users.
        if (website) {
            return NextResponse.json({ success: true });
        }

        if (formStartedAt && nowMs - formStartedAt < MIN_FORM_FILL_MS) {
            return NextResponse.json({ error: "Form submitted too quickly" }, { status: 400 });
        }

        if (name.length > 120 || phone.length > 32 || email.length > 254 || course.length > 120 || message.length > 4000) {
            return NextResponse.json({ error: "Invalid enquiry payload" }, { status: 400 });
        }

        const fingerprint = createHash("sha256")
            .update(`${name}|${phone}|${email}|${course}|${message}`)
            .digest("hex");
        if (recentPayloads.has(fingerprint)) {
            return NextResponse.json({ success: true });
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
                metadata: {
                    ip: clientIp,
                    userAgent: request.headers.get("user-agent") || "",
                    submittedAt: new Date(nowMs).toISOString(),
                },
            }),
        });
        if (!upstream.ok) {
            return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 502 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to process enquiry" },
            { status: 500 }
        );
    }
}
