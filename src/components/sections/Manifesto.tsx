"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT =
  "We are not just a service provider—we are the engineering team that powers ambitious businesses. We design, build, and scale technology that transforms ideas into reliable, high-performing solutions. From a single line of code to large-scale digital infrastructure, we turn complexity into systems that drive growth, innovation, and lasting success.";

export default function Manifesto() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = container.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.12 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 55%",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={container}
      className="relative flex min-h-[120vh] items-center px-6 py-40 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-3xl font-medium leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">
          {TEXT.split(" ").map((w, i) => (
            <span key={i} data-word className="inline-block">
              {w}
              <span>&nbsp;</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
