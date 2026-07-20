import type { Metadata } from "next";
import { CONTACT } from "@/lib/v2content";
import ContactPageV2 from "@/components/v2/ContactPageV2";

export const metadata: Metadata = {
  title: "Contact — INVINCIBLE PROS. | Start a Project",
  description:
    "Get in touch with INVINCIBLE PROS. Email admin@invinciblepros.com, call +91 8700025535 or message us on WhatsApp. We reply within one business day.",
  alternates: { canonical: "/v2/contact" },
  openGraph: {
    title: "Contact — INVINCIBLE PROS.",
    description:
      "Tell us what you're building. Email, call or WhatsApp — we reply within one business day.",
    url: "/v2/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact INVINCIBLE PROS.",
    url: "https://invinciblepros.com/v2/contact",
    mainEntity: {
      "@type": "Organization",
      name: "INVINCIBLE PROS.",
      url: "https://invinciblepros.com/v2",
      email: CONTACT.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT.email,
        telephone: CONTACT.phone,
        availableLanguage: ["English"],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageV2 />
    </>
  );
}
