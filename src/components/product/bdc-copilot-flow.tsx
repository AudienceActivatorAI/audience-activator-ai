"use client";

import { useState } from "react";
import { ArrowRight, Radio, Shield, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FlowStage = {
  id: string;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  items: string[];
  outcome: string;
};

const stages: FlowStage[] = [
  {
    id: "traffic",
    label: "Traffic",
    subtitle: "Marketplace + web intent",
    icon: Radio,
    items: [
      "Marketplace traffic intelligence",
      "Super Pixel website intent",
      "CRM reactivation waves",
    ],
    outcome: "Reachable buyers identified and ranked before outreach begins.",
  },
  {
    id: "execution",
    label: "Execution",
    subtitle: "AI voice, SMS, email & web",
    icon: Zap,
    items: [
      "AI sales agent pods",
      "Live outbound calling & warm transfers",
      "Web chat, SMS & sequences",
      "Agent factory for every campaign",
    ],
    outcome: "AI handles rejection — your team only gets buyers who said yes.",
  },
  {
    id: "control",
    label: "Control",
    subtitle: "Manager handoffs & approvals",
    icon: Shield,
    items: [
      "Phone intelligence & transcription",
      "Manager command center in DealerOS",
      "Ranked handoffs & appointment risk",
    ],
    outcome: "Managers see what needs attention and approve the next move.",
  },
];

export function BDCCopilotFlow() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-float">
      <div className="border-b border-white/10 px-5 py-3.5 sm:px-6">
        <div className="font-mono text-[0.58rem] tracking-[0.16em] text-blue-300 uppercase">
          Sales motion
        </div>
        <p className="mt-1 text-sm text-white/55">
          One operating system — traffic in, AI works the lead, managers stay in command.
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const isActive = active === i;
          return (
            <div key={s.id} className="contents">
              <button
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex flex-col border-b border-white/8 p-5 text-left transition-colors lg:border-b-0",
                  i > 0 && "lg:border-l lg:border-white/8",
                  isActive ? "bg-blue/10" : "bg-transparent hover:bg-white/[0.03]",
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-lg border",
                      isActive
                        ? "border-blue/40 bg-blue/15 text-blue-300"
                        : "border-white/10 bg-white/5 text-white/50",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="font-mono text-[0.62rem] text-blue-300">0{i + 1}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">{s.label}</h3>
                <p className="mt-0.5 text-xs text-white/45">{s.subtitle}</p>
                <ul className="mt-3 hidden flex-col gap-1.5 sm:flex">
                  {s.items.slice(0, 3).map((item) => (
                    <li key={item} className="text-xs text-white/50">
                      · {item}
                    </li>
                  ))}
                </ul>
              </button>
              {i < stages.length - 1 ? (
                <div
                  className="hidden items-center justify-center px-1 text-white/20 lg:flex"
                  aria-hidden
                >
                  <ArrowRight className="size-4" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/10 bg-navy-900/40 p-5 sm:p-6">
        <div className="font-mono text-[0.58rem] tracking-[0.14em] text-white/35 uppercase">
          Active stage — {stage.label}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{stage.outcome}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stage.items.map((item) => (
            <span
              key={item}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[0.75rem] text-white/60"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
