import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CTA } from "@/components/sections/cta";
import { FaqSection } from "@/components/sections/faq-section";
import { getProductFaqs } from "@/lib/faqs";
import { productVisuals } from "@/components/product/product-visuals";
import { type Product, getProduct } from "@/lib/products";
import { type ProductPage, type ProductFeature } from "@/lib/product-pages";
import { cn } from "@/lib/utils";

function ProductName({ product, className }: { product: Product; className?: string }) {
  return <span className={className}>{product.name}</span>;
}

function FeatureCard({ feature }: { feature: ProductFeature }) {
  return (
    <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card">
      <div className="flex items-start gap-3">
        <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-blue/10 text-blue-600">
          <Check className="size-3.5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-navy">{feature.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate">{feature.body}</p>
        </div>
      </div>
    </div>
  );
}

export function ProductDetail({
  product,
  content,
}: {
  product: Product;
  content: ProductPage;
}) {
  const Icon = product.icon;
  const related = (content.related ?? [])
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));
  const visual = productVisuals[product.slug];
  const VisualComponent = visual?.Component;
  const faqs = getProductFaqs(product.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-32 pb-16 sm:pt-36">
        <div className="bg-grid absolute inset-0 mask-fade-x" aria-hidden />
        <div
          className="pointer-events-none absolute -top-32 right-[-8%] h-[440px] w-[440px] rounded-full bg-blue/10 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <Reveal>
            <nav className="mb-8 flex items-center gap-2 font-mono text-[0.72rem] tracking-wide text-slate">
              <Link href="/products" className="hover:text-navy">
                Products
              </Link>
              <span aria-hidden>/</span>
              <span className="text-navy">{product.name}</span>
            </nav>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Reveal>
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-xl border border-line bg-mist text-blue-600">
                    <Icon className="size-6" />
                  </div>
                  <Badge variant="accent">{product.layer}</Badge>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
                  <ProductName product={product} />
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 text-lg font-medium text-blue-600">
                  {content.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
                  {content.heroDescription}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href="/#cta" className={cn(buttonVariants({ size: "lg" }))}>
                    Request Demo
                    <ArrowRight />
                  </Link>
                  <Link
                    href="/#platform"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                  >
                    See the platform
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Spec panel */}
            <Reveal delay={0.15} y={24}>
              <div className="rounded-2xl border border-line bg-white p-6 shadow-float">
                <div className="font-mono text-[0.62rem] tracking-[0.16em] text-slate uppercase">
                  At a glance
                </div>
                {content.metrics?.length ? (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {content.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-line bg-mist p-4">
                        <div className="text-xl font-semibold tracking-tight text-navy">
                          {m.value}
                        </div>
                        <div className="mt-1 text-xs leading-snug text-slate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5">
                  <div className="font-mono text-[0.62rem] tracking-[0.16em] text-slate uppercase">
                    Works with
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {content.integrations.map((i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-[0.78rem] font-medium text-navy/75"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section tone="mist" className="py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>The problem</Eyebrow>
            <p className="mt-5 text-2xl leading-snug font-medium tracking-tight text-navy sm:text-3xl">
              {content.problem}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Features */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title={<>What <ProductName product={product} /> does</>}
          />
          {content.featureGroups?.length ? (
            <div className="mt-10 flex flex-col gap-12">
              {content.featureGroups.map((group, gi) => (
                <Reveal key={group.name} delay={gi * 0.05}>
                  <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
                    <div className="lg:w-64 lg:shrink-0">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-blue-600">
                          0{gi + 1}
                        </span>
                        <h3 className="text-xl font-semibold tracking-tight text-navy">
                          {group.name}
                        </h3>
                      </div>
                      {group.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-slate">
                          {group.description}
                        </p>
                      ) : null}
                    </div>
                    <Stagger className="grid flex-1 gap-4 sm:grid-cols-2">
                      {group.features.map((f) => (
                        <StaggerItem key={f.title}>
                          <FeatureCard feature={f} />
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {(content.features ?? []).map((f) => (
                <StaggerItem key={f.title}>
                  <FeatureCard feature={f} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </Section>

      {visual && VisualComponent ? (
        <Section tone="mist" className="overflow-hidden">
          <Container className="relative">
            <SectionHeading
              eyebrow={visual.eyebrow}
              title={visual.title}
              description={visual.description}
            />
            <Reveal y={28} className="mt-10">
              <VisualComponent />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* How it works */}
      <Section tone="dark" className="overflow-hidden">
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <Container className="relative">
          <SectionHeading tone="dark" eyebrow="How it works" title="From signal to action" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {content.howItWorks.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="font-mono text-sm text-blue-300">
                    0{i + 1}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related */}
      {related.length ? (
        <Section tone="mist">
          <Container>
            <SectionHeading eyebrow="Better together" title="Connected products" />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    href={`/products/${r.slug}`}
                    className="group h-full rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-float"
                  >
                    <div className="grid size-10 place-items-center rounded-xl border border-line bg-mist text-navy transition-colors group-hover:border-blue/30 group-hover:bg-blue/5 group-hover:text-blue-600">
                      <RIcon className="size-5" />
                    </div>
                    <h3 className="mt-4 flex items-center gap-1 text-base font-semibold text-navy">
                      <ProductName product={r} />
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate">
                      {r.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy/70 hover:text-navy"
              >
                <ArrowLeft className="size-4" />
                All products
              </Link>
            </div>
          </Container>
        </Section>
      ) : null}

      {faqs.length ? (
        <FaqSection
          title={`${product.name} — common questions`}
          description="Quick answers on how this capability fits your store and the wider platform."
          faqs={faqs}
        />
      ) : null}

      <CTA />
    </>
  );
}
