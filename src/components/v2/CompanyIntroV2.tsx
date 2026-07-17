"use client";

import { motion } from "framer-motion";
import Manifesto from "@/components/sections/Manifesto";

/**
 * Reuses the existing manifesto reveal, then adds an SEO/AI-readable
 * paragraph that plainly states what the company does.
 */
export default function CompanyIntroV2() {
  return (
    <>
      <Manifesto />
      <section className="relative px-6 pb-32 pt-8 md:px-12">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-cyan" />
            <span className="eyebrow">Who we are</span>
          </div>

          <p className="mt-8 max-w-3xl font-display text-2xl font-medium leading-[1.4] tracking-tight text-paper/45 md:text-[2rem] md:leading-[1.35]">
            As a{" "}
            <span className="text-paper">full-service software development company</span>
            ,{" "}
            <span className="gradient-text">INVINCIBLE&nbsp;PROS.</span> delivers{" "}
            <span className="text-paper">custom software</span>,{" "}
            <span className="text-paper">web &amp; mobile apps</span>,{" "}
            <span className="text-paper">CRM and ERP platforms</span>,{" "}
            <span className="text-paper">AI and automation</span>,{" "}
            <span className="text-paper">cloud solutions</span>,{" "}
            <span className="text-paper">networking</span>,{" "}
            <span className="text-paper">cyber security</span> and{" "}
            <span className="text-paper">hardware</span> — everything a modern
            business needs to launch, scale and transform, engineered by one
            accountable team.
          </p>
        </motion.div>
      </section>
    </>
  );
}
