export const intelligenceStats = [
  { value: "95%", label: "Match accuracy" },
  { value: "30–60%", label: "Typical visitor ID rate" },
  { value: "100+", label: "Enriched attributes" },
  { value: "60B+", label: "Weekly behavioral signals" },
] as const;

export const intelligenceDataSources = [
  {
    title: "Online opt-in sources",
    body: "Verified consumer consent from surveys, registrations, and preference centers — privacy-first, documented origin.",
  },
  {
    title: "Offline verified data",
    body: "Trusted records from public and private sources, including property, vehicle, and household data that dealers can activate.",
  },
  {
    title: "Pixel intelligence",
    body: "First-party data from your website and marketplace traffic, enriched with behavioral, demographic, and intent signals.",
  },
] as const;

export const intelligenceCapabilities = [
  {
    title: "Precision audience builder",
    body: "Access 60+ billion behavioral signals weekly to model hyper-targeted in-market shopper audiences for your rooftops.",
  },
  {
    title: "Visitor identity tracker",
    body: "Super Pixel and lightweight identity resolution typically match 30–60% of anonymous site visitors to verified profiles for re-engagement.",
  },
  {
    title: "Omnichannel activator",
    body: "Push audiences to Meta, Google, programmatic, CRM, and marketing automation with pre-built connectors — one login, deploy everywhere.",
  },
] as const;

export const intelligencePerformance = [
  {
    title: "Freshness",
    body: "Daily updates with real-time signal ingestion — refreshed for activation, not quarterly static lists.",
  },
  {
    title: "Depth",
    body: "Up to 100 enriched attributes per profile: demographics, geography, behaviors, and live intent signals.",
  },
  {
    title: "Visitor identity",
    body: "Identify anonymous shoppers on your site and tie them to ranked follow-up in BDC Copilot and DealerOS.",
  },
  {
    title: "Accuracy",
    body: "95% deterministic match accuracy across multiple verified sources — transparent, not a black box.",
  },
] as const;

export const intelligenceCompliance = [
  "SOC 2 tested platform",
  "CCPA & GDPR compliant processing",
  "Deterministic email & phone matching",
  "Opt-out built into every dataset",
] as const;
