export type FaqItem = { question: string; answer: string };

export const platformFaqs: FaqItem[] = [
  {
    question: "What is Audience Activator AI?",
    answer:
      "Audience Activator AI is dealer intelligence infrastructure — a unified platform that connects shopper identity, intent scoring, AI engagement, marketplace activity, trade workflows, and dealership operations. Everything runs through DealerOS, the command center behind the stack.",
  },
  {
    question: "Is this one software license or separate products?",
    answer:
      "One software license unlocks the full platform — DealerOS, BDC Copilot, Super Pixel, Marketplace Copilot, Trade Copilot, Buyer Center AI, We Finance USA, and every connected capability. You are not buying a separate contract for each tool.",
  },
  {
    question: "Do I need Audience Activator data, or can I use my own?",
    answer:
      "You bring your own data to power the platform — CRM, DMS, website traffic, marketplace feeds, and operational records. Audience Activator intent and identity data is offered separately when you want enriched signal layered on top of your first-party sources.",
  },
  {
    question: "Who is Audience Activator AI built for?",
    answer:
      "The platform is built for automotive dealers and dealer groups that want to own their shopper intelligence, unify engagement across channels, and run operations from one command center instead of a stack of disconnected point tools.",
  },
  {
    question: "How does Audience Activator AI connect to my CRM?",
    answer:
      "Products across the platform export structured leads, shopper context, and intent signal into your CRM workflow — including ADF/XML handoffs, verified contact capture, and desk-ready payloads from trade and marketplace flows.",
  },
  {
    question: "How do I see the platform?",
    answer:
      "Request a demo or book a call from the homepage. We walk through your store's use case — traffic sources, BDC motion, marketplace, trade, and command-center operations — on a live walkthrough.",
  },
];

