import { NextResponse } from "next/server";
import { sendFormEmail } from "@/lib/form-email";

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

  const result = await sendFormEmail({
    subject: `Access Pricing — ${dealership}`,
    heading: "Access Pricing request — Independent dealer offer",
    replyTo: email,
    tags: [
      { name: "form", value: "access-pricing" },
      { name: "dealership", value: dealership.slice(0, 80) },
    ],
    fields: [
      { label: "Dealership", value: dealership },
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Role", value: role },
    ],
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
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
