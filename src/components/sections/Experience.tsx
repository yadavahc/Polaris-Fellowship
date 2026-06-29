"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { experience } from "@/lib/content";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading kicker="Experience" title="Where I've built and led" />

      <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {experience.map((e) => (
          <StaggerItem key={e.role}>
            <TiltCard className="h-full">
              <div className="flex h-full flex-col rounded-3xl glass p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-brand)]/15 text-[var(--color-brand-2)]">
                    <Briefcase className="size-5" />
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-[var(--color-faint)]">
                    {e.period}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{e.role}</h3>
                {e.link ? (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="text-sm text-[var(--color-brand-2)] underline-offset-4 hover:underline"
                  >
                    {e.org}
                  </a>
                ) : (
                  <p className="text-sm text-[var(--color-brand-2)]">{e.org}</p>
                )}
                <ul className="mt-4 space-y-2.5">
                  {e.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-muted)]"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
