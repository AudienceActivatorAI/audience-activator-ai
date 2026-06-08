import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/form-email";

type DemoPayload = {
  dealership?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  demoFocus?: string;
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
  const demoFocus = clean(body.demoFocus ?? body.productInterest, 120);

  if (!dealership || !name || !email) {
    return NextResponse.json(
      { error: "Dealership, name, and email are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const result = await sendFormEmail({
    subject: `Demo request — ${dealership}`,
    heading: "New demo request — Audience Activator AI",
    replyTo: email,
    tags: [
      { name: "form", value: "demo" },
      { name: "dealership", value: dealership.slice(0, 80) },
    ],
    fields: [
      { label: "Dealership", value: dealership },
      { label: "Contact", value: name },
      { label: "Email", value: email },
      ...(phone ? [{ label: "Phone", value: phone }] : []),
      ...(demoFocus ? [{ label: "Demo focus", value: demoFocus }] : []),
      ...(message ? [{ label: "Message", value: message }] : []),
    ],
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
