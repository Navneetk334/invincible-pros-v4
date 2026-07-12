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
