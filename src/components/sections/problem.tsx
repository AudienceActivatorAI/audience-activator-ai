import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { DisconnectedSystems } from "@/components/visuals/disconnected-systems";
import { problemPains, problemStats } from "@/lib/problem-content";

export function Problem() {
  return (
    <Section id="problem" tone="mist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="Disconnected systems are costing you deals."
              description="The modern dealership runs on a dozen tools that never share identity, intent, or history. Shoppers touch your site, your lot line, marketplace, and chat — and every handoff starts from zero."
            />

            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {problemStats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.05}>
                  <div className="flex h-full flex-col gap-1 bg-white px-4 py-5">
                    <div className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-xs leading-snug text-slate sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {problemPains.map((pain, i) => (
                <Reveal key={pain.title} delay={0.08 + i * 0.06}>
                  <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                    <div className="font-mono text-[0.62rem] tracking-[0.16em] text-blue-600 uppercase">
                      0{i + 1}
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-navy">
                      {pain.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {pain.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal y={24} className="lg:sticky lg:top-28">
            <DisconnectedSystems />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
