"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { hackathons, hackStats } from "@/lib/content";
import { Trophy, Medal, Star } from "lucide-react";
import { useSync } from "@/context/SyncContext";
import { slug, cn } from "@/lib/utils";

const medalColor: Record<string, string> = {
  gold: "var(--color-gold)",
  silver: "#cbd5e1",
  bronze: "#d49a6a",
  finalist: "var(--color-brand-2)",
};

export default function Hackathons() {
  const { spokenFocus } = useSync();
  return (
    <Section id="hackathons">
      <SectionHeading
        kicker="Hackathons"
        title="Built fast. Shipped under pressure. Won."
      />

      {/* Stat strip */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {hackStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="flex items-center gap-4 rounded-2xl glass p-5"
          >
            <motion.span
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
              className="grid size-12 place-items-center rounded-xl bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
            >
              {i === 0 ? (
                <Trophy className="size-6" />
              ) : i === 1 ? (
                <Star className="size-6" />
              ) : (
                <Medal className="size-6" />
              )}
            </motion.span>
            <div>
              <div className="text-2xl font-semibold text-gradient-gold">
                {s.value}
              </div>
              <div className="text-sm text-[var(--color-muted)]">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hackathon cards */}
      <Stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {hackathons.map((h) => (
          <StaggerItem key={h.name}>
            <TiltCard className="h-full">
              <div
                id={`hack-${slug(h.name)}`}
                className={cn(
                  "flex h-full overflow-hidden rounded-3xl glass transition-shadow duration-500",
                  spokenFocus === `hack-${slug(h.name)}` && "focus-active"
                )}
              >
                <div className="relative w-2/5 shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={h.image}
                    alt={h.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <motion.span
                      initial={{ scale: 0, rotate: -45, opacity: 0 }}
                      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.15 }}
                      whileHover={{ scale: 1.2, rotate: 12 }}
                      className="grid size-9 place-items-center rounded-full"
                      style={{
                        background: `color-mix(in oklab, ${medalColor[h.medal]} 20%, transparent)`,
                        color: medalColor[h.medal],
                      }}
                    >
                      {h.medal === "finalist" ? (
                        <Star className="size-4" />
                      ) : (
                        <Trophy className="size-4" />
                      )}
                    </motion.span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: `color-mix(in oklab, ${medalColor[h.medal]} 16%, transparent)`,
                        color: medalColor[h.medal],
                      }}
                    >
                      {h.result}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">{h.name}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{h.note}</p>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
