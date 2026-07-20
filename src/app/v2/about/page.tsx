import type { Metadata } from "next";
import { DOMAINS } from "@/lib/services";
import AboutV2 from "@/components/v2/AboutV2";

export const metadata: Metadata = {
  title: "About — INVINCIBLE PROS. | Digital Engineering Company",
  description:
    "INVINCIBLE PROS. is a digital engineering company delivering software, AI, cloud, hardware and live media end to end. Learn about our story, values and the one accountable team behind it.",
  keywords: [
    "about INVINCIBLE PROS.",
    "digital engineering company",
    "software development company",
    "engineering team",
    "custom software",
    "AI and automation",
    "cloud and security",
  ],
  alternates: { canonical: "/v2/about" },
  openGraph: {
    title: "About — INVINCIBLE PROS.",
    description:
      "A digital engineering company delivering software, AI, cloud, hardware and live media — engineered end to end by one accountable team.",
    url: "/v2/about",
    type: "website",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About INVINCIBLE PROS.",
    url: "https://invinciblepros.example/v2/about",
    mainEntity: {
      "@type": "Organization",
      name: "INVINCIBLE PROS.",
      description:
        "A digital engineering company delivering software, AI, cloud infrastructure, hardware and live media end to end.",
      url: "https://invinciblepros.example/v2",
      email: "admin@invinciblepros.com",
      knowsAbout: DOMAINS.map((d) => d.kicker),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutV2 />
    </>
  );
}
