import type { AccentColor } from "./types";

/** cn() — Tailwind class merge helper (lightweight, no dependencies) */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Get accent color Tailwind classes for interactive elements */
export const ACCENT_STYLES: Record<
  AccentColor,
  { border: string; text: string; hover: string }
> = {
  navy: {
    border: "border-accent-navy",
    text: "text-accent-navy",
    hover: "hover:bg-accent-navy hover:text-white",
  },
  amber: {
    border: "border-accent-amber",
    text: "text-accent-amber",
    hover: "hover:bg-accent-amber hover:text-white",
  },
} as const;

/** Get the CSS color hex for a given accent */
export function getAccentHex(accent: AccentColor): string {
  return accent === "amber" ? "#d49a3e" : "#1a3a5c";
}
