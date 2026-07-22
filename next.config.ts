import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The site now lives at the root. Permanently redirect the old /v2 URLs
      // so any existing links or bookmarks keep working.
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
