import { Check, Minus, Database, KeyRound, Settings2, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const rented = [
  "A separate vendor contract for every capability",
  "A third party owns the buyer relationship",
  "Shopper data disappears on logout",
  "Data locked inside someone else's platform",
  "Opaque, black-box lead scoring",
];

const owned = [
  "One software license — every product in the ecosystem",
  "Your data powers the stack (CRM, DMS, pixel, feeds)",
  "Audience Activator data offered separately, not required",
  "Every signal retained and connected in your graph",
  "One command center for every capability",
];

const pillars = [
  {
    icon: KeyRound,
    title: "One license, all software",
    body: "DealerOS, BDC Copilot, Super Pixel, Marketplace Copilot, Trade Copilot, and every connected product — one software license, not a stack of separate contracts.",
  },
  {
    icon: Database,
    title: "Bring your own data",
    body: "Power the platform with your CRM, DMS, website traffic, marketplace feeds, and operational data — the intelligence runs on what you already have.",
  },
  {
    icon: Sparkles,
    title: "Our data, optional",
    body: "Audience Activator intent and identity data is a separate offering when you want enriched signal beyond your first-party sources.",
  },
  {
    icon: Settings2,
    title: "Own your operations",
    body: "DealerOS is the command center behind everything — one backend governing every product, workflow, and rooftop.",
  },
];

export function Ownership() {
  return (
    <Section id="ownership" tone="mist">
      <Container>
        <SectionHeading
          eyebrow="The license model"
          title="One software license. Your data. Our data optional."
          description="This is a single software and data license — not a menu of point tools. Dealers get access to the full platform for one price, bring their own data to power it, and can add Audience Activator intelligence data separately when they want more."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white p-7">
              <h3 className="font-mono text-[0.72rem] tracking-[0.16em] text-slate uppercase">
                Renting leads & point tools
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {rented.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-slate">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-slate/10 text-slate">
                      <Minus className="size-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className={cn(
                "relative h-full overflow-hidden rounded-2xl border border-navy/15 bg-navy p-7 text-white",
              )}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue/25 blur-3xl"
                aria-hidden
              />
              <h3 className="relative font-mono text-[0.72rem] tracking-[0.16em] text-blue-300 uppercase">
                One license. Full platform.
              </h3>
              <ul className="relative mt-5 flex flex-col gap-3.5">
                {owned.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blue text-white">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-white/90">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-0 overflow-hidden rounded-2xl border border-line bg-white sm:grid-cols-2">
            <div className="border-b border-line p-6 sm:border-b-0 sm:border-r sm:p-7">
              <div className="font-mono text-[0.65rem] tracking-[0.14em] text-blue-600 uppercase">
                Software license
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                One price unlocks the full Audience Activator AI stack — command
                center, engagement, marketplace, trade, acquisition, and finance
                capabilities together. No per-product upsell maze.
              </p>
            </div>
            <div className="p-6 sm:p-7">
              <div className="font-mono text-[0.65rem] tracking-[0.14em] text-blue-600 uppercase">
                Data — yours or ours
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Dealers run on their own CRM, DMS, pixel, and traffic data by
                default. Audience Activator intelligence data — intent scoring,
                identity resolution, enriched audiences — is offered separately
                when you want it layered on top.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="flex flex-col gap-3">
                <div className="grid size-10 place-items-center rounded-xl border border-line bg-white text-blue-600">
                  <p.icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-navy">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
