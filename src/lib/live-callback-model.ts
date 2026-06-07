export const LIVE_CALLBACK_ASSET_BASE =
  process.env.NEXT_PUBLIC_LIVE_CALLBACK_ASSET_BASE ??
  "https://salesassistant.tredfi.com";

export type SalesDemoProfileId =
  | "inbound_qualifier"
  | "outbound_reactivation"
  | "appointment_rescue"
  | "trade_in"
  | "finance_handoff";

export type AiEmployeeId = "maya" | "avery" | "eric";

export type SalesProblemOptionId =
  | "fresh_internet_lead"
  | "missed_appointment"
  | "aged_lead_follow_up"
  | "trade_in_question"
  | "finance_handoff";

export type CallbackAttribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  landingPath?: string;
  referrer?: string;
};

export type AiEmployeeProfile = {
  id: AiEmployeeId;
  name: string;
  role: string;
  outcome: string;
  summary: string;
  profileId: SalesDemoProfileId;
  defaultProblemToSolve: string;
  defaultInterestContext: string;
  portraitSrc: string;
  motionSrc: string;
  readoutTitle: string;
  readoutLines: string[];
};

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

const asset = (path: string) => `${LIVE_CALLBACK_ASSET_BASE}${path}`;

export const aiEmployeeProfiles: AiEmployeeProfile[] = [
  {
    id: "maya",
    name: "Maya",
    role: "AI Sales Agent",
    outcome: "Fresh leads and sales follow-up",
    summary:
      "Handles fresh sales leads, reactivation, trade-cycle outreach, and the first appointment ask.",
    profileId: "inbound_qualifier",
    defaultProblemToSolve: "Speed-to-lead and sales follow-up on fresh or aging leads",
    defaultInterestContext:
      "New sales lead requesting pricing, availability, and next appointment steps",
    portraitSrc: asset("/ai-employees/maya.png"),
    motionSrc: asset("/ai-employees/videos/maya.mp4"),
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
    outcome: "Appointment confirmation and rescue",
    summary:
      "Rescues no-shows, confirms appointment intent, and keeps the schedule moving.",
    profileId: "appointment_rescue",
    defaultProblemToSolve: "Appointment confirmation, no-show recovery, and schedule follow-up",
    defaultInterestContext:
      "Customer missed or softened an appointment and needs a helpful next step",
    portraitSrc: asset("/ai-employees/avery.png"),
    motionSrc: asset("/ai-employees/videos/avery.mp4"),
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
    outcome: "Finance-sensitive handoff",
    summary:
      "Handles finance-sensitive questions, trade-in context, and clean next-step routing.",
    profileId: "finance_handoff",
    defaultProblemToSolve: "Finance-sensitive questions, trade context, and clean handoff",
    defaultInterestContext:
      "Buyer has payment, credit, trade, or approval questions before the next handoff",
    portraitSrc: asset("/ai-employees/eric.png"),
    motionSrc: asset("/ai-employees/videos/eric.mp4"),
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
    summary: "Use for old internet leads, unsold showroom traffic, and missed opportunities.",
    problemToSolve: "Outbound reactivation for aged sales leads and missed opportunities",
    interestContext: "Aged lead who previously asked about availability and pricing",
  },
  {
    id: "trade_in_question",
    label: "Trade-in question",
    profileId: "trade_in",
    employeeId: "eric",
    outcome: "Gather trade context before handoff",
    summary: "Use when payoff, equity, appraisal, or trade value is driving the conversation.",
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

export function normalizePhone(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("+")) return trimmed.replace(/[^\d+]/g, "");
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return trimmed;
}

export function applyAiEmployeeDefaults(employeeId: AiEmployeeId) {
  const employee = aiEmployeeProfiles.find((e) => e.id === employeeId);
  if (!employee) {
    return {
      profileId: "inbound_qualifier" as SalesDemoProfileId,
      problemToSolve: "Speed-to-lead on fresh internet leads",
      interestContext: "2024 Ford F-150 Lariat lead",
    };
  }
  return {
    profileId: employee.profileId,
    problemToSolve: employee.defaultProblemToSolve,
    interestContext: employee.defaultInterestContext,
  };
}

export function applySalesProblemDefaults(problemId: SalesProblemOptionId) {
  const option = salesProblemOptions.find((o) => o.id === problemId);
  if (!option) {
    return {
      employeeId: "maya" as AiEmployeeId,
      profileId: "inbound_qualifier" as SalesDemoProfileId,
      problemToSolve: "Speed-to-lead on fresh internet leads",
      interestContext: "2024 Ford F-150 Lariat lead",
    };
  }
  return {
    employeeId: option.employeeId,
    profileId: option.profileId,
    problemToSolve: option.problemToSolve,
    interestContext: option.interestContext,
  };
}
