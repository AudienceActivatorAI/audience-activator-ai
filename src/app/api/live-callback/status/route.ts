import { NextRequest, NextResponse } from "next/server";
import {
  getLiveCallbackRecord,
  updateLiveCallbackRecord,
  withRecalculatedIntent,
  type DemoCallStage,
  type LiveCallbackRecord,
} from "../state";

function mapTwilioStatusToStage(status: string): DemoCallStage {
  const value = status.toLowerCase();
  if (value === "queued" || value === "initiated") return "queued";
  if (value === "ringing") return "calling";
  if (value === "in-progress") return "connected";
  if (value === "completed") return "complete";
  return "failed";
}

async function fetchTwilioCallStatus(callSid: string): Promise<string> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid || !authToken) {
    throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required for live status polling");
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls/${callSid}.json`,
    {
      method: "GET",
      headers: { Authorization: `Basic ${auth}` },
      cache: "no-store",
    },
  );

  const raw = await response.text();
  if (!response.ok) {
    throw new Error(`Twilio call lookup failed: ${response.status} ${raw}`);
  }

  const parsed = JSON.parse(raw) as { status?: string };
  return parsed.status ?? "unknown";
}

function toResponse(record: LiveCallbackRecord, source: "cached" | "twilio" | "fallback") {
  return {
    requestId: record.requestId,
    stage: record.stage,
    providerStatus: record.providerStatus,
    source,
    profileType: record.profileType,
    profileLabel: record.profileLabel,
    contactName: record.contactName,
    dealershipName: record.dealershipName,
    dealerEmail: record.dealerEmail,
    phoneNumber: record.phoneNumber,
    problemToSolve: record.problemToSolve,
    interestContext: record.interestContext,
    callSid: record.callSid,
    conversationId: record.conversationId,
    intentScore: record.intentScore,
    intentSignals: record.intentSignals,
    recapRequested: Boolean(record.recapRequestedAt),
    dashboardClicked: Boolean(record.dashboardClickedAt),
    leadNotificationStatus: record.leadNotificationStatus,
    updatedAt: record.updatedAt,
    error: record.lastError,
  };
}

export async function GET(req: NextRequest) {
  const requestId = req.nextUrl.searchParams.get("requestId")?.trim();
  if (!requestId) {
    return NextResponse.json({ error: "requestId query param is required" }, { status: 400 });
  }

  const record = getLiveCallbackRecord(requestId);
  if (!record) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  if (!record.callSid) {
    const updated = updateLiveCallbackRecord(requestId, (prev) =>
      withRecalculatedIntent({
        ...prev,
        stage: prev.stage === "queued" ? "calling" : prev.stage,
        providerStatus: "fallback_no_callsid",
        updatedAt: new Date().toISOString(),
      }),
    );
    return NextResponse.json(toResponse(updated ?? record, "fallback"));
  }

  try {
    const twilioStatus = await fetchTwilioCallStatus(record.callSid);
    const updated = updateLiveCallbackRecord(requestId, (prev) =>
      withRecalculatedIntent({
        ...prev,
        stage: mapTwilioStatusToStage(twilioStatus),
        providerStatus: twilioStatus,
        updatedAt: new Date().toISOString(),
        lastError: null,
      }),
    );
    return NextResponse.json(toResponse(updated ?? record, "twilio"));
  } catch (error) {
    const updated = updateLiveCallbackRecord(requestId, (prev) => ({
      ...prev,
      lastError: String(error),
      updatedAt: new Date().toISOString(),
    }));
    return NextResponse.json(toResponse(updated ?? record, "cached"));
  }
}
