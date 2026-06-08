import { Check, Database, Radio, ShieldCheck, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { IntelligenceEngine } from "@/components/visuals/intelligence-engine";
import {
  intelligenceCapabilities,
  intelligenceCompliance,
  intelligenceDataSources,
  intelligencePerformance,
  intelligenceStats,
} from "@/lib/intelligence-content";

export function Intelligence() {
  return (
    <Section id="intelligence" tone="dark" className="overflow-hidden">
      <div
        className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-blue/15 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Powered by the Intent Engine"
          title="Audience Activator Intelligence"
          description="Our proprietary Intent Engine unifies 40+ consumer data sources — cleaning, scoring, and activating fresh in-market shopper signal across every rooftop, channel, and product in the platform."
        />

        <Reveal y={28} className="mx-auto mt-14 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
            <IntelligenceEngine />
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {intelligenceStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <div className="flex h-full flex-col gap-1 bg-white/[0.03] p-6 text-center">
                <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm leading-snug text-white/55">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Transparent data sources"
            title="Know exactly where your data comes from"
            description="We don't operate as a black box. Every dataset in the Intent Engine is sourced through privacy-first methods, with transparent documentation of origin."
            className="max-w-3xl"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {intelligenceDataSources.map((source, i) => (
              <Reveal key={source.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="grid size-10 place-items-center rounded-xl bg-blue/15 text-blue-300">
                    <Database className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {source.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {source.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Intent Engine capabilities"
            title="40+ data sources. One unified platform."
            description="We don't just tell you who shoppers are — we show you what they're actively researching and shopping for in real time, then route the next action across your stack."
            className="max-w-3xl"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {intelligenceCapabilities.map((capability, i) => (
              <Reveal key={capability.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="grid size-10 place-items-center rounded-xl bg-blue/15 text-blue-300">
                    <Sparkles className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {capability.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Performance & accuracy"
            title="Why our data works better"
            className="max-w-2xl"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {intelligencePerformance.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="grid size-10 place-items-center rounded-xl bg-blue/15 text-blue-300">
                    <Radio className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-blue-300">
                  <ShieldCheck className="size-5" />
                  <span className="font-mono text-xs tracking-[0.18em] uppercase">
                    Privacy & compliance
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Compliance isn&apos;t an afterthought — it&apos;s built into
                  the architecture. Deterministic matching, enforced retention
                  limits, and opt-out mechanisms on every dataset.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {intelligenceCompliance.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/75"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-blue-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
