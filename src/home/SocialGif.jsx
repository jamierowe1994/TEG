import React, { useEffect, useRef, useState } from 'react';

// A social icon that sits still as a flat mark and plays its little
// animation when you hover it. Two assets per platform and tone: a PNG of
// the first frame for rest, and the GIF for hover. Swapping the src is
// what restarts the GIF from frame one each time - a GIF that stays
// mounted just keeps looping from wherever it got to.

const PLATFORMS = {
  facebook:  { label: 'Facebook',  href: '#' },
  instagram: { label: 'Instagram', href: '#' },
  linkedin:  { label: 'LinkedIn',  href: '#' },
};

export const SOCIAL_KEYS = Object.keys(PLATFORMS);

export default function SocialGif({ platform, tone = 'white', size = 20, className = '' }) {
  const meta = PLATFORMS[platform];
  const [playing, setPlaying] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const base = `/social/${platform}-${tone}`;
  const start = () => { if (!reduced.current) setPlaying(true); };
  const stop = () => setPlaying(false);

  return (
    <a
      href={meta.href}
      aria-label={meta.label}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      className={`inline-flex items-center justify-center transition-transform hover:-translate-y-0.5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9565FF] rounded ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={playing ? `${base}.gif` : `${base}.png`}
        alt=""
        width={size}
        height={size}
        draggable={false}
        className="block w-full h-full object-contain select-none"
      />
    </a>
  );
}
