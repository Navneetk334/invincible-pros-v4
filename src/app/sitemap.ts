import type { MetadataRoute } from "next";
import { CATEGORY, SERVICES } from "@/lib/v2content";

const BASE = "https://invinciblepros.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/careers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/refund`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = Object.values(CATEGORY).map(
    (c) => ({
      url: `${BASE}/services/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${CATEGORY[s.category].slug}/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...serviceEntries].map((e) => ({
    ...e,
    lastModified: now,
  }));
}
