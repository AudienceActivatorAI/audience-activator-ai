import { createHmac } from "crypto";
import type { LiveCallbackRecord } from "./state";

export type LeadNotificationResult =
  | { status: "not_configured"; error: null }
  | { status: "sent"; error: null }
  | { status: "failed"; error: string };

function envValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function signatureFor(payload: string, secret: string): string {
  return `sha256=${createHmac("sha256", secret).update(payload).digest("hex")}`;
}

function employeeNameForProfile(profileType: string): string {
  if (profileType === "appointment_rescue") return "Avery";
  if (profileType === "trade_in" || profileType === "finance_handoff") return "Eric";
  return "Maya";
}

export async function sendLiveCallbackLeadNotification(
  record: LiveCallbackRecord,
): Promise<LeadNotificationResult> {
  const webhookUrl = envValue(process.env.MARKETING_LEAD_NOTIFY_WEBHOOK_URL);
  if (!webhookUrl) {
    return { status: "not_configured", error: null };
  }

  const payload = JSON.stringify({
    event: "live_callback_recap_requested",
    requestId: record.requestId,
    dealershipName: record.dealershipName,
    contactName: record.contactName || null,
    dealerEmail: record.dealerEmail,
    phoneNumber: record.phoneNumber,
    selectedProblem: record.profileLabel,
    selectedEmployee: employeeNameForProfile(record.profileType),
    problemToSolve: record.problemToSolve,
    interestContext: record.interestContext,
    callStatus: record.stage,
    intentScore: record.intentScore,
    intentSignals: record.intentSignals,
    callSid: record.callSid,
    conversationId: record.conversationId,
    createdAt: record.createdAt,
    recapRequestedAt: record.recapRequestedAt,
  });

  const headers: Record<string, string> = { "content-type": "application/json" };
  const secret = envValue(process.env.MARKETING_LEAD_NOTIFY_WEBHOOK_SECRET);
  if (secret) {
    headers["x-tredfi-signature"] = signatureFor(payload, secret);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: payload,
    });
    if (!response.ok) {
      return { status: "failed", error: `Webhook returned ${response.status}` };
    }
    return { status: "sent", error: null };
  } catch (error) {
    return { status: "failed", error: String(error) };
  }
}
