"use client";

import { motion } from "framer-motion";
import type { SectionId } from "@/lib/content";
import { useSync } from "@/context/SyncContext";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  highlightable = true,
}: {
  id: SectionId;
  children: React.ReactNode;
  className?: string;
  highlightable?: boolean;
}) {
  const { spoken } = useSync();
  const active = highlightable && spoken === id;

  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative scroll-mt-20",
        "mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32",
        className
      )}
    >
      <motion.div
        animate={
          active
            ? { scale: 1.0, opacity: 1 }
            : { scale: 1, opacity: 1 }
        }
        className={cn(
          "relative rounded-[2rem] transition-shadow duration-700",
          active && "section-active"
        )}
      >
        {/* "Now speaking" badge driven by the video */}
        <motion.div
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : -10,
            scale: active ? 1 : 0.9,
          }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute -top-3 left-6 z-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            Now narrating
          </span>
        </motion.div>
        <div className="p-1 sm:p-2">{children}</div>
      </motion.div>
    </section>
  );
}
