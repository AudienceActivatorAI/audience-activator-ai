export type DemoCallStage = "queued" | "calling" | "connected" | "complete" | "failed";

export type LiveCallbackIntentSignal =
  | "callback_requested"
  | "call_connected"
  | "call_completed"
  | "high_value_problem"
  | "recap_requested"
  | "dashboard_clicked";

export type LeadNotificationStatus = "not_configured" | "sent" | "failed";

export type LiveCallbackRecord = {
  requestId: string;
  profileType: string;
  profileLabel: string;
  contactName: string;
  dealershipName: string;
  dealerEmail: string;
  phoneNumber: string;
  firstName?: string | null;
  problemToSolve?: string | null;
  interestContext?: string | null;
  attribution?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
    landingPath?: string;
    referrer?: string;
  };
  conversationId: string | null;
  callSid: string | null;
  stage: DemoCallStage;
  providerStatus: string;
  createdAt: string;
  updatedAt: string;
  lastError: string | null;
  intentScore: number;
  intentSignals: LiveCallbackIntentSignal[];
  recapRequestedAt: string | null;
  dashboardClickedAt: string | null;
  leadNotificationStatus: LeadNotificationStatus;
  leadNotificationError: string | null;
};

type State = Map<string, LiveCallbackRecord>;

function getStore(): State {
  const globalKey = "__aa_live_callback_store__";
  const root = globalThis as unknown as Record<string, State | undefined>;
  if (!root[globalKey]) {
    root[globalKey] = new Map<string, LiveCallbackRecord>();
  }
  return root[globalKey];
}

export function setLiveCallbackRecord(record: LiveCallbackRecord): void {
  getStore().set(record.requestId, record);
}

export function getLiveCallbackRecord(requestId: string): LiveCallbackRecord | undefined {
  return getStore().get(requestId);
}

export function updateLiveCallbackRecord(
  requestId: string,
  updater: (record: LiveCallbackRecord) => LiveCallbackRecord,
): LiveCallbackRecord | undefined {
  const current = getStore().get(requestId);
  if (!current) return undefined;
  const next = updater(current);
  getStore().set(requestId, next);
  return next;
}

function hasHighValueProblem(record: LiveCallbackRecord): boolean {
  const profileType = record.profileType.toLowerCase();
  const problem = (record.problemToSolve ?? "").toLowerCase();
  return (
    profileType === "trade_in" ||
    profileType === "finance_handoff" ||
    problem.includes("trade") ||
    problem.includes("finance") ||
    problem.includes("payment") ||
    problem.includes("credit")
  );
}

export function calculateLiveCallbackIntent(record: LiveCallbackRecord): {
  score: number;
  signals: LiveCallbackIntentSignal[];
} {
  const signals: LiveCallbackIntentSignal[] = ["callback_requested"];
  let score = 40;

  if (record.stage === "connected") {
    signals.push("call_connected");
    score += 20;
  }
  if (record.stage === "complete") {
    signals.push("call_completed");
    score += 20;
  }
  if (hasHighValueProblem(record)) {
    signals.push("high_value_problem");
    score += 10;
  }
  if (record.dashboardClickedAt) {
    signals.push("dashboard_clicked");
    score += 10;
  }
  if (record.recapRequestedAt) {
    signals.push("recap_requested");
    score += 20;
  }

  return { score: Math.min(score, 100), signals };
}

export function withRecalculatedIntent(record: LiveCallbackRecord): LiveCallbackRecord {
  const intent = calculateLiveCallbackIntent(record);
  return { ...record, intentScore: intent.score, intentSignals: intent.signals };
}

export function markRecapRequested(requestId: string): LiveCallbackRecord | undefined {
  return updateLiveCallbackRecord(requestId, (record) =>
    withRecalculatedIntent({
      ...record,
      recapRequestedAt: record.recapRequestedAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  );
}

export function updateLeadNotificationStatus(
  requestId: string,
  status: LeadNotificationStatus,
  error: string | null = null,
): LiveCallbackRecord | undefined {
  return updateLiveCallbackRecord(requestId, (record) => ({
    ...record,
    leadNotificationStatus: status,
    leadNotificationError: error,
    updatedAt: new Date().toISOString(),
  }));
}

export function getLatestCallbackForPhone(phoneNumber: string): LiveCallbackRecord | undefined {
  const records = Array.from(getStore().values()).filter(
    (record) => record.phoneNumber === phoneNumber,
  );
  if (records.length === 0) return undefined;
  records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return records[0];
}

export function getRecentCallbackForPhone(
  phoneNumber: string,
  windowMs: number,
): LiveCallbackRecord | undefined {
  const latest = getLatestCallbackForPhone(phoneNumber);
  if (!latest) return undefined;
  const latestMs = Date.parse(latest.createdAt);
  if (!Number.isFinite(latestMs)) return undefined;
  return Date.now() - latestMs <= windowMs ? latest : undefined;
}
