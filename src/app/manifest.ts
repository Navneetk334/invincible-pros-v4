import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "INVINCIBLE PROS.",
    short_name: "INVINCIBLE PROS.",
    description:
      "A digital engineering company — software, AI, cloud, hardware and live media, engineered end to end.",
    start_url: "/v2",
    display: "standalone",
    background_color: "#050609",
    theme_color: "#050609",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
