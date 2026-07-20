import type { Metadata } from "next";
import { CONTACT } from "@/lib/v2content";
import LegalPageV2, { type LegalSection } from "@/components/v2/LegalPageV2";

const UPDATED = "19 July 2026";

export const metadata: Metadata = {
  title: "Terms of Service — INVINCIBLE PROS.",
  description:
    "The terms that govern your access to and use of the INVINCIBLE PROS. website and services.",
  alternates: { canonical: "/v2/terms" },
  openGraph: {
    title: "Terms of Service — INVINCIBLE PROS.",
    description:
      "The terms that govern your access to and use of the INVINCIBLE PROS. website and services.",
    url: "/v2/terms",
    type: "website",
  },
};

const INTRO =
  "These Terms of Service (\u201cTerms\u201d) govern your access to and use of the INVINCIBLE PROS. website and services. By accessing our site or engaging our services, you agree to be bound by these Terms.";

const SECTIONS: LegalSection[] = [
  {
    heading: "Use of our website",
    body: ["When using our website, you agree to:"],
    list: [
      "Use the site only for lawful purposes and in accordance with these Terms.",
      "Not attempt to disrupt, reverse-engineer or gain unauthorized access to the site or its systems.",
      "Not misuse our forms or submit false, harmful or unlawful content.",
    ],
  },
  {
    heading: "Our services",
    body: [
      "INVINCIBLE PROS. provides digital engineering services including software and product engineering, AI and data, design, cloud, security and DevOps, hardware systems and live media.",
      "The specific scope, deliverables, timelines and fees for any engagement are defined in a separate written proposal or agreement (a \u201cStatement of Work\u201d), which governs that engagement and prevails over these Terms where they conflict.",
    ],
  },
  {
    heading: "Proposals, fees and payment",
    body: [
      "Estimates are based on the information available at the time they are prepared. Fees, milestones and payment terms for an engagement are set out in the applicable proposal or Statement of Work.",
    ],
  },
  {
    heading: "Intellectual property \u2014 our website",
    body: [
      "The content, branding, design, text and code of this website are owned by INVINCIBLE PROS. or its licensors and are protected by applicable intellectual-property laws. You may not copy, reproduce or reuse them without our prior written permission.",
    ],
  },
  {
    heading: "Intellectual property \u2014 client deliverables",
    body: [
      "Upon full payment, ownership of the custom deliverables produced for a client \u2014 including source code, infrastructure configuration and documentation \u2014 transfers to the client as set out in the engagement agreement. This excludes our pre-existing tools, libraries, frameworks and know-how, which remain our property and are licensed to the client as needed to use the deliverables.",
    ],
  },
  {
    heading: "Third-party services",
    body: [
      "Our website and deliverables may incorporate third-party software, platforms or services that are subject to their own terms and licenses. You are responsible for complying with those terms where applicable.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "The website and its content are provided on an \u201cas is\u201d and \u201cas available\u201d basis without warranties of any kind, whether express or implied, to the fullest extent permitted by law.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, INVINCIBLE PROS. shall not be liable for any indirect, incidental, special or consequential damages arising out of or related to your use of the website.",
    ],
  },
  {
    heading: "Indemnification",
    body: [
      "You agree to indemnify and hold INVINCIBLE PROS. harmless from any claims, losses or expenses arising out of your misuse of the website or your violation of these Terms.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict-of-law principles. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in India.",
    ],
  },
  {
    heading: "Changes to these Terms",
    body: [
      "We may update these Terms from time to time. Changes take effect when posted on this page with a revised \u201cLast updated\u201d date, and your continued use of the site constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `If you have any questions about these Terms, contact us at ${CONTACT.email} or ${CONTACT.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageV2
      title="Terms of Service"
      updated={UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
