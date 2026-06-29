"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ImageFrame({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  rounded = "rounded-2xl",
  ratio = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  rounded?: string;
  ratio?: string;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden border border-white/10 bg-white/5",
        rounded,
        ratio,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-700 group-hover:scale-105",
          imgClassName
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      {/* sheen */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.18),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />
    </motion.div>
  );
}
