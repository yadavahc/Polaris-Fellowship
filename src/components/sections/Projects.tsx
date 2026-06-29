"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Parallax } from "@/components/ui/Parallax";
import { TiltCard } from "@/components/ui/TiltCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { projects } from "@/lib/content";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { useSync } from "@/context/SyncContext";
import { slug, cn } from "@/lib/utils";

export default function Projects() {
  const { spokenFocus } = useSync();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeading kicker="Top Projects" title="Products that solve real problems" />

      {/* Featured — alternating cinematic rows */}
      <div className="mt-16 space-y-16">
        {featured.map((p, i) => (
          <div
            key={p.name}
            id={`project-${slug(p.name)}`}
            className={cn(
              "grid grid-cols-1 items-center gap-8 rounded-[2rem] p-3 transition-shadow duration-500 md:grid-cols-2 md:p-5",
              i % 2 === 1 ? "md:[direction:rtl]" : "",
              spokenFocus === `project-${slug(p.name)}` && "focus-active"
            )}
          >
            <Parallax className="md:[direction:ltr]" amount={26}>
              <ImageFrame
                src={p.image}
                alt={p.name}
                ratio="aspect-[16/10]"
                rounded="rounded-[1.75rem]"
              />
            </Parallax>
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 1 ? -56 : 56 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="md:[direction:ltr]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-brand-2)]">
                Featured · 0{i + 1}
              </span>
              <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">{p.name}</h3>
              <p className="mt-1 text-lg text-[var(--color-brand-3)]">{p.tagline}</p>
              <p className="mt-4 max-w-lg text-[var(--color-muted)]">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,var(--color-brand),var(--color-brand-2))] px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
                  >
                    <ExternalLink className="size-4" /> Live demo
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
                  >
                    <GithubIcon className="size-4" /> Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Other projects grid */}
      <Stagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <StaggerItem key={p.name}>
            <TiltCard className="h-full">
              <div
                id={`project-${slug(p.name)}`}
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-3xl glass transition-shadow duration-500",
                  spokenFocus === `project-${slug(p.name)}` && "focus-active"
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <div className="flex items-center gap-2 text-[var(--color-faint)]">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="hover"
                          className="transition-colors hover:text-[var(--color-fg)]"
                          aria-label={`${p.name} code`}
                        >
                          <GithubIcon className="size-4" />
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="hover"
                          className="transition-colors hover:text-[var(--color-brand-2)]"
                          aria-label={`${p.name} live demo`}
                        >
                          <ArrowUpRight className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-brand-2)]">{p.tagline}</p>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {p.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-[var(--color-faint)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
