import { NextRequest } from "next/server";

const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY;

export async function POST(req: NextRequest) {
    if (!CAPTCHA_SECRET_KEY) {
        return new Response(JSON.stringify({ message: "Server configuration error." }), { status: 500 });
    }

    // Parse the request
    const data = await req.json();

    // Check if the token was provided
    if (!data.token) {
        return new Response(JSON.stringify({ message: "Missing token." }), { status: 400 });
    }

    // Verify the reCAPTCHA against Google's API
    const verificationRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET_KEY}&response=${data.token}`
    );

    // Check if the verification was successful
    if (!verificationRes.ok) {
        return new Response(JSON.stringify({ message: "Failed to verify reCAPTCHA." }), { status: 500 });
    }

    // Return the response
    return new Response(JSON.stringify(await verificationRes.json()));
}
