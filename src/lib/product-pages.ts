/**
 * Per-product marketing content.
 *
 * Content for matched products is sourced from the AudienceActivatorAI org repos
 * (READMEs / product docs). Design stays in this site — only logic + content is
 * ported. BDC Copilot combines the DealerBDC AI calling engine and the AI Sales
 * Assistant platform (voice, web chat, SMS/phone intelligence, sequences).
 */

export type ProductFeature = { title: string; body: string };
export type ProductFeatureGroup = {
  name: string;
  description?: string;
  features: ProductFeature[];
};
export type ProductStep = { title: string; body: string };
export type ProductMetric = { value: string; label: string };

export type ProductPage = {
  tagline: string;
  heroDescription: string;
  problem: string;
  /** Flat capability list. Used when `featureGroups` is not provided. */
  features?: ProductFeature[];
  /** Grouped capabilities (e.g. Traffic / Execution / Control). Takes precedence over `features`. */
  featureGroups?: ProductFeatureGroup[];
  howItWorks: ProductStep[];
  integrations: string[];
  metrics?: ProductMetric[];
  related?: string[];
  /** true = on-brand placeholder copy, repo not yet available */
  baseline?: boolean;
};

export const productPages: Record<string, ProductPage> = {
  intelligence: {
    tagline: "The intent data engine at the center of the platform",
    heroDescription:
      "Audience Activator Intelligence is the central processing system for high-intent consumer data — cleaning, normalizing, enriching, and scoring every signal, then exporting it to the platforms and products that act on it.",
    problem:
      "High-intent data arrives messy and fragmented — from pixels, forms, CRMs, and lender feeds — with no consistent schema, scoring, or way to activate it.",
    features: [
      {
        title: "Clean & normalize",
        body: "De-duplicate, validate emails and phones, and standardize every source into one unified intent record.",
      },
      {
        title: "Enrich & score",
        body: "Add geo intelligence, credit-band indicators, and purchase-intent scoring with product-level interest tags.",
      },
      {
        title: "Audience segmentation",
        body: "Cluster and tag audiences — prime, special finance, lease-to-own, and more — ready for routing.",
      },
      {
        title: "Activate everywhere",
        body: "Export hashed, platform-ready audiences to Meta, Google, Programmatic/CTV, your CRM, and Looker.",
      },
    ],
    howItWorks: [
      { title: "Ingest & clean", body: "Raw data from pixels, forms, CRM, and lender feeds is validated and de-duplicated." },
      { title: "Normalize & enrich", body: "Records become one schema, enriched with geo, credit band, and intent scores." },
      { title: "Segment & export", body: "Audiences are tagged and exported as hashed, platform-ready segments." },
    ],
    integrations: [
      "Super Pixel",
      "Meta Custom Audiences",
      "Google Customer Match",
      "Programmatic / CTV",
      "We Finance USA",
      "Your CRM",
    ],
    metrics: [
      { value: "Multi-platform", label: "Meta · Google · Programmatic · CRM" },
      { value: "SHA-256", label: "Hashed & minimized by design" },
    ],
    related: ["super-pixel", "we-finance-usa", "bdc-copilot"],
  },

  "super-pixel": {
    tagline: "See every customer journey in real time — before they submit a lead",
    heroDescription:
      "Super Pixel doesn't just count visitors — it tracks the entire path. See where shoppers came from, what vehicles they viewed, and their intent level before they ever fill out a form, then enrich that signal with credit, income, and asset data.",
    problem:
      "You spend thousands on AutoTrader, CarGurus, Google, and Facebook to drive high-intent traffic — but 98% of visitors leave anonymously without submitting a lead. Every click you paid for walks out the door unseen.",
    featureGroups: [
      {
        name: "Capture",
        description: "Live journey tracking across every traffic source.",
        features: [
          {
            title: "Real-time event stream",
            body: "Watch every customer journey as it happens — VDP views, credit app starts, inventory searches, and repeat visits in a live feed.",
          },
          {
            title: "Source attribution",
            body: "Know exactly where each shopper came from: AutoTrader, CarGurus, Google Ads, Facebook, or direct — tied to the vehicles they viewed.",
          },
          {
            title: "Vehicle interest tracking",
            body: "Capture the specific year, make, model, and trim a shopper researched — not just that they visited your site.",
          },
        ],
      },
      {
        name: "Enrichment",
        description: "Credit, income, and asset data that reveals who they are.",
        features: [
          {
            title: "Three customer segments",
            body: "Classify every visitor as subprime (D–F), first-time buyer (G–H), or prime (A–C) — including the hidden prime buyers in traffic you thought was all subprime.",
          },
          {
            title: "Income & asset intelligence",
            body: "Go beyond credit scores with household income, net worth, and financial stability data — so you can approve subprime deals with confidence.",
          },
          {
            title: "Geographic clustering",
            body: "See where your highest-intent prospects concentrate by city and DMA for smarter targeting and follow-up.",
          },
        ],
      },
      {
        name: "Activation",
        description: "Ranked signal that powers the rest of the platform.",
        features: [
          {
            title: "Consent-aware routing",
            body: "Enriched pixel audiences feed BDC Copilot with email-first, permission-aware follow-up — your traffic stays yours.",
          },
          {
            title: "Intent scoring",
            body: "Every event rolls into Audience Activator Intelligence for ranked, work-ready buyer signal.",
          },
        ],
      },
    ],
    howItWorks: [
      { title: "Capture", body: "The pixel tracks every visitor journey in real time — source, vehicles, and intent before a lead form is submitted." },
      { title: "Enrich", body: "Credit ratings, income ranges, net worth, and geography reveal who the shopper actually is." },
      { title: "Activate", body: "Ranked signal feeds BDC Copilot, Audience Activator Intelligence, and your team's next best action." },
    ],
    integrations: [
      "Audience Activator Intelligence",
      "BDC Copilot",
      "AutoTrader",
      "CarGurus",
      "Google Ads",
      "Facebook",
    ],
    metrics: [
      { value: "98%", label: "Visitors leave without a lead" },
      { value: "55%", label: "Hidden prime in \"lost\" traffic" },
      { value: "Real-time", label: "Live event stream" },
    ],
    related: ["intelligence", "bdc-copilot", "we-finance-usa"],
  },

  "bdc-copilot": {
    tagline: "One operating system for the entire dealer sales motion",
    heroDescription:
      "BDC Copilot runs your sales motion as one operating system — marketplace traffic, AI sales agents, live outbound calling, phone intelligence, and manager control in a single dealer workflow. It makes the cold calls itself, so your team only talks to buyers who said yes.",
    problem:
      "Other vendors identify visitors and dump hundreds of leads on your team. Reps still cold-call, still get rejected 80% of the time, and still burn out — while calls, chats, and follow-ups scatter across disconnected tools.",
    featureGroups: [
      {
        name: "Traffic",
        description: "Marketplace + web intent — bring the right buyers in.",
        features: [
          {
            title: "Marketplace traffic intelligence",
            body: "Identify reachable buyers across the top car-shopping destinations and turn anonymous research into inventory-matched, deduped, work-ready outreach.",
          },
          {
            title: "Super Pixel website intent",
            body: "Capture VDP views, repeat visits, finance clicks, and trade interest from anonymous shoppers — enriched and prioritized for consent-aware follow-up.",
          },
          {
            title: "CRM reactivation",
            body: "Re-engage dormant CRM leads in enriched reactivation waves, ranked by real buyer signal from Audience Activator AI.",
          },
        ],
      },
      {
        name: "Execution",
        description: "AI voice, SMS, email, and web agents — work every lead.",
        features: [
          {
            title: "AI sales agent pods",
            body: "A roster of specialist AI agents — speed-to-lead, activation, timing, finance, follow-up, and compliance — keeps the next best action ready beside every salesperson.",
          },
          {
            title: "Live outbound calling & warm transfers",
            body: "AI contacts fresh marketplace and ADF leads within minutes, qualifies them with voice AI (SignalWire + Claude + ElevenLabs), and warm-transfers ready buyers with full context.",
          },
          {
            title: "Web chat, SMS & sequences",
            body: "On-site chat and conversational 2-way AI SMS, plus consent-aware Call → SMS → Email sequences with tool use — booking, transferring, and honoring opt-outs.",
          },
          {
            title: "Agent factory",
            body: "Build unlimited campaign-specific agents for aged inventory, trade equity, subprime, lease, service-to-sales, conquest, no-show rescue, and objections — not a fixed vendor script.",
          },
        ],
      },
      {
        name: "Control",
        description: "Manager-ranked handoffs and approvals — stay in command.",
        features: [
          {
            title: "Phone intelligence",
            body: "Every call attributed to its campaign, transcribed, summarized, and scored — with real-time in-call alerts and coaching signals for managers.",
          },
          {
            title: "Manager command center",
            body: "Ranked handoffs, approval moments, inventory pressure, and appointment risk — operated from DealerOS on desktop or mobile.",
          },
        ],
      },
    ],
    howItWorks: [
      { title: "Identify", body: "Audience Activator AI resolves identity and scores intent from marketplace traffic and your Super Pixel." },
      { title: "Engage", body: "AI sales pods call, text, and chat — qualifying buyers and handling all of the rejection." },
      { title: "Hand off & control", body: "Warm transfers, appointments, and ranked handoffs reach reps; managers approve and coach from anywhere." },
    ],
    integrations: [
      "Super Pixel",
      "Audience Activator Intelligence",
      "SignalWire (voice & SMS)",
      "Your CRM / DMS",
      "ADF leads",
    ],
    metrics: [
      { value: "2–3×", label: "More trackable leads" },
      { value: "200B+", label: "Weekly buying signals" },
      { value: "60%", label: "Reached within 5 minutes" },
      { value: "Zero", label: "Cold calls for your team" },
    ],
    related: ["super-pixel", "intelligence", "marketplace-copilot"],
  },

  "marketplace-copilot": {
    tagline: "2-click autoposter, AI-suggested replies, and live market intelligence",
    heroDescription:
      "Marketplace Copilot helps dealers get the right inventory live faster, reply to buyers with sharper AI-suggested responses, and turn Marketplace conversations into booked next steps — with the dealer in control of every message.",
    problem:
      "Marketplace drives serious buyer volume, but posting is a chore nobody owns, replies are slow, and most conversations fizzle before they ever become an appointment.",
    features: [
      {
        title: "2-click autoposter",
        body: "Get more of the right vehicles live without making your team babysit Marketplace all day.",
      },
      {
        title: "Live market intelligence",
        body: "Local demand, supply, and vehicle momentum decide what to post first — higher-opportunity units get stronger placement and a tighter refresh cadence.",
      },
      {
        title: "AI-suggested replies (Dealer Solo)",
        body: "Copilot frames the next best response in seconds; the dealer reviews and sends it manually, keeping ownership of the conversation. Nothing is auto-sent.",
      },
      {
        title: "Book the next step",
        body: "Push every conversation toward a real outcome — a call, an appointment, a credit app, or a concrete next move.",
      },
      {
        title: "Safe by design",
        body: "Built around your real posting process and a dealer-controlled cadence — not risky, unofficial Marketplace automation.",
      },
      {
        title: "Wingman & rep mobile — coming soon",
        body: "Per-rep AI assistance, signed messaging, rep-level ownership, and a rep mobile workflow are on the roadmap, not part of the live offer today.",
      },
    ],
    howItWorks: [
      { title: "Post smarter", body: "Use market intelligence to choose the right vehicle and launch the posting run quickly." },
      { title: "Reply faster", body: "When a buyer messages, Copilot frames the next best response without auto-sending it." },
      { title: "Book the next step", body: "Move the conversation toward a call, appointment, credit app, or real next move." },
    ],
    integrations: [
      "Facebook Marketplace",
      "Your inventory feed",
      "Audience Activator Intelligence",
      "Your CRM",
    ],
    metrics: [
      { value: "2-click", label: "Autoposter to Marketplace" },
      { value: "~7 sec", label: "AI-suggested reply, dealer sends" },
    ],
    related: ["bdc-copilot", "trade-copilot", "buyer-center-ai"],
  },

  "trade-copilot": {
    tagline: "Dealer-controlled trade, sell, match-or-beat, and pre-approval",
    heroDescription:
      "Trade Copilot is a dealer-controlled acquisition workflow — embeddable on your site or VDP. It captures the customer, produces a transparent market-and-book range, gathers real written-offer proof for match-or-beat, and routes a clean, SMS-verified payload to your offer desk and CRM.",
    problem:
      "Most trade tools spit out a guest estimate and lose the shopper. Competitor-offer widgets auto-claim verification you can't stand behind. And acquisition, equity, replacement intent, and finance readiness scatter across disconnected forms.",
    featureGroups: [
      {
        name: "Shopper flows",
        description: "Three paths into acquisition — range, match-or-beat, and pre-approval.",
        features: [
          {
            title: "Market range widget",
            body: "Customer-facing trade range powered by live market data plus dealer-selected valuation books — KBB, Black Book, and market blend weights you control.",
          },
          {
            title: "Match-or-beat intake",
            body: "Collects CarMax, Carvana, KBB Instant Offer, or other written-offer proof for manual appraiser review. No automatic verification claim — the dealer confirms after inspection.",
          },
          {
            title: "Proof checklist",
            body: "Requires offer amount, expiration, vehicle identity, reference when visible, mileage, and screenshot, PDF, or email image before the offer desk sees it.",
          },
          {
            title: "Pre-approval path",
            body: "No-trade and post-trade shoppers can move into a soft-pull style approval and payment-range flow — finance-ready handoff with or without a trade.",
          },
        ],
      },
      {
        name: "Offer desk",
        description: "Structured review for appraisers — proof, inspection, and response.",
        features: [
          {
            title: "Dealer offer desk",
            body: "Creates a structured review payload with statuses for proof review, expired offers, vehicle mismatches, inspection, and dealer response — from submitted through dealer offer ready.",
          },
          {
            title: "Desk market intel",
            body: "Shows supply, demand, days-to-sell, comparable retail listings, recon reserve, and margin holdback in desk mode — while the shopper view stays simple.",
          },
          {
            title: "SMS-verified leads",
            body: "Confirms the shopper's phone before a lead becomes callable and before payloads are sent to the desk. Verification is re-checked server-side.",
          },
        ],
      },
      {
        name: "Platform",
        description: "Server-side config, embeddable widget, and downstream handoff.",
        features: [
          {
            title: "Dealer controls",
            body: "Dealer setup manages brand color, theme, valuation weights, trade bonuses, recon, margin, taxes, fees, and embed code — all persisted server-side.",
          },
          {
            title: "CRM and Buyer Center handoff",
            body: "Packages shopper, vehicle, appraisal, equity, replacement intent, and offer-review details into a structured JSON payload for CRM and Buyer Center follow-up.",
          },
          {
            title: "Sell or trade routing",
            body: "Acquisition flow asks whether the customer wants cash, replacement inventory, or a locate request — so the desk knows the outcome they're working toward.",
          },
        ],
      },
    ],
    howItWorks: [
      { title: "See market range", body: "Shopper gets a transparent low-to-high range from live market data and dealer-selected books." },
      { title: "Upload instant offer", body: "Shopper can ask the dealer to match or beat a written CarMax, Carvana, or KBB Instant Offer — with proof attached." },
      { title: "Sell or trade", body: "Acquisition flow captures cash, replacement, or locate intent; SMS verification locks in a callable contact." },
      { title: "Get pre-approved", body: "Customer can move into a payment and approval path with or without a trade — routed as a structured payload to your desk." },
    ],
    integrations: [
      "Marketcheck",
      "KBB",
      "Black Book",
      "MaxOffer / KBB ICO",
      "Twilio / Telnyx (SMS verify)",
      "Your CRM",
      "Buyer Center AI",
    ],
    metrics: [
      { value: "3 paths", label: "Range · Match-or-beat · Pre-approve" },
      { value: "Verified", label: "OTP-checked before the desk" },
      { value: "Blended", label: "Market · KBB · Black Book" },
    ],
    related: ["buyer-center-ai", "marketplace-copilot", "we-finance-usa"],
  },

  "buyer-center-ai": {
    tagline: "An AI vehicle acquisition center",
    heroDescription:
      "Buyer Center AI helps dealers source and buy inventory directly — pulling private-party and marketplace listings, scoring them against your Buy Box, and running outreach to compliant outcomes.",
    problem:
      "Acquiring used inventory from private sellers and marketplaces is manual, scattered across platforms, and hard to do at scale or compliantly.",
    features: [
      {
        title: "Multi-source lead feed",
        body: "Pull listings from Facebook Marketplace, Craigslist, Cars.com & AutoTrader private, OfferUp, and referrals.",
      },
      {
        title: "Buy Box scoring",
        body: "Score and rank every listing against your acquisition criteria, with duplicate detection built in.",
      },
      {
        title: "Outreach to outcome",
        body: "Draft outreach and move sellers through a pipeline from contacted to negotiation to purchased.",
      },
      {
        title: "Compliance review",
        body: "A dedicated review queue separates licensed feeds, dealer intake, and manual marketplace sources.",
      },
    ],
    howItWorks: [
      { title: "Source", body: "Import and connect listings from marketplaces, feeds, and referrals." },
      { title: "Score", body: "Listings are scored against your Buy Box and de-duplicated." },
      { title: "Acquire", body: "Run outreach, review for compliance, and track sellers to purchase." },
    ],
    integrations: [
      "Trade Copilot",
      "Marketplace Copilot",
      "Audience Activator Intelligence",
      "CSV / connector imports",
    ],
    metrics: [
      { value: "6+ sources", label: "Private & marketplace inventory" },
      { value: "Scored", label: "Every listing against your Buy Box" },
    ],
    related: ["trade-copilot", "marketplace-copilot", "dealeros"],
  },

  "we-finance-usa": {
    tagline: "Short-term loans that close the gaps on your deals",
    heroDescription:
      "We Finance USA gives customers a fast path to cash for down payments, negative equity, deductibles, and other stuck-deal scenarios — through your white-labeled flow and multi-lender matching. High-intent shopper activation from Audience Activator is included to keep qualified traffic coming in.",
    problem:
      "Most stores lose buyers over cash timing, not willingness to pay. Deals die on down payment shortfalls, upside-down trades, thin credit files, and service deductibles — and there's no sanctioned way to cover the gap before the customer walks.",
    featureGroups: [
      {
        name: "Close the gap",
        description: "Solve the reasons deals die — before you lose the customer.",
        features: [
          {
            title: "Down payment & drive-off cash",
            body: "Close buyers who are approved or close to it but short on cash today — turn \"come back next week\" into a funded deal while they're still on your lot.",
          },
          {
            title: "Negative equity & trade payoffs",
            body: "Bridge upside-down trades when rolling the full balance isn't workable. Give the customer a realistic path into the next vehicle.",
          },
          {
            title: "After credit bumps & thin files",
            body: "Recover deals that stall after the first lender pass — ITIN, self-employed, prior repo, or bankruptcy scenarios where a little liquidity changes the whole picture.",
          },
          {
            title: "Service, collision & deductibles",
            body: "Keep ROs and body jobs moving when the customer can't cover the deductible or the full repair today.",
          },
        ],
      },
      {
        name: "Platform",
        description: "White-labeled borrower flows, lender matching, and included demand.",
        features: [
          {
            title: "Short-term loan + finance center",
            body: "The borrower experience, disclosures, and multi-lender matching — white-labeled for your store so short-term money and special finance live in one place.",
          },
          {
            title: "Demand & qualification layer",
            body: "High-intent shopper activation (Audience Activator), CRM/DMS reactivation, and AI-assisted pre-qualification so your team spends time on closable files.",
          },
          {
            title: "No per-lead fees",
            body: "Unlike sub-prime lead providers charging $20–50 per lead every month — we only participate when your team closes and funds a deal.",
          },
        ],
      },
      {
        name: "Borrower experience",
        description: "Customers request funds on their phone in minutes.",
        features: [
          {
            title: "Mobile-first, amount-first",
            body: "A clean flow from $100–$35,000 — amount-first so the customer knows what they're asking for, built to finish on a small screen.",
          },
          {
            title: "One application, multiple lenders",
            body: "Multiple lenders compete for the file so you get a decision quickly and can move on to delivery paperwork.",
          },
          {
            title: "Decline recovery",
            body: "A second-chance path after the first auto lender says no — without sending them away.",
          },
        ],
      },
    ],
    howItWorks: [
      { title: "Spot the gap", body: "Down payment short, payoff too high, deductible, or a decline a small unsecured line could fix — route them into your branded short-term path." },
      { title: "Fast match", body: "Customers complete a simple request; multiple lenders compete for the file for a quick decision." },
      { title: "Structure & close", body: "Funds go where they need to for the deal; your F&I finishes the car deal while activation keeps feeding in-market shoppers." },
    ],
    integrations: [
      "Audience Activator Intelligence",
      "Super Pixel",
      "BDC Copilot",
      "Your CRM / DMS",
      "Multi-lender network",
    ],
    metrics: [
      { value: "$100–$35k", label: "Loan amounts" },
      { value: "$0", label: "Per-lead fees" },
      { value: "25+ yrs", label: "Automotive finance" },
    ],
    related: ["intelligence", "super-pixel", "bdc-copilot"],
  },

  dealeros: {
    tagline: "The operating system your dealership actually runs on",
    heroDescription:
      "DealerOS is the unified backend behind the entire platform — the same command center where managers run the floor, spin up AI agents, audit ad spend, challenge competitor pricing, and ask questions across every data source. BDC Copilot, Marketplace Copilot, Super Pixel, We Finance USA, and every other capability live here. Nothing siloed.",
    problem:
      "Most dealerships juggle a CRM for leads, a separate dialer for calls, another tool for marketplace, another for marketing ROI, and spreadsheets for inventory — with no shared context and no single place to see what needs attention right now.",
    featureGroups: [
      {
        name: "Floor",
        description: "Run the sales floor from one manager command panel.",
        features: [
          {
            title: "BDC Command dashboard",
            body: "Live floor status at a glance — needs action, appointments to protect, AI coverage, inventory pressure, contact rate, warm transfers, intent scores, and overdue tasks in one view.",
          },
          {
            title: "Leads, sequences & appointments",
            body: "Full lead pipeline with add/upload, multi-channel sequences, appointment lifecycle, and rep task queues — all connected to the same shopper record.",
          },
          {
            title: "Sales Phone",
            body: "Configure phone numbers, concurrent call limits, attempt rules, retry spacing, DNC compliance, and reactivation campaigns like Rex — with voice agent routing built in.",
          },
        ],
      },
      {
        name: "AI Systems",
        description: "Spin up, train, and monitor agents across every channel.",
        features: [
          {
            title: "Agent factory",
            body: "Create and train voice, web, SMS, and email agents for any sales tactic — with readiness checks, fallback routing, and per-dealership configuration.",
          },
          {
            title: "Department Ops agents",
            body: "Pre-built monitoring agents for Marketing Ops (ads audit, ROI, compliance), Inventory Ops (stale feeds, photos, pricing), CRM Ops (imports, duplicates), Finance Compliance, and Sales Floor Ops.",
          },
          {
            title: "Four-channel coverage",
            body: "One agent roster covers inbound/outbound phone, website chat, SMS replies, and email follow-up — managed and audited from a single AI Systems panel.",
          },
        ],
      },
      {
        name: "Operations",
        description: "Market intelligence, marketing audit, and data ops in one nav.",
        features: [
          {
            title: "Market Intel",
            body: "Build challenge shops from live inventory, find comparables with match confidence, DOM, distance, and price — then run price, trade, and finance scenarios against competitors.",
          },
          {
            title: "Ads Audit",
            body: "Recover wasted ad spend with severity-ranked findings across Google, Meta, AutoTrader, Cars.com, CarGurus, and programmatic — with listing-channel ROI and attribution-backed recommendations.",
          },
          {
            title: "CRM import, inventory & exports",
            body: "CRM lead ingestion, inventory feed management, activity logs, ADF/XML exports, and dealer settings — all in the same backend your floor team already uses.",
          },
        ],
      },
      {
        name: "Dealer Data Copilot",
        description: "Ask questions across every data source — get proof-backed answers.",
        features: [
          {
            title: "Natural-language queries",
            body: "Ask what your sales manager should focus on, which aged vehicles need attention, or which leads haven't been followed up — and get prioritized, actionable answers.",
          },
          {
            title: "Eight connected data domains",
            body: "Queries pull from Sales, CRM, inventory (IMS), Comms, Tasks, Incentives, Marketing, and DMS health — not one siloed report at a time.",
          },
          {
            title: "Proof points & task drafts",
            body: "Every answer ships with confidence scores, cited evidence, suggested next moves, and one-click task drafts your team can assign immediately.",
          },
        ],
      },
    ],
    howItWorks: [
      { title: "Connect", body: "Every product, CRM, DMS, inventory feed, and ad platform plugs into DealerOS — one identity graph, one intelligence layer, one backend." },
      { title: "Command", body: "Managers open BDC Command for live floor status, spin up AI agents, run market intel, and audit ad spend — all from the same login." },
      { title: "Act", body: "Ask Dealer Data Copilot a question, approve a ranked handoff, or launch a reactivation campaign — without leaving the operating system." },
    ],
    integrations: [
      "BDC Copilot",
      "Marketplace Copilot",
      "Super Pixel",
      "We Finance USA",
      "Google Ads · Meta · AutoTrader",
      "Your CRM / DMS",
    ],
    metrics: [
      { value: "15+", label: "Modules in one nav" },
      { value: "4", label: "Agent channels" },
      { value: "8", label: "Data domains for Ask Copilot" },
    ],
    related: ["bdc-copilot", "super-pixel", "intelligence", "marketplace-copilot", "we-finance-usa"],
  },

  tredfi: {
    tagline: "Sell smarter, not harder",
    heroDescription:
      "TredFi is the retail platform for tire & wheel merchants — combining an interactive vehicle visualizer, flexible consumer financing, and data-driven marketing so stores close more customers without letting credit stand in the way.",
    problem:
      "Tire and wheel retailers struggle to help customers visualize fitment, offer flexible financing at the counter, and market with intent data they can actually trust — leaving sales on the table.",
    featureGroups: [
      {
        name: "Visualizer",
        description: "Help customers see the upgrade before they buy.",
        features: [
          {
            title: "TredFi Visualizer",
            body: "Let shoppers preview wheels and tires on their vehicle — choosing fitment and size with confidence before they commit.",
          },
          {
            title: "Interactive fitment",
            body: "Reduce returns and hesitation by showing exactly how the package looks on their car, truck, or SUV.",
          },
        ],
      },
      {
        name: "Financing",
        description: "One application, multiple offers — full credit spectrum.",
        features: [
          {
            title: "Flexible consumer financing",
            body: "Hassle-free financing with competitive rates and payment options — so more customers get approved and more deals close.",
          },
          {
            title: "One app, multiple lenders",
            body: "A single secure application routes to multiple lender offers — never let credit stand in the way of the sale.",
          },
          {
            title: "Lending-as-a-Service",
            body: "Embed financing directly into the retail experience with a streamlined approval process built for the counter and the cart.",
          },
        ],
      },
      {
        name: "Growth",
        description: "Marketing, content, and intent data for merchants.",
        features: [
          {
            title: "Custom marketing strategy",
            body: "Targeted campaigns, data-driven budget optimization, and merchant-focused growth programs built for tire & wheel retail.",
          },
          {
            title: "Intent data you can trust",
            body: "Education and activation around high-intent shopper data — know where your traffic comes from and how to close it.",
          },
          {
            title: "Creative & web services",
            body: "Video production, website development, and partner-ready content to help merchants compete at enterprise level.",
          },
        ],
      },
    ],
    howItWorks: [
      { title: "Visualize", body: "Shoppers use the TredFi Visualizer to preview wheels and tires on their vehicle and lock in fitment." },
      { title: "Finance", body: "One application routes to multiple lender offers — flexible payments that match the customer's situation." },
      { title: "Grow", body: "Marketing, intent data, and partner services drive more traffic, more approvals, and more sales." },
    ],
    integrations: [
      "Audience Activator Intelligence",
      "We Finance USA",
      "Lender network",
      "Merchant POS & ecommerce",
    ],
    metrics: [
      { value: "1 app", label: "Multiple lender offers" },
      { value: "Full spectrum", label: "Credit profiles served" },
      { value: "Visualizer", label: "Fitment before purchase" },
    ],
    related: ["we-finance-usa", "intelligence", "super-pixel"],
  },
};

export function getProductPage(slug: string): ProductPage | undefined {
  return productPages[slug];
}
