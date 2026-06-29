"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { dsa } from "@/lib/content";

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function DSA() {
  return (
    <Section id="dsa">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <SectionHeading kicker={dsa.kicker} title={dsa.heading} />
      </div>
      <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">{dsa.blurb}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {dsa.stats.map((s, i) => (
          <motion.a
            key={s.platform}
            href={s.link}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.7 }}
            className="group relative block overflow-hidden rounded-3xl glass p-6"
          >
            <div
              className="absolute -right-8 -top-8 size-32 rounded-full opacity-30 blur-2xl"
              style={{ background: s.color }}
            />
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.platform}
                className="size-12 rounded-xl object-cover ring-1 ring-white/10"
              />
              <span className="text-sm text-[var(--color-muted)]">{s.platform}</span>
            </div>
            <div
              className="mt-5 text-6xl font-semibold tracking-tight"
              style={{ color: s.color }}
            >
              <Counter to={s.count} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-sm text-[var(--color-faint)]">
              problems solved
            </div>
            <div className="mt-3 text-xs font-medium text-[var(--color-muted)] opacity-0 transition-opacity group-hover:opacity-100">
              View profile →
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
        <ImageFrame
          src={dsa.streak.image}
          alt={dsa.streak.label}
          ratio="aspect-[16/9]"
        />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-2xl font-semibold">{dsa.streak.label}</div>
          <p className="mt-2 max-w-md text-[var(--color-muted)]">
            Consistency over intensity — showing up daily to keep problem-solving
            instincts sharp.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
