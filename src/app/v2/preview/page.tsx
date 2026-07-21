import type { Metadata } from "next";
import ExperienceV3 from "@/components/v3/ExperienceV3";

export const metadata: Metadata = {
  title: "Preview — INVINCIBLE PROS.",
  description: "Design preview: depth, rhythm and a signature hero.",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <ExperienceV3 />;
}
