"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  X,
  GripVertical,
  ExternalLink,
  Captions,
  Rewind,
  FastForward,
} from "lucide-react";
import { site } from "@/lib/content";
import { buildTimeline, activeCueIndex, type TimedCue } from "@/lib/cues";
import { useSync } from "@/context/SyncContext";
import { formatTime } from "@/lib/utils";
import { Subtitles } from "./Subtitles";

type Mode = "mini" | "theater";

export default function VideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setSpoken, setSpokenFocus, setVideoPlaying, scrollTo } = useSync();

  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState<Mode>("mini");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [showDrive, setShowDrive] = useState(false);
  const [error, setError] = useState(false);
  const [started, setStarted] = useState(false);
  // Live calibration: shift captions/sync earlier (−) or later (+), persisted.
  const [offset, setOffset] = useState(0);
  const [showOffset, setShowOffset] = useState(false);

  const lastTarget = useRef<string | null>(null);

  useEffect(() => {
    const saved = Number(localStorage.getItem("captionOffset"));
    if (!Number.isNaN(saved)) setOffset(saved);
  }, []);

  const nudge = (d: number) => {
    setOffset((o) => {
      const next = Math.round((o + d) * 100) / 100;
      localStorage.setItem("captionOffset", String(next));
      return next;
    });
  };

  const timeline: TimedCue[] = useMemo(
    () => (duration > 0 ? buildTimeline(duration) : []),
    [duration]
  );
  // Effective playback position used for all sync, including the calibration.
  const syncTime = time + offset;
  const cueIdx = timeline.length ? activeCueIndex(timeline, syncTime) : -1;
  const activeCue = cueIdx >= 0 ? timeline[cueIdx] : null;

  // Highlight + auto-navigate to whatever is being spoken about.
  useEffect(() => {
    if (!playing || !activeCue) return;
    setSpoken(activeCue.section);
    setSpokenFocus(activeCue.focus ?? null);
    // Prefer the specific element (a project/achievement) over the section.
    const target = activeCue.focus ?? activeCue.section;
    if (autoSync && lastTarget.current !== target) {
      lastTarget.current = target;
      scrollTo(target);
    }
  }, [activeCue, playing, autoSync, setSpoken, setSpokenFocus, scrollTo]);

  useEffect(() => {
    setVideoPlaying(playing);
    if (!playing) {
      setSpoken(null);
      setSpokenFocus(null);
    }
  }, [playing, setVideoPlaying, setSpoken, setSpokenFocus]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => setError(true));
      setStarted(true);
    } else {
      v.pause();
    }
  }, []);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const t = (Number(e.target.value) / 1000) * duration;
    v.currentTime = t;
    setTime(t);
    lastTarget.current = null;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        data-cursor="hover"
        className="fixed bottom-6 right-6 z-[8000] flex items-center gap-2 rounded-full glass-strong px-4 py-3 text-sm font-medium ring-glow"
      >
        <Play className="size-4 text-[var(--color-brand-2)]" /> Play intro
      </button>
    );
  }

  const theater = mode === "theater";

  return (
    <>
      <motion.div
        drag={!theater}
        dragMomentum={false}
        dragElastic={0.12}
        whileDrag={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={
          theater
            ? "fixed inset-4 z-[8500] m-auto flex h-fit max-h-[90vh] w-[min(960px,92vw)] flex-col overflow-hidden rounded-3xl glass-strong ring-glow"
            : "fixed bottom-6 right-6 z-[8000] w-[min(380px,90vw)] overflow-hidden rounded-2xl glass-strong ring-glow"
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            {!theater && (
              <GripVertical className="size-4 cursor-grab text-[var(--color-faint)]" />
            )}
            <span className="relative flex size-2">
              {playing && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-brand-3)] opacity-75" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-[var(--color-brand-3)]" />
            </span>
            <span className="font-medium text-[var(--color-fg)]">
              {site.name}
            </span>
            <span className="hidden sm:inline">· intro</span>
          </div>
          <div className="flex items-center gap-1">
            <IconBtn
              title={captionsOn ? "Hide captions" : "Show captions"}
              active={captionsOn}
              onClick={() => setCaptionsOn((s) => !s)}
            >
              <Captions className="size-4" />
            </IconBtn>
            <IconBtn
              title={theater ? "Minimize" : "Theater mode"}
              onClick={() => setMode(theater ? "mini" : "theater")}
            >
              {theater ? (
                <Minimize2 className="size-4" />
              ) : (
                <Maximize2 className="size-4" />
              )}
            </IconBtn>
            <IconBtn title="Close" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </IconBtn>
          </div>
        </div>

        {/* Video */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            src={site.localVideo}
            playsInline
            preload="metadata"
            className={theater ? "max-h-[64vh] w-full object-contain" : "aspect-video w-full object-cover"}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setError(true)}
          />

          {/* Big play overlay before first play */}
          {!started && !error && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-[2px]"
            >
              <span className="grid size-16 place-items-center rounded-full bg-white/15 backdrop-blur ring-glow transition-transform hover:scale-110">
                <Play className="size-7 translate-x-0.5 text-white" />
              </span>
            </button>
          )}

          {/* Error / fallback */}
          {error && (
            <div className="absolute inset-0 grid place-items-center bg-black/80 p-4 text-center text-sm">
              <div>
                <p className="text-[var(--color-muted)]">
                  Local video unavailable.
                </p>
                {site.driveVideoUrl ? (
                  <button
                    onClick={() => setShowDrive(true)}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20"
                  >
                    <ExternalLink className="size-4" /> Watch on Drive
                  </button>
                ) : null}
              </div>
            </div>
          )}

          {/* Caption overlay */}
          {captionsOn && activeCue && playing && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10">
              <Subtitles cue={activeCue} time={syncTime} compact={!theater} />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="px-3 py-2.5">
          <input
            type="range"
            min={0}
            max={1000}
            value={duration ? (time / duration) * 1000 : 0}
            onChange={onSeek}
            className="mb-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[var(--color-brand)] [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-brand-2)]"
          />
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <IconBtn title={playing ? "Pause" : "Play"} onClick={togglePlay} solid>
                {playing ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4 translate-x-px" />
                )}
              </IconBtn>
              <IconBtn title="Mute" onClick={toggleMute}>
                {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </IconBtn>
              <span className="ml-1 font-mono text-[11px] text-[var(--color-faint)]">
                {formatTime(time)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowOffset((s) => !s)}
                data-cursor="hover"
                title="Align captions to the audio"
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  showOffset || offset !== 0
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-[var(--color-faint)]"
                }`}
              >
                Align
              </button>
              <button
                onClick={() => setAutoSync((s) => !s)}
                data-cursor="hover"
                title="Auto-navigate the page to what I'm talking about"
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  autoSync ? "bg-white/15 text-white" : "bg-white/5 text-[var(--color-faint)]"
                }`}
              >
                Sync {autoSync ? "on" : "off"}
              </button>
            </div>
          </div>

          {/* Caption alignment calibration */}
          <AnimatePresence initial={false}>
            {showOffset && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-faint)]">
                    Caption timing
                  </span>
                  <div className="flex items-center gap-1">
                    <IconBtn title="Captions earlier" onClick={() => nudge(-0.25)}>
                      <Rewind className="size-3.5" />
                    </IconBtn>
                    <button
                      onClick={() => nudge(-offset)}
                      className="min-w-14 rounded-md bg-black/40 px-2 py-1 text-center font-mono text-[11px] text-white"
                      title="Reset"
                    >
                      {offset > 0 ? "+" : ""}
                      {offset.toFixed(2)}s
                    </button>
                    <IconBtn title="Captions later" onClick={() => nudge(0.25)}>
                      <FastForward className="size-3.5" />
                    </IconBtn>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {site.driveVideoUrl && (
            <button
              onClick={() => setShowDrive(true)}
              className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[var(--color-faint)] hover:text-[var(--color-fg)]"
            >
              <ExternalLink className="size-3" /> Watch on Google Drive
            </button>
          )}
        </div>
      </motion.div>

      {/* Backdrop for theater mode */}
      <AnimatePresence>
        {theater && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMode("mini")}
            className="fixed inset-0 z-[8400] bg-black/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Google Drive modal */}
      <AnimatePresence>
        {showDrive && site.driveVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDrive(false)}
            className="fixed inset-0 z-[9500] grid place-items-center bg-black/85 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-[min(960px,92vw)] overflow-hidden rounded-2xl glass-strong p-1"
            >
              <button
                onClick={() => setShowDrive(false)}
                className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-black/60 hover:bg-black/80"
              >
                <X className="size-4" />
              </button>
              <iframe
                src={site.driveVideoUrl}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  active,
  solid,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  active?: boolean;
  solid?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      data-cursor="hover"
      className={`grid size-8 place-items-center rounded-full transition-colors ${
        solid
          ? "bg-[var(--color-brand)] text-white hover:opacity-90"
          : active
            ? "bg-[var(--color-brand)]/20 text-[var(--color-brand-2)]"
            : "text-[var(--color-muted)] hover:bg-white/10 hover:text-[var(--color-fg)]"
      }`}
    >
      {children}
    </button>
  );
}
