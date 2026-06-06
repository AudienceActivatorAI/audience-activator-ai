import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { DisconnectedSystems } from "@/components/visuals/disconnected-systems";

const pains = [
  {
    title: "Shoppers go anonymous",
    body: "Across web, phone, chat, and marketplace, most in-market buyers are never identified.",
  },
  {
    title: "One buyer, six records",
    body: "The same shopper fragments into duplicates with no shared identity or context.",
  },
  {
    title: "You rent the relationship",
    body: "Third-party leads put someone else between you and your own buyer.",
  },
  {
    title: "Reps work blind",
    body: "No intent, no history, no next best action — just a name and a phone number.",
  },
];

export function Problem() {
  return (
    <Section id="problem" tone="mist">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="Disconnected systems are costing you deals."
              description="The modern dealership runs on a dozen disconnected tools. None of them share an identity, an intent signal, or a single source of truth — so opportunity leaks at every step."
            />
            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {pains.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="border-l-2 border-line pl-4">
                    <h3 className="text-base font-semibold text-navy">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal y={24} className="lg:pl-6">
            <DisconnectedSystems className="pb-6" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
