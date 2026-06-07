import { liveCallbackUrl } from "@/lib/live-callback-api";

export async function POST(request: Request) {
  const body = await request.text();

  const response = await fetch(liveCallbackUrl("/api/live-callback"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    cache: "no-store",
  });

  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
