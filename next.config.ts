import type { NextConfig } from "next";
import path from "node:path";
import { legacyRedirects } from "./src/lib/seo-redirects";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
