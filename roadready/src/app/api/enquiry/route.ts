import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, email, course, message } = body;

        // Basic validation
        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and phone number are required" },
                { status: 400 }
            );
        }

        // Log the enquiry (replace with Resend / DB integration later)
        console.log("📩 New Enquiry:", {
            name,
            phone,
            email: email || "Not provided",
            course: course || "Not specified",
            message: message || "No message",
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to process enquiry" },
            { status: 500 }
        );
    }
}
