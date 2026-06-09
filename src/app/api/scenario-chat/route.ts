import {
  convertToModelMessages,
  gateway,
  streamText,
  type UIMessage,
} from "ai";
import {
  buildScenarioChatSystemPrompt,
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

    const result = streamText({
      model: gateway("openai/gpt-5.4"),
      system: buildScenarioChatSystemPrompt(problemId, employeeId),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      headers: corsHeaders(origin),
    });
  } catch (error) {
    console.error("scenario-chat failed", error);
    return Response.json(
      { error: "Unable to process your question right now." },
      { status: 500, headers: corsHeaders(origin) },
    );
  }
}
