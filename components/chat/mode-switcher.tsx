"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { modeDefinitions } from "@/lib/chat-content";
import type { ChatMode } from "@/lib/chat-content";

interface ModeSwitcherProps {
  currentMode: ChatMode;
  onSwitch: (mode: ChatMode) => void;
}

const modes: ChatMode[] = ["postgraduate", "employment"];

export default function ModeSwitcher({ currentMode, onSwitch }: ModeSwitcherProps) {
  const labelId = useId();

  return (
    <div role="group" aria-labelledby={labelId} className="flex bg-surface-hover border border-border/40">
      <span id={labelId} className="sr-only">选择规划模式</span>
      {modes.map((mode) => {
        const config = modeDefinitions[mode];
        const isActive = currentMode === mode;
        return (
          <button
            key={mode}
            onClick={() => onSwitch(mode)}
            role="tab"
            aria-selected={isActive}
            aria-pressed={isActive}
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "text-accent-navy"
                : "text-text-secondary/50 hover:text-text-secondary/80"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mode-switch-bg"
                className="absolute inset-0 bg-white border border-border/60 shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="text-sm" aria-hidden="true">{config.icon}</span>
              <span className="hidden sm:inline">{config.shortLabel}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
