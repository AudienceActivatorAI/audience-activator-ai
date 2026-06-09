"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Play, Radio, UserCheck, Zap } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import {
  AiEmployeeRoster,
  type AiEmployeeRosterHandle,
} from "@/components/product/ai-employee-roster";
import { ScenarioFollowUpChat } from "@/components/product/scenario-follow-up-chat";
import { buttonVariants } from "@/components/ui/button";
import {
  aiEmployeeProfiles,
  applySalesProblemDefaults,
  resolveAiEmployeeProfile,
  resolveSalesProblemOption,
  salesProblemOptions,
  scenarioPlaybooks,
  type AiEmployeeId,
  type SalesProblemOptionId,
} from "@/lib/live-callback-model";
import { cn } from "@/lib/utils";

const defaultProblemId: SalesProblemOptionId = "fresh_internet_lead";
const stepIcons = [Radio, Zap, UserCheck] as const;
const stepLabels = ["Signal", "Action", "Handoff"] as const;
const PLAYBACK_STEP_MS = 2400;

function getPlaybackPhaseCount(dialogueLength: number) {
  return 1 + dialogueLength + 3 + 1;
}

export function OutboundScenarioDemo() {
  const defaultDefaults = applySalesProblemDefaults(defaultProblemId);
  const rosterRef = React.useRef<AiEmployeeRosterHandle | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] =
    React.useState<AiEmployeeId | null>(defaultDefaults.employeeId);
  const [selectedProblemId, setSelectedProblemId] =
    React.useState<SalesProblemOptionId>(defaultProblemId);
  const [playbackPhase, setPlaybackPhase] = React.useState(-1);
  const [showWalkthrough, setShowWalkthrough] = React.useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  const problem = resolveSalesProblemOption(selectedProblemId);
  const employee =
    resolveAiEmployeeProfile(selectedEmployeeId ?? defaultDefaults.employeeId) ??
    aiEmployeeProfiles[0];
  const playbook = scenarioPlaybooks[selectedProblemId];
  const phaseCount = getPlaybackPhaseCount(playbook.dialogue.length);
  const isPlaying = playbackPhase >= 0 && playbackPhase < phaseCount;

  function clearPlaybackTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function resetPlayback() {
    clearPlaybackTimer();
    setPlaybackPhase(-1);
  }

  function selectProblem(problemId: SalesProblemOptionId) {
    const defaults = applySalesProblemDefaults(problemId);
    rosterRef.current?.stopIntro();
    resetPlayback();
    setSelectedProblemId(problemId);
    setSelectedEmployeeId(defaults.employeeId);
  }

  function selectEmployee(employeeId: AiEmployeeId) {
    resetPlayback();
    setSelectedEmployeeId(employeeId);
    const matchingProblem = salesProblemOptions.find((o) => o.employeeId === employeeId);
    if (matchingProblem) setSelectedProblemId(matchingProblem.id);
  }

  function playScenario() {
    setShowWalkthrough(true);
    clearPlaybackTimer();
    void rosterRef.current?.playSelectedIntro();
    setPlaybackPhase(0);
    timerRef.current = window.setInterval(() => {
      setPlaybackPhase((current) => {
        const next = current + 1;
        if (next >= getPlaybackPhaseCount(playbook.dialogue.length)) {
          clearPlaybackTimer();
          return current;
        }
        return next;
      });
    }, PLAYBACK_STEP_MS);
  }

  React.useEffect(() => {
    resetPlayback();
    rosterRef.current?.stopIntro();
  }, [selectedProblemId, employee.id]);

  React.useEffect(() => () => clearPlaybackTimer(), []);

  const visibleDialogueCount = Math.max(
    0,
    Math.min(playbook.dialogue.length, playbackPhase),
  );
  const activeFlowIndex =
    playbackPhase >= 1 + playbook.dialogue.length
      ? Math.min(2, playbackPhase - 1 - playbook.dialogue.length)
      : -1;
  const showHandoff = playbackPhase >= phaseCount - 1 && playbackPhase >= 0;

  return (
    <Section id="outbound-scenario-demo" tone="dark" className="overflow-hidden">
      <div
        className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Outbound execution demo"
          title="Talk to your AI BDC team like a dealer would."
          description="Select an agent, pick the sales problem, and ask real follow-up questions. The same chat can run on your dealership website — no live call required."
        />

        <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-float sm:p-8">
          <AiEmployeeRoster
            ref={rosterRef}
            selectedEmployeeId={selectedEmployeeId}
            onSelectEmployee={selectEmployee}
            onAgentSpeakingChange={setIsAgentSpeaking}
          />

          <div className="mt-8 rounded-xl border border-blue/25 bg-blue/10 p-4 sm:p-5">
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
                  <p className="mt-2 text-xs font-medium text-blue-300">{option.outcome}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">{option.summary}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <ScenarioFollowUpChat
              key={`${selectedProblemId}-${employee.id}`}
              problemId={selectedProblemId}
              employeeId={employee.id}
              employeeName={employee.name}
              problemLabel={problem?.label ?? "Dealer scenario"}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => setShowWalkthrough((open) => !open)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              aria-expanded={showWalkthrough}
            >
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.16em] text-white/45 uppercase">
                  Optional walkthrough
                </p>
                <p className="mt-1 text-sm font-medium text-white/80 sm:text-base">
                  Watch the scripted scenario for {problem?.label ?? "this problem"}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-white/50 transition-transform",
                  showWalkthrough ? "rotate-180" : "",
                )}
              />
            </button>

            {showWalkthrough ? (
              <div className="border-t border-white/10 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-relaxed text-white/55">
                    Prefer the step-by-step view? Play the scripted walkthrough for trigger,
                    opening, flow, and handoff.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={playScenario}
                      className={cn(
                        buttonVariants({ variant: "glass", size: "md" }),
                        "rounded-xl",
                      )}
                    >
                      <Play />
                      {isPlaying ? "Playing…" : "Play walkthrough"}
                    </button>
                    {isPlaying ? (
                      <button
                        type="button"
                        onClick={resetPlayback}
                        className="rounded-xl px-4 text-sm font-medium text-white/55 hover:text-white"
                      >
                        Reset
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-4 rounded-xl border border-white/10 bg-navy-950/70 p-4 sm:p-5">
                    <div
                      className={cn(
                        "rounded-xl border p-4 transition-all duration-500",
                        playbackPhase >= 0
                          ? "border-blue/30 bg-blue/10"
                          : "border-white/10 bg-white/[0.03] opacity-70",
                      )}
                    >
                      <p className="font-mono text-[0.62rem] tracking-[0.14em] text-blue-300 uppercase">
                        Trigger
                      </p>
                      <p className="mt-2 text-base font-semibold text-white">
                        {playbook.triggerTitle}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        {playbook.triggerBody}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-mono text-[0.62rem] tracking-[0.16em] text-blue-300 uppercase">
                        {playbook.openingTitle}
                      </p>
                      <div className="mt-3 space-y-3">
                        {playbook.dialogue.map((line, index) => (
                          <p
                            key={line}
                            className={cn(
                              "text-sm leading-7 transition-all duration-500",
                              index < visibleDialogueCount
                                ? "text-white/85 opacity-100"
                                : "text-white/30 opacity-40",
                            )}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {playbook.flowSteps.map((step, index) => {
                      const Icon = stepIcons[index];
                      return (
                        <div
                          key={step}
                          className={cn(
                            "rounded-xl border p-4 transition-colors duration-500",
                            activeFlowIndex === index
                              ? "border-blue/35 bg-blue/10"
                              : "border-white/10 bg-navy-950/60",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue/15 text-blue-300">
                              <Icon className="size-4" />
                            </span>
                            <div>
                              <p className="font-mono text-[0.62rem] tracking-[0.14em] text-blue-300 uppercase">
                                {stepLabels[index]}
                              </p>
                              <p className="mt-2 text-sm leading-7 text-white/80">{step}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div
                      className={cn(
                        "rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 transition-all duration-500",
                        showHandoff ? "opacity-100" : "opacity-50",
                      )}
                    >
                      <p className="font-mono text-[0.62rem] tracking-[0.14em] text-emerald-100/80 uppercase">
                        Handoff result
                      </p>
                      <p className="mt-2 text-sm leading-7 text-emerald-50">
                        {playbook.handoffResult}
                      </p>
                    </div>
                    {(isPlaying || isAgentSpeaking) && (
                      <p className="text-xs text-blue-300">
                        {isAgentSpeaking ? `${employee.name} is speaking` : "Walkthrough running"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <Link
              href="/#cta"
              className={cn(buttonVariants({ variant: "accent", size: "lg" }), "rounded-xl")}
            >
              Request guided demo
              <ArrowRight />
            </Link>
            <Link
              href="/sales-sheet"
              className={cn(buttonVariants({ variant: "glass", size: "lg" }), "rounded-xl")}
            >
              View June pricing
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
