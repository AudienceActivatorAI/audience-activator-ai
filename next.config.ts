import type { NextConfig } from "next";
import path from "node:path";
import { legacyRedirects } from "./src/lib/seo-redirects";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
