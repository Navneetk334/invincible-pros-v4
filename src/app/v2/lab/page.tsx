import type { Metadata } from "next";
import LabV2 from "@/components/lab/LabV2";

export const metadata: Metadata = {
  title: "Design Lab — INVINCIBLE PROS.",
  description: "Internal preview of mega-menu and cursor options.",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <LabV2 />;
}
