import { liveCallbackUrl } from "@/lib/live-callback-api";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requestId = url.searchParams.get("requestId");

  const response = await fetch(
    liveCallbackUrl(`/api/live-callback/status?requestId=${encodeURIComponent(requestId ?? "")}`),
    { cache: "no-store" },
  );

  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
