"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/lib/content";

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="journey">
      <SectionHeading kicker="Journey" title="From first line of code to AI products" />

      <div ref={ref} className="relative mt-16 pl-2">
        {/* animated spine */}
        <div className="absolute left-[14px] top-2 bottom-2 w-px bg-white/10 sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[14px] top-2 bottom-2 w-px origin-top bg-[linear-gradient(var(--color-brand),var(--color-brand-2))] sm:left-1/2"
        />

        <div className="space-y-12">
          {journey.map((j, i) => (
            <motion.div
              key={j.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-2 sm:gap-12 ${
                i % 2 === 0 ? "" : "sm:[direction:rtl]"
              }`}
            >
              {/* node */}
              <div className="absolute left-[7px] top-1 z-10 sm:left-1/2 sm:-translate-x-1/2">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.15 }}
                  className="block size-4 rounded-full border-2 border-white bg-black shadow-[0_0_16px_rgba(255,255,255,0.7)]"
                />
              </div>

              <div className={`col-start-2 sm:col-start-auto ${i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:[direction:ltr] sm:pl-12"}`}>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-brand-2)]">
                  {j.year}
                </span>
                <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{j.title}</h3>
                <p className="mt-2 max-w-sm text-[var(--color-muted)] sm:ml-auto">
                  {j.desc}
                </p>
              </div>
              <div className="hidden sm:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
