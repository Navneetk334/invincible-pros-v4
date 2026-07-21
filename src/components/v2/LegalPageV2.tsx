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
import ScrambleText from "@/components/layout/ScrambleText";

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

export type LegalSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

/**
 * Shared document layout for legal pages (Privacy, Terms). Content is passed in
 * so the route files stay declarative. Reuses the V2 chrome (navbar, footer,
 * background) and reveals the fixed navbar on mount (no preloader here).
 */
export default function LegalPageV2({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const enter = useStore((s) => s.enter);
  const linkCursor = useCursor("hover");

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
          {/* Hero */}
          <section className="relative px-6 pb-14 pt-40 md:px-12 md:pb-16 md:pt-52">
            <div className="mx-auto max-w-3xl">
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fog"
              >
                <Link href="/v2" className="hover:text-cyan" {...linkCursor}>
                  <ScrambleText text="Home" />
                </Link>
                <span aria-hidden>/</span>
                <span className="text-paper/80">{title}</span>
              </nav>

              <h1 className="font-display text-[11vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
                {title}
              </h1>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                Last updated: {updated}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog md:text-lg">
                {intro}
              </p>
            </div>
          </section>

          {/* Body */}
          <section className="relative px-6 pb-32 md:px-12">
            <div className="mx-auto max-w-3xl space-y-12 pt-12">
              {sections.map((s, i) => (
                <div key={s.heading}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-4 md:pl-8">
                    {s.body?.map((p, j) => (
                      <p
                        key={j}
                        className="text-base leading-relaxed text-fog"
                      >
                        {p}
                      </p>
                    ))}
                    {s.list && (
                      <ul className="space-y-2.5">
                        {s.list.map((item, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-base leading-relaxed text-fog"
                          >
                            <span
                              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-cyan"
                              aria-hidden
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <FooterV2 />
        </main>
      </SmoothScroll>
    </>
  );
}
