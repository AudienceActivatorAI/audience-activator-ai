import type { ComponentType } from "react";
import { BDCCopilotFlow } from "@/components/product/bdc-copilot-flow";
import { DealerOSModuleMap } from "@/components/product/dealeros-module-map";
import { MarketplaceWorkflowStrip } from "@/components/product/marketplace-workflow-strip";
import { SuperPixelLiveFeed } from "@/components/product/super-pixel-live-feed";
import { TradeCopilotFlow } from "@/components/product/trade-copilot-flow";

export type ProductVisualConfig = {
  eyebrow: string;
  title: string;
  description: string;
  Component: ComponentType;
};

export const productVisuals: Record<string, ProductVisualConfig> = {
  dealeros: {
    eyebrow: "Inside the command center",
    title: "Every module. One navigation.",
    description:
      "The same sidebar your team uses every day — Floor operations, AI Systems, and Ops intelligence in a single operating system. Click any module to explore.",
    Component: DealerOSModuleMap,
  },
  "super-pixel": {
    eyebrow: "Live event stream",
    title: "Source → vehicle → intent — in real time.",
    description:
      "Watch every customer journey as it happens. See where shoppers came from, what they viewed, and their intent level before they submit a lead.",
    Component: SuperPixelLiveFeed,
  },
  "bdc-copilot": {
    eyebrow: "Sales motion",
    title: "Traffic → execution → control.",
    description:
      "One operating system for the entire dealer sales motion — bring buyers in, let AI work the lead, managers stay in command. Click each stage to explore.",
    Component: BDCCopilotFlow,
  },
  "marketplace-copilot": {
    eyebrow: "Dealer Solo workflow",
    title: "Post → reply → book.",
    description:
      "The live workflow from posting the right inventory to AI-suggested replies to a booked next step — with the dealer in control of every message.",
    Component: MarketplaceWorkflowStrip,
  },
  "trade-copilot": {
    eyebrow: "Shopper acquisition flow",
    title: "Range → match-or-beat → sell → pre-approve.",
    description:
      "The live paths from a transparent market range to written-offer proof, verified acquisition intent, and finance-ready handoff — routed to your offer desk.",
    Component: TradeCopilotFlow,
  },
};
