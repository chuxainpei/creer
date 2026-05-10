"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { targetAudiences } from "@/lib/landing-data";

export default function AudienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {targetAudiences.map((audience, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white border border-border/60 p-6 hover:border-accent-navy/20 transition-colors duration-300"
          >
            <span className="text-3xl mb-3 block">{audience.icon}</span>
            <h3 className="font-serif font-bold text-lg text-text-primary mb-2">
              {audience.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {audience.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
