"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { trustMetrics } from "@/lib/landing-data";

function CountUp({
  target,
  isInView,
  delay,
}: {
  target: number;
  isInView: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1500;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [target, delay, isInView]);

  return <>{isInView ? count : 0}</>;
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="border-t border-b border-border bg-bg-warm">
      <div className="mx-auto max-w-[1200px] px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {trustMetrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-ui font-semibold text-[clamp(28px,3vw,40px)] leading-none text-accent-navy mb-2">
              {metric.prefix && (
                <span className="text-lg md:text-xl text-text-secondary mr-1">
                  {metric.prefix}
                </span>
              )}
              {metric.value > 0 ? (
                <CountUp target={metric.value} isInView={isInView} delay={i * 0.15} />
              ) : null}
            </div>
            <div className="text-sm text-text-secondary/70 uppercase tracking-wider font-mono mb-1">
              {metric.label}
            </div>
            <div className="text-base text-text-secondary leading-snug">
              {metric.sublabel}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
