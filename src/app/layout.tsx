import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invinciblepros.example"),
  title: "INVINCIBLE PROS. — Engineering the Future",
  description:
    "INVINCIBLE PROS. is a futuristic digital engineering company. We build software, intelligence, design, infrastructure, hardware and live experiences. Engineering the future.",
  keywords: [
    "IT solutions",
    "software development",
    "AI integration",
    "cloud",
    "cyber security",
    "digital transformation",
    "INVINCIBLE PROS.",
  ],
  openGraph: {
    title: "INVINCIBLE PROS. — Engineering the Future",
    description:
      "A futuristic digital engineering company. Software · Intelligence · Design · Infrastructure · Hardware · Experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-ink text-paper antialiased">{children}</body>
    </html>
  );
}
