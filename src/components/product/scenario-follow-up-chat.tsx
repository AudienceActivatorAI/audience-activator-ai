"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { AiEmployeeId, SalesProblemOptionId } from "@/lib/live-callback-model";
import { cn } from "@/lib/utils";

type Props = {
  problemId: SalesProblemOptionId;
  employeeId: AiEmployeeId;
  employeeName: string;
};

const suggestedQuestions = [
  "How would this run on my website?",
  "What happens after the handoff?",
  "How fast can we respond to fresh leads?",
] as const;

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function ScenarioFollowUpChat({
  problemId,
  employeeId,
  employeeName,
}: Props) {
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue/15 text-blue-300">
          <MessageCircle className="size-5" />
        </span>
        <div>
          <p className="font-mono text-[0.62rem] tracking-[0.16em] text-blue-300 uppercase">
            Ask a follow-up
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            Questions for {employeeName}?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            This is the same BDC Copilot chat experience dealers can put on their
            website — ask how the scenario would run on your store, your site, or
            your handoff process.
          </p>
        </div>
      </div>

      <div
        ref={listRef}
        className="mt-4 max-h-64 space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-navy-950/70 p-4"
      >
        {messages.length === 0 ? (
          <p className="text-sm text-white/45">
            Try a quick question about website chat, lead response, or what happens
            after the handoff.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "rounded-lg px-3 py-2 text-sm leading-relaxed",
                message.role === "user"
                  ? "ml-8 border border-blue/25 bg-blue/10 text-white"
                  : "mr-8 border border-white/10 bg-white/[0.03] text-white/85",
              )}
            >
              {getMessageText(message)}
            </div>
          ))
        )}
        {isBusy ? (
          <p className="text-sm text-white/45">{employeeName} is typing…</p>
        ) : null}
      </div>

      {error ? (
        <p className="mt-3 text-sm text-amber-200/90">
          Unable to send that question right now. Try again in a moment.
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => submitQuestion(question)}
            disabled={isBusy}
            className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white disabled:opacity-50"
          >
            {question}
          </button>
        ))}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          submitQuestion(input);
        }}
      >
        <label className="sr-only" htmlFor="scenario-follow-up-input">
          Ask a follow-up question
        </label>
        <input
          id="scenario-follow-up-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask how this would work on your website or BDC…"
          disabled={isBusy}
          className="min-w-0 flex-1 rounded-xl border border-white/12 bg-navy-950/80 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-blue/40 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isBusy || input.trim().length === 0}
          className={cn(
            buttonVariants({ variant: "accent", size: "md" }),
            "shrink-0 rounded-xl px-4",
          )}
        >
          <Send className="size-4" />
          Send
        </button>
      </form>
    </div>
  );
}
