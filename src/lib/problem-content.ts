import {
  Database,
  Globe,
  MessageSquare,
  Phone,
  Store,
  ArrowLeftRight,
  type LucideIcon,
} from "lucide-react";

export const problemStats = [
  { value: "98%", label: "Site visitors never become a lead" },
  { value: "6+", label: "Systems per shopper journey" },
  { value: "0", label: "Shared identity across tools" },
] as const;

export type ProblemFragment = {
  system: string;
  icon: LucideIcon;
  record: string;
  leak: string;
  detail: string;
};

export const problemFragments: ProblemFragment[] = [
  {
    system: "Website",
    icon: Globe,
    record: "Anonymous session",
    leak: "Unidentified",
    detail: "Viewed 2022 Explorer XLT · no form",
  },
  {
    system: "CRM",
    icon: Database,
    record: "Lead #4471",
    leak: "No source context",
    detail: "Duplicate · no vehicle tie-in",
  },
  {
    system: "Phone",
    icon: Phone,
    record: "Unknown caller",
    leak: "Not matched",
    detail: "Inbound call · no web history",
  },
  {
    system: "Marketplace",
    icon: Store,
    record: "New inquiry",
    leak: "Third-party owned",
    detail: "AutoTrader lead · no pixel match",
  },
  {
    system: "Trade tool",
    icon: ArrowLeftRight,
    record: "Guest estimate",
    leak: "Lost on exit",
    detail: "Trade range captured · no follow-up",
  },
  {
    system: "Web chat",
    icon: MessageSquare,
    record: "Visitor 88",
    leak: "No history",
    detail: "Chat started · prior visits invisible",
  },
];

export const problemPains = [
  {
    title: "Shoppers stay anonymous",
    body: "Across web, phone, chat, and marketplace, most in-market buyers are never identified — even after multiple visits.",
  },
  {
    title: "One buyer, six records",
    body: "The same shopper fragments into duplicates. No shared identity, no vehicle context, no intent score.",
  },
  {
    title: "You rent the relationship",
    body: "Third-party leads and marketplace inquiries put someone else between you and buyers already on your site.",
  },
  {
    title: "Reps work blind",
    body: "No intent history, no next best action — just a name, a number, and another cold call.",
  },
] as const;
