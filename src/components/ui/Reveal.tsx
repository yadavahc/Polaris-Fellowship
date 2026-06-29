"use client";

import { motion, type Variant, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Dir = "up" | "down" | "left" | "right" | "scale" | "blur";

const base: Record<Dir, { hidden: Variant; show: Variant }> = {
  up: { hidden: { y: 48, opacity: 0 }, show: { y: 0, opacity: 1 } },
  down: { hidden: { y: -48, opacity: 0 }, show: { y: 0, opacity: 1 } },
  left: { hidden: { x: 60, opacity: 0 }, show: { x: 0, opacity: 1 } },
  right: { hidden: { x: -60, opacity: 0 }, show: { x: 0, opacity: 1 } },
  scale: { hidden: { scale: 0.9, opacity: 0 }, show: { scale: 1, opacity: 1 } },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)", y: 24 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

export function Reveal({
  children,
  className,
  dir = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.3,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  dir?: Dir;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}) {
  const variants: Variants = {
    hidden: base[dir].hidden,
    show: {
      ...base[dir].show,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { y: 36, opacity: 0, filter: "blur(8px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Stagger({
  children,
  className,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
