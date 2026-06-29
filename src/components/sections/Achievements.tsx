"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements } from "@/lib/content";
import { Award, X, ExternalLink } from "lucide-react";

export default function Achievements() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="achievements">
      <SectionHeading
        kicker="Achievements"
        title="Awards & certifications that mark the path"
      />

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {achievements.map((a, i) => (
            <motion.button
              key={a.title}
              data-cursor="hover"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: ((i % 4) + Math.floor(i / 4)) * 0.07,
              }}
              whileHover={{ y: -6 }}
              className={`group relative block w-full overflow-hidden rounded-2xl glass text-left ${
                a.kind === "award" ? "ring-glow" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {a.kind === "award" && (
                  <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] backdrop-blur">
                    <Award className="size-4" />
                  </span>
                )}
              </div>
              <div className="p-3">
                <div className="text-sm font-medium leading-tight">{a.title}</div>
                <div className="text-xs text-[var(--color-faint)]">{a.issuer}</div>
              </div>
            </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[9000] grid place-items-center bg-black/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl glass-strong p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={achievements[active].image}
                alt={achievements[active].title}
                className="max-h-[72vh] w-auto rounded-xl object-contain"
              />
              <div className="flex items-center justify-between px-3 py-2">
                <div>
                  <div className="font-medium">{achievements[active].title}</div>
                  <div className="text-xs text-[var(--color-faint)]">
                    {achievements[active].issuer}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {achievements[active].link && (
                    <a
                      href={achievements[active].link}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand)]/20 px-3 py-2 text-xs font-medium text-[var(--color-brand-2)] hover:bg-[var(--color-brand)]/30"
                    >
                      <ExternalLink className="size-3.5" /> Verify
                    </a>
                  )}
                  <button
                    onClick={() => setActive(null)}
                    className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
