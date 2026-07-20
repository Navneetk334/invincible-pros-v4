import type { Metadata } from "next";
import { CONTACT } from "@/lib/v2content";
import LegalPageV2, { type LegalSection } from "@/components/v2/LegalPageV2";

const UPDATED = "19 July 2026";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — INVINCIBLE PROS.",
  description:
    "How cancellations, refunds and deposits work for INVINCIBLE PROS. engagements and services.",
  alternates: { canonical: "/v2/refund" },
  openGraph: {
    title: "Refund & Cancellation Policy — INVINCIBLE PROS.",
    description:
      "How cancellations, refunds and deposits work for INVINCIBLE PROS. engagements.",
    url: "/v2/refund",
    type: "website",
  },
};

const INTRO =
  "This Refund & Cancellation Policy explains how cancellations, deposits and refunds are handled for INVINCIBLE PROS. services. The specific commercial terms of each engagement are set out in the applicable proposal or Statement of Work, which prevails where it conflicts with this page.";

const SECTIONS: LegalSection[] = [
  {
    heading: "Scope",
    body: [
      "We provide custom, project-based digital engineering services. Because work is bespoke and delivered against agreed milestones, refunds and cancellations are handled per engagement rather than as off-the-shelf product returns.",
    ],
  },
  {
    heading: "Deposits and advance payments",
    body: [
      "Most engagements begin with a deposit or advance that reserves our team's time and covers discovery and initial work. Deposits are generally non-refundable once work has commenced, except where required by law or expressly stated in your agreement.",
    ],
  },
  {
    heading: "Cancellation by the client",
    body: [
      "You may cancel an engagement by providing written notice. You will be billed for all work completed and any non-cancellable third-party costs incurred up to the cancellation date. Any prepaid amounts beyond that are eligible for refund as described below.",
    ],
  },
  {
    heading: "Cancellation by us",
    body: [
      "We may cancel an engagement if it cannot proceed reasonably — for example due to non-payment, lack of required inputs, or scope that falls outside what was agreed. In such cases you are billed only for work delivered up to that point.",
    ],
  },
  {
    heading: "Refund eligibility",
    body: [
      "Refunds, where applicable, are limited to prepaid amounts for work not yet performed, less any deposits, completed milestones and third-party costs already incurred. Completed and accepted deliverables are not refundable.",
    ],
  },
  {
    heading: "How to request a refund",
    body: [
      `To request a refund, contact us in writing at ${CONTACT.email} with your engagement details. Approved refunds are processed to the original payment method, typically within 7\u201314 business days, subject to your payment provider's timelines.`,
    ],
  },
  {
    heading: "Non-refundable items",
    body: ["The following are generally non-refundable:"],
    list: [
      "Work already completed and accepted.",
      "Deposits once work has commenced.",
      "Third-party costs, licenses or subscriptions purchased on your behalf.",
      "Time-based or retainer work already performed.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Refund & Cancellation Policy from time to time. Changes are posted on this page with a revised \u201cLast updated\u201d date.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `For any questions about cancellations or refunds, contact us at ${CONTACT.email} or ${CONTACT.phone}.`,
    ],
  },
];

export default function RefundPage() {
  return (
    <LegalPageV2
      title="Refund & Cancellation"
      updated={UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
