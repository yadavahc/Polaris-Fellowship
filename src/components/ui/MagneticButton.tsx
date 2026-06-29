"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  onClick,
  href,
  className,
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.4);
    y.set(my * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
    variant === "primary"
      ? "text-white"
      : "border border-white/15 bg-white/5 text-[var(--color-fg)] hover:bg-white/10",
    className
  );

  const inner = (
    <motion.div
      ref={ref}
      data-cursor="hover"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={classes}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(100deg,var(--color-brand),var(--color-brand-2))] opacity-90 transition-opacity group-hover:opacity-100" />
      )}
      {variant === "primary" && (
        <span className="absolute inset-0 -z-10 rounded-full blur-lg bg-[linear-gradient(100deg,var(--color-brand),var(--color-brand-2))] opacity-50 transition-opacity group-hover:opacity-80" />
      )}
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}
