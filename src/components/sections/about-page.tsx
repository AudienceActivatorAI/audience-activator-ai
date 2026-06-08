import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, Target, Users } from "lucide-react";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { TREDFI_URL } from "@/lib/products";
import { cn } from "@/lib/utils";

const JAMES_LINKEDIN = "https://www.linkedin.com/in/tredfi/";
const TREDFI_LINKEDIN = "https://www.linkedin.com/company/tredfi/";

const principles = [
  {
    icon: Target,
    title: "Intelligence, not inventory dumps",
    body: "We resolve identity, score intent, and decide the next best action — so your team works buyers who are ready, not cold lists that burn out reps.",
  },
  {
    icon: Building2,
    title: "One operating system",
    body: "DealerOS is the command center behind every product. Traffic, AI engagement, marketplace, trade, and finance capabilities run as one workflow — nothing siloed.",
  },
  {
    icon: Users,
    title: "Built with operators",
    body: "We ship from real merchant and dealer floors — mobile posting, live callbacks, manager handoffs, and consent-aware outreach tuned for how stores actually work.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "TredFi & Audience Activator launch",
    body: "James Hamilton founds TredFi in Seattle and launches Audience Activator at the same time — integrated technology for independent wheel and tire merchants alongside Dealer Intelligence Infrastructure™ for audience identity, intent, and activation.",
  },
  {
    year: "2025",
    title: "Automotive expansion",
    body: "The same integration philosophy moves into dealerships: Marketplace Copilot for mobile listing workflows, voice and SMS engagement, and the DealerOS command center that governs every capability from one backend — introduced through enterprise and agency partnerships.",
  },
  {
    year: "2026",
    title: "Platform goes direct",
    body: "Audience Activator AI expands beyond enterprise and agency partnerships — the full platform, product ecosystem, and DealerOS command center are now available directly to dealer groups ready to own their shopper intelligence.",
  },
];

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-16 sm:pt-36 sm:pb-20">
      <div className="bg-grid absolute inset-0 mask-fade-x" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 right-[-8%] h-[480px] w-[480px] rounded-full bg-blue/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-6 text-[2.4rem] leading-[1.06] font-semibold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]">
            Dealer intelligence built by{" "}
            <span className="text-gradient-brand">operators.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Audience Activator AI is the intelligence layer for the modern
            dealership — identity resolution, intent scoring, and activation
            across every channel. We are a{" "}
            <a
              href={TREDFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy underline decoration-blue/30 underline-offset-4 transition-colors hover:decoration-blue"
            >
              TredFi
            </a>{" "}
            company, built in Seattle to help dealers own the relationship
            instead of renting it from point tools and lead vendors.
          </p>
          <p className="mt-4 font-mono text-[0.72rem] tracking-[0.18em] text-blue uppercase">
            Intent · Identity · Activation
          </p>
        </div>
      </Container>
    </section>
  );
}

export function AboutMission() {
  return (
    <Section tone="mist">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Infrastructure for every shopper signal."
          description="Audience Activator AI is not a lead list, a marketing agency, or another disconnected vendor login. It is the layer that connects anonymous traffic, marketplace activity, phone and SMS, trade interest, and CRM history into one living profile — then activates the right next step across your entire stack."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-white p-7">
                <span className="grid size-10 place-items-center rounded-xl bg-blue/10 text-blue">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function AboutFounder() {
  return (
    <Section>
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,24rem)_1fr]">
          <Reveal>
            <figure className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-line bg-mist shadow-float">
                <Image
                  src="/about/james-hamilton-portrait.jpg"
                  alt="Professional portrait of James Hamilton, Managing Partner at TredFi and founder of Audience Activator AI"
                  width={900}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 20rem, 24rem"
                  className="aspect-[3/4] h-auto w-full object-cover object-[center_12%]"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-slate lg:text-left">
                James Hamilton · Managing Partner, TredFi
              </figcaption>
            </figure>
          </Reveal>

          <div className="min-w-0">
            <SectionHeading
              eyebrow="Leadership"
              title="James Hamilton"
              description="Managing Partner at TredFi and the product leader behind Audience Activator AI, DealerOS, and the connected dealer product ecosystem."
            />

            <Reveal delay={0.08}>
              <div className="mt-10 rounded-2xl border border-line bg-white p-8 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-mist px-3 py-1 font-mono text-[0.68rem] tracking-[0.14em] text-slate uppercase">
                    Managing Partner
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate">
                    <MapPin className="size-3.5 shrink-0" />
                    Seattle, Washington
                  </span>
                </div>

                <p className="mt-6 text-base leading-relaxed text-slate">
                  James founded TredFi to give independent merchants an integrated
                  alternative to juggling agencies, lenders, website vendors, and ad
                  platforms that never talk to each other. That work started in
                  wheel and tire — 3D visualization, conversion-ready eCommerce,
                  embedded multi-lender financing, and AI-tuned marketing — and
                  expanded into automotive as the team proved the same pattern on
                  dealership floors: fragmented tools, rented relationships, and
                  reps working blind.
                </p>

                <p className="mt-4 text-base leading-relaxed text-slate">
                  Audience Activator AI is the next step — dealer intelligence
                  infrastructure where identity, intent, and activation live on one
                  layer, governed by DealerOS. The goal is unchanged: measurable
                  outcomes, merchant-by-merchant trust, and technology that helps
                  operators look and perform like a national chain without giving
                  up control of their data.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={JAMES_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    James on LinkedIn
                  </a>
                  <a
                    href={TREDFI_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                  >
                    TredFi company page
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function AboutTredFi() {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Parent company"
            title="A TredFi company"
            description="TredFi is a marketing and technology platform headquartered in Seattle. It builds integrated systems for retailers who are tired of renting their customer relationships — from wheel and tire merchants to dealership groups running the full Audience Activator AI stack."
            tone="dark"
          />

          <Reveal delay={0.06}>
            <ul className="flex flex-col gap-4 text-sm leading-relaxed text-white/75">
              <li className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="font-medium text-white">Integrated by design</span>
                <span className="mt-1 block">
                  Visualization, websites, financing, CRM, analytics, and AI
                  campaigns engineered to sell together — not bolted on after the
                  fact.
                </span>
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="font-medium text-white">Vertical depth</span>
                <span className="mt-1 block">
                  Deep catalog and workflow knowledge in wheel and tire, with
                  automotive products — Marketplace Copilot, BDC Copilot, Super
                  Pixel, and DealerOS — built for real store operations.
                </span>
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <span className="font-medium text-white">Partnership-led growth</span>
                <span className="mt-1 block">
                  Working with financing, commerce, and distribution partners so
                  independent operators can compete with national chains on
                  technology — not just ad spend.
                </span>
              </li>
            </ul>

            <a
              href={TREDFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "glass", size: "lg" }), "mt-8")}
            >
              Visit tredfi.com
              <ArrowRight />
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function AboutTimeline() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="How we got here"
          title="From merchant platforms to dealer infrastructure."
          description="The through-line is the same: replace friction with fluid, unified technology — and earn trust relationship by relationship."
        />

        <div className="mt-12 flex flex-col gap-0">
          {milestones.map((item, index) => (
            <Reveal key={item.year} delay={index * 0.05}>
              <div className="grid gap-4 border-l-2 border-blue/25 py-8 pl-8 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:pl-10">
                <p className="font-mono text-sm tracking-[0.12em] text-blue uppercase">
                  {item.year}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className={cn(buttonVariants({ size: "lg" }))}>
              Explore products
              <ArrowRight />
            </Link>
            <Link
              href="/#platform"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See the platform
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
