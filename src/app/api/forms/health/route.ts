import { NextResponse } from "next/server";
import { getFormEmailConfig } from "@/lib/form-email";

export async function GET() {
  const config = getFormEmailConfig();

  return NextResponse.json({
    configured: Boolean(config),
    fromSet: Boolean(config?.from),
    toSet: Boolean(config?.to),
    apiKeySet: Boolean(config?.apiKey),
  });
}
