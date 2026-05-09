"use client";

import { motion } from "framer-motion";

interface QuickPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export default function QuickPrompts({ prompts, onSelect }: QuickPromptsProps) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-mono text-text-secondary/40 uppercase tracking-wider block text-center mb-3">
        快捷提问
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
        {prompts.map((prompt, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            onClick={() => onSelect(prompt)}
            className="text-left px-4 py-3 text-sm bg-white border border-border/60
              hover:border-accent-navy/30 hover:bg-surface-hover
              transition-all duration-200 text-text-secondary hover:text-text-primary
              leading-relaxed group"
          >
            <span className="text-accent-navy/30 mr-2 group-hover:text-accent-navy/60 transition-colors">—</span>
            {prompt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
