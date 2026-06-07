"use client";

import * as React from "react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { AiEmployeeRoster } from "@/components/product/ai-employee-roster";
import { buttonVariants } from "@/components/ui/button";
import {
  applyAiEmployeeDefaults,
  applySalesProblemDefaults,
  aiEmployeeProfiles,
  normalizePhone,
  salesProblemOptions,
  type AiEmployeeId,
  type CallbackAttribution,
  type SalesDemoProfileId,
  type SalesProblemOptionId,
} from "@/lib/live-callback-model";
import { cn } from "@/lib/utils";

type CallbackStage =
  | "idle"
  | "loading"
  | "queued"
  | "calling"
  | "connected"
  | "complete"
  | "failed";

const stageLabel: Record<CallbackStage, string> = {
  idle: "Ready",
  loading: "Submitting",
  queued: "Queued",
  calling: "Calling",
  connected: "Connected",
  complete: "Complete",
  failed: "Needs attention",
};

function readAttribution(): CallbackAttribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    content: params.get("utm_content") ?? undefined,
    term: params.get("utm_term") ?? undefined,
    landingPath: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    referrer: document.referrer || undefined,
  };
}

const defaultProblemId: SalesProblemOptionId = "fresh_internet_lead";
const defaultDefaults = applySalesProblemDefaults(defaultProblemId);

