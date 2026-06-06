import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Stagger, StaggerItem } from "@/components/reveal";
import { CTA } from "@/components/sections/cta";
import { products, productLayers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The Audience Activator AI product ecosystem — one software license for every capability, powered by your data, with optional Audience Activator intelligence data.",
};

export default function ProductsIndex() {
  return (
    <>
      <section className="relative overflow-hidden bg-white pt-32 pb-12 sm:pt-36">
        <div className="bg-grid absolute inset-0 mask-fade-x" aria-hidden />
        <Container className="relative">
          <SectionHeading
            eyebrow="The product ecosystem"
            title="One command center. Every capability."
            description="One software license unlocks every product. Bring your own data to power the platform — or add Audience Activator intelligence data separately."
          />
        </Container>
      </section>

      <Section className="pt-4">
        <Container>
          {productLayers.map((group) => {
            const items = products.filter((p) => p.layer === group.layer);
            if (!items.length) return null;
            return (
              <div key={group.layer} className="mb-14 last:mb-0">
                <div className="mb-6 flex items-baseline gap-3 border-b border-line pb-3">
                  <h2 className="text-lg font-semibold tracking-tight text-navy">
                    {group.layer}
                  </h2>
                  <span className="font-mono text-[0.7rem] tracking-wide text-slate">
                    {group.blurb}
                  </span>
                </div>
                <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => {
                    const Icon = p.icon;
                    return (
                      <StaggerItem key={p.slug}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-float"
                        >
                          <div className="grid size-11 place-items-center rounded-xl border border-line bg-mist text-navy transition-colors group-hover:border-blue/30 group-hover:bg-blue/5 group-hover:text-blue-600">
                            <Icon className="size-5" />
                          </div>
                          <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">
                            {p.name}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                            {p.summary}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                            Learn more
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            );
          })}
        </Container>
      </Section>

      <CTA />
    </>
  );
}
