"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Parallax } from "@/components/ui/Parallax";
import { about } from "@/lib/content";

export default function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.85fr] md:items-center">
        <div>
          <SectionHeading kicker={about.kicker} title={about.heading} />
          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.12} dir="blur" duration={0.9}>
                <p className="max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {about.facets.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-2xl glass p-4"
              >
                <div className="text-xs uppercase tracking-widest text-[var(--color-faint)]">
                  {f.label}
                </div>
                <div className="mt-1 font-medium text-[var(--color-fg)]">
                  {f.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Parallax className="relative mx-auto w-full max-w-sm" amount={28}>
          <div className="absolute -inset-6 -z-10 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent_65%)] blur-2xl" />
          <ImageFrame
            src={about.photo}
            alt="Yadava H C"
            ratio="aspect-[3/4]"
            rounded="rounded-[2rem]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="absolute -bottom-6 -left-6 w-28 rotate-[-6deg] overflow-hidden rounded-2xl glass-strong p-1.5"
          >
            <img
              src={about.cartoon}
              alt="Cartoon avatar"
              className="rounded-xl"
            />
          </motion.div>
        </Parallax>
      </div>
    </Section>
  );
}
