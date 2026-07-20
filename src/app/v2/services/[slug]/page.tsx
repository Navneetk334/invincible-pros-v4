import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY, categoryBySlug } from "@/lib/v2content";
import ServicePageV2 from "@/components/v2/ServicePageV2";

export function generateStaticParams() {
  return Object.values(CATEGORY).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = categoryBySlug(slug);
  if (!found) return { title: "Service not found — INVINCIBLE PROS." };
  const { domain, content } = found;
  const title = domain.title.charAt(0) + domain.title.slice(1).toLowerCase();
  return {
    title: `${title} — ${domain.kicker} | INVINCIBLE PROS.`,
    description: content.overview,
    keywords: [...content.features, ...content.tech, "INVINCIBLE PROS."],
    alternates: { canonical: `/v2/services/${slug}` },
    openGraph: {
      title: `${title} — INVINCIBLE PROS.`,
      description: content.overview,
      url: `/v2/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = categoryBySlug(slug);
  if (!found) notFound();
  const { domain, content } = found;
  const title = domain.title.charAt(0) + domain.title.slice(1).toLowerCase();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: title,
    name: `${title} — ${domain.kicker}`,
    description: content.overview,
    provider: {
      "@type": "Organization",
      name: "INVINCIBLE PROS.",
      url: "https://invinciblepros.com/v2",
    },
    areaServed: content.industries,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${title} services`,
      itemListElement: domain.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageV2 domain={domain} content={content} />
    </>
  );
}
