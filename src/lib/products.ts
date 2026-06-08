import {
  ArrowLeftRight,
  Bot,
  Brain,
  Disc3,
  Fingerprint,
  Landmark,
  LayoutDashboard,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react";

export type ProductLayer =
  | "Command Center"
  | "Intelligence"
  | "Engagement"
  | "Marketplace"
  | "Buyer & Finance"
  | "Retail Platform";

export const TREDFI_URL = "https://www.tredfi.com/";

export type Product = {
  slug: string;
  name: string;
  layer: ProductLayer;
  summary: string;
  icon: LucideIcon;
};

export const products: Product[] = [
  {
    slug: "dealeros",
    name: "DealerOS",
    layer: "Command Center",
    summary:
      "The full operating system — BDC Command, AI agent factory, Market Intel, Ads Audit, Sales Phone, and Dealer Data Copilot in one backend. Nothing siloed.",
    icon: LayoutDashboard,
  },
  {
    slug: "intelligence",
    name: "Audience Activator Intelligence",
    layer: "Intelligence",
    summary:
      "The intent data engine. Cleans, enriches, scores, and segments every signal — then activates it across ads, CRM, and products.",
    icon: Brain,
  },
  {
    slug: "super-pixel",
    name: "Super Pixel",
    layer: "Intelligence",
    summary:
      "Unified pixel tracking with 30–60% visitor ID, intent scoring, and ad platform sync — see who shoppers are before they submit a lead.",
    icon: Fingerprint,
  },
  {
    slug: "bdc-copilot",
    name: "BDC Copilot",
    layer: "Engagement",
    summary:
      "The complete AI BDC — voice, chat, and text. We make the cold calls; your team only talks to buyers who said yes.",
    icon: Bot,
  },
  {
    slug: "marketplace-copilot",
    name: "Marketplace Copilot",
    layer: "Marketplace",
    summary:
      "2-click autoposter, AI-suggested replies, and live market intelligence — turn Marketplace traffic into booked next steps.",
    icon: Store,
  },
  {
    slug: "trade-copilot",
    name: "Trade Copilot",
    layer: "Marketplace",
    summary:
      "Dealer-controlled trade, sell, match-or-beat, and pre-approval — with verified leads routed to your offer desk.",
    icon: ArrowLeftRight,
  },
  {
    slug: "buyer-center-ai",
    name: "Buyer Center AI",
    layer: "Buyer & Finance",
    summary:
      "An AI vehicle acquisition center — source, score, and buy private-party and marketplace inventory against your Buy Box.",
    icon: Users,
  },
  {
    slug: "we-finance-usa",
    name: "We Finance USA",
    layer: "Buyer & Finance",
    summary:
      "Short-term loans for down payments, negative equity, and stuck deals — white-labeled multi-lender matching with included shopper activation.",
    icon: Landmark,
  },
  {
    slug: "tredfi",
    name: "TredFi",
    layer: "Retail Platform",
    summary:
      "The tire & wheel retail platform — visualizer, consumer financing, and marketing tools that help merchants sell smarter, not harder.",
    icon: Disc3,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const productLayers: { layer: ProductLayer; blurb: string }[] = [
  { layer: "Command Center", blurb: "The backend everything runs through" },
  { layer: "Intelligence", blurb: "Resolve identity & score intent" },
  { layer: "Engagement", blurb: "Automate every conversation" },
  { layer: "Marketplace", blurb: "Own demand & trade activity" },
  { layer: "Buyer & Finance", blurb: "Move shoppers toward the deal" },
  { layer: "Retail Platform", blurb: "Tire, wheel & retail experience" },
];
