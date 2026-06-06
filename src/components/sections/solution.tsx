import { Fingerprint, Activity, Layers, Target } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { UnifiedProfile } from "@/components/visuals/unified-profile";

const capabilities = [
  {
    icon: Fingerprint,
    title: "Identity resolved",
    body: "Super Pixel connects anonymous activity to a single, real shopper.",
  },
  {
    icon: Activity,
    title: "Intent scored",
    body: "Every signal rolls up into a live, explainable intent score.",
  },
  {
    icon: Layers,
    title: "Context unified",
    body: "Web, phone, chat, marketplace, and trade in one timeline.",
  },
  {
    icon: Target,
    title: "Action decided",
    body: "The platform surfaces the next best action for every profile.",
  },
];

export function Solution() {
  return (
    <Section id="solution">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal y={24} className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <UnifiedProfile />
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="The solution"
              title="Every signal resolves to one shopper profile."
              description="Audience Activator AI collapses the fragmented stack into a single, living profile — identity resolved, intent scored, and every interaction connected."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.06}>
                  <div className="flex gap-4">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-mist text-blue-600">
                      <c.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-navy">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
