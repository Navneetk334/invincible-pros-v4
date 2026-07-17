"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import FlowForm from "./FlowForm";
import SplitForm from "./SplitForm";

/** Full-screen modal that hosts the Flow (Start a project) or Split (Contact) form. */
export default function ContactOverlay() {
  const kind = useStore((s) => s.contactForm);
  const close = useStore((s) => s.closeContact);

  useEffect(() => {
    if (!kind) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    // lock background scroll while the modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [kind, close]);

  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto bg-ink"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          data-lenis-prevent
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="fixed right-5 top-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 text-lg text-paper transition-colors hover:border-cyan hover:text-cyan"
          >
            ✕
          </button>
          {kind === "flow" ? <FlowForm /> : <SplitForm />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
