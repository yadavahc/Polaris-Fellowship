"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { vision, site } from "@/lib/content";
import { Compass, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/ui/icons";

const links = [
  { href: site.socials.github, label: "GitHub", icon: GithubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: site.socials.leetcode, label: "LeetCode", icon: LeetCodeIcon },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
];

export default function Vision() {
  return (
    <Section id="vision">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] glass-strong p-8 sm:p-12 md:p-16"
      >
        <div className="absolute -right-20 -top-20 size-72 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_65%)] blur-2xl" />
        <div className="absolute -left-16 bottom-0 size-72 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(200,210,230,0.14),transparent_65%)] blur-2xl [animation-delay:-2s]" />

        <div className="relative">
          <SectionHeading kicker={vision.kicker} title={vision.heading} />

          <div className="mt-8 max-w-2xl space-y-5">
            {vision.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-[var(--color-muted)]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {vision.pillars.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/10 px-4 py-2 text-sm font-medium text-[var(--color-fg)]"
              >
                {p}
              </motion.span>
            ))}
          </div>

          {/* Polaris callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
              <Compass className="size-5" />
            </span>
            <p className="text-lg leading-relaxed text-[var(--color-fg)]">
              {vision.polaris}
            </p>
          </motion.div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <div>
              <div className="text-2xl font-semibold text-gradient">
                {site.name}
              </div>
              <div className="text-sm text-[var(--color-faint)]">
                {site.role} · {site.college}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  aria-label={l.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-[var(--color-muted)] transition-colors hover:bg-white/10 hover:text-[var(--color-fg)]"
                >
                  <l.icon className="size-4" />
                  <span className="hidden sm:inline">{l.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center font-mono text-sm text-[var(--color-muted)]">
            Thank you. — {site.fellowship}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
