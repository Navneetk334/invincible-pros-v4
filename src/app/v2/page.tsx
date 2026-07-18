import type { Metadata } from "next";
import ExperienceV2 from "@/components/v2/ExperienceV2";
import { DOMAINS } from "@/lib/services";

export const metadata: Metadata = {
  title:
    "INVINCIBLE PROS. — Software, AI, Cloud & Hardware Engineering Company",
  description:
    "INVINCIBLE PROS. is a digital engineering company delivering custom software, web & mobile apps, AI and automation, cloud infrastructure, cyber security, hardware and live media — engineered end to end by one accountable team.",
  keywords: [
    "software development company",
    "custom software",
    "web development",
    "mobile app development",
    "AI integration",
    "machine learning",
    "cloud solutions",
    "DevOps",
    "cyber security",
    "CRM",
    "ERP",
    "SaaS development",
    "digital transformation",
    "INVINCIBLE PROS.",
  ],
  alternates: { canonical: "/v2" },
  openGraph: {
    title: "INVINCIBLE PROS. — Engineering the Future",
    description:
      "Custom software, AI, cloud, hardware and live media — engineered end to end.",
    url: "/v2",
    type: "website",
  },
};

export default function V2Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "INVINCIBLE PROS.",
    description:
      "A digital engineering company delivering software, AI, cloud infrastructure, hardware and live media end to end.",
    url: "https://invinciblepros.example/v2",
    email: "admin@invinciblepros.com",
    makesOffer: DOMAINS.map((d) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: d.title,
        description: d.kicker,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExperienceV2 />
    </>
  );
}
