"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useSync } from "@/context/SyncContext";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const { registerScroller } = useSync();

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: reduce ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    registerScroller((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      // Center smaller targets (cards); top-align tall sections.
      const tall = el.getBoundingClientRect().height > window.innerHeight * 0.9;
      const offset = tall
        ? -80
        : -(window.innerHeight / 2 - el.getBoundingClientRect().height / 2);
      lenis.scrollTo(el, { offset, duration: 1.4 });
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [registerScroller]);

  return <>{children}</>;
}
