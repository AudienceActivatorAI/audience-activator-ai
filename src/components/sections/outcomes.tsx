import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/visuals/stat-counter";

const stats = [
  { value: 4.2, suffix: "×", decimals: 1, label: "More in-market shoppers identified" },
  { value: 41, suffix: "%", label: "Lift in appointment set rate" },
  { value: 63, suffix: "%", label: "Faster speed-to-lead" },
  { value: 100, suffix: "%", label: "Calls captured & scored" },
];

const outcomes = [
  {
    title: "More traffic becomes pipeline",
    body: "Identity resolution converts anonymous visitors into known, workable opportunities.",
  },
  {
    title: "Every rep works with full context",
    body: "Intent, history, and next best action travel with the shopper into every conversation.",
  },
  {
    title: "One source of truth across rooftops",
    body: "Operations, reporting, and governance unify on a single intelligence layer.",
  },
];

export function Outcomes() {
  return (
    <Section id="outcomes">
      <Container>
        <SectionHeading
          eyebrow="Outcomes"
          title="Intelligence that shows up in the numbers."
          description="When identity, intent, and activation run on one layer, performance compounds across every channel and rooftop."
        />

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-2 bg-white p-7">
                <div className="text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                  <StatCounter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </div>
                <div className="text-sm leading-snug text-slate">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 font-mono text-[0.68rem] tracking-wide text-slate">
          Representative results across deploying rooftops.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {outcomes.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-line bg-mist p-6">
                <h3 className="text-base font-semibold text-navy">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {o.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
