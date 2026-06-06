import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = "https://audienceactivator.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Audience Activator AI — Dealer Intelligence Infrastructure",
    template: "%s · Audience Activator AI",
  },
  description:
    "Audience Activator AI connects shopper intelligence, AI automation, communications, marketplace activity, trade engagement, and dealership operations into one unified platform. Own the intelligence behind every deal.",
  keywords: [
    "Dealer Intelligence Infrastructure",
    "automotive AI platform",
    "shopper intelligence",
    "dealership operations",
    "BDC Copilot",
    "Audience Activator",
  ],
  openGraph: {
    title: "Audience Activator AI — Dealer Intelligence Infrastructure",
    description:
      "Own the intelligence behind every deal. One unified platform for shopper intelligence, AI automation, communications, marketplace, trade, and operations.",
    url: siteUrl,
    siteName: "Audience Activator AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audience Activator AI — Dealer Intelligence Infrastructure",
    description:
      "Own the intelligence behind every deal. The intelligence layer for the modern dealership.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-navy">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
