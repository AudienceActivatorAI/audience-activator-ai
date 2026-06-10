export const SALES_ASSISTANT_URL = "https://salesassistant.tredfi.com/";
export const SALES_CONTACT_EMAIL = "james@tredfi.com";

/** June independent-dealer license (USD) — used in sales copy and structured data. */
export const JUNE_LICENSE_PRICE_USD = 2495;
export const STANDARD_LICENSE_PRICE_USD = 4995;

export const proofPoints = [
  { label: "June offer", value: "$2,495", note: "One-time software license" },
  { label: "Normal price", value: "$4,995", note: "Standard one-time license" },
  { label: "Guarantee", value: "60 days", note: "Double trackable leads" },
  { label: "Platform monthly", value: "$0/mo", note: "No TredFi software rental fee" },
] as const;

export const leadRules = [
  {
    title: "Your leads stay yours",
    body: "Website, CRM, DMS, and Super Pixel leads carry no closed-deal fee from TredFi.",
  },
  {
    title: "No sale, no fee",
    body: "On TredFi net-new leads — you only pay when a deal closes from our sourced demand.",
  },
  {
    title: "2-for-1 first 10 closes",
    body: "Closed-deal fee is 2-for-1 on your first 10 verified closes from TredFi net-new leads.",
  },
  {
    title: "Then $150 per close",
    body: "After the first 10, $150 per verified closed deal from TredFi net-new leads.",
  },
] as const;

export const platformIncludes = [
  "Audience Activator identity and intent data",
  "BDC Copilot voice, SMS, email, tasks, appointments, and manager controls",
  "Super Pixel and CRM/DMS reactivation",
  "Marketplace, finance, and inventory lead workflows",
  "June offer: 2-for-1 closed-deal fee on your first 10 deals from our leads, then $150 per closed deal from our leads",
  "No closed-deal fee on your website, CRM, or pixel leads",
] as const;

export const coveredStack = [
  {
    title: "Voice + SMS",
    body: "Phone numbers, minutes, message delivery, and calling/SMS provider costs covered for eligible territory slots.",
  },
  {
    title: "AI + transcription",
    body: "LLM, call intelligence, summaries, scoring, and agent runtime usage covered during the June offer slot.",
  },
  {
    title: "Email + deliverability",
    body: "Connected sending domains, inbox tools, templates, and delivery setup included in the launch stack.",
  },
  {
    title: "Audience Activator AI data",
    body: "Identity, enrichment, intent, Super Pixel, CRM reactivation, and net-new buyer data covered by TredFi.",
  },
  {
    title: "Inventory + CRM integrations",
    body: "Inventory feeds, CRM/DMS handoff, market data, and dealer-specific integration work covered at launch.",
  },
  {
    title: "Territory limit",
    body: "Covered provider and data costs are available only for one to two dealers in each territory.",
  },
] as const;

export const stackComparison = [
  {
    job: "Sales assistant / BDC workflow software",
    separate: "$2,495+",
    included: "Licensed in BDC Copilot",
  },
  {
    job: "Call tracking, attribution, and phone intelligence",
    separate: "$800–$3,000/mo",
    included: "Powered through Audience Activator AI",
  },
  {
    job: "AI call transcription, summaries, scoring, and coaching",
    separate: "Paid add-on or separate tool",
    included: "Covered in eligible territory slots",
  },
  {
    job: "Identity resolution, Super Pixel, and audience enrichment",
    separate: "$499+/mo",
    included: "Audience Activator AI data engine",
  },
  {
    job: "CRM / DMS reactivation",
    separate: "$499+/mo",
    included: "Licensed workflow",
  },
  {
    job: "Inventory leads and market intelligence",
    separate: "$1,500+/mo",
    included: "Inventory Intel, Sale Watch, Challenge Shops",
  },
  {
    job: "Subprime or special finance lead programs",
    separate: "$2,000+/mo minimums",
    included: "Controlled inside the dealer stack",
  },
  {
    job: "Automated post-call email, SMS, and CRM tasks",
    separate: "Basic alerts or paid add-ons",
    included: "Workflow automation in the license",
  },
] as const;

export const vendorStackIllustrative = [
  { feature: "BDC Copilot platform", typicalCost: "$4,995+" },
  { feature: "Identity resolution (Pixel)", typicalCost: "$499+" },
  { feature: "CRM / DMS reactivation", typicalCost: "$499+" },
  { feature: "Marketplace Copilot", detail: "Facebook Marketplace poster", typicalCost: "$399+" },
  {
    feature: "Subprime leads",
    detail: "Often ~$20/lead with minimums (e.g. 100/mo)",
    typicalCost: "$2,000+/mo",
  },
  { feature: "Inventory leads", detail: "Third-party subscription", typicalCost: "$1,500+/mo" },
] as const;
