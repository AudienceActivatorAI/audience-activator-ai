"use client";

import * as React from "react";
import Image from "next/image";
import { Phone, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  aiEmployeeProfiles,
  type AiEmployeeId,
} from "@/lib/live-callback-model";
import { cn } from "@/lib/utils";

type Props = {
  selectedEmployeeId: AiEmployeeId | null;
  onSelectEmployee: (employeeId: AiEmployeeId) => void;
  onCallEmployee: (employeeId: AiEmployeeId) => void;
};

export function AiEmployeeRoster({
  selectedEmployeeId,
  onSelectEmployee,
  onCallEmployee,
}: Props) {
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
                <Image
                  src={employee.portraitSrc}
                  alt={employee.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute left-4 top-4 rounded-lg border border-white/15 bg-navy-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {isSelected ? "Selected" : "Choose"}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h4 className="text-xl font-semibold text-white">{employee.name}</h4>
                <p className="mt-1 text-sm font-medium text-blue-300">{employee.role}</p>
                <p className="mt-3 text-sm font-semibold text-white">{employee.outcome}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                  {employee.summary}
                </p>

                {isSelected ? (
                  <div className="mt-4 rounded-xl border border-blue/20 bg-navy-950/60 p-4">
                    <p className="font-mono text-[0.62rem] tracking-[0.16em] text-blue-300 uppercase">
                      {employee.readoutTitle}
                    </p>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/75">
                      {employee.readoutLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-5 grid gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectEmployee(employee.id)}
                    className={cn(
                      buttonVariants({
                        variant: isSelected ? "accent" : "glass",
                        size: "md",
                      }),
                      "w-full rounded-xl",
                    )}
                    aria-pressed={isSelected}
                  >
                    {isSelected ? "Selected" : "Choose"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onCallEmployee(employee.id)}
                    className={cn(
                      buttonVariants({ variant: "accent", size: "md" }),
                      "w-full rounded-xl",
                    )}
                  >
                    <Phone />
                    Call Me Live
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
