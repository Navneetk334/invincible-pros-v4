import type { Metadata } from "next";
import { CONTACT } from "@/lib/v2content";
import LegalPageV2, { type LegalSection } from "@/components/v2/LegalPageV2";

const UPDATED = "19 July 2026";

export const metadata: Metadata = {
  title: "Cookie Policy — INVINCIBLE PROS.",
  description:
    "How INVINCIBLE PROS. uses cookies and similar technologies on its website, and how you can control them.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: "Cookie Policy — INVINCIBLE PROS.",
    description:
      "How INVINCIBLE PROS. uses cookies and similar technologies, and how you can control them.",
    url: "/cookies",
    type: "website",
  },
};

const INTRO =
  "This Cookie Policy explains what cookies are, how INVINCIBLE PROS. uses them on our website, and the choices you have. It should be read together with our Privacy Policy.";

const SECTIONS: LegalSection[] = [
  {
    heading: "What are cookies?",
    body: [
      "Cookies are small text files placed on your device when you visit a website. They are widely used to make sites work, to make them more efficient, and to provide information to the site owners. Similar technologies such as local storage and pixels serve comparable purposes.",
    ],
  },
  {
    heading: "How we use cookies",
    body: ["We use cookies for the following purposes:"],
    list: [
      "Essential — required for the site to function, such as remembering your cookie preferences.",
      "Performance & analytics — to understand how visitors use the site so we can improve it.",
      "Functionality — to remember choices you make and personalise your experience.",
    ],
  },
  {
    heading: "Types of cookies we use",
    body: [
      "Cookies may be \u201csession\u201d cookies, which are deleted when you close your browser, or \u201cpersistent\u201d cookies, which remain until they expire or you delete them. Some cookies are set by us (first-party) and some by third-party services we use.",
    ],
  },
  {
    heading: "Managing your cookie preferences",
    body: [
      "When you first visit our site you can accept or decline non-essential cookies through our consent banner. You can also control and delete cookies through your browser settings at any time. Please note that disabling certain cookies may affect how the site works.",
    ],
  },
  {
    heading: "Third-party cookies",
    body: [
      "Some cookies may be set by third-party services that appear on our pages, such as analytics providers. These providers have their own privacy and cookie policies, which govern how they use the data they collect.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Cookie Policy from time to time. Any changes will be posted on this page with a revised \u201cLast updated\u201d date.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `If you have questions about our use of cookies, contact us at ${CONTACT.email} or ${CONTACT.phone}.`,
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPageV2
      title="Cookie Policy"
      updated={UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
