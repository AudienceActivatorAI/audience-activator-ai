import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * 301 redirects from the legacy Webflow site (indexed by Google).
 * Add paths from Search Console → Pages as you discover more.
 */
export const legacyRedirects: Redirect[] = [
  // Canonical host — prefer apex over www
  {
    source: "/:path*",
    has: [{ type: "host", value: "www.audienceactivator.ai" }],
    destination: "https://audienceactivator.ai/:path*",
    permanent: true,
  },
  // Legacy Webflow marketing pages → closest new destinations
  { source: "/about", destination: "/#ownership", permanent: true },
  { source: "/enterprise", destination: "/products/dealeros", permanent: true },
  { source: "/convertiq", destination: "/products/intelligence", permanent: true },
  { source: "/blog", destination: "/", permanent: true },
  { source: "/blog/:slug*", destination: "/", permanent: true },
  // Common Webflow utility paths
  { source: "/contact", destination: "/#cta", permanent: true },
  { source: "/demo", destination: "/#cta", permanent: true },
  { source: "/pricing", destination: "/#cta", permanent: true },
];
