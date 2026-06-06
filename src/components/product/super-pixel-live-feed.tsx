"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedEvent = {
  source: string;
  sourceColor: string;
  action: string;
  vehicle: string;
  location: string;
  intent: "High" | "Medium" | "Rising";
  ago: string;
};

const events: FeedEvent[] = [
  {
    source: "AutoTrader",
    sourceColor: "bg-orange-500/20 text-orange-200",
    action: "Viewed VDP",
    vehicle: "2021 Ford F-150 XLT",
    location: "Seattle, WA",
    intent: "High",
    ago: "Just now",
  },
  {
    source: "Facebook",
    sourceColor: "bg-blue-500/20 text-blue-200",
    action: "Credit app start",
    vehicle: "2019 Honda Civic Sport",
    location: "Tacoma, WA",
    intent: "Rising",
    ago: "2s ago",
  },
  {
    source: "Google Ads",
    sourceColor: "bg-emerald-500/20 text-emerald-200",
    action: "Viewed VDP",
    vehicle: "2022 Toyota Camry SE",
    location: "Bellevue, WA",
    intent: "High",
    ago: "5s ago",
  },
  {
    source: "CarGurus",
    sourceColor: "bg-violet-500/20 text-violet-200",
    action: "Search inventory",
    vehicle: "SUVs under $20k",
    location: "Everett, WA",
    intent: "Medium",
    ago: "12s ago",
  },
  {
    source: "Direct",
    sourceColor: "bg-white/10 text-white/70",
    action: "Viewed VDP",
    vehicle: "2020 Chevy Silverado",
    location: "Spokane, WA",
    intent: "Rising",
    ago: "18s ago",
  },
];

const intentStyles = {
  High: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Rising: "border-blue-400/30 bg-blue-400/10 text-blue-300",
};

export function SuperPixelLiveFeed() {
  const [active, setActive] = useState(0);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % events.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [active]);

  const current = events[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-float">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <Activity className="size-4 text-blue-300" />
          <div>
            <div className="font-mono text-[0.58rem] tracking-[0.16em] text-blue-300 uppercase">
              Live event stream
            </div>
            <div className="text-sm font-medium text-white">LIVE_FEED_V2.0.1</div>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.62rem]",
            pulse
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-white/10 bg-white/5 text-white/45",
          )}
        >
          <span
            className={cn("size-1.5 rounded-full", pulse ? "bg-emerald-400" : "bg-white/30")}
            aria-hidden
          />
          Live
        </span>
      </div>

      {/* Flow strip */}
      <div className="grid grid-cols-3 border-b border-white/10 bg-navy-900/40">
        {[
          { label: "Source", value: current.source },
          { label: "Vehicle", value: current.vehicle },
          { label: "Intent", value: current.intent },
        ].map((step, i) => (
          <div
            key={step.label}
            className={cn(
              "relative px-4 py-4 sm:px-5",
              i < 2 && "border-r border-white/8",
            )}
          >
            <div className="font-mono text-[0.55rem] tracking-[0.14em] text-white/35 uppercase">
              {step.label}
            </div>
            <div className="mt-1 truncate text-sm font-medium text-white">{step.value}</div>
          </div>
        ))}
      </div>

      {/* Event list */}
      <div className="max-h-[340px] overflow-hidden p-3 sm:p-4">
        <ul className="flex flex-col gap-2">
          {events.map((event, i) => {
            const isActive = i === active;
            return (
              <li key={`${event.source}-${event.vehicle}`}>
                <div
                  className={cn(
                    "rounded-xl border px-4 py-3 transition-all duration-500",
                    isActive
                      ? "border-blue/35 bg-blue/10"
                      : "border-white/6 bg-white/[0.02] opacity-55",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[0.68rem] font-medium",
                          event.sourceColor,
                        )}
                      >
                        {event.source}
                      </span>
                      <span className="text-xs text-white/50">{event.action}</span>
                    </div>
                    <span className="font-mono text-[0.62rem] text-white/35">{event.ago}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white">{event.vehicle}</span>
                    <span
                      className={cn(
                        "rounded-md border px-2 py-0.5 text-[0.65rem] font-medium",
                        intentStyles[event.intent],
                      )}
                    >
                      {event.intent} intent
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/40">{event.location}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-white/10 bg-navy-900/40 px-5 py-3.5 sm:px-6">
        <p className="text-xs leading-relaxed text-white/45">
          Every event enriches the unified profile before a lead form is submitted — then routes
          into Audience Activator Intelligence and BDC Copilot.
        </p>
      </div>
    </div>
  );
}