export const productFaqs: Record<string, FaqItem[]> = {
  dealeros: [
    {
      question: "What is DealerOS?",
      answer:
        "DealerOS is the unified command center behind Audience Activator AI — the backend where managers run the floor, configure AI agents, audit ad spend, review market intel, and operate BDC, sequences, and phone workflows from one place.",
    },
    {
      question: "Does DealerOS replace my CRM?",
      answer:
        "No. DealerOS is the intelligence and operations layer that sits above your CRM and DMS — connecting leads, intent, AI coverage, appointments, and manager workflows into one operating view while your CRM remains the system of record.",
    },
    {
      question: "Can multi-rooftop groups use one DealerOS?",
      answer:
        "Yes. DealerOS is designed for unified operations across rooftops — shared shopper context, command dashboards, and governance while each store keeps its own workflows and inventory pressure visible.",
    },
  ],
  intelligence: [
    {
      question: "What does Audience Activator Intelligence do?",
      answer:
        "It is the intent data engine at the center of the platform — cleaning, normalizing, enriching, and scoring every signal, then exporting platform-ready audiences to Meta, Google, programmatic, CRM, and downstream products.",
    },
    {
      question: "What data sources does it ingest?",
      answer:
        "Pixels, forms, CRM records, lender feeds, marketplace signals, and product-level events — normalized into one schema with geo, credit-band, and intent scoring before activation.",
    },
    {
      question: "How is intent scoring used?",
      answer:
        "Intent scores rank shoppers and audiences for routing into BDC Copilot, ads, CRM reactivation, and manager workflows — explainable signal, not a black-box lead dump.",
    },
  ],
  "super-pixel": [
    {
      question: "What does Super Pixel track?",
      answer:
        "Super Pixel tracks the full shopper journey in real time — source attribution, vehicle interest (year, make, model, trim), repeat visits, and high-intent actions before a lead form is submitted.",
    },
    {
      question: "How is Super Pixel different from standard analytics?",
      answer:
        "Standard analytics counts traffic. Super Pixel resolves identity and enriches visitors with credit band, income, and asset context so your team knows who is on the lot digitally — not just that someone visited.",
    },
    {
      question: "Does Super Pixel feed other products?",
      answer:
        "Yes. Super Pixel is a primary signal source for Audience Activator Intelligence and BDC Copilot — consent-aware, ranked follow-up based on live journey and intent.",
    },
  ],
  "bdc-copilot": [
    {
      question: "What is BDC Copilot?",
      answer:
        "BDC Copilot is one operating system for the dealer sales motion — marketplace and web traffic in, AI voice and SMS execution, phone intelligence, and manager control in a single workflow. AI makes the cold calls; your team gets warm handoffs.",
    },
    {
      question: "Does BDC Copilot auto-send texts and emails?",
      answer:
        "Sequences are consent-aware with opt-out handling. AI suggests and executes outreach per your configured rules — voice, SMS, email, and web chat — with manager visibility and warm transfers when a buyer is ready.",
    },
    {
      question: "Can we use our own phone numbers?",
      answer:
        "Yes. Sales Phone configuration supports your numbers, concurrent limits, retry rules, DNC compliance, and voice agent routing — operated from DealerOS.",
    },
  ],
  "marketplace-copilot": [
    {
      question: "What is Marketplace Copilot?",
      answer:
        "Marketplace Copilot helps dealers post the right inventory to Facebook Marketplace, reply faster with AI-suggested responses, and book the next step — with the dealer in control of every message sent.",
    },
    {
      question: "Does Marketplace Copilot auto-send replies?",
      answer:
        "No. Copilot frames the next best response in seconds; the dealer reviews and sends it manually. Nothing is auto-sent without dealer action.",
    },
    {
      question: "How does market intelligence affect posting?",
      answer:
        "Local demand, supply, days-on-market, and vehicle momentum inform which units get posted first and refreshed more often — higher-opportunity inventory gets stronger placement.",
    },
  ],
  "trade-copilot": [
    {
      question: "What is Trade Copilot?",
      answer:
        "Trade Copilot is a dealer-controlled acquisition workflow — embeddable trade range, match-or-beat intake, sell-or-trade routing, and pre-approval paths with SMS-verified leads sent to your offer desk and CRM.",
    },
    {
      question: "Can shoppers upload a CarMax or KBB offer?",
      answer:
        "Yes. Match-or-beat intake collects written-offer proof for manual appraiser review. The platform never auto-labels a competitor offer as verified — the dealer confirms after inspection.",
    },
    {
      question: "Is Trade Copilot embeddable on our website?",
      answer:
        "Yes. Trade Copilot deploys as an embeddable widget on your site or VDP. Brand, valuation blend, margins, and recon settings load from server-side dealer configuration.",
    },
  ],
  "buyer-center-ai": [
    {
      question: "What is Buyer Center AI?",
      answer:
        "Buyer Center AI is an AI vehicle acquisition center — sourcing private-party and marketplace listings, scoring them against your Buy Box, and running compliant outreach through purchase.",
    },
    {
      question: "Which listing sources does it support?",
      answer:
        "Facebook Marketplace, Craigslist, Cars.com and AutoTrader private listings, OfferUp, referrals, and connector imports — with duplicate detection and Buy Box scoring.",
    },
    {
      question: "How does compliance review work?",
      answer:
        "A dedicated review queue separates licensed feeds, dealer intake, and manual marketplace sources so acquisition teams can scale outreach without mixing compliance risk across channels.",
    },
  ],
  "we-finance-usa": [
    {
      question: "What is We Finance USA?",
      answer:
        "We Finance USA is a short-term loan platform for dealers — down payment gaps, negative equity, thin credit files, and deductible scenarios — through a white-labeled borrower flow and multi-lender matching.",
    },
    {
      question: "Is We Finance USA a per-lead product?",
      answer:
        "No per-lead fees like traditional sub-prime lead vendors. The model is aligned to funded deals — not charging monthly per lead regardless of outcome.",
    },
    {
      question: "Does it include shopper demand?",
      answer:
        "Yes. High-intent shopper activation from Audience Activator is included so your finance team works closable files — not cold lists.",
    },
  ],
  tredfi: [
    {
      question: "What is TredFi in the Audience Activator ecosystem?",
      answer:
        "TredFi is the tire and wheel retail platform in the stack — visualizer, consumer financing (LaaS), and growth tools for merchants. It is listed as a product capability and TredFi is also the parent company behind Audience Activator AI.",
    },
    {
      question: "Is TredFi the same as Audience Activator AI?",
      answer:
        "No. Audience Activator AI is dealer intelligence infrastructure for automotive retailers. TredFi is the parent company and operates the tire and wheel retail platform — related but distinct businesses.",
    },
    {
      question: "Do dealers need TredFi to use Audience Activator AI?",
      answer:
        "No. TredFi is an optional retail-platform product in the ecosystem. The core Audience Activator AI license covers dealer intelligence, engagement, marketplace, and operations products independently.",
    },
  ],
};

export function getProductFaqs(slug: string): FaqItem[] {
  return productFaqs[slug] ?? [];
}
