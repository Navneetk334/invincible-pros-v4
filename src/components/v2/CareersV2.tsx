"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { CONTACT } from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Overlays from "@/components/layout/Overlays";
import ContactOverlay from "@/components/contact/ContactOverlay";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const PERKS = [
  {
    title: "Real ownership",
    body: "Ship work that reaches real users. You own problems end to end, not tickets in isolation.",
  },
  {
    title: "Senior-dense team",
    body: "Work alongside engineers and designers who care about craft, and learn across every discipline.",
  },
  {
    title: "Modern stack",
    body: "Build with current tools across web, mobile, AI, cloud and hardware — no legacy busywork.",
  },
  {
    title: "Flexible & remote-friendly",
    body: "Outcomes over hours. We optimise for focus, autonomy and clear communication.",
  },
];

const APPLY_HREF = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "Careers — Application",
)}`;

export default function CareersV2() {
  const enter = useStore((s) => s.enter);
  const primary = useCursor("hover");
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
          {/* Hero */}
          <section className="relative px-6 pb-20 pt-40 md:px-12 md:pb-28 md:pt-52">
            <div className="mx-auto max-w-6xl">
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fog"
              >
                <Link href="/v2" className="hover:text-cyan" {...link}>
                  Home
                </Link>
                <span aria-hidden>/</span>
                <span className="text-paper/80">Careers</span>
              </nav>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                <span className="eyebrow">Careers</span>
              </div>

              <motion.h1
                className="max-w-4xl font-display text-[13vw] font-bold uppercase leading-[0.86] tracking-tight md:text-[7vw]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                Build the future
                <br />
                <span className="gradient-text">with us.</span>
              </motion.h1>

              <motion.p
                className="mt-8 max-w-2xl text-lg leading-relaxed text-fog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                We&rsquo;re a small, senior team of engineers, designers and
                builders. We&rsquo;re always keen to meet exceptional people
                across every discipline we work in.
              </motion.p>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                <Magnetic strength={0.4}>
                  <a
                    href={APPLY_HREF}
                    className="group flex w-fit items-center gap-2 rounded-full px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
                    }}
                    {...primary}
                  >
                    Send your portfolio
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </Magnetic>
              </motion.div>
            </div>
          </section>

          {/* Why join */}
          <section className="relative border-t border-paper/10 px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-4">Why join</p>
              <h2 className="mb-12 max-w-3xl font-display text-[9vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[3.6vw]">
                What you can expect.
              </h2>
              <div className="grid gap-px border border-paper/12 bg-paper/12 sm:grid-cols-2">
                {PERKS.map((p, i) => (
                  <motion.div
                    key={p.title}
                    className="bg-ink p-8 md:p-10"
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
                  >
                    <span className="font-mono text-[11px] text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fog">
                      {p.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Disciplines */}
          <section className="relative border-t border-paper/10 px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-4">Where we hire</p>
              <h2 className="mb-12 max-w-3xl font-display text-[9vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[3.6vw]">
                Disciplines.
              </h2>
              <ul className="grid grid-cols-1 border-t border-paper/12 md:grid-cols-2">
                {DOMAINS.map((d, i) => (
                  <motion.li
                    key={d.id}
                    className="flex items-start gap-4 border-b border-paper/12 py-6 md:odd:pr-8 md:even:border-l md:even:border-paper/12 md:even:pl-8"
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: d.color }}
                    />
                    <span>
                      <span className="block font-display text-lg font-medium tracking-tight md:text-xl">
                        {d.title.charAt(0) + d.title.slice(1).toLowerCase()}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-fog">
                        {d.kicker}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="relative border-t border-paper/10 px-6 py-28 md:px-12 md:py-40">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
                Don&rsquo;t see your role?{" "}
                <span className="gradient-text">Reach out anyway.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fog">
                Tell us what you do best and how you&rsquo;d want to contribute.
                Great people make their own roles here.
              </p>
              <div className="mt-10 flex justify-center">
                <Magnetic strength={0.4}>
                  <a
                    href={APPLY_HREF}
                    className="group flex items-center gap-2 rounded-full px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
                    }}
                    {...primary}
                  >
                    Apply now
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </section>

          <FooterV2 />
        </main>
      </SmoothScroll>
    </>
  );
}
