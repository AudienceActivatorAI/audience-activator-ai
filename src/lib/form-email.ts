import { Resend } from "resend";

export type FormEmailField = {
  label: string;
  value: string;
};

export type FormEmailConfig = {
  apiKey: string;
  from: string;
  to: string;
};

export type SendFormEmailInput = {
  subject: string;
  heading: string;
  fields: FormEmailField[];
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
};

export type SendFormEmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; status: number };

let cachedResend: Resend | null = null;

export function getFormEmailConfig(): FormEmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = (
    process.env.FORMS_FROM_EMAIL ??
    process.env.DEMO_FROM_EMAIL ??
    process.env.RESEND_FROM_EMAIL
  )?.trim();
  const to = (
    process.env.FORMS_TO_EMAIL ??
    process.env.DEMO_TO_EMAIL
  )?.trim();

  if (!apiKey || !from || !to) {
    return null;
  }

  return { apiKey, from, to };
}

function getResendClient(apiKey: string): Resend {
  if (!cachedResend) {
    cachedResend = new Resend(apiKey);
  }
  return cachedResend;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildTableHtml(fields: FormEmailField[]) {
  return fields
    .map(
      (field) =>
        `<tr><td style="color:#6b7280;vertical-align:top;padding:6px 12px 6px 0;"><strong>${escapeHtml(field.label)}</strong></td><td style="padding:6px 0;">${escapeHtml(field.value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
}

function buildTableText(fields: FormEmailField[]) {
  return fields.map((field) => `${field.label}: ${field.value}`).join("\n");
}

/** Resend tags only allow ASCII letters, numbers, underscores, and dashes. */
export function sanitizeResendTag(value: string, max = 256) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, max);
}

function sanitizeTags(tags: Array<{ name: string; value: string }>) {
  return tags
    .map((tag) => ({
      name: sanitizeResendTag(tag.name, 256),
      value: sanitizeResendTag(tag.value, 256),
    }))
    .filter((tag) => tag.name.length > 0 && tag.value.length > 0);
}

function formatResendError(error: unknown) {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const record = error as Record<string, unknown>;
  const message =
    typeof record.message === "string"
      ? record.message
      : typeof record.name === "string"
        ? record.name
        : "Unknown Resend error";

  const statusCode =
    typeof record.statusCode === "number" ? ` (${record.statusCode})` : "";

  return `${message}${statusCode}`;
}

export async function sendFormEmail(
  input: SendFormEmailInput,
): Promise<SendFormEmailResult> {
  const config = getFormEmailConfig();
  if (!config) {
    return {
      ok: false,
      error: "Form email is not configured on the server.",
      status: 503,
    };
  }

  const rows = input.fields.filter((field) => field.value.trim().length > 0);
  if (rows.length === 0) {
    return {
      ok: false,
      error: "No form fields to send.",
      status: 400,
    };
  }

  const html = `
    <h2 style="font-family:Inter,Arial,sans-serif;color:#0a2540;margin:0 0 16px;">${escapeHtml(input.heading)}</h2>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Inter,Arial,sans-serif;font-size:14px;color:#0a2540;">
      ${buildTableHtml(rows)}
    </table>
  `;

  const text = `${input.heading}\n\n${buildTableText(rows)}`;

  const resend = getResendClient(config.apiKey);
  const tags = input.tags ? sanitizeTags(input.tags) : undefined;
  const { data, error } = await resend.emails.send({
    from: config.from,
    to: [config.to],
    subject: input.subject,
    html,
    text,
    ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    ...(tags && tags.length > 0 ? { tags } : {}),
  });

  if (error) {
    console.error("Resend error:", formatResendError(error), error);
    return {
      ok: false,
      error: "Unable to send your request. Please try again shortly.",
      status: 502,
    };
  }

  return { ok: true, id: data?.id };
}
