import React, { useLayoutEffect, useMemo, useState } from 'react';

// One line of display type that fills its container edge to edge. The ink
// of the letters is measured on a canvas (not the advance width, which
// carries the glyphs' side bearings), so the first and last letter sit
// flush with whatever margin the container has. `stretch` is a CSS
// font-stretch keyword or percentage; the Archivo face loads with its
// width axis so 'extra-condensed' (62.5%) and 'normal' (100%) both exist.

const SIZE = 200;
const BASELINE = 150;

function measureInk(text, weight, stretch) {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = `${weight} ${SIZE}px Archivo`;
  if ('fontStretch' in ctx) ctx.fontStretch = stretch;
  const m = ctx.measureText(text);
  if (!m.actualBoundingBoxRight) return null;
  return {
    x: -m.actualBoundingBoxLeft,
    w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight,
    y: BASELINE - m.actualBoundingBoxAscent,
    h: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
  };
}

// `gradient`: optional list of colour stops; the letters fill with a diagonal
// sweep from the first to the last instead of a flat colour.
export default function InkLine({ text, fill = '#131313', gradient, weight = 900, stretch = 'normal', className = '' }) {
  const gid = useMemo(() => `ink-${Math.random().toString(36).slice(2, 8)}`, []);
  const [box, setBox] = useState(null);
  useLayoutEffect(() => {
    const measure = () => {
      const b = measureInk(text, weight, stretch);
      if (b) setBox(b);
    };
    measure();
    document.fonts?.load(`${weight} ${SIZE}px Archivo`).then(measure);
    document.fonts?.ready.then(measure);
  }, [text, weight, stretch]);
  const b = box || { x: 0, y: 6, w: 1000, h: 144 };
  return (
    <svg
      viewBox={`${b.x} ${b.y} ${b.w} ${b.h}`}
      className={`block w-full h-auto overflow-visible ${className}`}
      aria-hidden="true"
    >
      {gradient && (
        <defs>
          <linearGradient id={gid} x1="0" y1="0.15" x2="1" y2="1">
            {gradient.map((c, i) => (
              <stop key={c} offset={`${(i / (gradient.length - 1)) * 100}%`} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
      )}
      <text
        x="0"
        y={BASELINE}
        fill={gradient ? `url(#${gid})` : fill}
        className="font-black-display"
        style={{ fontSize: SIZE, fontWeight: weight, fontStretch: stretch }}
      >
        {text}
      </text>
    </svg>
  );
}
