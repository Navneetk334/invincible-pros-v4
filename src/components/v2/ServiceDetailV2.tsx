"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Domain } from "@/lib/services";
import {
  servicesForCategory,
  type CategoryContent,
  type ServiceDetail,
} from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Overlays from "@/components/layout/Overlays";
import ContactOverlay from "@/components/contact/ContactOverlay";
import NavbarV2 from "@/components/v2/NavbarV2";
import FooterV2 from "@/components/v2/FooterV2";
import TechChip from "@/components/v2/TechChip";
import { techByName } from "@/lib/techlookup";
import ScrambleText from "@/components/layout/ScrambleText";

const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ServiceDetailV2({
  domain,
  content,
  service,
}: {
  domain: Domain;
  content: CategoryContent;
  service: ServiceDetail;
}) {
  const openContact = useStore((s) => s.openContact);
  const enter = useStore((s) => s.enter);
  const primary = useCursor("hover");
  const link = useCursor("hover");

  useEffect(() => {
    enter();
  }, [enter]);

  const categoryTitle =
    domain.title.charAt(0) + domain.title.slice(1).toLowerCase();
  const related = servicesForCategory(domain.id).filter(
    (s) => s.slug !== service.slug,
  );

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
                className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fog"
              >
                <Link href="/" className="hover:text-cyan" {...link}>
                  <ScrambleText text="Home" />
                </Link>
                <span aria-hidden>/</span>
                <Link href="/services" className="hover:text-cyan" {...link}>
                  <ScrambleText text="Services" />
                </Link>
                <span aria-hidden>/</span>
                <Link
                  href={`/services/${content.slug}`}
                  className="hover:text-cyan"
                  {...link}
                >
                  <ScrambleText text={categoryTitle} />
                </Link>
                <span aria-hidden>/</span>
                <span className="text-paper/80">{service.name}</span>
              </nav>

              <div className="mb-5 flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: domain.color }}
                />
                <span className="eyebrow">{domain.kicker}</span>
              </div>

              <motion.h1
                className="max-w-4xl font-display text-[12vw] font-bold uppercase leading-[0.88] tracking-tight md:text-[6vw]"
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
                {service.name}
              </motion.h1>

              <motion.p
                className="mt-8 max-w-2xl text-lg leading-relaxed text-fog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                {service.overview}
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

          {/* What's included */}
          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-10">What&rsquo;s included</p>
              <ul className="grid grid-cols-1 border-t border-paper/12 md:grid-cols-2">
                {service.points.map((point, i) => (
                  <motion.li
                    key={point}
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
                    <span className="font-display text-lg font-medium tracking-tight md:text-xl">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>

          {/* Technology */}
          <section className="relative px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow mb-8">Technology</p>
              <div className="flex flex-wrap gap-2.5">
                {content.tech.map((name) => (
                  <TechChip
                    key={name}
                    tech={techByName(name) ?? { name, hex: "#8b8fa3" }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Related services */}
          {related.length > 0 && (
            <section className="relative px-6 py-24 md:px-12 md:py-32">
              <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                  <p className="eyebrow">More in {categoryTitle}</p>
                  <Link
                    href={`/services/${content.slug}`}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-cyan"
                    {...link}
                  >
                    <ScrambleText text={`View all ${categoryTitle}`} /> →
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {related.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${content.slug}/${s.slug}`}
                      className="group rounded-2xl border border-paper/12 p-8 transition-colors hover:border-paper/30"
                      {...link}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: domain.color }}
                      />
                      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-cyan">
                        <ScrambleText text={s.name} />
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fog">
                        {s.overview}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="relative px-6 py-28 md:px-12 md:py-40">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
                Need{" "}
                <span className="gradient-text">{service.name.toLowerCase()}</span>
                ?
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
