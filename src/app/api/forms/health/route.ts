import { NextResponse } from "next/server";
import { getFormEmailConfig, normalizeFromAddress } from "@/lib/form-email";

function getConfiguredFromDomain() {
  const raw = (
    process.env.FORMS_FROM_EMAIL ??
    process.env.DEMO_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    ""
  ).trim();
  const normalized = normalizeFromAddress(raw);
  const email = normalized?.match(/<([^>]+)>/)?.[1] ?? normalized;
  return email?.split("@")[1] ?? null;
}

export async function GET() {
  const config = getFormEmailConfig();
  const fromDomain = getConfiguredFromDomain();
  const fromValid = Boolean(config?.from);

  const rawFrom = (
    process.env.FORMS_FROM_EMAIL ??
    process.env.DEMO_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL ??
    ""
  ).trim();
  const rawTo = (
    process.env.FORMS_TO_EMAIL ??
    process.env.DEMO_TO_EMAIL ??
    ""
  ).trim();

  return NextResponse.json({
    configured: Boolean(config),
    fromSet: Boolean(rawFrom),
    fromValid,
    fromDomain,
    toSet: Boolean(rawTo),
    apiKeySet: Boolean(process.env.RESEND_API_KEY?.trim()),
  });
}
