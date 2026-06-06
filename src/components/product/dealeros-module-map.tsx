"use client";

import { useState } from "react";
import {
  BarChart3,
  Bot,
  Calendar,
  ClipboardList,
  Download,
  LayoutDashboard,
  LineChart,
  Megaphone,
  MessageSquare,
  Phone,
  Settings,
  Upload,
  UserPlus,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  highlights: string[];
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: "Floor",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        headline: "BDC Command",
        description:
          "Manager command panel for the floor — live status, AI coverage, appointments to protect, and inventory pressure in one view.",
        highlights: ["Needs action", "Warm transfers", "Intent score", "Task queue"],
      },
      {
        id: "leads",
        label: "Leads",
        icon: Users,
        headline: "Lead pipeline",
        description:
          "Every shopper in one record — intent scores, enrichment, vehicle interest, and sequence status connected to the same profile.",
        highlights: ["Intent scoring", "Identity resolution", "Vehicle interest", "Consent status"],
      },
      {
        id: "sales-phone",
        label: "Sales Phone",
        icon: Phone,
        headline: "Sales Phone",
        description:
          "Configure numbers, concurrent call limits, attempt rules, retry spacing, and reactivation campaigns with full TCPA compliance.",
        highlights: ["Caller ID routing", "Attempt rules", "DNC honored", "Rex reactivation"],
      },
      {
        id: "add-lead",
        label: "Add Lead",
        icon: UserPlus,
        headline: "Add Lead",
        description: "Manually add a shopper and route them into the same workflows, sequences, and AI coverage as every other lead.",
        highlights: ["Manual intake", "Instant routing", "Profile created"],
      },
      {
        id: "upload",
        label: "Upload",
        icon: Upload,
        headline: "Bulk upload",
        description: "Import lead lists and CRM exports with column mapping, deduplication, and auto-enrollment into reactivation sequences.",
        highlights: ["CSV mapping", "Dedup", "Batch tracking"],
      },
      {
        id: "sequences",
        label: "Sequences",
        icon: Workflow,
        headline: "Sequences",
        description:
          "Multi-channel Call → SMS → Email workflows with consent-aware gating, enrollment management, and step-by-step execution logs.",
        highlights: ["Call · SMS · Email", "Consent gating", "Pause / resume"],
      },
      {
        id: "appointments",
        label: "Appointments",
        icon: Calendar,
        headline: "Appointments",
        description:
          "Full appointment lifecycle — booking, confirmation, reminders, no-show detection, and re-engagement — with prep tasks for reps.",
        highlights: ["Show rate tracking", "Auto reminders", "No-show rescue"],
      },
      {
        id: "tasks",
        label: "Tasks",
        icon: ClipboardList,
        headline: "Tasks",
        description:
          "Auto-generated rep tasks from AI workflows plus manual assignments — with overdue detection and manager accountability dashboards.",
        highlights: ["Auto-created", "Overdue alerts", "Completion outcomes"],
      },
    ],
  },
  {
    label: "AI Systems",
    items: [
      {
        id: "ai-systems",
        label: "AI Systems",
        icon: Bot,
        headline: "AI Systems",
        description:
          "Spin up and train voice, web, SMS, and email agents. Monitor department ops agents, readiness, and coverage across the entire sales motion.",
        highlights: ["Agent factory", "Dept ops agents", "Voice · Web · SMS · Email"],
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        id: "crm-import",
        label: "CRM Import",
        icon: Download,
        headline: "CRM Import",
        description:
          "Import aged and orphan CRM leads with flexible column mapping, deduplication, and auto-enrollment into reactivation sequences.",
        highlights: ["CSV upload", "Dedup", "Reactivation enroll"],
      },
      {
        id: "inventory",
        label: "Inventory",
        icon: BarChart3,
        headline: "Inventory",
        description:
          "Feed connections, sync status, aged-unit alerts, and inventory pressure signals tied to the manager command panel.",
        highlights: ["Feed health", "Sync status", "Aged alerts"],
      },
      {
        id: "market-intel",
        label: "Market Intel",
        icon: LineChart,
        headline: "Market Intel",
        description:
          "Build challenge shops from live inventory, find comparables with match confidence, and run price, trade, and finance scenarios.",
        highlights: ["Challenge shops", "Comparables", "Match confidence"],
      },
      {
        id: "ads-audit",
        label: "Ads Audit",
        icon: Megaphone,
        headline: "Ads Audit",
        description:
          "Recover wasted ad spend with severity-ranked findings across Google, Meta, AutoTrader, Cars.com, CarGurus, and programmatic.",
        highlights: ["Waste recovery", "Channel ROI", "Severity mix"],
      },
      {
        id: "activity",
        label: "Activity",
        icon: MessageSquare,
        headline: "Activity",
        description: "Full audit trail of calls, SMS, emails, agent actions, imports, and manager decisions across the rooftop.",
        highlights: ["Audit logs", "Call history", "Agent actions"],
      },
      {
        id: "exports",
        label: "Exports",
        icon: Download,
        headline: "Exports",
        description: "ADF/XML CRM exports, lead batches, and report downloads — generated from the same data your team operates on daily.",
        highlights: ["ADF/XML", "Lead batches", "Reports"],
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        headline: "Settings",
        description:
          "Dealer configuration, agent routing rules, calling profiles, feature flags, integrations, and multi-rooftop switching.",
        highlights: ["Routing rules", "Calling profiles", "Integrations"],
      },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);
const defaultItem = allItems.find((i) => i.id === "dashboard")!;

export function DealerOSModuleMap() {
  const [active, setActive] = useState<NavItem>(defaultItem);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-float">
      <div className="flex min-h-[520px] flex-col lg:flex-row">
        {/* Sidebar */}
        <nav
          className="shrink-0 border-b border-white/10 bg-navy-900/60 lg:w-56 lg:border-b-0 lg:border-r xl:w-60"
          aria-label="DealerOS module navigation"
        >
          <div className="border-b border-white/10 px-4 py-3.5">
            <div className="font-mono text-[0.58rem] tracking-[0.18em] text-blue-300 uppercase">
              BDC Copilot
            </div>
            <div className="mt-0.5 text-sm font-semibold text-white">Command Center</div>
          </div>

          <div className="max-h-[420px] overflow-y-auto p-2 lg:max-h-none">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-3 last:mb-0">
                <div className="px-2 py-1.5 font-mono text-[0.58rem] tracking-[0.16em] text-white/35 uppercase">
                  {group.label}
                </div>
                <ul className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active.id === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActive(item)}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[0.82rem] transition-colors",
                            isActive
                              ? "bg-blue/15 font-medium text-white"
                              : "text-white/55 hover:bg-white/5 hover:text-white/80",
                          )}
                        >
                          <span
                            className={cn(
                              "w-0.5 shrink-0 self-stretch rounded-full",
                              isActive ? "bg-blue" : "bg-transparent",
                            )}
                            aria-hidden
                          />
                          <Icon className="size-3.5 shrink-0 opacity-70" />
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Preview panel */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6">
            <div>
              <div className="font-mono text-[0.58rem] tracking-[0.16em] text-white/40 uppercase">
                Live module
              </div>
              <h3 className="mt-0.5 text-lg font-semibold text-white">{active.headline}</h3>
            </div>
            <span className="hidden rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[0.65rem] text-blue-300 sm:inline">
              ? Ask Copilot
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
            <p className="max-w-xl text-sm leading-relaxed text-white/60">{active.description}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {active.highlights.map((h) => (
                <div
                  key={h}
                  className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
                >
                  <div className="text-sm font-medium text-white/85">{h}</div>
                </div>
              ))}
            </div>

            {/* Contextual preview strip */}
            <div className="mt-auto rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <div className="font-mono text-[0.58rem] tracking-[0.14em] text-white/35 uppercase">
                Connected in DealerOS
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/45">
                {active.id === "dashboard"
                  ? "Every module in this nav shares the same shopper profiles, intent data, and task queue — nothing siloed."
                  : active.id === "ai-systems"
                    ? "Agents created here operate across Floor modules — leads, phone, sequences, and appointments."
                    : active.id === "market-intel" || active.id === "ads-audit"
                      ? "Ops intelligence feeds back into BDC Command and Dealer Data Copilot for manager-ready answers."
                      : "Data from this module is available to Ask Copilot, BDC Command, and every Floor workflow."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dealer Data Copilot bar */}
      <div className="border-t border-white/10 bg-navy-900/40 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-[0.58rem] tracking-[0.16em] text-blue-300 uppercase">
              Dealer Data Copilot
            </div>
            <p className="mt-1 text-sm text-white/55">
              Ask across Sales, CRM, inventory, comms, tasks, incentives, marketing, and DMS —
              with proof-backed answers and one-click task drafts.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {["Sales", "CRM", "IMS", "Comms", "Tasks", "Marketing", "DMS"].map((d) => (
              <span
                key={d}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[0.62rem] text-white/50"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
