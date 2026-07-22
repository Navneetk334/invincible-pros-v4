import type { Metadata } from "next";
import LabV2 from "@/components/lab/LabV2";

export const metadata: Metadata = {
  title: "Motion Lab — INVINCIBLE PROS.",
  description: "Comparison of animation, interaction and mascot concepts.",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <LabV2 />;
}
