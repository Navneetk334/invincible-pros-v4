"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/store/useStore";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const setScroll = useStore((s) => s.setScroll);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Don't let the browser restore the previous scroll position on reload —
    // the page should always open at the top. Deep-links to an anchor
    // (e.g. /v2#services) are still respected.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    // Respect reduced-motion: skip Lenis and use native scroll (ScrollTrigger
    // still works on native scroll).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", (e: { progress: number }) => {
      setScroll(e.progress);
      ScrollTrigger.update();
    });

    // Drive Lenis from GSAP's ticker so scroll + ScrollTrigger stay in sync.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [setScroll]);

  return <>{children}</>;
}
