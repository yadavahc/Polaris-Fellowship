"use client";

import { motion } from "framer-motion";
import type { TimedCue } from "@/lib/cues";

/**
 * Word-by-word subtitle reveal. The number of revealed words tracks the
 * playback position inside the active cue, so captions "type out" in sync
 * with the speech.
 */
export function Subtitles({
  cue,
  time,
  compact = false,
}: {
  cue: TimedCue | null;
  time: number;
  compact?: boolean;
}) {
  if (!cue) return null;

  const span = Math.max(cue.end - cue.start, 0.1);
  const progress = Math.min(1, Math.max(0, (time - cue.start) / span));
  const revealed = Math.round(progress * cue.words.length);

  return (
    <div
      className={
        compact
          ? "text-center text-[13px] leading-snug"
          : "text-center text-lg leading-relaxed sm:text-2xl"
      }
    >
      <motion.p
        key={cue.text}
        className="font-medium [text-wrap:balance]"
      >
        {cue.words.map((w, i) => {
          const isActive = i === revealed - 1;
          const shown = i < revealed;
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0.12, y: 4 }}
              animate={{
                opacity: shown ? 1 : 0.18,
                y: shown ? 0 : 4,
              }}
              transition={{ duration: 0.25 }}
              className={
                isActive
                  ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.65)]"
                  : "text-white/85"
              }
            >
              {w}{" "}
            </motion.span>
          );
        })}
      </motion.p>
    </div>
  );
}
