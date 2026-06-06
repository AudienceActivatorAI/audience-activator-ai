import Link from "next/link";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Stagger, StaggerItem } from "@/components/reveal";
import { products, productLayers } from "@/lib/products";
import { cn } from "@/lib/utils";

const commandCenter = products.find((p) => p.slug === "dealeros")!;
const capabilities = products.filter((p) => p.slug !== "dealeros");

export function Ecosystem() {
  return (
    <Section id="products">
      <Container>
        <SectionHeading
          eyebrow="The product ecosystem"
          title="One command center. Every capability."
          description="Nothing is siloed — and nothing is sold à la carte. One software license gives you the full stack; your data powers it, with Audience Activator intelligence data available separately when you want more."
        />

        {/* Featured command center */}
        <Stagger className="mt-10">
          <StaggerItem>
            <Link
              href="/products/dealeros"
              className={cn(
                "group flex flex-col rounded-2xl border border-navy/15 bg-navy p-8 text-white shadow-float transition-all duration-300 sm:p-10",
                "hover:-translate-y-1 hover:border-blue/30",
              )}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-xl border border-white/15 bg-white/5 text-blue-300">
                      <LayoutDashboard className="size-6" />
                    </div>
                    <span className="font-mono text-[0.65rem] tracking-[0.16em] text-blue-300 uppercase">
                      Command Center
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {commandCenter.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/70">
                    {commandCenter.summary}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors group-hover:border-blue/40 group-hover:bg-blue/10">
                  Explore the command center
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        </Stagger>

        {/* Connected capabilities */}
        <div className="mt-10">
          <p className="font-mono text-[0.65rem] tracking-[0.16em] text-slate uppercase">
            Connected capabilities
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {productLayers
              .filter((l) => l.layer !== "Command Center")
              .map((l) => (
                <span
                  key={l.layer}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy/70"
                >
                  <span className="size-1.5 rounded-full bg-blue" />
                  {l.layer}
                  <span className="text-slate/70">· {l.blurb}</span>
                </span>
              ))}
          </div>
        </div>

        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((p) => (
            <StaggerItem key={p.name}>
              <Link
                href={`/products/${p.slug}`}
                className={cn(
                  "group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300",
                  "hover:-translate-y-1 hover:border-navy/20 hover:shadow-float",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-xl border border-line bg-mist text-navy transition-colors group-hover:border-blue/30 group-hover:bg-blue/5 group-hover:text-blue-600">
                    <p.icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-4 text-slate/50 transition-all group-hover:text-blue-600" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">
                  {p.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                  {p.summary}
                </p>
                <span className="mt-4 font-mono text-[0.6rem] tracking-[0.14em] text-slate uppercase">
                  Runs through DealerOS
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
