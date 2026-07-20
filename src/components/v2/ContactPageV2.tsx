"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
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

export default function ContactPageV2() {
  const openContact = useStore((s) => s.openContact);
  const enter = useStore((s) => s.enter);
  const primary = useCursor("hover");
  const link = useCursor("hover");

  useEffect(() => {
    enter();
  }, [enter]);

  const channels = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    {
      label: "Phone",
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`,
    },
    { label: "WhatsApp", value: "Message us", href: CONTACT.whatsapp },
  ];

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
                <span className="text-paper/80">Contact</span>
              </nav>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                <span className="eyebrow">Let&rsquo;s talk</span>
              </div>

              <motion.h1
                className="max-w-4xl font-display text-[13vw] font-bold uppercase leading-[0.86] tracking-tight md:text-[7vw]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                Start a{" "}
                <span className="gradient-text">conversation.</span>
              </motion.h1>

              <motion.p
                className="mt-8 max-w-2xl text-lg leading-relaxed text-fog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Tell us what you&rsquo;re building. We&rsquo;ll reply within one
                business day with a clear next step — no obligation.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
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
                <button
                  type="button"
                  onClick={() => openContact("split")}
                  className="rounded-full border border-paper/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-cyan hover:text-cyan"
                  {...link}
                >
                  Send a message
                </button>
              </motion.div>

              {/* Channels */}
              <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-paper/12 bg-paper/12 sm:grid-cols-3">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      c.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group bg-ink p-6 transition-colors hover:bg-paper/[0.03]"
                    {...link}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                      {c.label}
                    </span>
                    <span className="mt-2 block font-display text-lg font-medium tracking-tight text-paper transition-colors group-hover:text-cyan">
                      {c.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <FooterV2 />
        </main>
      </SmoothScroll>
    </>
  );
}
