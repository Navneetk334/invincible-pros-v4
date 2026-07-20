"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Domain } from "@/lib/services";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, PROCESS, type CategoryContent } from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Overlays from "@/components/layout/Overlays";
import ContactOverlay from "@/components/contact/ContactOverlay";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import TechMarquee from "@/components/v2/TechMarquee";
import { techByName } from "@/lib/techlookup";

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const cursor = useCursor("hover");
  return (
    <div className="border-b border-paper/12">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        {...cursor}
      >
        <span className="font-display text-lg font-medium tracking-tight md:text-xl">
          {q}
        </span>
        <span className="shrink-0 text-cyan">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="max-w-2xl pb-6 text-base leading-relaxed text-fog">{a}</p>
      )}
    </div>
  );
}

export default function ServicePageV2({
  domain,
  content,
}: {
  domain: Domain;
  content: CategoryContent;
}) {
  const openContact = useStore((s) => s.openContact);
  const primary = useCursor("hover");
  const linkCursor = useCursor("hover");
  const related = DOMAINS.filter((d) => d.id !== domain.id).slice(0, 3);
  const title = domain.title.charAt(0) + domain.title.slice(1).toLowerCase();

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
                <Link href="/v2" className="hover:text-cyan" {...linkCursor}>
                  Home
                </Link>
                <span aria-hidden>/</span>
                <Link
                  href="/v2#services"
                  className="hover:text-cyan"
                  {...linkCursor}
                >
                  Services
                </Link>
                <span aria-hidden>/</span>
                <span className="text-paper/80">{title}</span>
              </nav>

              <div className="mb-5 flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: domain.color }}
                />
                <span className="eyebrow">{domain.kicker}</span>
              </div>

              <motion.h1
                className="max-w-4xl font-display text-[13vw] font-bold uppercase leading-[0.86] tracking-tight md:text-[7vw]"
                style={{
                  backgroundImage: `linear-gradient(100deg, #fff, ${domain.color2})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                {title}
              </motion.h1>

              <motion.p
                className="mt-8 max-w-2xl text-lg leading-relaxed text-fog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                {content.overview}
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
                    Start a project
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </Magnetic>
              </motion.div>
            </div>
          </section>

          {/* Benefits */}
          <section className="relative border-t border-paper/10 px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-10">Why it matters</p>
              <div className="grid gap-px border border-paper/12 bg-paper/12 sm:grid-cols-2">
                {content.benefits.map((b, i) => (
                  <motion.div
                    key={b}
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
                    <p className="mt-4 font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
                      {b}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features / capabilities */}
          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-10">What we deliver</p>
              <ul className="grid grid-cols-1 border-t border-paper/12 md:grid-cols-2">
                {domain.services.map((service, i) => (
                  <motion.li
                    key={service}
                    className="flex items-start gap-4 border-b border-paper/12 py-5 md:odd:pr-8 md:even:border-l md:even:border-paper/12 md:even:pl-8"
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: domain.color }}
                    />
                    <span>
                      <span className="block font-display text-lg font-medium tracking-tight md:text-xl">
                        {service}
                      </span>
                      {content.serviceBlurbs[service] && (
                        <span className="mt-1 block text-sm leading-relaxed text-fog">
                          {content.serviceBlurbs[service]}
                        </span>
                      )}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>

          {/* Process */}
          <section className="relative border-t border-paper/10 px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-10">How we build</p>
              <ol className="relative border-l border-paper/12">
                {PROCESS.map((step, i) => (
                  <motion.li
                    key={step.n}
                    className="relative grid gap-3 pb-12 pl-8 last:pb-0 md:grid-cols-[auto_1fr] md:gap-12 md:pl-12"
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <span
                      className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-cyan"
                      aria-hidden
                    />
                    <span className="font-display text-3xl font-bold leading-none text-paper/25 md:text-5xl">
                      {step.n}
                    </span>
                    <div className="md:pt-1">
                      <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-base leading-relaxed text-fog">
                        {step.body}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </section>

          {/* Technology — same auto-scrolling marquee as the homepage */}
          <section
            aria-label="Technology"
            className="relative overflow-hidden border-t border-paper/10 py-24 md:py-32"
          >
            <div className="mx-auto mb-10 max-w-6xl px-6 md:mb-14 md:px-12">
              <p className="eyebrow mb-6">Technology</p>
              <h2 className="font-display text-[9vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[3.4vw]">
                The {title.toLowerCase()} stack.
              </h2>
            </div>
            <TechMarquee
              items={content.tech.map(
                (name) => techByName(name) ?? { name, hex: "#8b8fa3" },
              )}
            />
          </section>

          {/* Industries */}
          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-8">Industries</p>
              <ul className="space-y-2 md:max-w-md">
                {content.industries.map((ind) => (
                  <li
                    key={ind}
                    className="border-b border-paper/10 pb-2 font-display text-lg font-medium tracking-tight text-paper/80"
                  >
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="relative border-t border-paper/10 px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-4xl">
              <p className="eyebrow mb-10">Frequently asked</p>
              <div>
                {content.faqs.map((f) => (
                  <Faq key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
            </div>
          </section>

          {/* Related */}
          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-10">Explore more</p>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((d) => (
                  <Link
                    key={d.id}
                    href={`/v2/services/${CATEGORY[d.id].slug}`}
                    className="group rounded-2xl border border-paper/12 p-8 transition-colors hover:border-paper/30"
                    {...linkCursor}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: d.color }}
                    />
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-cyan">
                      {d.title.charAt(0) + d.title.slice(1).toLowerCase()}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fog">
                      {CATEGORY[d.id].blurb}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative border-t border-paper/10 px-6 py-28 md:px-12 md:py-40">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
                Ready to build with{" "}
                <span className="gradient-text">{title.toLowerCase()}</span>?
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
                    Start a project
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
