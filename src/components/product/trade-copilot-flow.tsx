"use client";

import { useState, type ReactNode } from "react";
import {
  BadgeCheck,
  ClipboardCheck,
  Gauge,
  HandCoins,
  ShieldCheck,
  Upload,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
  panel: ReactNode;
};

const deskStatuses = [
  "submitted",
  "proof_needs_review",
  "proof_verified",
  "vehicle_mismatch",
  "expired_offer",
  "inspection_required",
  "dealer_offer_ready",
] as const;

const steps: Step[] = [
  {
    id: "range",
    label: "01 · Market range",
    title: "See market range",
    icon: Gauge,
    panel: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[0.58rem] tracking-[0.12em] text-white/35 uppercase">
            2021 Ford F-150 Lariat · 42,800 mi
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-mono text-2xl font-semibold text-white">$28,400</span>
            <span className="pb-1 text-sm text-white/35">—</span>
            <span className="font-mono text-2xl font-semibold text-white">$31,200</span>
          </div>
          <p className="mt-1 text-xs text-white/45">Likely $29,850 · live market + dealer books</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["60% market", "25% KBB", "15% Black Book"].map((t) => (
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
    id: "match",
    label: "02 · Match-or-beat",
    title: "Upload instant offer",
    icon: Upload,
    panel: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[0.58rem] text-white/35 uppercase">
            Written offer proof
          </div>
          <p className="mt-2 text-sm font-medium text-white">CarMax · $32,100 · exp 3/18/26</p>
          <p className="mt-1 text-xs text-white/45">2021 F-150 Lariat · VIN ending ···4821</p>
        </div>
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
          <div className="flex items-center gap-2 font-mono text-[0.58rem] text-amber-300 uppercase">
            <ClipboardCheck className="size-3.5" />
            Proof checklist
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Amount", "Expiration", "Vehicle ID", "Mileage", "Screenshot"].map((t) => (
              <span
                key={t}
                className="rounded border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[0.68rem] text-emerald-200"
              >
                {t} ✓
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/45">
            <span className="rounded border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-amber-300">
              Not auto-verified
            </span>
            Dealer appraiser reviews after inspection
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {deskStatuses.slice(0, 4).map((s) => (
            <span
              key={s}
              className={cn(
                "rounded-md border px-2 py-1 font-mono text-[0.62rem]",
                s === "proof_needs_review"
                  ? "border-blue/30 bg-blue/15 text-blue-200"
                  : "border-white/10 bg-white/5 text-white/40",
              )}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "sell",
    label: "03 · Sell or trade",
    title: "Sell or trade",
    icon: HandCoins,
    panel: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[0.58rem] text-white/35 uppercase">
            Acquisition intent
          </div>
          <p className="mt-2 text-sm text-white/85">Replacement inventory on the lot</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Cash", "Replacement", "Locate"].map((t) => (
              <span
                key={t}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs",
                  t === "Replacement"
                    ? "border-blue/30 bg-blue/15 text-blue-200"
                    : "border-white/10 bg-white/5 text-white/50",
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
          <div className="flex items-center gap-2 font-mono text-[0.58rem] text-emerald-300 uppercase">
            <BadgeCheck className="size-3.5" />
            SMS verified · callable lead
          </div>
          <p className="mt-2 text-sm text-white/85">Net equity +$4,200 · payoff captured</p>
          <p className="mt-1 text-xs text-white/45">
            Structured payload routed to offer desk
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "prequal",
    label: "04 · Pre-approve",
    title: "Get pre-approved",
    icon: ShieldCheck,
    panel: (
      <div className="space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-mono text-[0.58rem] text-white/35 uppercase">
            Finance-ready handoff
          </div>
          <p className="mt-2 text-sm text-white/75">
            Soft-pull style approval path — with or without a trade
          </p>
        </div>
        <div className="rounded-xl border border-blue/25 bg-blue/10 p-4">
          <div className="font-mono text-[0.58rem] text-blue-300 uppercase">
            Estimated payment range
          </div>
          <p className="mt-2 font-mono text-xl font-semibold text-white">$412 – $489/mo</p>
          <p className="mt-1 text-xs text-white/45">72 mo · est. taxes & fees labeled</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["No score impact", "Trade optional", "Desk handoff"].map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[0.68rem] text-white/55"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export function TradeCopilotFlow() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-float">
      <div className="border-b border-white/10 px-5 py-3.5 sm:px-6">
        <div className="font-mono text-[0.58rem] tracking-[0.16em] text-blue-300 uppercase">
          Shopper acquisition flow
        </div>
        <p className="mt-1 text-sm text-white/55">
          Market range, match-or-beat proof, sell-or-trade intent, and pre-approval — verified
          contacts routed to your offer desk.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/8">
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
              <Icon className={cn("size-4", isActive ? "text-blue-300" : "text-white/35")} />
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
