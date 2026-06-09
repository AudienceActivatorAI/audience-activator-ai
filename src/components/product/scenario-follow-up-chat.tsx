"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Send, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  resolveAiEmployeeProfile,
  type AiEmployeeId,
  type SalesProblemOptionId,
} from "@/lib/live-callback-model";
import { cn } from "@/lib/utils";

type Props = {
  problemId: SalesProblemOptionId;
  employeeId: AiEmployeeId;
  employeeName: string;
  problemLabel: string;
  className?: string;
};

const suggestedQuestions = [
  "How would this run on my website?",
  "What happens after the handoff?",
  "How fast can we respond to fresh leads?",
  "What does my BDC team see when a lead comes in?",
] as const;

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function MessageBody({ text, isUser }: { text: string; isUser: boolean }) {
  const paragraphs = text.split(/\n{2,}/).filter(Boolean);

  return (
    <div className={cn("space-y-3", isUser ? "text-white" : "text-white/90")}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-wrap leading-7">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function ScenarioFollowUpChat({
  problemId,
  employeeId,
  employeeName,
  problemLabel,
  className,
}: Props) {
  const employee = resolveAiEmployeeProfile(employeeId);
  const [input, setInput] = React.useState("");
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const transport = React.useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/scenario-chat",
        prepareSendMessagesRequest: ({ id, messages }) => ({
          body: {
            id,
            messages,
            problemId,
            employeeId,
          },
        }),
      }),
    [employeeId, problemId],
  );

  const { messages, sendMessage, status, setMessages, error } = useChat({
    transport,
  });

  const isBusy = status === "submitted" || status === "streaming";

  React.useEffect(() => {
    setMessages([]);
    setInput("");
  }, [employeeId, problemId, setMessages]);

  React.useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  function submitQuestion(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    setInput("");
    void sendMessage({ text: trimmed });
  }

  return (
    <div
      className={cn(
        "flex min-h-[min(32rem,72vh)] flex-col overflow-hidden rounded-2xl border border-blue/30 bg-navy-950/90 shadow-float",
        className,
      )}
    >
      <div className="border-b border-white/10 bg-white/[0.03] px-5 py-5 sm:px-6">
        <div className="flex items-start gap-4">
          {employee ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={employee.portraitSrc}
              alt={employee.name}
              className="size-14 shrink-0 rounded-full border border-white/15 object-cover"
              style={{ objectPosition: employee.portraitFocus }}
            />
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[0.62rem] tracking-[0.16em] text-blue-300 uppercase">
              Live agent chat preview
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Ask {employeeName} anything
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-[0.9375rem] sm:leading-7">
              This is the same BDC Copilot conversation dealers can put on their website.
              Context: <span className="text-white/80">{problemLabel}</span>
            </p>
          </div>
          <span className="hidden shrink-0 items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-100 sm:inline-flex">
            <Sparkles className="size-3.5" />
            Website-ready
          </span>
        </div>
      </div>

      <div
        ref={listRef}
        className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6"
      >
        {messages.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center">
            <p className="text-base font-medium text-white/75">
              Start with a dealer question
            </p>
            <p className="mt-3 text-sm leading-7 text-white/45">
              Ask how this would run on your store, your website, your handoff process,
              or your BDC workflow.
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isUser = message.role === "user";
            const text = getMessageText(message);
            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  isUser ? "flex-row-reverse" : "flex-row",
                )}
              >
                {!isUser && employee ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={employee.portraitSrc}
                    alt=""
                    className="mt-1 size-9 shrink-0 rounded-full border border-white/10 object-cover"
                    style={{ objectPosition: employee.portraitFocus }}
                  />
                ) : (
                  <span
                    className={cn(
                      "mt-1 grid size-9 shrink-0 place-items-center rounded-full border text-xs font-semibold",
                      isUser
                        ? "border-blue/30 bg-blue/15 text-blue-200"
                        : "border-white/10 bg-white/[0.04] text-white/70",
                    )}
                    aria-hidden
                  >
                    {isUser ? "You" : employeeName.slice(0, 1)}
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[min(100%,42rem)] rounded-2xl px-4 py-4 sm:px-5 sm:py-4",
                    isUser
                      ? "border border-blue/30 bg-blue/15"
                      : "border border-white/10 bg-white/[0.04]",
                  )}
                >
                  <p className="font-mono text-[0.58rem] tracking-[0.14em] text-blue-300 uppercase">
                    {isUser ? "You" : employeeName}
                  </p>
                  <div className="mt-2 text-[0.9375rem] sm:text-base">
                    <MessageBody text={text} isUser={isUser} />
                  </div>
                </div>
              </div>
            );
          })
        )}
        {isBusy ? (
          <div className="flex items-center gap-3 pl-12 text-sm text-white/50">
            <span className="inline-flex gap-1">
              <span className="size-1.5 animate-pulse rounded-full bg-blue-300" />
              <span className="size-1.5 animate-pulse rounded-full bg-blue-300 [animation-delay:120ms]" />
              <span className="size-1.5 animate-pulse rounded-full bg-blue-300 [animation-delay:240ms]" />
            </span>
            {employeeName} is responding…
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="border-t border-white/10 px-5 py-3 text-sm text-amber-200/90 sm:px-6">
          {error.message.includes("AI Gateway") ||
          error.message.includes("paid credits") ||
          error.message.includes("gpt-4.1-mini")
            ? error.message
            : "Unable to send that question right now. Try again in a moment."}
        </p>
      ) : null}

      <div className="border-t border-white/10 bg-navy-950/95 px-5 py-4 sm:px-6 sm:py-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => submitQuestion(question)}
              disabled={isBusy}
              className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-2 text-xs font-medium leading-snug text-white/70 transition-colors hover:border-blue/35 hover:bg-blue/10 hover:text-white disabled:opacity-50 sm:text-sm"
            >
              {question}
            </button>
          ))}
        </div>

        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            submitQuestion(input);
          }}
        >
          <label className="min-w-0 flex-1">
            <span className="sr-only">Ask a question</span>
            <textarea
              id="scenario-follow-up-input"
              value={input}
              rows={3}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submitQuestion(input);
                }
              }}
              placeholder={`Ask ${employeeName} how this would work on your website, BDC, or handoff process…`}
              disabled={isBusy}
              className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[0.9375rem] leading-7 text-white placeholder:text-white/35 focus:border-blue/40 focus:outline-none disabled:opacity-60"
            />
          </label>
          <button
            type="submit"
            disabled={isBusy || input.trim().length === 0}
            className={cn(
              buttonVariants({ variant: "accent", size: "lg" }),
              "h-12 shrink-0 rounded-xl px-6 sm:h-[calc(3*1.75rem+1.75rem)]",
            )}
          >
            <Send className="size-4" />
            Send
          </button>
        </form>
        <p className="mt-2 text-xs text-white/35">Press Enter to send · Shift+Enter for a new line</p>
      </div>
    </div>
  );
}
