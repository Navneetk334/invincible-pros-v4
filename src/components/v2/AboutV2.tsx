"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { CATEGORY } from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Overlays from "@/components/layout/Overlays";
import ContactOverlay from "@/components/contact/ContactOverlay";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import StatsV2 from "@/components/v2/StatsV2";
import WhyUsV2 from "@/components/v2/WhyUsV2";
import ScrambleText from "@/components/layout/ScrambleText";

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const STORY = [
  "INVINCIBLE PROS. is a digital engineering company. We design, build and scale the software, intelligence, infrastructure, hardware and live experiences that ambitious businesses run on — end to end, under one roof.",
  "We started with a simple conviction: most companies don't need five vendors and a project manager to stitch them together. They need one accountable engineering team that can take an idea from the first line of code to a platform serving millions — and stand behind every layer of it.",
  "Today that team spans product engineering, AI and data, design, cloud and security, physical systems and live media. The same people who architect your backend can secure your infrastructure, train your models, design your interface and stream your launch event.",
];

const VALUES = [
  {
    title: "Engineering-first",
    body: "Not a marketing shop that outsources the hard part. Senior engineers own the work from architecture to deployment.",
  },
  {
    title: "One accountable team",
    body: "No finger-pointing between vendors. A single team owns the whole stack and the outcome it produces.",
  },
  {
    title: "Built to scale",
    body: "We architect for the user you'll have in three years, not just the one you have today — without over-engineering day one.",
  },
  {
    title: "You own everything",
    body: "Source code, infrastructure and documentation are yours. No lock-in, no black boxes.",
  },
  {
    title: "Security by default",
    body: "Protection, privacy and observability are designed in from the first commit, never bolted on later.",
  },
  {
    title: "Transparent by habit",
    body: "Clear scope, honest timelines and direct communication — you always know where your project stands.",
  },
];

export default function AboutV2() {
  const openContact = useStore((s) => s.openContact);
  const enter = useStore((s) => s.enter);
  const primary = useCursor("hover");
  const linkCursor = useCursor("hover");

  // No preloader on this page, so reveal the fixed navbar on mount.
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
                <Link href="/" className="hover:text-cyan" {...linkCursor}>
                  <ScrambleText text="Home" />
                </Link>
                <span aria-hidden>/</span>
                <span className="text-paper/80">About</span>
              </nav>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                <span className="eyebrow">About INVINCIBLE&nbsp;PROS.</span>
              </div>

              <motion.h1
                className="max-w-4xl font-display text-[13vw] font-bold uppercase leading-[0.86] tracking-tight md:text-[7vw]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                We build what the
                <br />
                <span className="gradient-text">future runs on.</span>
              </motion.h1>

              <motion.p
                className="mt-8 max-w-2xl text-lg leading-relaxed text-fog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                A digital engineering company delivering custom software, AI,
                cloud, hardware and live media — engineered end to end by one
                accountable team.
              </motion.p>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                <Magnetic strength={0.4}>
                  <button
                    type="button"
                    onClick={() => openContact("flow")}
                    className="group flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
                    }}
                    {...primary}
                  >
                    <ScrambleText text="Start a project" activeClassName="text-ink/60" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </Magnetic>
              </motion.div>
            </div>
          </section>

          {/* Story */}
          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[auto_1fr] md:gap-20">
              <p className="eyebrow md:pt-2">Our story</p>
              <div className="max-w-3xl space-y-8">
                {STORY.map((p, i) => (
                  <motion.p
                    key={i}
                    className={
                      i === 0
                        ? "font-display text-2xl font-medium leading-[1.4] tracking-tight text-paper/90 md:text-[1.9rem] md:leading-[1.35]"
                        : "text-base leading-relaxed text-fog md:text-lg"
                    }
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </section>

          {/* Stats (reused from the homepage) */}
          <div>
            <StatsV2 />
          </div>

          {/* What we do */}
          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-4">What we do</p>
              <h2 className="mb-12 max-w-3xl font-display text-[9vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[3.6vw]">
                Six domains, one team.
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {DOMAINS.map((d) => (
                  <Link
                    key={d.id}
                    href={`/services/${CATEGORY[d.id].slug}`}
                    className="group rounded-2xl border border-paper/12 p-8 transition-colors hover:border-paper/30"
                    {...linkCursor}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: d.color }}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                        {d.index}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-cyan">
                      <ScrambleText
                        text={d.title.charAt(0) + d.title.slice(1).toLowerCase()}
                      />
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                      {d.kicker}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-fog">
                      {d.statement}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-4">What we stand for</p>
              <h2 className="mb-12 max-w-3xl font-display text-[9vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[3.6vw]">
                How we work.
              </h2>
              <div className="grid gap-px border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:grid-cols-3">
                {VALUES.map((v, i) => (
                  <motion.div
                    key={v.title}
                    className="bg-ink p-8 md:p-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  >
                    <span className="font-mono text-[11px] text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fog">
                      {v.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why us (reused from the homepage) */}
          <div>
            <WhyUsV2 />
          </div>

          {/* CTA */}
          <section className="relative px-6 py-28 md:px-12 md:py-40">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
                Let&rsquo;s build something{" "}
                <span className="gradient-text">the future remembers.</span>
              </h2>
              <div className="mt-10 flex justify-center">
                <Magnetic strength={0.4}>
                  <button
                    type="button"
                    onClick={() => openContact("flow")}
                    className="group flex items-center gap-2 rounded-full px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, var(--color-cyan), var(--color-accent-2))",
                    }}
                    {...primary}
                  >
                    <ScrambleText text="Start a project" activeClassName="text-ink/60" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
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
