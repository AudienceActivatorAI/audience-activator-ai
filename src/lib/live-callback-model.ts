/** Flip on when per-scenario voice audio is wired; until then demos use intro video + text. */
export const scenarioDemoVoiceEnabled = false;

export function shouldShowAgentIntroVideo(
  employeeId: AiEmployeeId,
  selectedEmployeeId: AiEmployeeId | null,
  isScenarioPlaying: boolean,
): boolean {
  if (selectedEmployeeId !== employeeId) return false;
  const isSpeakingWithVoice =
    scenarioDemoVoiceEnabled && isScenarioPlaying;
  return !isSpeakingWithVoice;
}

export type SalesDemoProfileId =
  | "inbound_qualifier"
  | "outbound_reactivation"
  | "appointment_rescue"
  | "trade_in"
  | "finance_handoff";

export type DealerLeadInput = {
  contactName: string;
  dealershipName: string;
  dealerEmail: string;
  phoneNumber: string;
  problemToSolve?: string;
  interestContext?: string;
};

export type DealerLead = {
  contactName: string;
  dealershipName: string;
  dealerEmail: string;
  phoneNumber: string;
  problemToSolve: string | null;
  interestContext: string | null;
};

export type CallbackAttribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  landingPath?: string;
  referrer?: string;
};

export type SalesDemoProfile = {
  id: SalesDemoProfileId;
  label: string;
  summary: string;
  outcome: string;
  defaultFirstName: string;
  callerName: string;
  defaultProblemToSolve: string;
  defaultInterestContext: string;
};

export const defaultCallbackProblemToSolve = "Speed-to-lead on fresh internet leads";
export const defaultCallbackInterestContext = "2024 Ford F-150 Lariat lead";

export const salesDemoProfiles: SalesDemoProfile[] = [
  {
    id: "inbound_qualifier",
    label: "Inbound Sales Qualifier",
    summary:
      "Answers fresh leads fast, confirms intent, and routes the right buyer to the right person.",
    outcome: "Speed-to-lead and clean handoff",
    defaultFirstName: "Joyce",
    callerName: "Maya",
    defaultProblemToSolve: defaultCallbackProblemToSolve,
    defaultInterestContext: defaultCallbackInterestContext,
  },
  {
    id: "outbound_reactivation",
    label: "Outbound Reactivation",
    summary:
      "Revives aged leads, missed opportunities, and unsold showroom traffic with useful context.",
    outcome: "More conversations from stale leads",
    defaultFirstName: "Marcus",
    callerName: "Maya",
    defaultProblemToSolve: "Outbound reactivation for aged sales leads and missed opportunities",
    defaultInterestContext: "Aged lead who previously asked about availability and pricing",
  },
  {
    id: "appointment_rescue",
    label: "Appointment Rescue",
    summary: "Recovers no-shows and soft appointments with a direct but helpful follow-up path.",
    outcome: "Fewer lost appointments",
    defaultFirstName: "Alicia",
    callerName: "Avery",
    defaultProblemToSolve: "Appointment confirmation, no-show recovery, and schedule follow-up",
    defaultInterestContext:
      "Customer missed or softened an appointment and needs a helpful next step",
  },
  {
    id: "trade_in",
    label: "Trade-In Specialist",
    summary: "Qualifies trade intent, payoff questions, equity concerns, and appraisal next steps.",
    outcome: "Better trade conversations",
    defaultFirstName: "Danielle",
    callerName: "Eric",
    defaultProblemToSolve: "Trade-in questions, payoff context, and appraisal next steps",
    defaultInterestContext: "Buyer wants to understand trade value and next appraisal steps",
  },
  {
    id: "finance_handoff",
    label: "Finance Handoff",
    summary:
      "Handles credit-sensitive buyer questions while keeping expectations realistic and compliant.",
    outcome: "Cleaner finance handoff",
    defaultFirstName: "Jordan",
    callerName: "Eric",
    defaultProblemToSolve: "Finance-sensitive questions, trade context, and clean handoff",
    defaultInterestContext:
      "Buyer has payment, credit, trade, or approval questions before the next handoff",
  },
];

