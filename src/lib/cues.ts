import type { SectionId } from "./content";

/* =========================================================================
   Video → website sync timeline.

   Each cue maps a spoken segment of the intro video to:
     - the subtitle text shown in the floating player,
     - the website section that should be highlighted/scrolled to, and
     - (optionally) a specific element id to focus — e.g. a single project or
       achievement card — so the page jumps to exactly what's being mentioned.

   Timings are NOT hard-coded. Each cue is weighted by its character count
   (a better proxy for spoken duration than word count). Once the real video
   duration is known, cues are spread proportionally across the timeline
   (see buildTimeline) so the sync adapts to the actual video length.

   The player also exposes a live caption-offset nudge so the alignment can be
   dialed in to perfection in a couple of seconds.

   Want frame-accurate captions? Generate /public/video/intro.vtt with Whisper.
   ========================================================================= */

export type Cue = {
  section: SectionId;
  /** Optional DOM id to scroll to / highlight (more specific than section). */
  focus?: string;
  text: string;
};

export const rawCues: Cue[] = [
  { section: "about", text: "Hi, I'm Yadava H C, currently pursuing my Bachelor's in Information Science and Engineering at The Oxford College of Engineering." },
  { section: "about", text: "Beyond my résumé, I'm someone who genuinely enjoys solving problems through technology." },
  { section: "about", text: "I love taking an idea, breaking it into smaller challenges, and turning it into a working product. That's what motivates me every day." },
  { section: "journey", text: "I started with basic web development, but my curiosity shifted towards AI, backend engineering, and building complete products." },
  { section: "journey", text: "Whenever I learn a new technology, I use it in a real project instead of just completing a course. That's how I learn best." },
  { section: "projects", text: "Among the projects I've built, two stand out the most." },
  { section: "projects", focus: "project-legal-saathi", text: "The first is Legal Saathi — an AI-powered legal assistant combining OCR, Retrieval-Augmented Generation, vector databases, and multilingual AI to simplify legal documents." },
  { section: "projects", focus: "project-wattwatch", text: "The second is WattWatch — a smart campus energy platform that uses computer vision and AI to detect occupancy and reduce electricity wastage." },
  { section: "projects", text: "These projects challenged me to think beyond writing code and focus on solving real-world problems." },
  { section: "hackathons", text: "Hackathons have played a huge role in my journey — they taught me to build quickly, collaborate under pressure, and deliver under tight deadlines." },
  { section: "hackathons", focus: "hack-oxyhack-2026", text: "I've won multiple hackathons and ideathons — OxyHack, InnovateX, and the CSI Web Hackathon — and became a finalist at HackBLR against thousands of participants." },
  { section: "dsa", text: "I continuously strengthen my fundamentals — over 100 problems on GeeksforGeeks, 70-plus on LeetCode, and 125-plus on Take U Forward." },
  { section: "dsa", text: "For me, DSA isn't just about interviews — it's about thinking logically, analyzing trade-offs, and designing efficient solutions." },
  { section: "community", text: "I'm passionate about communities. Through OxyVerse I've made academic resources and scholarships easier to access, and I volunteer to give back." },
  { section: "vision", text: "Over the next ten years, my goal is to build AI-first products that solve meaningful problems at scale." },
  { section: "vision", text: "I don't just want to be a software engineer — I want to build technology that millions of people rely on." },
  { section: "vision", text: "Whether it's education, healthcare, legal tech, or developer tools, I want to create products with real impact." },
  { section: "vision", text: "That's why I'm excited about the Polaris Fellowship — to build, learn, and grow alongside ambitious builders. Thank you." },
];

export type TimedCue = Cue & {
  start: number;
  end: number;
  words: string[];
};

/** Character count is a better duration proxy than word count. */
const weight = (s: string) => Math.max(s.trim().length, 1);

/**
 * Distribute cues across the real duration proportional to their weights.
 * `lead` reserves an optional silent intro before the first word (default 0,
 * so captions start exactly with the audio).
 */
export function buildTimeline(duration: number, lead = 0): TimedCue[] {
  const usable = Math.max(duration - lead, 1);
  const weights = rawCues.map((c) => weight(c.text));
  const total = weights.reduce((a, b) => a + b, 0);
  let cursor = lead;
  return rawCues.map((c, i) => {
    const span = (weights[i] / total) * usable;
    const start = cursor;
    const end = i === rawCues.length - 1 ? duration : cursor + span;
    cursor = end;
    return { ...c, start, end, words: c.text.split(/\s+/) };
  });
}

export function activeCueIndex(timeline: TimedCue[], t: number): number {
  for (let i = 0; i < timeline.length; i++) {
    if (t >= timeline[i].start && t < timeline[i].end) return i;
  }
  return t <= 0 ? -1 : timeline.length - 1;
}
