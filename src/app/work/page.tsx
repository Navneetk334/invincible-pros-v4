import type { Metadata } from "next";
import WorkV2 from "@/components/v2/WorkV2";

export const metadata: Metadata = {
  title: "Work — INVINCIBLE PROS. | Selected Engineering Projects",
  description:
    "Selected work from INVINCIBLE PROS. — engineering engagements across software, AI, cloud, hardware and live media that moved real numbers.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — INVINCIBLE PROS.",
    description:
      "Selected engineering projects that moved the numbers.",
    url: "/work",
    type: "website",
  },
};

export default function WorkPage() {
  return <WorkV2 />;
}
