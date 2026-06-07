import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { SalesSheetGate } from "@/components/sections/sales-sheet-gate";
import {
  SalesSheetCTA,
  SalesSheetCoveredStack,
  SalesSheetHero,
  SalesSheetIncludes,
  SalesSheetLeadRules,
  SalesSheetPricing,
  SalesSheetStackComparison,
} from "@/components/sections/sales-sheet-page";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sales Sheet — Independent Dealer Offer",
  description:
    "Exclusive June offer for select independent dealers: $2,495 BDC Copilot license, $0 monthly platform fee, transparent lead economics, and Audience Activator AI data included.",
  alternates: { canonical: "/sales-sheet" },
  robots: { index: false, follow: false },
  openGraph: {
    title: `Independent Dealer Sales Sheet · ${SITE_NAME}`,
    description:
      "$2,495 June license · $4,995 normal · $0/mo platform fee · 60-day 2× trackable leads guarantee.",
  },
};

export default function SalesSheetPage() {
  return (
    <SalesSheetGate>
      <SalesSheetHero />
      <SalesSheetPricing />
      <SalesSheetLeadRules />
      <SalesSheetIncludes />
      <SalesSheetCoveredStack />
      <SalesSheetStackComparison />
      <SalesSheetCTA />
      <CTA />
    </SalesSheetGate>
  );
}
