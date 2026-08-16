import React from 'react';
import { motion } from 'framer-motion';

// Draws a path in like a pen stroke — waits a beat, then sweeps across.
// Use inside any SVG: <DrawnPath d="..." delay={1.6} />
export function DrawnPath({ d, delay = 0, duration = 1.5, strokeWidth = 8, once = true }) {
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once, margin: '-10%' }}
      transition={{
        pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] },
        opacity: { delay, duration: 0.01 },
      }}
    />
  );
}

// Hand-drawn accents — the fun layer. All stroke-based, all currentColor,
// so they inherit whatever colour the parent sets (usually brand purple).

export function ScribbleCircle({ className = '' }) {
  return (
    <svg viewBox="0 0 200 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 44 C 24 12, 168 6, 188 34 C 200 52, 148 74, 66 72 C 22 70, 4 58, 12 42"
        stroke="currentColor" strokeWidth="4" strokeLinecap="round"
      />
    </svg>
  );
}

export function SquiggleUnderline({ className = '' }) {
  return (
    <svg viewBox="0 0 220 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 14 C 22 4, 40 22, 58 12 S 94 4, 112 14 S 148 22, 166 10 S 202 6, 216 14"
        stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className = '' }) {
  return (
    <svg viewBox="0 0 100 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 52 C 30 44, 62 34, 84 12 M84 12 l-16 2 M84 12 l-2 15"
        stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path d="M30 6 L34 26 L54 30 L34 34 L30 54 L26 34 L6 30 L26 26 Z" fill="currentColor" />
    </svg>
  );
}

export function PlusMark({ className = '' }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path d="M30 8 v16 M30 36 v16 M8 30 h16 M36 30 h16" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

// The big wandering squiggle that slides in from the edge of a section
export function WanderSquiggle({ className = '' }) {
  return (
    <svg viewBox="0 0 120 420" fill="none" className={className} aria-hidden="true">
      <path
        d="M112 8 C 40 60, 150 120, 70 170 C -10 220, 130 270, 58 320 C 6 356, 90 396, 48 414"
        stroke="currentColor" strokeWidth="10" strokeLinecap="round"
      />
    </svg>
  );
}