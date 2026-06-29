"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { nav, type SectionId } from "@/lib/content";
import { useSync } from "@/context/SyncContext";
import { cn } from "@/lib/utils";

export default function Nav() {
  const { scrollTo, spoken } = useSync();
  const [active, setActive] = useState<SectionId>("hero");
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { threshold: [0.3, 0.6], rootMargin: "-20% 0px -40% 0px" }
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* top progress bar */}
      <motion.div
        style={{ scaleX: bar }}
        className="fixed inset-x-0 top-0 z-[7000] h-0.5 origin-left bg-[linear-gradient(90deg,var(--color-brand),var(--color-brand-2),var(--color-brand-3))]"
      />

      {/* side dot nav */}
      <nav className="fixed right-5 top-1/2 z-[6000] hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {nav.map((n) => {
          const isActive = active === n.id;
          const isSpoken = spoken === n.id;
          return (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              data-cursor="hover"
              className="group flex items-center gap-2"
            >
              <span
                className={cn(
                  "whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100",
                  isActive ? "text-[var(--color-fg)]" : "text-[var(--color-muted)]"
                )}
              >
                {n.label}
              </span>
              <span
                className={cn(
                  "block size-2 rounded-full transition-all duration-300",
                  isSpoken
                    ? "scale-150 bg-[var(--color-brand-3)] shadow-[0_0_12px_var(--color-brand-3)]"
                    : isActive
                      ? "scale-125 bg-[var(--color-brand-2)] shadow-[0_0_10px_var(--color-brand-2)]"
                      : "bg-white/25 group-hover:bg-white/50"
                )}
              />
            </button>
          );
        })}
      </nav>

      {/* top-left brand */}
      <div className="fixed left-5 top-5 z-[6000] sm:left-8">
        <button
          onClick={() => scrollTo("hero")}
          data-cursor="hover"
          className="flex items-center gap-2 rounded-full glass px-3.5 py-2 text-sm font-semibold"
        >
          <span className="text-gradient">YHC</span>
        </button>
      </div>
    </>
  );
}
