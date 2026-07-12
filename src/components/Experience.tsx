"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Overlays from "@/components/layout/Overlays";
import Navbar from "@/components/layout/Navbar";
import DomainRail from "@/components/layout/DomainRail";
import Preloader from "@/components/preloader/Preloader";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Domains from "@/components/sections/Domains";
import Stats from "@/components/sections/Stats";
import Finale from "@/components/sections/Finale";

// WebGL is client-only and heavy — load it lazily.
const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

export default function Experience() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <Overlays />

      {/* Persistent WebGL background behind all content */}
      <SceneCanvas />

      <SmoothScroll>
        <Navbar />
        <DomainRail />
        <main className="relative z-10">
          <Hero />
          <Manifesto />
          <Domains />
          <Stats />
          <Finale />
        </main>
      </SmoothScroll>
    </>
  );
}
