export const LIVE_CALLBACK_API_BASE =
  process.env.LIVE_CALLBACK_API_BASE ?? "https://salesassistant.tredfi.com";

export function liveCallbackUrl(path: string) {
  return `${LIVE_CALLBACK_API_BASE}${path}`;
}
