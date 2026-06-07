import { Resend } from "resend";
import { NextResponse } from "next/server";

type PricingGatePayload = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  dealership?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: unknown, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DEMO_FROM_EMAIL;
  const to = process.env.DEMO_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { error: "Pricing access is not configured on the server." },
      { status: 503 },
    );
  }

  let body: PricingGatePayload;
  try {
    body = (await request.json()) as PricingGatePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const role = clean(body.role, 120);
  const dealership = clean(body.dealership, 200);

  if (!name || !email || !phone || !role || !dealership) {
    return NextResponse.json(
      { error: "Name, email, phone, role, and dealership are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const lines: [string, string][] = [
    ["Dealership", dealership],
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Role", role],
  ];

  const html = `
    <h2>Pricing page access — Independent dealer offer</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${lines
        .map(
          ([label, value]) =>
            `<tr><td style="color:#6b7280;vertical-align:top;"><strong>${label}</strong></td><td>${value.replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}
    </table>
  `;

  const text = lines.map(([label, value]) => `${label}: ${value}`).join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Pricing access — ${dealership}`,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Unable to submit your request. Please try again shortly." },
      { status: 502 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("aa_pricing_access", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
