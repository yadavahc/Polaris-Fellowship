"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle vertical parallax tied to scroll position. Formal depth, not flashy.
 * `amount` is the total px of travel across the viewport pass.
 */
export function Parallax({
  children,
  className,
  amount = 40,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