export function LiveOutboundAgent() {
  const [profileId, setProfileId] = React.useState<SalesDemoProfileId>(
    defaultDefaults.profileId,
  );
  const [selectedEmployeeId, setSelectedEmployeeId] =
    React.useState<AiEmployeeId | null>("maya");
  const [selectedProblemId, setSelectedProblemId] =
    React.useState<SalesProblemOptionId>(defaultProblemId);
  const [contactName, setContactName] = React.useState("");
  const [dealershipName, setDealershipName] = React.useState("");
  const [dealerEmail, setDealerEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [problemToSolve, setProblemToSolve] = React.useState(
    defaultDefaults.problemToSolve,
  );
  const [interestContext, setInterestContext] = React.useState(
    defaultDefaults.interestContext,
  );
  const [stage, setStage] = React.useState<CallbackStage>("idle");
  const [message, setMessage] = React.useState(
    "Add your dealer info, choose an AI sales agent, and request the live call.",
  );
  const [requestId, setRequestId] = React.useState<string | null>(null);
  const [queuedEmployeeName, setQueuedEmployeeName] = React.useState<string | null>(
    null,
  );
  const [queuedProblemLabel, setQueuedProblemLabel] = React.useState<string | null>(
    null,
  );
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const pollRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!requestId) return;

    const poll = async () => {
      try {
        const response = await fetch(
          `/api/live-callback/status?requestId=${encodeURIComponent(requestId)}`,
          { cache: "no-store" },
        );
        const payload = (await response.json()) as { stage?: CallbackStage };
        if (!response.ok || !payload.stage) return;

        setStage(payload.stage);
        setMessage(`Callback status: ${stageLabel[payload.stage]}.`);

        if (payload.stage === "complete" || payload.stage === "failed") {
          if (pollRef.current) window.clearInterval(pollRef.current);
        }
      } catch {
        // Call may still be progressing.
      }
    };

    pollRef.current = window.setInterval(() => void poll(), 3500);
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [requestId]);

  function selectEmployee(employeeId: AiEmployeeId) {
    const defaults = applyAiEmployeeDefaults(employeeId);
    const matchingProblem = salesProblemOptions.find(
      (o) => o.employeeId === employeeId,
    );
    setSelectedEmployeeId(employeeId);
    if (matchingProblem) setSelectedProblemId(matchingProblem.id);
    setProfileId(defaults.profileId);
    setProblemToSolve(defaults.problemToSolve);
    setInterestContext(defaults.interestContext);
  }

  function selectProblem(problemId: SalesProblemOptionId) {
    const defaults = applySalesProblemDefaults(problemId);
    setSelectedProblemId(problemId);
    setSelectedEmployeeId(defaults.employeeId);
    setProfileId(defaults.profileId);
    setProblemToSolve(defaults.problemToSolve);
    setInterestContext(defaults.interestContext);
  }

  function callEmployee(employeeId: AiEmployeeId) {
    selectEmployee(employeeId);
    window.setTimeout(() => {
      formRef.current
        ?.querySelector<HTMLInputElement>('input[name="contactName"]')
        ?.focus();
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStage("loading");
    setMessage("Submitting the live dealer demo request...");
    setRequestId(null);

    try {
      const response = await fetch("/api/live-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId,
          contactName,
          dealershipName,
          dealerEmail,
          phoneNumber: normalizePhone(phoneNumber),
          problemToSolve,
          interestContext,
          attribution: readAttribution(),
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        requestId?: string;
        profileLabel?: string;
      };

      if (!response.ok) {
        setStage("failed");
        setMessage(payload.error ?? "Unable to request callback.");
        return;
      }

      const option = salesProblemOptions.find((o) => o.id === selectedProblemId);
      setStage("queued");
      setRequestId(payload.requestId ?? null);
      setQueuedEmployeeName(
        aiEmployeeProfiles.find((e) => e.id === selectedEmployeeId)?.name ?? null,
      );
      setQueuedProblemLabel(option?.label ?? payload.profileLabel ?? null);
      setMessage(
        `Callback queued for ${payload.profileLabel ?? "your AI sales agent"}. Keep your phone nearby.`,
      );
    } catch {
      setStage("failed");
      setMessage("Unable to request callback right now.");
    }
  }

  return (
    <Section id="live-outbound-agent" tone="dark" className="overflow-hidden">
      <div
        className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Live outbound agent"
          title="Let the AI sales pod call you like a real dealer lead."
          description="Add your dealer info, choose the sales agent you want to test, and hear how BDC Copilot opens, qualifies, handles context, and tees up the handoff."
        />

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-float sm:p-8">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="eyebrow text-blue-300">Dealer sales demo</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Hear the AI sales pod call you live
              </h3>
            </div>
            <div className="rounded-xl border border-white/10 bg-navy-950/60 px-4 py-3">
              <p className="font-mono text-[0.62rem] tracking-[0.16em] text-white/45 uppercase">
                Status
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {stageLabel[stage]}
              </p>
            </div>
          </div>

          <form ref={formRef} onSubmit={(e) => void onSubmit(e)} className="mt-6 space-y-6">
            <AiEmployeeRoster
              selectedEmployeeId={selectedEmployeeId}
              onSelectEmployee={selectEmployee}
              onCallEmployee={callEmployee}
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  label: "Your name",
                  name: "contactName",
                  value: contactName,
                  onChange: setContactName,
                  placeholder: "Alex Morgan",
                  type: "text",
                },
                {
                  label: "Dealership",
                  value: dealershipName,
                  onChange: setDealershipName,
                  placeholder: "ABC Motors",
                  type: "text",
                },
                {
                  label: "Dealer email",
                  value: dealerEmail,
                  onChange: setDealerEmail,
                  placeholder: "alex@abcmotors.com",
                  type: "email",
                },
                {
                  label: "Callback phone",
                  value: phoneNumber,
                  onChange: setPhoneNumber,
                  placeholder: "(206) 555-1234",
                  type: "tel",
                },
              ].map((field) => (
                <label key={field.label} className="block">
                  <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
                    {field.label}
                  </span>
                  <input
                    name={"name" in field ? field.name : undefined}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-navy-950/80 px-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue/40 focus:ring-2 focus:ring-blue/30"
                  />
                </label>
              ))}
            </div>

            <div className="rounded-xl border border-blue/25 bg-blue/10 p-4">
              <p className="font-mono text-[0.62rem] tracking-[0.16em] text-blue-300 uppercase">
                Choose your sales problem
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {salesProblemOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectProblem(option.id)}
                    aria-pressed={selectedProblemId === option.id}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-colors",
                      selectedProblemId === option.id
                        ? "border-blue/50 bg-blue/15 text-white"
                        : "border-white/10 bg-navy-950/50 text-white/70 hover:border-white/20",
                    )}
                  >
                    <p className="text-sm font-semibold">{option.label}</p>
                    <p className="mt-2 text-xs font-medium text-blue-300">
                      {option.outcome}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/50">
                      {option.summary}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
                  What should the AI help with?
                </span>
                <input
                  value={problemToSolve}
                  onChange={(e) => setProblemToSolve(e.target.value)}
                  placeholder="Speed-to-lead, no-shows, subprime, trade leads"
                  className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-navy-950/80 px-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue/40 focus:ring-2 focus:ring-blue/30"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[0.62rem] tracking-[0.14em] text-white/45 uppercase">
                  Vehicle or campaign context
                </span>
                <input
                  value={interestContext}
                  onChange={(e) => setInterestContext(e.target.value)}
                  placeholder="2024 Ford F-150 lead, aged SUV leads"
                  className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-navy-950/80 px-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue/40 focus:ring-2 focus:ring-blue/30"
                />
              </label>
            </div>

            {stage !== "idle" && stage !== "loading" && stage !== "failed" ? (
              <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4">
                <p className="font-mono text-[0.62rem] tracking-[0.16em] text-emerald-100/80 uppercase">
                  Live call status
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-50">
                  {stageLabel[stage]}
                </p>
                <p className="mt-2 text-sm text-emerald-100/80">
                  {queuedEmployeeName ?? "AI sales agent"}
                  {queuedProblemLabel ? ` · ${queuedProblemLabel}` : ""}
                </p>
                <p className="mt-2 text-sm text-emerald-100/70">
                  Keep your phone nearby. This panel updates as the call progresses.
                </p>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-white/55">{message}</p>
              <button
                type="submit"
                disabled={stage === "loading"}
                className={cn(
                  buttonVariants({ variant: "accent", size: "lg" }),
                  "rounded-xl px-8",
                )}
              >
                {stage === "loading" ? "Requesting..." : "Call Me Now"}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
