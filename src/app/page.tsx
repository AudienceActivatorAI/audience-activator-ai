import { JsonLd } from "@/components/seo/json-ld";
import { platformFaqs } from "@/lib/faqs";
import { homePageSchema } from "@/lib/schema";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Intelligence } from "@/components/sections/intelligence";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Platform } from "@/components/sections/platform";
import { Ownership } from "@/components/sections/ownership";
import { Outcomes } from "@/components/sections/outcomes";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <JsonLd data={homePageSchema(platformFaqs)} />
      <Hero />
      <Problem />
      <Solution />
      <Intelligence />
      <Ecosystem />
      <Platform />
      <Ownership />
      <Outcomes />
      <FaqSection
        id="faq"
        title="Common questions"
        description="How the platform is licensed, how your data fits in, and how to get started."
        faqs={platformFaqs}
      />
      <CTA />
    </>
  );
}
