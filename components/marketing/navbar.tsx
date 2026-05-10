"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NavbarProps {
  links?: Array<{ label: string; href: string }>;
}

export default function Navbar({ links }: NavbarProps) {
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 60) {
        setVisible(true);
      } else if (currentY > lastScrollYRef.current && currentY > 100) {
        setVisible(false);
      } else if (currentY < lastScrollYRef.current) {
        setVisible(true);
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // No state dependency — uses ref for tracking

  const defaultLinks = links || [
    { label: "产品价值", href: "#values" },
    { label: "适用场景", href: "#scenes" },
    { label: "常见问题", href: "#faq" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-bg-warm/80 backdrop-blur-sm border-b border-border"
        >
          <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-serif font-bold text-2xl text-text-primary tracking-wide">
                Creator
              </span>
              <span className="hidden sm:inline text-sm text-text-secondary/60 font-mono">
                升学就业规划
              </span>
            </Link>

            <div className="flex items-center gap-6 md:gap-8 text-sm md:text-base text-text-secondary">
              {defaultLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-text-primary transition-colors duration-200 hidden sm:inline"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/chat"
                className="px-4 py-2 border border-accent-navy text-accent-navy text-sm font-medium
                  hover:bg-accent-navy hover:text-white transition-all duration-200"
              >
                开始使用
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
