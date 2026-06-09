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
  scenarioDemoSteps,
  type AiEmployeeId,
  type SalesProblemOptionId,
} from "@/lib/live-callback-model";
import { cn } from "@/lib/utils";

const defaultProblemId: SalesProblemOptionId = "fresh_internet_lead";
const stepIcons = [Radio, Zap, UserCheck] as const;
const stepLabels = ["Signal", "Action", "Handoff"] as const;

export function OutboundScenarioDemo() {
  const defaultDefaults = applySalesProblemDefaults(defaultProblemId);
  const [selectedEmployeeId, setSelectedEmployeeId] =
    React.useState<AiEmployeeId | null>(defaultDefaults.employeeId);
  const [selectedProblemId, setSelectedProblemId] =
    React.useState<SalesProblemOptionId>(defaultProblemId);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playError, setPlayError] = React.useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const problem = resolveSalesProblemOption(selectedProblemId);
  const employee =
    resolveAiEmployeeProfile(selectedEmployeeId ?? defaultDefaults.employeeId) ??
    aiEmployeeProfiles[0];
  const steps = scenarioDemoSteps[selectedProblemId];

  function selectProblem(problemId: SalesProblemOptionId) {
    const defaults = applySalesProblemDefaults(problemId);
    setSelectedProblemId(problemId);
    setSelectedEmployeeId(defaults.employeeId);
  }

  function selectEmployee(employeeId: AiEmployeeId) {
    setSelectedEmployeeId(employeeId);
    const matchingProblem = salesProblemOptions.find((o) => o.employeeId === employeeId);
    if (matchingProblem) setSelectedProblemId(matchingProblem.id);
  }

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(false);
    setPlayError(null);
    video.pause();
    video.currentTime = 0;
    video.load();
  }, [employee.motionSrc]);

  async function playScenario() {
    const video = videoRef.current;
    if (!video) return;

    setPlayError(null);
    video.scrollIntoView({ behavior: "smooth", block: "nearest" });

    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      try {
        await new Promise<void>((resolve, reject) => {
          const onReady = () => {
            cleanup();
            resolve();
          };
          const onError = () => {
            cleanup();
            reject(new Error("Video failed to load."));
          };
          const cleanup = () => {
            video.removeEventListener("loadeddata", onReady);
            video.removeEventListener("error", onError);
          };
          video.addEventListener("loadeddata", onReady);
          video.addEventListener("error", onError);
          video.load();
        });
      } catch {
        setPlayError("Video is still loading. Try again in a moment.");
        return;
      }
    }

    video.currentTime = 0;
    video.muted = true;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setPlayError("Unable to start playback. Use the video controls below.");
      setIsPlaying(false);
    }
  }

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
          description="Pick the sales problem, choose an agent, and see how BDC Copilot opens, qualifies, and tees up the handoff — without placing a live call."
        />

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-float sm:p-8">
          <AiEmployeeRoster
            selectedEmployeeId={selectedEmployeeId}
            onSelectEmployee={selectEmployee}
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
              <div className="relative mx-auto w-full max-w-[360px] bg-navy-950">
                <div className="aspect-[9/16] w-full">
                  <video
                    ref={videoRef}
                    src={employee.motionSrc}
                    poster={employee.portraitSrc}
                    playsInline
                    muted
                    loop
                    controls
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="size-full object-contain"
                  />
                </div>
              </div>
              <div className="border-t border-white/10 p-5">
                <p className="font-mono text-[0.62rem] tracking-[0.16em] text-blue-300 uppercase">
                  {employee.readoutTitle}
                </p>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/75">
                  {employee.readoutLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
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
                  onClick={() => void playScenario()}
                  className={cn(
                    buttonVariants({ variant: "glass", size: "md" }),
                    "mt-5 w-full rounded-xl",
                  )}
                >
                  <Play />
                  {isPlaying ? "Playing scenario" : "Play scenario"}
                </button>
                {playError ? (
                  <p className="mt-2 text-sm text-amber-200/90">{playError}</p>
                ) : null}
              </div>

              <div className="grid gap-3">
                {[steps.signal, steps.action, steps.handoff].map((text, index) => {
                  const Icon = stepIcons[index];
                  return (
                    <div
                      key={stepLabels[index]}
                      className="rounded-xl border border-white/10 bg-navy-950/60 p-4"
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
