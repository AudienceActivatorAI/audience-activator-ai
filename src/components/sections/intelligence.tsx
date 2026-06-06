import { Fingerprint, Gauge, Zap } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { IntelligenceEngine } from "@/components/visuals/intelligence-engine";

const pillars = [
  {
    icon: Fingerprint,
    title: "Resolve",
    body: "Turn anonymous traffic into known, in-market shoppers with identity resolution at the source.",
  },
  {
    icon: Gauge,
    title: "Score",
    body: "Real-time intent scoring across every signal, channel, and rooftop — explainable, not a black box.",
  },
  {
    icon: Zap,
    title: "Activate",
    body: "Push decisions straight into products and workflows so the right action happens automatically.",
  },
];

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
          eyebrow="The intelligence engine"
          title="Audience Activator Intelligence"
          description="The engine at the center of the platform. It ingests every signal, resolves identity, scores intent, and decides the next action — then activates it everywhere you operate."
        />

        <Reveal y={28} className="mx-auto mt-14 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
            <IntelligenceEngine />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="grid size-10 place-items-center rounded-xl bg-blue/15 text-blue-300">
                  <p.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