export type AiEmployeeId = "maya" | "avery" | "eric";

export type SalesProblemOptionId =
  | "fresh_internet_lead"
  | "missed_appointment"
  | "aged_lead_follow_up"
  | "trade_in_question"
  | "finance_handoff";

export type SalesProblemOption = {
  id: SalesProblemOptionId;
  label: string;
  profileId: SalesDemoProfileId;
  employeeId: AiEmployeeId;
  outcome: string;
  summary: string;
  problemToSolve: string;
  interestContext: string;
};

export type AiEmployeeProfile = {
  id: AiEmployeeId;
  name: string;
  role: string;
  shortRole: string;
  profileId: SalesDemoProfileId;
  outcome: string;
  summary: string;
  defaultProblemToSolve: string;
  defaultInterestContext: string;
  portraitSrc: string;
  motionSrc: string;
  readoutTitle: string;
  readoutLines: string[];
};

export const aiEmployeeProfiles: AiEmployeeProfile[] = [
  {
    id: "maya",
    name: "Maya",
    role: "AI Sales Agent",
    shortRole: "Sales",
    profileId: "inbound_qualifier",
    outcome: "Fresh leads and sales follow-up",
    summary:
      "Handles fresh sales leads, reactivation, trade-cycle outreach, and the first appointment ask.",
    defaultProblemToSolve: "Speed-to-lead and sales follow-up on fresh or aging leads",
    defaultInterestContext:
      "New sales lead requesting pricing, availability, and next appointment steps",
    portraitSrc: "/ai-employees/maya.png",
    motionSrc: "/ai-employees/videos/maya.mp4",
    readoutTitle: "Sales lead opening",
    readoutLines: [
      "Hi, this is Maya with the sales team. I saw your interest come through and wanted to help right away.",
      "Are you still looking for pricing, availability, or a quick appointment on this vehicle?",
      "If it makes sense, I can get the right manager a clean handoff with your next best step.",
    ],
  },
  {
    id: "avery",
    name: "Avery",
    role: "AI Appointment Agent",
    shortRole: "Scheduler",
    profileId: "appointment_rescue",
    outcome: "Appointment confirmation and rescue",
    summary:
      "Rescues no-shows, confirms appointment intent, and keeps the schedule moving.",
    defaultProblemToSolve: "Appointment confirmation, no-show recovery, and schedule follow-up",
    defaultInterestContext:
      "Customer missed or softened an appointment and needs a helpful next step",
    portraitSrc: "/ai-employees/avery.png",
    motionSrc: "/ai-employees/videos/avery.mp4",
    readoutTitle: "Appointment rescue",
    readoutLines: [
      "Hi, this is Avery with the appointment team. I wanted to make it easy to keep your visit on track.",
      "Do you still want to come in, or would another time work better for your schedule?",
      "I can confirm the vehicle, update the appointment, and make sure the store is ready for you.",
    ],
  },
  {
    id: "eric",
    name: "Eric",
    role: "AI Finance Handoff",
    shortRole: "Handoff",
    profileId: "finance_handoff",
    outcome: "Finance-sensitive handoff",
    summary:
      "Handles finance-sensitive questions, trade-in context, and clean next-step routing.",
    defaultProblemToSolve: "Finance-sensitive questions, trade context, and clean handoff",
    defaultInterestContext:
      "Buyer has payment, credit, trade, or approval questions before the next handoff",
    portraitSrc: "/ai-employees/eric.png",
    motionSrc: "/ai-employees/videos/eric.mp4",
    readoutTitle: "Finance handoff",
    readoutLines: [
      "Hi, this is Eric. I can help gather the finance and trade context before a manager steps in.",
      "Are your main questions about payment range, credit, payoff, or what your trade may be worth?",
      "I will keep it practical and pass the right details forward so the next conversation starts clean.",
    ],
  },
];

