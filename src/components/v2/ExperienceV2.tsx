"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LabBgPreview from "@/components/lab/LabBgPreview";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Overlays from "@/components/layout/Overlays";
import ChapterFlash from "@/components/layout/ChapterFlash";
import ContactOverlay from "@/components/contact/ContactOverlay";
import Preloader from "@/components/preloader/Preloader";
import NavbarV2 from "@/components/v2/NavbarV2";
import HeroV2 from "@/components/v2/HeroV2";
import TrustBar from "@/components/v2/TrustBar";
import StatsV2 from "@/components/v2/StatsV2";
import Manifesto from "@/components/sections/Manifesto";
import ServicesV2 from "@/components/v2/ServicesV2";
import ProcessV2 from "@/components/v2/ProcessV2";
import TechStackV2 from "@/components/v2/TechStackV2";
import CaseStudiesV2 from "@/components/v2/CaseStudiesV2";
import IndustriesV2 from "@/components/v2/IndustriesV2";
import TestimonialsV2 from "@/components/v2/TestimonialsV2";
import WhyUsV2 from "@/components/v2/WhyUsV2";
import ContactV2 from "@/components/v2/ContactV2";
import FooterV2 from "@/components/v2/FooterV2";

// WebGL is client-only and heavy — load it lazily.
const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

export default function ExperienceV2() {
  // Optional lab background preview: /v2?labbg=<id> swaps the WebGL scene for a
  // candidate ambient background so it can be judged behind real content.
  const [labBg, setLabBg] = useState<string | null>(null);
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("labbg");
    if (!value) return;
    const raf = requestAnimationFrame(() => setLabBg(value));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Overlays />

      {/* Persistent WebGL background behind all content (or a lab preview) */}
      {labBg ? <LabBgPreview id={labBg} /> : <SceneCanvas />}

      <ChapterFlash />
      <ContactOverlay />

      <SmoothScroll>
        <NavbarV2 />
        <main className="relative z-10">
          <HeroV2 />
          <TrustBar />
          <Manifesto />
          <StatsV2 />
          <ServicesV2 />
          <ProcessV2 />
          <TechStackV2 />
          <CaseStudiesV2 />
          <IndustriesV2 />
          <TestimonialsV2 />
          <WhyUsV2 />
          <ContactV2 />
          <FooterV2 />
        </main>
      </SmoothScroll>
    </>
  );
}
