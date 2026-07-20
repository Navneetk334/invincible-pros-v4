import type { MetadataRoute } from "next";
import { CATEGORY } from "@/lib/v2content";

const BASE = "https://invinciblepros.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}/v2`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/v2/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/v2/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/v2/careers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/v2/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/v2/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/v2/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/v2/refund`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceEntries: MetadataRoute.Sitemap = Object.values(CATEGORY).map(
    (c) => ({
      url: `${BASE}/v2/services/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...serviceEntries].map((e) => ({
    ...e,
    lastModified: now,
  }));
}
