import {
  aiEmployeeProfiles,
  resolveAiEmployeeProfile,
  resolveSalesProblemOption,
  scenarioPlaybooks,
  type AiEmployeeId,
  type SalesProblemOptionId,
} from "@/lib/live-callback-model";

/** Override in Vercel env if needed. Slugs must match AI Gateway model list. */
export const DEFAULT_SCENARIO_CHAT_MODEL = "openai/gpt-4.1-mini";

const SCENARIO_CHAT_MODEL_FALLBACKS = [
  "openai/gpt-4.1-mini",
  "google/gemini-2.5-flash-lite",
  "anthropic/claude-haiku-4.5",
] as const;

export function getScenarioChatModels() {
  const preferred = process.env.SCENARIO_CHAT_MODEL?.trim();
  const models = preferred
    ? [preferred, ...SCENARIO_CHAT_MODEL_FALLBACKS]
    : [...SCENARIO_CHAT_MODEL_FALLBACKS];
  return [...new Set(models)];
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function isGatewayModelRestrictedError(error: unknown) {
  const message = getErrorMessage(error);
  return (
    message.includes("RestrictedModelsError") ||
    message.includes("Free tier users do not have access") ||
    message.includes("restricted access due to abuse")
  );
}

export function isGatewayModelNotFoundError(error: unknown) {
  const message = getErrorMessage(error);
  return (
    message.includes("GatewayModelNotFoundError") ||
    message.includes("model_not_found") ||
    message.includes("not found")
  );
}

export function getScenarioChatErrorMessage(error: unknown) {
  if (isGatewayModelNotFoundError(error)) {
    return "Scenario chat model is unavailable. Set SCENARIO_CHAT_MODEL to a current AI Gateway slug such as openai/gpt-4.1-mini.";
  }
  if (isGatewayModelRestrictedError(error)) {
    return "AI Gateway free credits cannot access this model. Add paid AI credits in Vercel or set SCENARIO_CHAT_MODEL to openai/gpt-4.1-mini.";
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
