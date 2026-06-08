import { Unlink, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { problemFragments } from "@/lib/problem-content";

export function DisconnectedSystems({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-float sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-navy text-sm font-semibold text-white">
            MT
          </div>
          <div>
            <div className="text-sm font-semibold text-navy">Marcus T.</div>
            <div className="font-mono text-[0.65rem] tracking-wide text-slate">
              In-market · 2022 Explorer XLT · 4 touchpoints today
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/8 px-2.5 py-1 font-mono text-[0.6rem] tracking-wide text-amber-800 uppercase">
          <Unlink className="size-3" />
          Fragmented
        </span>
      </div>

      <div className="relative mt-5">
        <svg
          viewBox="0 0 400 320"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          <line
            x1="200"
            y1="36"
            x2="200"
            y2="300"
            stroke="#E5E7EB"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          {[
            [70, 88],
            [330, 88],
            [70, 168],
            [330, 168],
            [70, 248],
            [330, 248],
          ].map(([x, y], i) => (
            <line
              key={i}
              x1="200"
              y1="36"
              x2={x}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="3 5"
              opacity="0.9"
            />
          ))}
          <circle cx="200" cy="36" r="5" fill="#1F6FFF" opacity="0.35" />
        </svg>

        <ul className="relative grid gap-3">
          {problemFragments.map((fragment) => (
            <li key={fragment.system}>
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-dashed border-line/90 bg-mist/60 px-3.5 py-3 sm:px-4">
                <div className="grid size-9 place-items-center rounded-lg border border-line bg-white text-slate">
                  <fragment.icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[0.58rem] tracking-[0.14em] text-slate uppercase">
                      {fragment.system}
                    </span>
                    <span className="text-sm font-semibold text-navy">
                      {fragment.record}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate">
                    {fragment.detail}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-amber-500/10 px-2 py-1 text-[0.62rem] font-medium text-amber-800">
                  {fragment.leak}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-slate">
          <User className="size-4 text-navy/50" />
          <span>
            <strong className="font-semibold text-navy">1 shopper</strong> · 6
            disconnected records · no unified profile
          </span>
        </div>
        <div className="font-mono text-[0.62rem] tracking-wide text-slate">
          Opportunity leaks at every handoff
        </div>
      </div>
    </div>
  );
}
