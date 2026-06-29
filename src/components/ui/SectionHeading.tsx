"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const word: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: { delay: 0.15 + i * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Premium, formal section heading: a small kicker chip, a thin rule that
 * draws in, and the title rendered word-by-word rising from behind a mask.
 */
export function SectionHeading({
  kicker,
  title,
  align = "left",
  className,
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  const words = title.split(" ");
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          <span className="size-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          {kicker}
        </motion.span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="hidden h-px flex-1 origin-left bg-gradient-to-r from-white/25 to-transparent sm:block"
        />
      </div>

      <h2 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
        <span className="flex flex-wrap gap-x-[0.28em] gap-y-1">
          {words.map((w, i) => (
            <span key={w + i} className="inline-block overflow-hidden py-[0.06em]">
              <motion.span
                custom={i}
                variants={word}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="inline-block text-gradient"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </span>
      </h2>
    </div>
  );
}
