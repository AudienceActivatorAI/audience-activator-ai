import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Database,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  coveredStack,
  leadRules,
  platformIncludes,
  proofPoints,
  SALES_ASSISTANT_URL,
  SALES_CONTACT_EMAIL,
  stackComparison,
  vendorStackIllustrative,
} from "@/lib/sales-sheet";
import { cn } from "@/lib/utils";

const CONTACT_MAILTO = `mailto:${SALES_CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Independent dealer offer — Audience Activator",
)}`;

export function SalesSheetHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-16 sm:pt-36 sm:pb-20 print:pt-8 print:pb-10">
      <div className="bg-grid absolute inset-0 mask-fade-x" aria-hidden />
      <Container className="relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <Eyebrow>Exclusive offer · Select independent dealers</Eyebrow>
            <h1 className="mt-6 text-[2.2rem] leading-[1.06] font-semibold tracking-tight text-navy sm:text-5xl lg:text-[3.1rem]">
              Access Pricing —{" "}
              <span className="text-gradient-brand">June license offer.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              One licensed operating system for marketplace traffic, AI sales agents,
              live outbound calling, Audience Activator data, phone intelligence, and
              manager control — priced for independent dealers who want one stack instead
              of ten renewals.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              Licensed by TredFi. Powered by Audience Activator AI. Territory slots are
              limited to one to two dealers per market for the covered launch stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <a href={CONTACT_MAILTO} className={cn(buttonVariants({ size: "lg" }))}>
                Request your territory slot
                <ArrowRight />
              </a>
              <a
                href={SALES_ASSISTANT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Try the interactive demo
              </a>
            </div>
          </div>

          <Reveal delay={0.06}>
            <div className="w-full max-w-sm rounded-2xl border border-line bg-mist p-6 shadow-sm lg:max-w-xs">
              <Image
                src="/brand/audience-activator-lockup.svg"
                alt="Audience Activator AI — Dealer Intelligence Infrastructure"
                width={520}
                height={88}
                className="h-auto w-full"
                priority
              />
              <p className="mt-4 font-mono text-[0.68rem] tracking-[0.16em] text-slate uppercase">
                Intent · Identity · Activation
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function SalesSheetPricing() {
  return (
    <Section tone="mist" id="pricing">
      <Container>
        <SectionHeading
          eyebrow="June offer pricing"
          title="$2,495 license. $4,995 normal. $0 monthly platform fee."
          description="The June independent dealer offer licenses BDC Copilot and the Audience Activator intent-data workflow. Performance fees apply only to closed deals from TredFi net-new leads. Your website, CRM, and pixel leads carry no closed-deal fee."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-slate uppercase">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-navy">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-navy/15 bg-navy text-white shadow-card lg:grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-10">
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-blue-300 uppercase">
                Full platform license
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-5xl font-semibold tracking-tight">$2,495</span>
                <span className="text-lg text-white/75">June offer</span>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80">
                Normal license is <strong className="text-white">$4,995</strong>.{" "}
                <strong className="text-white">$0 monthly platform fee</strong> on this
                June offer. Includes a{" "}
                <strong className="text-white">60-day 2× trackable leads</strong> guarantee
                after agreed go-live — or your license fee back.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                This is a software license for internal dealer operations — not ownership,
                resale rights, or a perpetual vendor rental stack.
              </p>
            </div>
            <div className="border-t border-white/10 bg-white/5 p-8 sm:p-10 lg:border-t-0 lg:border-l">
              <p className="font-mono text-[0.68rem] tracking-[0.14em] text-blue-300 uppercase">
                Performance economics
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-sm leading-relaxed text-white/85">
                <li>
                  <strong className="text-white">2-for-1</strong> on your first 10 closes
                  from TredFi net-new leads
                </li>
                <li>
                  Then <strong className="text-white">$150</strong> per verified closed deal
                  from our leads
                </li>
                <li>
                  <strong className="text-white">No sale, no fee</strong> on those net-new
                  leads
                </li>
                <li>
                  <strong className="text-white">No closed-deal fee</strong> on your
                  website, CRM, DMS, or Super Pixel traffic
                </li>
              </ul>
              <a
                href={CONTACT_MAILTO}
                className={cn(buttonVariants({ variant: "accent", size: "lg" }), "mt-8 w-full print:hidden")}
              >
                Reply to map your store
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export function SalesSheetLeadRules() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Lead rules"
          title="Transparent economics. Your traffic stays yours."
          description="Dealer-owned demand is tagged at creation. TredFi performance fees apply only to verified closes from net-new leads we source — never to customers you already earned."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {leadRules.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-line bg-white p-7">
                <h3 className="text-lg font-semibold tracking-tight text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "TCPA-first",
                body: "Email-first consent for pixel traffic, calling windows, rate limits, and a full audit trail.",
              },
              {
                icon: Database,
                title: "Dedup in code",
                body: "Your leads are tagged at creation — we never charge you for customers you already owned.",
              },
              {
                icon: Lock,
                title: "You own your data",
                body: "Export anytime. Multi-tenant isolation. No lock-in on dealer-first-party sources.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-mist p-6"
              >
                <item.icon className="size-5 text-blue" />
                <h3 className="mt-4 font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export function SalesSheetIncludes() {
  return (
    <Section tone="mist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="What the license includes"
            title="One operating system — not another menu of point tools."
            description="BDC Copilot connects marketplace traffic, AI agents, live outbound calling, Audience Activator intelligence, phone intelligence, and manager control into one dealer sales motion."
          />

          <Reveal delay={0.08}>
            <ul className="flex flex-col gap-3">
              {platformIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white px-5 py-4"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-slate">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function SalesSheetCoveredStack() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Covered launch stack"
          title="Eligible territory slots include the provider layer."
          description="For the first one to two dealers in each territory, TredFi covers Audience Activator data, integration work, LLM, SMS, email, and phone/voice costs that power the platform."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coveredStack.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <h3 className="font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-blue/20 bg-blue/5 px-8 py-7 text-center">
            <p className="text-4xl font-semibold tracking-tight text-navy">$0/mo</p>
            <p className="mt-2 font-mono text-[0.72rem] tracking-[0.16em] text-blue uppercase">
              TredFi platform fee
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              Dealers license BDC Copilot once. Eligible territory slots have provider and
              data costs covered by TredFi instead of renting another marked-up software
              bundle forever.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export function SalesSheetStackComparison() {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="Stack comparison"
          title="What BDC Copilot replaces or controls."
          description="Instead of paying separate vendor markups forever, the dealer licenses software from TredFi with no monthly platform rental fee."
          tone="dark"
          align="center"
        />

        <Reveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="hidden border-b border-white/10 bg-white/5 px-6 py-4 text-xs font-mono tracking-[0.14em] text-white/50 uppercase sm:grid sm:grid-cols-[1fr_180px_220px] sm:gap-4">
              <span>Capability</span>
              <span>Typical separate cost</span>
              <span>BDC Copilot</span>
            </div>
            <ul className="divide-y divide-white/10">
              {stackComparison.map((row) => (
                <li
                  key={row.job}
                  className="grid gap-2 px-6 py-5 sm:grid-cols-[1fr_180px_220px] sm:items-center sm:gap-4"
                >
                  <p className="text-sm font-medium text-white">{row.job}</p>
                  <p className="text-sm tabular-nums text-red-200/90">{row.separate}</p>
                  <p className="text-sm text-blue-300">{row.included}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="border-b border-white/10 px-6 py-4">
              <p className="font-mono text-[0.68rem] tracking-[0.14em] text-blue-300 uppercase">
                Illustrative vendor stack
              </p>
              <p className="mt-2 text-sm text-white/65">
                Rounded examples when the same jobs are bought separately — your vendors
                may differ.
              </p>
            </div>
            <ul className="divide-y divide-white/10">
              {vendorStackIllustrative.map((row) => (
                <li
                  key={row.feature}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{row.feature}</p>
                    {"detail" in row && row.detail ? (
                      <p className="mt-1 text-xs text-white/55">{row.detail}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 text-sm font-semibold tabular-nums text-blue-300">
                    {row.typicalCost}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 px-6 py-5 text-sm leading-relaxed text-white/70">
              Illustrative one-time and recurring lines often land around{" "}
              <strong className="text-white">$3,500+/mo</strong> before a sale — often
              still without a bundled short-term loan workflow. One license rolls these
              jobs into skilled agents.
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export function SalesSheetCTA() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-line bg-mist px-8 py-10 text-center sm:px-12">
            <Eyebrow className="justify-center">Next step</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Map your store to a territory slot.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate">
              Watch outbound scenarios, walk through manager control, and confirm
              whether your market still has a covered launch slot for the June offer.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
              <a href={CONTACT_MAILTO} className={cn(buttonVariants({ size: "lg" }))}>
                Email {SALES_CONTACT_EMAIL}
                <ArrowRight />
              </a>
              <a
                href={SALES_ASSISTANT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Open interactive demo
              </a>
              <Link
                href="/#cta"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
              >
                Book on Calendly
              </Link>
            </div>
            <p className="mt-8 font-mono text-[0.68rem] tracking-[0.18em] text-slate uppercase">
              Audience Activator AI · A TredFi company · Seattle
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
