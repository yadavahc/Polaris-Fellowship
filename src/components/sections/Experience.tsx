"use client";

import { motion, type Variants } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { experience } from "@/lib/content";
import { Briefcase } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

// Distinct, formal "settle into place" — cards tip up from a slight 3D tilt.
const card: Variants = {
  hidden: { opacity: 0, y: 46, rotateX: 12 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading kicker="Experience" title="Where I've built and led" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid grid-cols-1 gap-6 [perspective:1200px] md:grid-cols-3"
      >
        {experience.map((e) => (
          <motion.div key={e.role} variants={card} className="[transform-style:preserve-3d]">
            <TiltCard className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-6">
                {/* sweeping top edge */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-white">
                    <Briefcase className="size-5" />
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-[var(--color-faint)]">
                    {e.period}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{e.role}</h3>
                {e.link ? (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="text-sm text-[var(--color-brand-2)] underline-offset-4 hover:underline"
                  >
                    {e.org}
                  </a>
                ) : (
                  <p className="text-sm text-[var(--color-brand-2)]">{e.org}</p>
                )}
                <ul className="mt-4 space-y-2.5">
                  {e.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-muted)]"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/70" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
