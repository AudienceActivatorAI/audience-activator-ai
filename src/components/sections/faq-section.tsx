import { ChevronDown } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import type { FaqItem } from "@/lib/faqs";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  faqs: FaqItem[];
  tone?: "default" | "mist" | "dark";
};

export function FaqSection({
  id,
  eyebrow = "FAQ",
  title,
  description,
  faqs,
  tone = "mist",
}: FaqSectionProps) {
  if (!faqs.length) return null;

  const isDark = tone === "dark";

  return (
    <Section
      id={id}
      tone={tone === "default" ? undefined : tone}
      className="py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          tone={isDark ? "dark" : "light"}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div
            className={cn(
              "divide-y rounded-2xl border shadow-card",
              isDark
                ? "divide-white/10 border-white/10 bg-white/[0.03]"
                : "divide-line border-line bg-white",
            )}
          >
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-6">
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold [&::-webkit-details-marker]:hidden",
                    isDark ? "text-white" : "text-navy",
                  )}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 transition-transform group-open:rotate-180",
                      isDark ? "text-white/45" : "text-slate",
                    )}
                    aria-hidden
                  />
                </summary>
                <p
                  className={cn(
                    "pb-5 text-sm leading-relaxed",
                    isDark ? "text-white/65" : "text-slate",
                  )}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
