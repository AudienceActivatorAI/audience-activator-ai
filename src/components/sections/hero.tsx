import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/primitives";
import { buttonVariants } from "@/components/ui/button";
import { UnifiedProfile } from "@/components/visuals/unified-profile";
import { cn } from "@/lib/utils";

const trust = [
  "Identity resolution",
  "Intent scoring",
  "AI automation",
  "Unified operations",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pb-28">
      {/* Background */}
      <div className="bg-grid absolute inset-0 mask-fade-x" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-blue/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="flex flex-col items-start">
            <Eyebrow>Dealer Intelligence Infrastructure™</Eyebrow>

            <h1 className="mt-6 text-[2.6rem] leading-[1.04] font-semibold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Own the Intelligence
              <br />
              Behind Every{" "}
              <span className="text-gradient-brand">Deal.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              Audience Activator AI connects shopper intelligence, AI automation,
              communications, marketplace activity, trade engagement, and
              dealership operations into one unified platform — all governed by
              DealerOS, the command center behind everything.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#cta" className={cn(buttonVariants({ size: "lg" }))}>
                Request Demo
                <ArrowRight />
              </Link>
              <Link
                href="#platform"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Explore the platform
              </Link>
            </div>

            <div className="mt-12 w-full border-t border-line pt-6">
              <p className="eyebrow text-slate">The intelligence layer for</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {trust.map((t) => (
                  <span key={t} className="text-sm font-medium text-navy/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div
                className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-blue/12 to-transparent blur-2xl"
                aria-hidden
              />
              <UnifiedProfile />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
