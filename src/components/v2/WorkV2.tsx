"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Overlays from "@/components/layout/Overlays";
import ContactOverlay from "@/components/contact/ContactOverlay";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import CaseStudiesV2 from "@/components/v2/CaseStudiesV2";

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

export default function WorkV2() {
  const enter = useStore((s) => s.enter);
  const link = useCursor("hover");

  useEffect(() => {
    enter();
  }, [enter]);

  return (
    <>
      <CustomCursor />
      <Overlays />
      <SceneCanvas />
      <ContactOverlay />

      <SmoothScroll>
        <NavbarV2 />
        <main className="relative z-10">
          <section className="relative px-6 pt-40 md:px-12 md:pt-52">
            <div className="mx-auto max-w-6xl">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fog"
              >
                <Link href="/v2" className="hover:text-cyan" {...link}>
                  Home
                </Link>
                <span aria-hidden>/</span>
                <span className="text-paper/80">Work</span>
              </nav>
            </div>
          </section>

          <CaseStudiesV2 />

          <FooterV2 />
        </main>
      </SmoothScroll>
    </>
  );
}