export const salesProblemOptions: SalesProblemOption[] = [
  {
    id: "fresh_internet_lead",
    label: "Fresh internet lead",
    profileId: "inbound_qualifier",
    employeeId: "maya",
    outcome: "Respond fast and book the first step",
    summary: "Use when a buyer just asked about pricing, availability, or a vehicle.",
    problemToSolve: "Speed-to-lead on fresh internet leads",
    interestContext:
      "New sales lead requesting pricing, availability, and next appointment steps",
  },
  {
    id: "missed_appointment",
    label: "Missed appointment",
    profileId: "appointment_rescue",
    employeeId: "avery",
    outcome: "Recover the visit without pressure",
    summary: "Use for no-shows, soft appointments, and schedule recovery.",
    problemToSolve: "Appointment confirmation, no-show recovery, and schedule follow-up",
    interestContext:
      "Customer missed or softened an appointment and needs a helpful next step",
  },
  {
    id: "aged_lead_follow_up",
    label: "Aged lead follow-up",
    profileId: "outbound_reactivation",
    employeeId: "maya",
    outcome: "Restart stale conversations",
    summary:
      "Use for old internet leads, unsold showroom traffic, and missed opportunities.",
    problemToSolve: "Outbound reactivation for aged sales leads and missed opportunities",
    interestContext: "Aged lead who previously asked about availability and pricing",
  },
  {
    id: "trade_in_question",
    label: "Trade-in question",
    profileId: "trade_in",
    employeeId: "eric",
    outcome: "Gather trade context before handoff",
    summary:
      "Use when payoff, equity, appraisal, or trade value is driving the conversation.",
    problemToSolve: "Trade-in questions, payoff context, and appraisal next steps",
    interestContext: "Buyer wants to understand trade value and next appraisal steps",
  },
  {
    id: "finance_handoff",
    label: "Finance handoff",
    profileId: "finance_handoff",
    employeeId: "eric",
    outcome: "Keep payment and credit questions clean",
    summary: "Use when payment range, credit, approval, or lender handoff is sensitive.",
    problemToSolve: "Finance-sensitive questions, trade context, and clean handoff",
    interestContext:
      "Buyer has payment, credit, trade, or approval questions before the next handoff",
  },
];

export type ScenarioDemoStep = {
  signal: string;
  action: string;
  handoff: string;
};

export type ScenarioPlaybook = {
  triggerTitle: string;
  triggerBody: string;
  openingTitle: string;
  dialogue: string[];
  flowSteps: [string, string, string];
  handoffResult: string;
};

export const scenarioDemoSteps: Record<SalesProblemOptionId, ScenarioDemoStep> = {
  fresh_internet_lead: {
    signal: "New marketplace lead matched to active inventory",
    action: "Maya starts the first call while the lead is still hot",
    handoff: "Salesperson gets a clean handoff instead of a cold lead",
  },
  missed_appointment: {
    signal: "No-show or softened appointment flagged in CRM",
    action: "Avery reaches out with a calm reschedule path",
    handoff: "Appointment is confirmed or rescued without pressure",
  },
  aged_lead_follow_up: {
    signal: "Aged lead re-enriched with fresh intent signal",
    action: "Maya restarts the conversation with updated vehicle context",
    handoff: "Stalled opportunity moves back into active follow-up",
  },
  trade_in_question: {
    signal: "Buyer asks about trade value, payoff, or equity",
    action: "Eric gathers trade context before manager involvement",
    handoff: "Manager receives clean trade details for the next step",
  },
  finance_handoff: {
    signal: "Payment, credit, or approval questions detected",
    action: "Eric keeps finance questions practical and compliant",
    handoff: "Sensitive buyer routed with context — no messy handoff",
  },
};

