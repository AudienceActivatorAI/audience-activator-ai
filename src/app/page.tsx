import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/json-ld";
import { platformFaqs } from "@/lib/faqs";
import { homePageSchema } from "@/lib/schema";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";

const Intelligence = dynamic(() =>
  import("@/components/sections/intelligence").then((m) => m.Intelligence),
);
const Ecosystem = dynamic(() =>
  import("@/components/sections/ecosystem").then((m) => m.Ecosystem),
);
const Platform = dynamic(() =>
  import("@/components/sections/platform").then((m) => m.Platform),
);
const Ownership = dynamic(() =>
  import("@/components/sections/ownership").then((m) => m.Ownership),
);
const Outcomes = dynamic(() =>
  import("@/components/sections/outcomes").then((m) => m.Outcomes),
);
const FaqSection = dynamic(() =>
  import("@/components/sections/faq-section").then((m) => m.FaqSection),
);
const CTA = dynamic(() => import("@/components/sections/cta").then((m) => m.CTA));

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
