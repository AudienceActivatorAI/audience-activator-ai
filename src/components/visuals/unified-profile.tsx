import {
  ArrowLeftRight,
  MessagesSquare,
  PhoneCall,
  Store,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const signals = [
  { icon: Globe, label: "Viewed F-150 XLT · 3rd visit", time: "now", hot: true },
  { icon: ArrowLeftRight, label: "Started trade estimate", time: "4m" },
  { icon: PhoneCall, label: "Inbound call · sales", time: "12m" },
  { icon: Store, label: "Marketplace inquiry matched", time: "1h" },
];

const channels = [
  { icon: Globe, label: "Web" },
  { icon: PhoneCall, label: "Phone" },
  { icon: MessagesSquare, label: "Chat" },
  { icon: Store, label: "Market" },
  { icon: ArrowLeftRight, label: "Trade" },
];

export function UnifiedProfile({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-line bg-white p-5 shadow-float",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-navy text-sm font-semibold text-white">
            JM
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-navy">
              Unified shopper profile
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[0.68rem] tracking-wide text-slate">
              <ShieldCheck className="size-3.5 text-blue" />
              Identity resolved · ID 8842-AA
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/8 px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-blue-600 uppercase">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-blue" />
          </span>
          Live
        </span>
      </div>

      {/* Intent score */}
      <div className="mt-5 rounded-xl border border-line bg-mist p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[0.62rem] tracking-[0.16em] text-slate uppercase">
              Intent score
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-navy">
                92
              </span>
              <span className="text-sm font-medium text-blue-600">
                High · in-market
              </span>
            </div>
          </div>
          <div className="text-right font-mono text-[0.62rem] text-slate">
            <div>3 sources</div>
            <div>2 rooftops</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/10">
          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-blue to-blue-400" />
        </div>
      </div>

      {/* Signals */}
      <div className="mt-5">
        <div className="mb-2 font-mono text-[0.62rem] tracking-[0.16em] text-slate uppercase">
          Live signals
        </div>
        <ul className="flex flex-col gap-1.5">
          {signals.map((s) => (
            <li
              key={s.label}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2",
                s.hot
                  ? "border-blue/20 bg-blue/5"
                  : "border-line bg-white",
              )}
            >
              <s.icon
                className={cn(
                  "size-4 shrink-0",
                  s.hot ? "text-blue-600" : "text-slate",
                )}
              />
              <span className="flex-1 truncate text-[0.82rem] text-navy">
                {s.label}
              </span>
              <span className="font-mono text-[0.62rem] text-slate">
                {s.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Channels + next action */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex items-center gap-1.5">
          {channels.map((c) => (
            <span
              key={c.label}
              title={c.label}
              className="grid size-7 place-items-center rounded-lg border border-line bg-white text-slate"
            >
              <c.icon className="size-3.5" />
            </span>
          ))}
        </div>
        <div className="text-right">
          <div className="font-mono text-[0.58rem] tracking-wide text-slate uppercase">
            Next best action
          </div>
          <div className="text-sm font-semibold text-navy">Book test drive</div>
        </div>
      </div>
    </div>
  );
}
