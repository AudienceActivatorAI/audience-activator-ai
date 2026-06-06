import { Unlink, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const fragments = [
  { system: "CRM", record: "Lead #4471", note: "No source context" },
  { system: "Website", record: "Anonymous visitor", note: "Unidentified" },
  { system: "Phone", record: "Unknown caller", note: "Not matched" },
  { system: "Marketplace", record: "New inquiry", note: "Third-party owned" },
  { system: "Trade tool", record: "Guest estimate", note: "Lost on exit" },
  { system: "Web chat", record: "Visitor 88", note: "No history" },
];

export function DisconnectedSystems({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {fragments.map((f) => (
          <div
            key={f.system}
            className="rounded-xl border border-dashed border-line bg-white/70 p-3.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6rem] tracking-[0.14em] text-slate uppercase">
                {f.system}
              </span>
              <Unlink className="size-3.5 text-slate/60" />
            </div>
            <div className="mt-2 text-sm font-semibold text-navy/80">
              {f.record}
            </div>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[0.62rem] font-medium text-amber-700">
              <AlertTriangle className="size-3" />
              {f.note}
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-3 mx-auto w-fit rounded-full border border-line bg-white px-3 py-1.5 font-mono text-[0.62rem] tracking-wide text-slate shadow-card">
        1 shopper · 6 disconnected records
      </div>
    </div>
  );
}
