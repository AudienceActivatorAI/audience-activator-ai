import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Layer = {
  index: string;
  title: string;
  subtitle: string;
  chips: string[];
  accent?: boolean;
};

const layers: Layer[] = [
  {
    index: "01",
    title: "Sources & Signals",
    subtitle: "Every touchpoint, captured",
    chips: [
      "Website",
      "Phone",
      "Chat",
      "Marketplace",
      "Trade",
      "CRM",
      "Inventory",
    ],
  },
  {
    index: "02",
    title: "Identity & Intelligence",
    subtitle: "Resolve · score · decide",
    chips: [
      "Super Pixel",
      "Audience Activator Intelligence",
      "Intent scoring",
      "Unified profile",
    ],
  },
  {
    index: "03",
    title: "DealerOS · Command Center",
    subtitle: "The unified backend — every capability, one operating system",
    accent: true,
    chips: [
      "BDC Command",
      "AI Systems",
      "Market Intel",
      "Ads Audit",
      "Sales Phone",
      "Dealer Data Copilot",
      "Sequences & tasks",
      "CRM · Inventory · Exports",
    ],
  },
];

function FlowDivider() {
  return (
    <div className="flex justify-center py-2" aria-hidden>
      <div className="flex flex-col items-center text-blue-400/70">
        <span className="h-4 w-px bg-gradient-to-b from-transparent to-blue-400/50" />
        <ChevronDown className="size-3.5" />
      </div>
    </div>
  );
}

export function ArchitectureDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      {layers.map((layer, i) => (
        <div key={layer.index}>
          <div
            className={cn(
              "rounded-2xl border p-5 transition-colors sm:p-6",
              layer.accent
                ? "border-blue/35 bg-blue/8"
                : "border-white/10 bg-white/[0.03]",
            )}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="sm:w-56 sm:shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.7rem] tracking-[0.16em] text-blue-300">
                    {layer.index}
                  </span>
                  <span className="h-px w-5 bg-white/15" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {layer.title}
                </h3>
                <p className="mt-0.5 text-[0.8rem] text-white/50">
                  {layer.subtitle}
                </p>
              </div>
              <div className="flex flex-1 flex-wrap gap-2">
                {layer.chips.map((chip) => (
                  <span
                    key={chip}
                    className={cn(
                      "rounded-lg border px-2.5 py-1.5 text-[0.78rem] font-medium",
                      layer.accent
                        ? "border-blue/30 bg-navy-900/40 text-white"
                        : "border-white/10 bg-white/[0.04] text-white/75",
                    )}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {i < layers.length - 1 ? <FlowDivider /> : null}
        </div>
      ))}
    </div>
  );
}
