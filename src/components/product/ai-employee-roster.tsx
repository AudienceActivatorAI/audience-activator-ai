"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  aiEmployeeProfiles,
  type AiEmployeeId,
} from "@/lib/live-callback-model";
import { cn } from "@/lib/utils";

export type AiEmployeeRosterHandle = {
  playSelectedIntro: () => Promise<void>;
  stopIntro: () => void;
};

type Props = {
  selectedEmployeeId: AiEmployeeId | null;
  onSelectEmployee: (employeeId: AiEmployeeId) => void;
  onAgentSpeakingChange?: (speaking: boolean) => void;
};

export const AiEmployeeRoster = React.forwardRef<AiEmployeeRosterHandle, Props>(
  function AiEmployeeRoster(
    { selectedEmployeeId, onSelectEmployee, onAgentSpeakingChange },
    ref,
  ) {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    const stopIntro = React.useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      onAgentSpeakingChange?.(false);
    }, [onAgentSpeakingChange]);

    const playIntroFor = React.useCallback(async () => {
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        video.currentTime = 0;
        video.muted = false;

        try {
          await video.play();
          onAgentSpeakingChange?.(true);
        } catch {
          video.muted = true;
          try {
            await video.play();
          } catch {
            onAgentSpeakingChange?.(false);
          }
        }
      }, [onAgentSpeakingChange]);

    const playSelectedIntro = React.useCallback(async () => {
      if (!selectedEmployeeId) return;
      await playIntroFor();
    }, [playIntroFor, selectedEmployeeId]);

    React.useImperativeHandle(
      ref,
      () => ({
        playSelectedIntro,
        stopIntro,
      }),
      [playSelectedIntro, stopIntro],
    );

    function handleSelect(employeeId: AiEmployeeId) {
      stopIntro();
      onSelectEmployee(employeeId);
      window.setTimeout(() => {
        void playIntroFor();
      }, 0);
    }

    React.useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const onEnded = () => onAgentSpeakingChange?.(false);
      video.addEventListener("ended", onEnded);
      return () => video.removeEventListener("ended", onEnded);
    }, [onAgentSpeakingChange, selectedEmployeeId]);

    React.useEffect(() => () => stopIntro(), [stopIntro]);

    return (
      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-blue-300">AI employee roster</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Meet your AI sales team
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Three dealership specialists tuned for sales, scheduling, and
              finance-sensitive handoffs.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/70">
            <Sparkles className="size-4 text-blue-300" aria-hidden />
            Built for dealer conversations
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {aiEmployeeProfiles.map((employee) => {
            const isSelected = selectedEmployeeId === employee.id;
            return (
              <article
                key={employee.id}
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-2xl border transition-colors",
                  isSelected
                    ? "border-blue/40 bg-blue/10 shadow-float"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20",
                )}
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-navy-950">
                  {isSelected ? (
                    <video
                      key={employee.id}
                      ref={videoRef}
                      src={employee.motionSrc}
                      poster={employee.portraitSrc}
                      className="h-full w-full object-contain object-center"
                      playsInline
                      preload="metadata"
                      aria-label={`${employee.name} intro`}
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={employee.portraitSrc}
                      alt={employee.name}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: employee.portraitFocus }}
                      loading="lazy"
                    />
                  )}
                  <div className="absolute left-4 top-4 rounded-lg border border-white/15 bg-navy-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {isSelected ? "Selected" : "Agent"}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h4 className="text-xl font-semibold text-white">{employee.name}</h4>
                  <p className="mt-1 text-sm font-medium text-blue-300">{employee.role}</p>
                  <p className="mt-3 text-sm font-semibold text-white">{employee.outcome}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                    {employee.summary}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleSelect(employee.id)}
                    className={cn(
                      buttonVariants({
                        variant: isSelected ? "accent" : "glass",
                        size: "md",
                      }),
                      "mt-5 w-full rounded-xl",
                    )}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? "Selected" : "Select agent"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  },
);

AiEmployeeRoster.displayName = "AiEmployeeRoster";
