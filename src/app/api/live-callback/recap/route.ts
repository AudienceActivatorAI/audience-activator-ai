import { NextRequest, NextResponse } from "next/server";
import { sendLiveCallbackLeadNotification } from "../notify";
import {
  getLiveCallbackRecord,
  markRecapRequested,
  updateLeadNotificationStatus,
} from "../state";

function readRequestId(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const requestId = (value as Record<string, unknown>).requestId;
  return typeof requestId === "string" && requestId.trim() ? requestId.trim() : null;
}

export async function POST(req: NextRequest) {
  try {
    const requestId = readRequestId(await req.json().catch(() => null));
    if (!requestId) {
      return NextResponse.json({ error: "requestId is required" }, { status: 400 });
    }

    if (!getLiveCallbackRecord(requestId)) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const record = markRecapRequested(requestId);
    if (!record) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const notification = await sendLiveCallbackLeadNotification(record);
    const updated =
      updateLeadNotificationStatus(requestId, notification.status, notification.error) ?? record;

    return NextResponse.json({
      ok: true,
      requestId,
      recapRequested: true,
      intentScore: updated.intentScore,
      notificationStatus: updated.leadNotificationStatus,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to save the recap request right now." },
      { status: 500 },
    );
  }
}
