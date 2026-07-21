import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY, SERVICES, serviceBySlug } from "@/lib/v2content";
import ServiceDetailV2 from "@/components/v2/ServiceDetailV2";

export function generateStaticParams() {
  return SERVICES.map((s) => ({
    slug: CATEGORY[s.category].slug,
    service: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}): Promise<Metadata> {
  const { slug, service } = await params;
  const found = serviceBySlug(slug, service);
  if (!found) return { title: "Service not found — INVINCIBLE PROS." };
  const { domain, service: svc } = found;
  return {
    title: `${svc.name} — ${domain.kicker} | INVINCIBLE PROS.`,
    description: svc.overview,
    keywords: [svc.name, domain.title, ...svc.points, "INVINCIBLE PROS."],
    alternates: { canonical: `/v2/services/${slug}/${svc.slug}` },
    openGraph: {
      title: `${svc.name} — INVINCIBLE PROS.`,
      description: svc.overview,
      url: `/v2/services/${slug}/${svc.slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}) {
  const { slug, service } = await params;
  const found = serviceBySlug(slug, service);
  if (!found) notFound();
  const { domain, content, service: svc } = found;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: svc.name,
    name: `${svc.name} — INVINCIBLE PROS.`,
    description: svc.overview,
    category: domain.kicker,
    provider: {
      "@type": "Organization",
      name: "INVINCIBLE PROS.",
      url: "https://invinciblepros.com/v2",
    },
    areaServed: content.industries,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailV2 domain={domain} content={content} service={svc} />
    </>
  );
}
