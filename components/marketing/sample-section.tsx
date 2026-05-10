"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { outputSamples } from "@/lib/landing-data";

export default function SampleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      {/* Intro */}
      <p className="text-lg text-text-secondary mb-10 max-w-2xl">
        Creator 的每一次回答都遵循统一的规划模板，确保你得到的不是零散建议，而是一份可执行的结构化计划：
      </p>

      {/* Sample cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outputSamples.map((sample, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
            className="bg-white border border-border/60 relative overflow-hidden group"
          >
            {/* Left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-navy" />

            <div className="p-6 pl-10">
              <span className="text-xs font-mono text-accent-navy/50 uppercase tracking-[0.2em] mb-3 block">
                {sample.label}
              </span>
              <p className="text-base text-text-primary leading-relaxed">
                {sample.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-10 text-sm text-text-secondary/60 font-mono"
      >
        以上为示例输出格式，实际回答会根据你的具体问题动态生成。
      </motion.p>
    </div>
  );
}
