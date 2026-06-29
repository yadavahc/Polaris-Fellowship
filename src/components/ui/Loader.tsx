"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/content";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 16 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 550);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 130);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--color-bg)]"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 animate-aurora opacity-40 [background:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(200,210,230,0.1),transparent_45%)]" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative mb-8"
          >
            <div className="grid size-24 place-items-center rounded-2xl glass-strong ring-glow">
              <span className="text-2xl font-semibold tracking-tight text-gradient">
                {site.initials}
              </span>
            </div>
            <div className="absolute -inset-3 -z-10 animate-spin-slow rounded-3xl bg-[conic-gradient(from_0deg,transparent,var(--color-brand),transparent_40%)] opacity-60 blur-md" />
          </motion.div>

          <div className="relative h-px w-56 overflow-hidden rounded bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#ffffff,#9aa1b0)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="mt-4 font-mono text-xs tracking-widest text-[var(--color-muted)]">
            {progress}% — preparing experience
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
