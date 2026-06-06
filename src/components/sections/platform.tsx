import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { ArchitectureDiagram } from "@/components/visuals/architecture-diagram";

export function Platform() {
  return (
    <Section id="platform" tone="dark" className="overflow-hidden">
      <div
        className="pointer-events-none absolute -right-1/4 top-0 h-[460px] w-[460px] rounded-full bg-blue/10 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Platform architecture"
          title="An infrastructure layer, not another tool."
          description="Signals flow up from every source, through identity and intelligence, into DealerOS — the command center where every capability runs as one operating system. Nothing siloed."
        />

        <Reveal y={28} className="mt-12">
          <ArchitectureDiagram />
        </Reveal>
      </Container>
    </Section>
  );
}
