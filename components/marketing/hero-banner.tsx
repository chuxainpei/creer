"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/lib/landing-data";

/* ─────────────────────────────────────────────
   Magnetic Button — cursor-attracted micro-interaction
   ───────────────────────────────────────────── */
function MagneticButton({
  children,
  href,
  accent = "navy",
}: {
  children: React.ReactNode;
  href: string;
  accent?: "navy" | "amber";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  const accentColors =
    accent === "amber"
      ? "border-accent-amber text-accent-amber hover:bg-accent-amber/10"
      : "border-accent-navy text-accent-navy hover:bg-accent-navy/10";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={`inline-flex items-center gap-2 border px-8 py-4 text-base font-medium
        transition-colors duration-300 cursor-pointer ${accentColors}`}
    >
      {children}
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Hero Banner — with slide carousel & parallax
   ───────────────────────────────────────────── */
export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const slide = heroSlides[current];
  const accentColor =
    slide.accent === "amber" ? "text-accent-amber" : "text-accent-navy";

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-bg-warm" />
        {/* Floating orbs for depth */}
        <motion.div
          animate={{
            x: mousePos.x * -30,
            y: mousePos.y * -30,
          }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent-navy/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePos.x * 20,
            y: mousePos.y * 20,
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-amber/8 blur-3xl"
        />
      </div>

      {/* Top half subtle gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(250,248,241,0.9) 0%, rgba(250,248,241,0.5) 40%, rgba(250,248,241,0) 65%)",
        }}
      />

      {/* Text overlay with counter-parallax */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Product name */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block text-sm font-mono text-accent-navy/50 uppercase tracking-[0.2em] mb-6"
            >
              Creator Career Guidance
            </motion.span>

            {/* Tagline */}
            <h1 className="font-serif font-bold text-[clamp(42px,5.5vw,80px)] leading-[1.12] text-text-primary mb-4">
              {slide.tagline}
              <br />
              <span className={accentColor}>{slide.taglineEmphasis}</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
              {slide.description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton href="/chat" accent={slide.accent}>
                进入 AI 规划工作台
                <span className="text-lg">→</span>
              </MagneticButton>
              <a
                href="#scenes"
                className="text-base text-text-secondary/60 hover:text-text-secondary transition-colors duration-200 underline-offset-4 hover:underline"
              >
                了解详情 ↓
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              i === current
                ? "bg-accent-navy scale-125"
                : "bg-accent-navy/25 hover:bg-accent-navy/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
