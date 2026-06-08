export const superPixelStats = [
  { value: "30–60%", label: "Typical visitor ID rate" },
  { value: "98%", label: "Visitors leave without a lead" },
  { value: "55%", label: "Hidden prime in lost traffic" },
  { value: "15 min", label: "Starts identifying after install" },
] as const;

export const superPixelHighIntentEvents = [
  { event: "test_drive_request", score: 95, label: "Test drive request" },
  { event: "finance_preapproval", score: 90, label: "Finance pre-approval" },
  { event: "form_submitted", score: 80, label: "Lead form submitted" },
  { event: "trade_in_tool", score: 70, label: "Trade-in tool used" },
  { event: "payment_calculator", score: 60, label: "Payment calculator" },
  { event: "vehicle_view", score: 30, label: "Vehicle detail view" },
] as const;

export const superPixelBehavioralSignals = [
  "Scroll depth & exit intent",
  "Repeat visits & session duration",
  "VIN, stock number & trim context",
  "Source attribution per event",
  "Cross-domain journey tracking",
  "Consent Mode v2 & privacy controls",
] as const;

export const superPixelAdPlatforms = [
  "Google Ads conversion actions",
  "Meta standard & custom events",
  "TikTok optimization events",
  "Programmatic / CDP endpoints",
  "Meta Custom Audiences",
  "Google Customer Match",
] as const;

export const superPixelIdentityFields = [
  "Name, email, phone & address",
  "HEM (hashed email) matching",
  "Credit band & income range",
  "Homeowner & household context",
  "Geo, DMA & ZIP clustering",
  "Prime, subprime & first-time buyer segments",
] as const;
