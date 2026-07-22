import type { Metadata } from "next";
import { DOMAINS } from "@/lib/services";
import { SERVICES } from "@/lib/v2content";
import ServicesLandingV2 from "@/components/v2/ServicesLandingV2";

export const metadata: Metadata = {
  title: "Services — INVINCIBLE PROS. | Software, AI, Cloud, Hardware & More",
  description:
    "Explore all INVINCIBLE PROS. services across six categories and 37 capabilities — software and product engineering, AI and data, design, cloud and security, hardware and live media.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — INVINCIBLE PROS.",
    description:
      "Six service categories, 37 capabilities, one accountable team.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Services — INVINCIBLE PROS.",
    url: "https://invinciblepros.com/services",
    about: DOMAINS.map((d) => d.kicker),
    hasPart: SERVICES.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.overview,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesLandingV2 />
    </>
  );
}
