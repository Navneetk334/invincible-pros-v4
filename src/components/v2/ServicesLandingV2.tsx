"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { DOMAINS } from "@/lib/services";
import { CATEGORY, servicesForCategory } from "@/lib/v2content";
import { useStore } from "@/store/useStore";
import { useCursor } from "@/hooks/useCursor";
import Magnetic from "@/components/layout/Magnetic";
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

export default function ServicesLandingV2() {
  const openContact = useStore((s) => s.openContact);
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
          <section className="relative px-6 pb-16 pt-40 md:px-12 md:pb-20 md:pt-52">
            <div className="mx-auto max-w-6xl">
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fog"
              >
                <Link href="/v2" className="hover:text-cyan" {...link}>
                  <ScrambleText text="Home" />
                </Link>
                <span aria-hidden>/</span>
                <span className="text-paper/80">Services</span>
              </nav>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                <span className="eyebrow">What we engineer</span>
              </div>

              <motion.h1
                className="max-w-4xl font-display text-[13vw] font-bold uppercase leading-[0.86] tracking-tight md:text-[7vw]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                One company.
                <br />
                <span className="gradient-text">Every discipline.</span>
              </motion.h1>

              <motion.p
                className="mt-8 max-w-2xl text-lg leading-relaxed text-fog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Six service categories and 37 capabilities, delivered end to end
                by one accountable team. Explore everything we build.
              </motion.p>
            </div>
          </section>

          {/* Category blocks */}
          {DOMAINS.map((domain) => {
            const content = CATEGORY[domain.id];
            const services = servicesForCategory(domain.id);
            const title =
              domain.title.charAt(0) + domain.title.slice(1).toLowerCase();
            return (
              <section
                key={domain.id}
                className="relative px-6 py-20 md:px-12 md:py-28"
              >
                <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: domain.color }}
                      />
                      <span className="eyebrow">
                        {domain.index} / 06
                      </span>
                    </div>
                    <h2
                      className="font-display text-[12vw] font-bold uppercase leading-[0.86] tracking-tight md:text-[4vw]"
                      style={{
                        backgroundImage: `linear-gradient(100deg, #fff, ${domain.color2})`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {domain.title}
                    </h2>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
                      {domain.kicker}
                    </p>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-paper/80">
                      {content.blurb}
                    </p>
                    <Link
                      href={`/v2/services/${content.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-cyan"
                      style={{ color: domain.color2 }}
                      {...link}
                    >
                      <ScrambleText text={`Explore ${title.toLowerCase()}`} /> →
                    </Link>
                  </div>

                  <ul className="grid grid-cols-1 self-center border-t border-paper/12 sm:grid-cols-2">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/v2/services/${content.slug}/${s.slug}`}
                          className="group flex items-center justify-between gap-3 border-b border-paper/12 py-4 transition-colors hover:text-cyan sm:odd:sm:pr-6 sm:even:border-l sm:even:border-paper/12 sm:even:pl-6"
                          {...link}
                        >
                          <span className="min-w-0">
                            <span className="block font-display text-base font-medium leading-tight tracking-tight md:text-lg">
                              <ScrambleText text={s.name} />
                            </span>
                            <span className="mt-0.5 block truncate text-[11px] text-fog">
                              {content.serviceBlurbs[s.name] ?? ""}
                            </span>
                          </span>
                          <span className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}

          {/* CTA */}
          <section className="relative px-6 py-28 md:px-12 md:py-40">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-[10vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[4.5vw]">
                Not sure where to{" "}
                <span className="gradient-text">start?</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fog">
                Tell us what you&rsquo;re building and we&rsquo;ll point you to
                the right team.
              </p>
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
