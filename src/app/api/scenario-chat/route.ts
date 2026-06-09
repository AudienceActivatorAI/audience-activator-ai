import {
  convertToModelMessages,
  gateway,
  streamText,
  type UIMessage,
} from "ai";
import {
  buildScenarioChatSystemPrompt,
  getScenarioChatErrorMessage,
  getScenarioChatModels,
  isGatewayModelRestrictedError,
  isScenarioChatConfigured,
} from "@/lib/scenario-chat";
import {
  aiEmployeeProfiles,
  salesProblemOptions,
  type AiEmployeeId,
  type SalesProblemOptionId,
} from "@/lib/live-callback-model";

export const runtime = "nodejs";
export const maxDuration = 30;

const allowedOrigins = new Set([
  "https://www.audienceactivator.ai",
  "https://audienceactivator.ai",
  "https://salesassistant.tredfi.com",
]);

function isValidProblemId(value: unknown): value is SalesProblemOptionId {
  return salesProblemOptions.some((option) => option.id === value);
}

function isValidEmployeeId(value: unknown): value is AiEmployeeId {
  return aiEmployeeProfiles.some((employee) => employee.id === value);
}

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !allowedOrigins.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function createScenarioChatStream(
  problemId: SalesProblemOptionId,
  employeeId: AiEmployeeId,
  messages: UIMessage[],
) {
  const system = buildScenarioChatSystemPrompt(problemId, employeeId);
  const modelMessages = await convertToModelMessages(messages);
  const models = getScenarioChatModels();
  let lastError: unknown;

  for (const modelId of models) {
    try {
      return streamText({
        model: gateway(modelId),
        system,
        messages: modelMessages,
      });
    } catch (error) {
      lastError = error;
      if (!isGatewayModelRestrictedError(error)) throw error;
      console.warn(`scenario-chat model blocked: ${modelId}`);
    }
  }

  throw lastError ?? new Error("No scenario chat models available.");
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  if (!isScenarioChatConfigured()) {
    return Response.json(
      {
        error:
          "Scenario chat is not configured yet. Add AI Gateway credentials on Vercel.",
      },
      { status: 503, headers: corsHeaders(origin) },
    );
  }

  try {
    const body = (await request.json()) as {
      messages?: UIMessage[];
      problemId?: unknown;
      employeeId?: unknown;
    };

    const messages = body.messages ?? [];
    const problemId = isValidProblemId(body.problemId)
      ? body.problemId
      : "fresh_internet_lead";
    const employeeId = isValidEmployeeId(body.employeeId)
      ? body.employeeId
      : "maya";

    if (messages.length > 24) {
      return Response.json(
        { error: "Too many messages in this preview session." },
        { status: 400, headers: corsHeaders(origin) },
      );
    }

    const result = await createScenarioChatStream(
      problemId,
      employeeId,
      messages,
    );

    return result.toUIMessageStreamResponse({
      headers: corsHeaders(origin),
      onError: (error) => {
        console.error("scenario-chat stream failed", error);
        return getScenarioChatErrorMessage(error);
      },
    });
  } catch (error) {
    console.error("scenario-chat failed", error);
    return Response.json(
      { error: getScenarioChatErrorMessage(error) },
      {
        status: isGatewayModelRestrictedError(error) ? 402 : 500,
        headers: corsHeaders(origin),
      },
    );
  }
}
