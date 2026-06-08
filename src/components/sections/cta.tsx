import { Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { CalendlyEmbed } from "@/components/sections/calendly-embed";
import { DemoRequestForm } from "@/components/sections/demo-request-form";

export function CTA() {
  return (
    <Section id="cta" tone="dark" className="overflow-hidden">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-blue/18 blur-[130px]"
        aria-hidden
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-blue-300">Dealer Intelligence Infrastructure™</span>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
            Own the Intelligence
            <br className="hidden sm:block" /> Behind Every{" "}
            <span className="text-gradient-light">Deal.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            Request a walkthrough or book time directly — see how Audience Activator AI
            unifies shopper intelligence, automation, and operations into one platform.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal delay={0.05}>
            <div>
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-white">Request a demo</h3>
                <p className="mt-1 text-sm text-white/55">
                  One license, full platform. Tell us about your store and we&apos;ll
                  tailor the walkthrough to your priorities.
                </p>
              </div>
              <DemoRequestForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-white">Book a call</h3>
                <p className="mt-1 text-sm text-white/55">
                  Pick a time that works — we&apos;ll walk through the platform live.
                </p>
              </div>
              <CalendlyEmbed />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-12 text-center font-mono text-[0.7rem] tracking-[0.2em] text-white/40 uppercase">
            Intent · Identity · Activation
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
