"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { scenes, comparisonData } from "@/lib/landing-data";

export default function SceneSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="scenes">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-[1200px] px-6 py-24"
      >
        {/* Section header */}
        <span className="inline-block text-sm font-mono text-accent-navy/50 mb-4">
          [02]
        </span>
        <h2 className="font-serif font-bold text-[clamp(32px,4vw,56px)] leading-[1.2] text-text-primary mb-4">
          两种决策场景
        </h2>
        <p className="text-lg text-text-secondary mb-16 max-w-2xl">
          同一个 AI 工作台，两种专业模式。切换模式自动切换系统策略和快捷入口。
        </p>

        {/* Two scene cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {scenes.map((scene, i) => {
            const accentColor = scene.accent === "amber" ? "accent-amber" : "accent-navy";
            const accentHex = scene.accent === "amber" ? "#d49a3e" : "#1a3a5c";
            return (
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white border border-border/60 relative group"
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ backgroundColor: accentHex }}
                />

                <div className="p-8 md:p-10 pl-12 md:pl-14">
                  {/* Header row */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{scene.icon}</span>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-text-primary">
                        {scene.title}
                      </h3>
                      <span className="text-sm text-text-secondary/60">{scene.forWho}</span>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <ul className="space-y-3 mb-8">
                    {scene.capabilities.map((cap, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.15 + j * 0.08 }}
                        className="flex items-start gap-2 text-base text-text-secondary"
                      >
                        <span className="text-accent-navy/40 mt-1 flex-shrink-0">▸</span>
                        {cap}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Example question */}
                  <div className="border-t border-border/50 pt-4 mb-6">
                    <span className="text-xs font-mono text-text-secondary/40 uppercase tracking-wider mb-2 block">
                      试试这样问
                    </span>
                    <p className="text-sm text-text-secondary italic leading-relaxed">
                      「{scene.exampleQuestion}」
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/chat?mode=${scene.id}`}
                    className={`inline-flex items-center gap-2 border px-6 py-3 text-sm font-medium
                      transition-all duration-300 group-hover:scale-[1.02]
                      ${
                        scene.accent === "amber"
                          ? "border-accent-amber text-accent-amber hover:bg-accent-amber hover:text-white"
                          : "border-accent-navy text-accent-navy hover:bg-accent-navy hover:text-white"
                      }`}
                  >
                    {scene.cta}
                    <span className="text-base">→</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-serif font-bold text-2xl text-text-primary mb-6">
            智升学 vs 通用 AI 聊天
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-mono text-text-secondary/60 uppercase tracking-wider w-1/4">
                    {" "}
                  </th>
                  <th className="text-left p-4 text-sm font-mono text-text-secondary/60 uppercase tracking-wider w-1/3">
                    通用 AI
                  </th>
                  <th className="text-left p-4 text-sm font-mono text-accent-navy/70 uppercase tracking-wider w-1/3">
                    智升学
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/50 hover:bg-surface-hover transition-colors duration-200"
                  >
                    <td className="p-4 text-base font-medium text-text-primary">
                      {row.dimension}
                    </td>
                    <td className="p-4 text-base text-text-secondary">{row.generic}</td>
                    <td className="p-4 text-base text-accent-navy font-medium">
                      {row.zhishengxue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
