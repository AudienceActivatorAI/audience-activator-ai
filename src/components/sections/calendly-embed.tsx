"use client";

import * as React from "react";
import Script from "next/script";

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/james-tredfi/quick-demo-15-or-30-minutes";

export function CalendlyEmbed() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
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
      ) : (
        <div className="flex min-h-[700px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center text-sm text-white/45">
          Book a time — calendar loads when this section is in view
        </div>
      )}
    </div>
  );
}
