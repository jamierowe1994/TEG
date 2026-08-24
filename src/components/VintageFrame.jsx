import React from 'react';

// A photo (or film) put through a film treatment: warmed and slightly faded
// in the filter, then washed with amber, lifted in the blacks, grained and
// vignetted. It's what gives the shot of Shaun on the home page its age —
// tungsten warmth, soft contrast, dust in the light.

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='160' height='160' filter='url(%23n)' opacity='0.55'/></svg>\")";

export default function VintageFrame({
  src,
  video = false,
  poster,
  className = '',
  strength = 1,
  alt = '',
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {video ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'sepia(0.5) saturate(0.7) contrast(1.08) brightness(1.04) hue-rotate(-8deg)' }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'sepia(0.5) saturate(0.7) contrast(1.08) brightness(1.04) hue-rotate(-8deg)' }}
        />
      )}

      {/* amber wash — the warmth of old stock */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            'linear-gradient(140deg, rgba(255,186,105,0.85) 0%, rgba(255,146,70,0.42) 45%, rgba(70,42,18,0.6) 100%)',
          opacity: 0.95 * strength,
        }}
      />

      {/* lifted blacks — nothing on film is ever truly black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#8a6b4a', opacity: 0.16 * strength, mixBlendMode: 'lighten' }}
      />

      {/* grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: GRAIN, opacity: 0.34 * strength }}
      />

      {/* vignette, and a little light burn in one corner */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 34%, rgba(22,13,5,0.68) 100%)',
          opacity: strength,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 88% 12%, rgba(255,206,140,0.4) 0%, transparent 48%)',
          opacity: strength,
        }}
      />
    </div>
  );
}