export const scenarioPlaybooks: Record<SalesProblemOptionId, ScenarioPlaybook> = {
  fresh_internet_lead: {
    triggerTitle: "Fresh ADF lead just arrived",
    triggerBody:
      "A shopper asked about pricing and availability on a vehicle that is still in stock.",
    openingTitle: "Sales lead opening",
    dialogue: [
      "Hi, this is Maya with the sales team. I saw your interest come through and wanted to help right away.",
      "Are you still looking for pricing, availability, or a quick appointment on this vehicle?",
      "If it makes sense, I can get the right manager a clean handoff with your next best step.",
    ],
    flowSteps: [
      "New marketplace lead is matched to active inventory",
      "Maya starts the first call while the lead is hot",
      "Appointment ask and vehicle context are prepared for the salesperson",
    ],
    handoffResult: "Salesperson gets a clean handoff instead of a cold lead.",
  },
  missed_appointment: {
    triggerTitle: "Missed appointment flagged",
    triggerBody:
      "A customer missed or softened an appointment and needs a helpful next step.",
    openingTitle: "Appointment rescue",
    dialogue: [
      "Hi, this is Avery with the appointment team. I wanted to make it easy to keep your visit on track.",
      "Do you still want to come in, or would another time work better for your schedule?",
      "I can confirm the vehicle, update the appointment, and make sure the store is ready for you.",
    ],
    flowSteps: [
      "No-show or softened appointment flagged in CRM",
      "Avery reaches out with a calm reschedule path",
      "Updated appointment details are confirmed with the store",
    ],
    handoffResult: "Appointment is confirmed or rescued without pressure.",
  },
  aged_lead_follow_up: {
    triggerTitle: "Aged lead reactivated",
    triggerBody:
      "An older internet lead was re-enriched with fresh intent and vehicle context.",
    openingTitle: "Reactivation opening",
    dialogue: [
      "Hi, this is Maya following up on your earlier vehicle interest.",
      "I wanted to check whether you are still looking at that model or if your needs changed.",
      "If you are still in market, I can line up the next step with the right person on the floor.",
    ],
    flowSteps: [
      "Aged lead re-enriched with fresh intent signal",
      "Maya restarts the conversation with updated vehicle context",
      "Follow-up timing and vehicle match are queued for the salesperson",
    ],
    handoffResult: "Stalled opportunity moves back into active follow-up.",
  },
  trade_in_question: {
    triggerTitle: "Trade-in question detected",
    triggerBody:
      "The buyer is asking about trade value, payoff, or equity before moving forward.",
    openingTitle: "Trade context gathering",
    dialogue: [
      "Hi, this is Eric. I can help gather the trade context before a manager steps in.",
      "Are your main questions about payoff, equity, or what your trade may be worth?",
      "I will keep it practical and pass the right details forward so the next conversation starts clean.",
    ],
    flowSteps: [
      "Buyer asks about trade value, payoff, or equity",
      "Eric gathers trade context before manager involvement",
      "Appraisal and payoff details are prepared for manager review",
    ],
    handoffResult: "Manager receives clean trade details for the next step.",
  },
  finance_handoff: {
    triggerTitle: "Finance-sensitive questions detected",
    triggerBody:
      "The buyer has payment, credit, trade, or approval questions before the next handoff.",
    openingTitle: "Finance handoff",
    dialogue: [
      "Hi, this is Eric. I can help gather the finance and trade context before a manager steps in.",
      "Are your main questions about payment range, credit, payoff, or what your trade may be worth?",
      "I will keep it practical and pass the right details forward so the next conversation starts clean.",
    ],
    flowSteps: [
      "Payment, credit, or approval questions detected",
      "Eric keeps finance questions practical and compliant",
      "Finance context is routed to the right manager workflow",
    ],
    handoffResult: "Sensitive buyer routed with context — no messy handoff.",
  },
};

export function normalizePhone(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("+")) return trimmed.replace(/[^\d+]/g, "");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return trimmed;
}

