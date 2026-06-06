"use client";

import Script from "next/script";

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/james-tredfi/quick-demo-15-or-30-minutes";

export function CalendlyEmbed() {
  return (
    <>
      <div
        className="calendly-inline-widget min-h-[700px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        data-url={calendlyUrl}
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
