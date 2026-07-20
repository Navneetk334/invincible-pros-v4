import type { Metadata } from "next";
import CareersV2 from "@/components/v2/CareersV2";

export const metadata: Metadata = {
  title: "Careers — INVINCIBLE PROS. | Join Our Engineering Team",
  description:
    "Join INVINCIBLE PROS. — a senior team of engineers, designers and builders working across software, AI, cloud, hardware and live media. See how to apply.",
  alternates: { canonical: "/v2/careers" },
  openGraph: {
    title: "Careers — INVINCIBLE PROS.",
    description:
      "Join a senior team building across software, AI, cloud, hardware and live media.",
    url: "/v2/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersV2 />;
}
