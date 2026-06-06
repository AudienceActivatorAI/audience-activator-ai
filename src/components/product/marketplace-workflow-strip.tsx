"use client";

import { useState, type ReactNode } from "react";
import { Calendar, MessageSquare, Send, Sparkles, Upload } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
  panel: ReactNode;
};

const steps: Step[] = [
  {
    id: "post",
    label: "01 · Post smarter",
    title: "Post smarter",
    icon: Upload,
    panel: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[0.58rem] tracking-[0.12em] text-white/35 uppercase">
            Market intelligence pick
          </div>
          <div className="mt-2 text-sm font-medium text-white">2022 Toyota Camry SE · HM-2048</div>
          <div className="mt-1 text-xs text-white/45">
            Higher local demand · 44 DOM · price within market band
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["2-click autoposter", "Stronger placement", "Tighter refresh"].map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[0.68rem] text-white/55"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "reply",
    label: "02 · Reply faster",
    title: "Reply faster",
    icon: MessageSquare,
    panel: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[0.58rem] text-white/35 uppercase">Buyer message</div>
          <p className="mt-2 text-sm text-white/75">
            Hi, is the 2022 Highlander still available? Can I come by today?
          </p>
        </div>
        <div className="rounded-xl border border-blue/25 bg-blue/10 p-4">
          <div className="flex items-center gap-2 font-mono text-[0.58rem] text-blue-300 uppercase">
            <Sparkles className="size-3.5" />
            Copilot suggestion · ~7 sec
          </div>
          <p className="mt-2 text-sm text-white/85">
            Yes, it is still here. I can get you in this afternoon. Does 3:30 or 5:00 work
            better?
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-white/45">
            <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-amber-300">
              Not auto-sent
            </span>
            Dealer reviews and sends
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "book",
    label: "03 · Book the next step",
    title: "Book the next step",
    icon: Calendar,
    panel: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[0.58rem] text-white/35 uppercase">Intent detected</div>
          <p className="mt-2 text-sm text-white/75">Availability + appointment intent</p>
        </div>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
          <div className="font-mono text-[0.58rem] text-emerald-300 uppercase">Next move</div>
          <p className="mt-2 text-sm text-white/85">
            Offer two visit windows and move toward a confirmed time.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70">
              3:30 PM
            </span>
            <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70">
              5:00 PM
            </span>
            <Send className="ml-auto size-4 text-blue-300" />
          </div>
        </div>
      </div>
    ),
  },
];

export function MarketplaceWorkflowStrip() {
  const [active, setActive] = useState(1);
  const step = steps[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-float">
      <div className="border-b border-white/10 px-5 py-3.5 sm:px-6">
        <div className="font-mono text-[0.58rem] tracking-[0.16em] text-blue-300 uppercase">
          Dealer Solo workflow
        </div>
        <p className="mt-1 text-sm text-white/55">
          Post the right inventory, reply with AI-suggested responses, book the next step — dealer
          stays in control of every message.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-3 sm:divide-x sm:divide-white/8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = active === i;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "flex flex-col items-start border-b border-white/8 p-4 text-left transition-colors sm:border-b-0 sm:p-5",
                isActive ? "bg-blue/10" : "hover:bg-white/[0.03]",
              )}
            >
              <Icon
                className={cn("size-4", isActive ? "text-blue-300" : "text-white/35")}
              />
              <span className="mt-3 font-mono text-[0.62rem] tracking-[0.1em] text-blue-300">
                {s.label}
              </span>
              <span className="mt-1 text-sm font-medium text-white">{s.title}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-white/10 p-5 sm:p-6">{step.panel}</div>
    </div>
  );
}
