"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { valueProps } from "@/lib/landing-data";

function ValuePropCard({
  prop,
  index,
}: {
  prop: (typeof valueProps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="mx-auto max-w-[1200px] px-6 py-24"
      id={index === 0 ? "values" : undefined}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: visual */}
        <div className={`order-2 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
          <div className="relative">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 bg-white border border-border/60 flex items-center justify-center
                shadow-[0_8px_24px_-6px_rgba(0,0,0,0.06)]"
            >
              <span className="text-4xl">{prop.icon}</span>
            </motion.div>

            <div className="absolute -bottom-4 left-10 w-px h-16 bg-accent-navy/20 hidden lg:block" />

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 3.5 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-8 left-16 w-48 bg-white border border-border/40 p-4
                shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hidden lg:block"
            >
              <span className="text-xs font-mono text-accent-navy/50 uppercase tracking-wider">
                核心能力
              </span>
              <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                {prop.subtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right: content */}
        <div className={`order-1 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
          <span className="text-sm font-mono text-accent-navy/50 mb-4 block">
            [{prop.number}]
          </span>
          <h2 className="font-serif font-bold text-[clamp(28px,3.5vw,48px)] leading-[1.15] text-text-primary mb-4">
            {prop.title}
          </h2>
          <p className="text-lg text-text-secondary mb-4 font-medium">
            {prop.subtitle}
          </p>
          <p className="text-base text-text-secondary/80 leading-relaxed">
            {prop.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ValueSections() {
  return (
    <>
      {valueProps.map((prop, i) => (
        <ValuePropCard key={prop.id} prop={prop} index={i} />
      ))}
    </>
  );
}