export function isE164(phone: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

export function resolveSalesDemoProfile(value: string): SalesDemoProfile | null {
  return salesDemoProfiles.find((profile) => profile.id === value) ?? null;
}

export function resolveAiEmployeeProfile(value: string): AiEmployeeProfile | null {
  return aiEmployeeProfiles.find((employee) => employee.id === value) ?? null;
}

export function resolveSalesProblemOption(value: string): SalesProblemOption | null {
  return salesProblemOptions.find((option) => option.id === value) ?? null;
}

export function applyAiEmployeeDefaults(value: AiEmployeeId) {
  const employee = resolveAiEmployeeProfile(value);
  if (!employee) {
    return {
      profileId: "inbound_qualifier" as SalesDemoProfileId,
      problemToSolve: defaultCallbackProblemToSolve,
      interestContext: defaultCallbackInterestContext,
    };
  }
  return {
    profileId: employee.profileId,
    problemToSolve: employee.defaultProblemToSolve,
    interestContext: employee.defaultInterestContext,
  };
}

export function applySalesProblemDefaults(value: SalesProblemOptionId) {
  const option = resolveSalesProblemOption(value);
  if (!option) {
    return {
      employeeId: "maya" as AiEmployeeId,
      profileId: "inbound_qualifier" as SalesDemoProfileId,
      problemToSolve: defaultCallbackProblemToSolve,
      interestContext: defaultCallbackInterestContext,
    };
  }
  return {
    employeeId: option.employeeId,
    profileId: option.profileId,
    problemToSolve: option.problemToSolve,
    interestContext: option.interestContext,
  };
}

function sanitizeText(value: string, maxLength: number): string {
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function isValidName(value: string): boolean {
  return /^[A-Za-z][A-Za-z0-9&.,' -]{1,79}$/.test(value);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 120;
}

export function buildDealerLead(
  input: Partial<DealerLeadInput>,
): { lead: DealerLead } | { error: string } {
  const contactName = sanitizeText(input.contactName ?? "", 80);
  const dealershipName = sanitizeText(input.dealershipName ?? "", 100);
  const dealerEmail = sanitizeText(input.dealerEmail ?? "", 120).toLowerCase();
  const phoneNumber = normalizePhone(input.phoneNumber ?? "");
  const problemToSolve = sanitizeText(input.problemToSolve ?? "", 180);
  const interestContext = sanitizeText(input.interestContext ?? "", 220);

  if (!isValidName(contactName)) {
    return { error: "Enter your name so we know who requested the callback." };
  }
  if (dealershipName.length < 2) {
    return { error: "Enter the dealership name before requesting the callback." };
  }
  if (!isValidEmail(dealerEmail)) {
    return { error: "Enter a valid dealer email before requesting the callback." };
  }
  if (!isE164(phoneNumber)) {
    return { error: "Enter a valid phone number, including area code." };
  }

  return {
    lead: {
      contactName,
      dealershipName,
      dealerEmail,
      phoneNumber,
      problemToSolve: problemToSolve || null,
      interestContext: interestContext || null,
    },
  };
}

export function buildDealerDemoOpeningLine(input: {
  firstName: string;
  callerName: string;
}): string {
  return `Hi ${input.firstName}, this is ${input.callerName} with BDC Copilot. Thanks for requesting the live AI demo. Is now still a good time?`;
}

export function buildDealerDemoFollowUpContext(input: {
  profileLabel: string;
  dealershipName: string;
  interestContext: string | null;
  problemToSolve: string | null;
}): string {
  const contextParts = [
    `After the dealer says it is a good time, explain that you will show how the ${input.profileLabel} handles a live dealership sales conversation for ${input.dealershipName}.`,
  ];
  if (input.interestContext) {
    contextParts.push(
      `Use this context in the second turn, not the opening line: ${input.interestContext}.`,
    );
  }
  if (input.problemToSolve) {
    contextParts.push(
      `Use this dealer concern after permission is confirmed: ${input.problemToSolve}.`,
    );
  }
  contextParts.push(
    "Keep the first 20 seconds calm and conversational. One idea per sentence. Do not list every captured field out loud.",
  );
  return contextParts.join(" ");
}

function readAttributionString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const sanitized = sanitizeText(value, maxLength);
  return sanitized || undefined;
}

export function buildCallbackAttribution(value: unknown): CallbackAttribution {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const input = value as Record<string, unknown>;
  return {
    source: readAttributionString(input.source, 80),
    medium: readAttributionString(input.medium, 80),
    campaign: readAttributionString(input.campaign, 120),
    content: readAttributionString(input.content, 120),
    term: readAttributionString(input.term, 120),
    landingPath: readAttributionString(input.landingPath, 220),
    referrer: readAttributionString(input.referrer, 300),
  };
}
