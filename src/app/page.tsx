import { JsonLd } from "@/components/seo/json-ld";
import { homePageSchema } from "@/lib/schema";
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
      <JsonLd data={homePageSchema()} />
      <Hero />
      <Problem />
      <Solution />
      <Intelligence />
      <Ecosystem />
      <Platform />
      <Ownership />
      <Outcomes />
      <CTA />
    </>
  );
}
