import type { Metadata } from "next";
import { SignInPage } from "@/components/sections/sign-in-page";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to DealerOS Command Center — the unified backend for Audience Activator AI.",
  alternates: { canonical: "/sign-in" },
  robots: { index: false, follow: false },
  openGraph: {
    title: `Sign in · ${SITE_NAME}`,
    description: "Access the DealerOS Command Center for your dealership.",
  },
};

export default function SignInRoute() {
  return <SignInPage />;
}
