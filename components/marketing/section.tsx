"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionProps {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ number, title, subtitle, children, className = "", id }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mx-auto max-w-[1200px] px-6 py-24 ${className}`}
    >
      {/* Number tag */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-block text-sm font-mono text-accent-navy/50 mb-4"
      >
        [{number}]
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="font-serif font-bold text-[clamp(32px,4vw,56px)] leading-[1.2] text-text-primary mb-4"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg text-text-secondary mb-12 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}

      <div>{children}</div>
    </motion.section>
  );
}
