"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { site } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSync } from "@/context/SyncContext";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const wordVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { delay: 0.3 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const { scrollTo } = useSync();
  const title = ["Yadava", "H", "C"];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* 3D background */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,transparent_30%,var(--color-bg)_85%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pt-28 pb-24 sm:px-8 md:grid-cols-[1.3fr_1fr]">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-muted)] backdrop-blur"
          >
            <Sparkles className="size-3.5 text-white" />
            {site.applicationLabel}
            <span className="text-[var(--color-faint)]">· {site.cohort}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[var(--color-faint)]"
          >
            Candidate
          </motion.p>

          <h1 className="font-display text-[clamp(3rem,11vw,8rem)] font-semibold leading-[0.92] tracking-tight">
            <span className="block overflow-hidden">
              {title.map((w, i) => (
                <motion.span
                  key={w + i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="show"
                  className="mr-4 inline-block text-gradient"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-[var(--color-muted)] sm:text-xl"
          >
            This is my application for the{" "}
            <span className="text-[var(--color-fg)]">Polaris Fellowship</span> —
            narrated in my own voice, where the page responds live to every word
            I speak. {site.role} @ {site.college}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => scrollTo("about")}>
              Read my application
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollTo("vision")}>
              Why Polaris
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-10 flex items-center gap-6 text-sm text-[var(--color-faint)]"
          >
            <span>▶ Press play on my intro — bottom-right</span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="hidden sm:block">The application navigates itself as I speak</span>
          </motion.div>
        </div>

        {/* Right: profile with floating glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-[3/4] w-full max-w-sm md:block"
        >
          <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-[2.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.28),transparent_65%)] blur-2xl" />
          <div className="animate-float relative h-full w-full overflow-hidden rounded-[2.5rem] glass-strong ring-glow">
            <Image
              src="/images/profile-hero.png"
              alt="Yadava H C"
              fill
              priority
              sizes="400px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -right-4 top-8 animate-float rounded-2xl glass px-4 py-3 text-xs [animation-delay:-2s]">
            <div className="font-mono text-[var(--color-brand-2)]">AI · RAG · CV</div>
            <div className="text-[var(--color-faint)]">builder</div>
          </div>
          <div className="absolute -left-4 bottom-16 animate-float rounded-2xl glass px-4 py-3 text-xs [animation-delay:-4s]">
            <div className="font-mono text-[var(--color-brand-3)]">Hackathon</div>
            <div className="text-[var(--color-faint)]">winner</div>
          </div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <button
        onClick={() => scrollTo("about")}
        data-cursor="hover"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-faint)] transition-colors hover:text-[var(--color-fg)]"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-1.5">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-[var(--color-brand-2)]" />
        </span>
        <ArrowDown className="size-3" />
      </button>
    </section>
  );
}
