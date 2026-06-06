import { Resend } from "resend";
import { NextResponse } from "next/server";

type DemoPayload = {
  dealership?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  productInterest?: string;
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
      { error: "Demo email is not configured on the server." },
      { status: 503 },
    );
  }

  let body: DemoPayload;
  try {
    body = (await request.json()) as DemoPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const dealership = clean(body.dealership, 200);
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);
  const productInterest = clean(body.productInterest, 120);

  if (!dealership || !name || !email) {
    return NextResponse.json(
      { error: "Dealership, name, and email are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const lines = [
    ["Dealership", dealership],
    ["Contact", name],
    ["Email", email],
    phone ? ["Phone", phone] : null,
    productInterest ? ["Product interest", productInterest] : null,
    message ? ["Message", message] : null,
  ].filter(Boolean) as [string, string][];

  const html = `
    <h2>New demo request — Audience Activator AI</h2>
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
    subject: `Demo request — ${dealership}`,
    html,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Unable to send your request. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
