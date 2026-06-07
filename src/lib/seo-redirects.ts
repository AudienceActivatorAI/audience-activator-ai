import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * 301 redirects from the legacy Webflow site (indexed by Google).
 * Add paths from Search Console → Pages as you discover more.
 */
export const legacyRedirects: Redirect[] = [
  // Host canonicalization (apex → www) is handled in Vercel → Domains.
  // Do not duplicate it here — a double redirect causes a loop and GSC "Redirect error".
  // Legacy Webflow marketing pages → closest new destinations (no URL fragments — crawlers reject those)
  { source: "/enterprise", destination: "/products/dealeros", permanent: true },
  { source: "/convertiq", destination: "/products/intelligence", permanent: true },
  { source: "/blog", destination: "/", permanent: true },
  { source: "/blog/:slug*", destination: "/", permanent: true },
  { source: "/contact", destination: "/", permanent: true },
  { source: "/demo", destination: "/", permanent: true },
  { source: "/pricing", destination: "/sales-sheet", permanent: true },
];
