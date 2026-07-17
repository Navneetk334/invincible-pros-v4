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
      <section className="relative px-6 pb-32 md:px-12">
        <motion.p
          className="mx-auto max-w-3xl text-lg leading-relaxed text-fog"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8 }}
        >
          As a full-service software development company, INVINCIBLE&nbsp;PROS.
          delivers custom software, web development, mobile apps, CRM and ERP
          platforms, AI and automation, cloud solutions, networking, cyber
          security and hardware — everything a modern business needs to launch,
          scale and transform, engineered by one accountable team.
        </motion.p>
      </section>
    </>
  );
}
