"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { community } from "@/lib/content";
import { Users } from "lucide-react";

export default function Community() {
  return (
    <Section id="community">
      <SectionHeading
        kicker="Community & Leadership"
        title="Giving back, and bringing people together"
      />

      <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {community.map((c, i) => (
          <StaggerItem key={c.title} className={i === 0 ? "lg:col-span-2" : ""}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative h-full overflow-hidden rounded-3xl glass"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
                    <Users className="size-3.5 text-[var(--color-brand-2)]" />
                    {c.role}
                  </div>
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <p className="mt-1 max-w-md text-sm text-[var(--color-muted)]">
                    {c.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
