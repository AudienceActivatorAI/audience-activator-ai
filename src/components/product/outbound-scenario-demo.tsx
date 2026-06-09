"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Play, Radio, UserCheck, Zap } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { AiEmployeeRoster } from "@/components/product/ai-employee-roster";
import { buttonVariants } from "@/components/ui/button";
import {
  aiEmployeeProfiles,
  applySalesProblemDefaults,
  resolveAiEmployeeProfile,
  resolveSalesProblemOption,
  salesProblemOptions,
  scenarioDemoVoiceEnabled,
  scenarioPlaybooks,
  type AiEmployeeId,
  type SalesProblemOptionId,
} from "@/lib/live-callback-model";
import { cn } from "@/lib/utils";

const defaultProblemId: SalesProblemOptionId = "fresh_internet_lead";
const stepIcons = [Radio, Zap, UserCheck] as const;
const stepLabels = ["Signal", "Action", "Handoff"] as const;
const PLAYBACK_STEP_MS = 2400;

/** 0 trigger, 1..dialogue, then flow steps, then handoff */
function getPlaybackPhaseCount(dialogueLength: number) {
  return 1 + dialogueLength + 3 + 1;
}

export function OutboundScenarioDemo() {
  const defaultDefaults = applySalesProblemDefaults(defaultProblemId);
  const [selectedEmployeeId, setSelectedEmployeeId] =
    React.useState<AiEmployeeId | null>(defaultDefaults.employeeId);
  const [selectedProblemId, setSelectedProblemId] =
    React.useState<SalesProblemOptionId>(defaultProblemId);
  const [playbackPhase, setPlaybackPhase] = React.useState(-1);
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
    clearPlaybackTimer();
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

  React.useEffect(() => resetPlayback, [selectedProblemId, employee.id]);

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
          title="Watch the AI sales pod handle a real dealer scenario."
          description="Pick the sales problem, choose an agent, and step through how BDC Copilot opens, qualifies, and tees up the handoff — without placing a live call."
        />

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-float sm:p-8">
          <AiEmployeeRoster
            selectedEmployeeId={selectedEmployeeId}
            onSelectEmployee={selectEmployee}
            isScenarioPlaying={isPlaying}
          />

          <div className="mt-8 rounded-xl border border-blue/25 bg-blue/10 p-4">
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

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950/80">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={employee.portraitSrc}
                  alt={employee.name}
                  className="size-12 rounded-full border border-white/15 object-cover object-top"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{employee.name}</p>
                  <p className="text-xs text-blue-300">
                    {isPlaying
                      ? scenarioDemoVoiceEnabled
                        ? "Speaking now"
                        : "Running scenario"
                      : "Ready to run scenario"}
                  </p>
                </div>
                {isPlaying ? (
                  <span className="ml-auto rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-200">
                    Live next move
                  </span>
                ) : null}
              </div>

              <div className="space-y-4 p-5">
                <div
                  className={cn(
                    "rounded-xl border p-4 transition-all duration-500",
                    playbackPhase >= 0
                      ? "border-blue/30 bg-blue/10 opacity-100"
                      : "border-white/10 bg-white/[0.03] opacity-60",
                  )}
                >
                  <p className="font-mono text-[0.62rem] tracking-[0.14em] text-blue-300 uppercase">
                    Trigger
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {playbook.triggerTitle}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
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
                          "text-sm leading-relaxed transition-all duration-500",
                          index < visibleDialogueCount
                            ? "text-white/85 opacity-100"
                            : "text-white/30 opacity-0",
                        )}
                      >
                        {line}
                      </p>
                    ))}
                    {visibleDialogueCount === 0 ? (
                      <p className="text-sm text-white/40">
                        Press Play scenario to watch how {employee.name} handles this conversation.
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  {playbook.flowSteps.map((step, index) => (
                    <div
                      key={step}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-sm transition-all duration-500",
                        activeFlowIndex === index
                          ? "border-blue/40 bg-blue/15 text-white"
                          : activeFlowIndex > index
                            ? "border-white/10 bg-white/[0.04] text-white/70"
                            : "border-white/8 bg-transparent text-white/35",
                      )}
                    >
                      <span className="font-mono text-[0.62rem] tracking-[0.12em] text-blue-300">
                        {index + 1}
                      </span>
                      <span className="mt-1 block leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 transition-all duration-500",
                    showHandoff ? "opacity-100" : "opacity-40",
                  )}
                >
                  <p className="font-mono text-[0.62rem] tracking-[0.14em] text-emerald-100/80 uppercase">
                    Handoff result
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-50">
                    {playbook.handoffResult}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="font-mono text-[0.62rem] tracking-[0.16em] text-white/45 uppercase">
                  Scenario context
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  {problem?.label ?? "Dealer scenario"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {problem?.interestContext}
                </p>
                <button
                  type="button"
                  onClick={playScenario}
                  className={cn(
                    buttonVariants({ variant: "glass", size: "md" }),
                    "mt-5 w-full rounded-xl",
                  )}
                >
                  <Play />
                  {isPlaying ? "Playing scenario…" : "Play scenario"}
                </button>
                {isPlaying ? (
                  <button
                    type="button"
                    onClick={resetPlayback}
                    className="mt-2 w-full text-sm font-medium text-white/55 hover:text-white"
                  >
                    Reset scenario
                  </button>
                ) : null}
              </div>

              <div className="grid gap-3">
                {(
                  [
                    playbook.flowSteps[0],
                    playbook.flowSteps[1],
                    playbook.handoffResult,
                  ] as const
                ).map((text, index) => {
                  const Icon = stepIcons[index];
                  return (
                    <div
                      key={stepLabels[index]}
                      className={cn(
                        "rounded-xl border p-4 transition-colors duration-500",
                        activeFlowIndex === index || (index === 2 && showHandoff)
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
                            {index + 1} · {stepLabels[index]}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-white/80">{text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
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
          </div>
        </div>
      </Container>
    </Section>
  );
}
