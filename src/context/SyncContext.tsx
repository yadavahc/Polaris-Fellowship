"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { SectionId } from "@/lib/content";

type ScrollFn = (id: string) => void;

type SyncState = {
  /** Section the video is currently narrating (null when video idle). */
  spoken: SectionId | null;
  setSpoken: (s: SectionId | null) => void;
  /** Specific element id being narrated (e.g. a single project/achievement). */
  spokenFocus: string | null;
  setSpokenFocus: (id: string | null) => void;
  /** Whether the video is actively playing — enables auto-scroll. */
  videoPlaying: boolean;
  setVideoPlaying: (b: boolean) => void;
  /** Smooth-scroll to any element id (section or specific card). */
  scrollTo: ScrollFn;
  /** Internal: lets the smooth-scroll provider register its scroller. */
  registerScroller: (fn: ScrollFn) => void;
};

const SyncCtx = createContext<SyncState | null>(null);

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const [spoken, setSpoken] = useState<SectionId | null>(null);
  const [spokenFocus, setSpokenFocus] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const scrollerRef = useRef<ScrollFn>(() => {});

  const registerScroller = useCallback((fn: ScrollFn) => {
    scrollerRef.current = fn;
  }, []);

  const scrollTo = useCallback<ScrollFn>((id) => {
    scrollerRef.current(id);
  }, []);

  const value = useMemo(
    () => ({
      spoken,
      setSpoken,
      spokenFocus,
      setSpokenFocus,
      videoPlaying,
      setVideoPlaying,
      scrollTo,
      registerScroller,
    }),
    [spoken, spokenFocus, videoPlaying, scrollTo, registerScroller]
  );

  return <SyncCtx.Provider value={value}>{children}</SyncCtx.Provider>;
}

export function useSync() {
  const ctx = useContext(SyncCtx);
  if (!ctx) throw new Error("useSync must be used within SyncProvider");
  return ctx;
}
