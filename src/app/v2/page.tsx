import type { Metadata } from "next";
import ExperienceV2 from "@/components/v2/ExperienceV2";
import { DOMAINS } from "@/lib/services";
import { CONTACT, SOCIAL } from "@/lib/v2content";

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
    legalName: "INVINCIBLE PROS.",
    description:
      "A digital engineering company delivering software, AI, cloud infrastructure, hardware and live media end to end.",
    url: "https://invinciblepros.com/v2",
    logo: "https://invinciblepros.com/opengraph-image",
    image: "https://invinciblepros.com/opengraph-image",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    sameAs: SOCIAL.map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.email,
      telephone: CONTACT.phone,
      availableLanguage: ["English"],
    },
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
