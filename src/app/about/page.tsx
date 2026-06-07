import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import {
  AboutFounder,
  AboutHero,
  AboutMission,
  AboutTimeline,
  AboutTredFi,
} from "@/components/sections/about-page";
import { CTA } from "@/components/sections/cta";
import { aboutPageSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Audience Activator AI is Dealer Intelligence Infrastructure™ — built in Seattle by TredFi and Managing Partner James Hamilton to help dealers own shopper intelligence, intent, and activation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${SITE_NAME}`,
    description:
      "Dealer intelligence built by operators. Intent, identity, and activation on one layer — a TredFi company.",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <AboutHero />
      <AboutMission />
      <AboutFounder />
      <AboutTredFi />
      <AboutTimeline />
      <CTA />
    </>
  );
}
