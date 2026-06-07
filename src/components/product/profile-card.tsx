import type { LucideIcon } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProfileSignal = {
  icon: LucideIcon;
  label: string;
  time: string;
  hot?: boolean;
};

export type ProfileChannel = {
  icon: LucideIcon;
  label: string;
};

export type ProfileCardData = {
  initials: string;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  metricStatus: string;
  metricPercent: number;
  meta?: [string, string];
  signals: ProfileSignal[];
  channels: ProfileChannel[];
  nextAction: string;
};

export function ProfileCard({
  data,
  className,
}: {
  data: ProfileCardData;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-line bg-white p-5 shadow-float",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-navy text-sm font-semibold text-white">
            {data.initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-navy">{data.title}</div>
            <div className="flex items-center gap-1.5 font-mono text-[0.68rem] tracking-wide text-slate">
              <ShieldCheck className="size-3.5 text-blue" />
              {data.subtitle}
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

      <div className="mt-5 rounded-xl border border-line bg-mist p-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[0.62rem] tracking-[0.16em] text-slate uppercase">
              {data.metricLabel}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-navy">
                {data.metricValue}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {data.metricStatus}
              </span>
            </div>
          </div>
          {data.meta ? (
            <div className="text-right font-mono text-[0.62rem] text-slate">
              <div>{data.meta[0]}</div>
              <div>{data.meta[1]}</div>
            </div>
          ) : null}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue to-blue-400"
            style={{ width: `${data.metricPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 font-mono text-[0.62rem] tracking-[0.16em] text-slate uppercase">
          Live signals
        </div>
        <ul className="flex flex-col gap-1.5">
          {data.signals.map((s) => (
            <li
              key={s.label}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2",
                s.hot ? "border-blue/20 bg-blue/5" : "border-line bg-white",
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
              <span className="font-mono text-[0.62rem] text-slate">{s.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex items-center gap-1.5">
          {data.channels.map((c) => (
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
          <div className="text-sm font-semibold text-navy">{data.nextAction}</div>
        </div>
      </div>
    </div>
  );
}
