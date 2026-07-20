import type { Metadata } from "next";
import { CONTACT } from "@/lib/v2content";
import LegalPageV2, { type LegalSection } from "@/components/v2/LegalPageV2";

const UPDATED = "19 July 2026";

export const metadata: Metadata = {
  title: "Privacy Policy — INVINCIBLE PROS.",
  description:
    "How INVINCIBLE PROS. collects, uses, shares and protects your personal information when you use our website and services.",
  alternates: { canonical: "/v2/privacy" },
  openGraph: {
    title: "Privacy Policy — INVINCIBLE PROS.",
    description:
      "How INVINCIBLE PROS. collects, uses, shares and protects your personal information.",
    url: "/v2/privacy",
    type: "website",
  },
};

const INTRO =
  "This Privacy Policy explains how INVINCIBLE PROS. (\u201cwe\u201d, \u201cus\u201d, \u201cour\u201d) collects, uses, discloses and safeguards your information when you visit our website or engage our services. By using our site, you agree to the practices described in this policy.";

const SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    body: ["We collect information in the following ways:"],
    list: [
      "Information you provide — such as your name, email, phone number, company and project details when you contact us, request a quote or submit a form.",
      "Information collected automatically — such as your IP address, browser type, device information, pages visited and referring URLs, gathered through cookies and similar technologies.",
      "Project information — materials, credentials and data you share with us during an engagement, handled under confidentiality.",
    ],
  },
  {
    heading: "How we use your information",
    body: ["We use the information we collect to:"],
    list: [
      "Respond to enquiries and provide proposals or quotes.",
      "Deliver, maintain and improve our services and website.",
      "Communicate with you about projects, updates and support.",
      "Analyse usage to improve performance and user experience.",
      "Comply with legal obligations and protect our rights.",
    ],
  },
  {
    heading: "Cookies and tracking technologies",
    body: [
      "We use cookies and similar technologies to operate the site, remember your preferences and understand how the site is used. You can control or disable cookies through your browser settings, though some features of the site may not function properly as a result.",
    ],
  },
  {
    heading: "How we share your information",
    body: ["We do not sell your personal information. We may share it with:"],
    list: [
      "Trusted service providers (for example hosting and analytics) who process data on our behalf under confidentiality obligations.",
      "Authorities or third parties when required by law, regulation or legal process, or to protect our rights and safety.",
      "A successor entity in connection with a merger, acquisition or business transfer.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We retain personal information only for as long as necessary to fulfil the purposes described in this policy, to comply with our legal obligations, resolve disputes and enforce our agreements.",
    ],
  },
  {
    heading: "Data security",
    body: [
      "We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss or misuse. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on your location, you may have the right to:",
    ],
    list: [
      "Access, correct or update the personal information we hold about you.",
      "Request deletion of your personal information.",
      "Object to or restrict certain processing of your data.",
      "Withdraw consent where processing is based on consent.",
      "Lodge a complaint with your local data protection authority.",
    ],
  },
  {
    heading: "International data transfers",
    body: [
      "Your information may be processed and stored in countries other than your own. Where we transfer data internationally, we take steps to ensure it is protected in line with this policy and applicable law.",
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "Our website may contain links to third-party sites that we do not operate or control. This policy does not apply to those sites, and we encourage you to review their privacy policies.",
    ],
  },
  {
    heading: "Children\u2019s privacy",
    body: [
      "Our services are not directed to children under the age of 16, and we do not knowingly collect personal information from them. If you believe a child has provided us information, please contact us so we can remove it.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised \u201cLast updated\u201d date.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `If you have any questions about this Privacy Policy or how we handle your data, contact us at ${CONTACT.email} or ${CONTACT.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageV2
      title="Privacy Policy"
      updated={UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
