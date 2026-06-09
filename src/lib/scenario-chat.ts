import {
  aiEmployeeProfiles,
  resolveAiEmployeeProfile,
  resolveSalesProblemOption,
  scenarioPlaybooks,
  type AiEmployeeId,
  type SalesProblemOptionId,
} from "@/lib/live-callback-model";

/** Override in Vercel env if a model is blocked on your AI Gateway tier. */
export const DEFAULT_SCENARIO_CHAT_MODEL = "google/gemini-2.0-flash";

const SCENARIO_CHAT_MODEL_FALLBACKS = [
  "google/gemini-2.0-flash",
  "openai/gpt-4o-mini",
  "anthropic/claude-3.5-haiku",
] as const;

export function getScenarioChatModels() {
  const preferred = process.env.SCENARIO_CHAT_MODEL?.trim();
  const models = preferred
    ? [preferred, ...SCENARIO_CHAT_MODEL_FALLBACKS]
    : [...SCENARIO_CHAT_MODEL_FALLBACKS];
  return [...new Set(models)];
}

export function isGatewayModelRestrictedError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("RestrictedModelsError") ||
    message.includes("Free tier users do not have access") ||
    message.includes("restricted access due to abuse")
  );
}

export function getScenarioChatErrorMessage(error: unknown) {
  if (isGatewayModelRestrictedError(error)) {
    return "AI Gateway needs a free-tier model or paid credits. In Vercel, add AI credits or set SCENARIO_CHAT_MODEL to google/gemini-2.0-flash.";
  }
  return "Unable to process your question right now. Try again in a moment.";
}

export function isScenarioChatConfigured() {
  // On Vercel, AI Gateway auth is injected at runtime via OIDC — not always
  // present in process.env during our preflight check.
  if (process.env.VERCEL === "1") return true;

  return Boolean(
    process.env.AI_GATEWAY_API_KEY?.trim() ||
      process.env.VERCEL_OIDC_TOKEN?.trim(),
  );
}

export function buildScenarioChatSystemPrompt(
  problemId: SalesProblemOptionId,
  employeeId: AiEmployeeId,
) {
  const problem = resolveSalesProblemOption(problemId);
  const employee = resolveAiEmployeeProfile(employeeId) ?? aiEmployeeProfiles[0];
  const playbook = scenarioPlaybooks[problemId];

  return `You are ${employee.name}, the ${employee.role} for a dealership using BDC Copilot on Audience Activator AI.

You are answering follow-up questions from a dealer principal or GM who just watched an interactive scenario preview on the marketing site. Speak as the AI agent in first person when helpful, but prioritize clear, practical dealer guidance.

Current scenario: ${problem?.label ?? "Dealer scenario"}
Scenario context: ${problem?.interestContext ?? problem?.summary ?? ""}
Trigger: ${playbook.triggerTitle} — ${playbook.triggerBody}
Typical opening: ${playbook.dialogue.join(" ")}
Workflow: ${playbook.flowSteps.join(" → ")}
Handoff goal: ${playbook.handoffResult}

Product facts you may reference:
- BDC Copilot runs voice, SMS, email, tasks, and website chat from one operating system.
- The same conversational AI shoppers see in this preview can run as a website chat widget on the dealer's site.
- Super Pixel and Audience Activator intelligence can enrich leads before outreach.
- This page is an interactive preview only — no live outbound call is placed from the demo.

Rules:
- Keep answers concise (2-4 short paragraphs max unless the dealer asks for detail).
- Stay dealership-practical: BDC workflow, lead response, appointments, handoffs, compliance, and ROI.
- If asked about pricing, mention the June offer is on the sales sheet and suggest requesting a guided demo for exact store terms.
- Do not invent specific inventory, credit approvals, or CRM data.
- If unsure, say what BDC Copilot typically does and offer to connect them with a guided demo.`;
}
