import type { Metadata } from "next";
import LogoShowcase from "@/components/logo/LogoShowcase";

export const metadata: Metadata = {
  title: "Logo Marks — INVINCIBLE PROS.",
  description: "Square and round logo mark options for favicon and social profiles.",
  robots: { index: false, follow: false },
};

export default function LogoPage() {
  return <LogoShowcase />;
}
