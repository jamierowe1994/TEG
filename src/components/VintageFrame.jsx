import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// A photo put through a film treatment — but not evenly. The room behind is
// aged and muted; the people in it stay warm and bright, the way the shot of
// Shaun on the home page reads. That split needs a subject mask (a PNG whose
// white area covers the people), generated per photo and passed in as `mask`.
// Without one it falls back to a single, gentler pass over the whole frame.
//
// Stacking, bottom to top: the muted room, its amber wash, the warm people
// on top of that wash, then grain and vignette over everything so the two
// passes read as one photograph.

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='160' height='160' filter='url(%23n)' opacity='0.55'/></svg>\")";

const ROOM = 'sepia(0.42) saturate(0.5) contrast(1.02) brightness(0.96)';
const PEOPLE = 'sepia(0.1) saturate(1.12) contrast(1.05) brightness(1.07)';
const WHOLE = 'sepia(0.3) saturate(0.78) contrast(1.05) brightness(1.02)';

export default function VintageFrame({
  src,
  video = false,
  poster,
  mask,
  className = '',
  strength = 1,
  alt = '',
  parallax = false,
}) {
  // the picture drifts against its frame as the frame crosses the viewport.
  // Both passes travel together inside one wrapper — split them and the mask
  // would slide off the person it was cut for.
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // the overhang has to out-reach the travel or the frame shows daylight at
  // the top and bottom of the drift: 13% of a 140%-tall wrapper is 18.2% of
  // the frame, and the wrapper hangs 20% past each edge.
  const drift = useTransform(scrollYProgress, [0, 1], ['-13%', '13%']);

  const Media = ({ filter, style }) =>
    video ? (
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter, ...style }}
      />
    ) : (
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter, ...style }}
      />
    );

  const maskStyle = mask
    ? {
        WebkitMaskImage: `url(${mask})`,
        maskImage: `url(${mask})`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }
    : null;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className={parallax ? 'absolute inset-x-0 -inset-y-[20%] will-change-transform' : 'absolute inset-0'}
        style={parallax ? { y: drift } : undefined}
      >
        {/* the room, aged back */}
        <Media filter={mask ? ROOM : WHOLE} />

      {/* amber wash — sits under the people, so only the room takes it */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            'linear-gradient(140deg, rgba(255,186,105,0.8) 0%, rgba(255,150,80,0.4) 45%, rgba(70,42,18,0.55) 100%)',
          opacity: 0.9 * strength,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#8a6b4a', opacity: 0.14 * strength, mixBlendMode: 'lighten' }}
      />

        {/* the people, kept warm and bright on top of it */}
        {mask && <Media filter={PEOPLE} style={maskStyle} />}
      </motion.div>

      {/* grain and vignette run over both passes, so it reads as one photo */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: GRAIN, opacity: 0.26 * strength }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(22,13,5,0.6) 100%)',
          opacity: strength,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 88% 12%, rgba(255,206,140,0.32) 0%, transparent 48%)',
          opacity: strength,
        }}
      />
    </div>
  );
}
