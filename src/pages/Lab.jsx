import React, { useState } from 'react';
import ParticleButton from '../lab/ParticleButton';

// Prototype only - not linked from anywhere and not part of the site.

function Slider({ label, value, set, min, max, step }) {
  return (
    <label className="flex items-center gap-3 text-[0.7rem] tracking-[0.1em] uppercase text-white/40">
      <span className="w-20 shrink-0">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(parseFloat(e.target.value))} className="w-44 accent-[#9565FF]" />
      <span className="w-14 text-white/60 tabular-nums">{value}</span>
    </label>
  );
}

export default function Lab() {
  const [points, setPoints] = useState(2400);
  const [grain, setGrain] = useState(0.1);

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-12 py-16">
      <p className="text-[0.6rem] tracking-[0.25em] uppercase text-white/35">Prototype</p>
      <h1 className="mt-2 font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl">
        Let&rsquo;s talk
      </h1>
      <p className="mt-4 max-w-2xl text-white/45 text-sm leading-relaxed">
        Hover it. The particles break formation, swirl, and whip back together
        as &ldquo;Let&rsquo;s go&rdquo;. Come off it and they travel back. Jet
        black face, light grey rim so it holds its own against the background.
      </p>

      <div className="mt-14 flex flex-wrap items-center gap-14">
        <ParticleButton points={points} grain={grain} />
        <ParticleButton points={points} grain={grain} width={300} height={64}
          font="600 30px Inter, system-ui, sans-serif" />
      </div>

      <div className="mt-14 flex flex-col gap-3">
        <Slider label="Particles" value={points} set={setPoints} min={400} max={6000} step={100} />
        <Slider label="Grain" value={grain} set={setGrain} min={0} max={0.35} step={0.01} />
      </div>

      <div className="mt-20 border-t border-white/10 pt-10">
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-white/30">In place</p>
        <div className="mt-5 flex items-center justify-between max-w-[1100px] rounded-2xl bg-black px-6 py-5">
          <span className="text-white/40 text-sm">nav, right hand side</span>
          <ParticleButton points={points} grain={grain} />
        </div>
      </div>

      <p className="mt-16 text-white/25 text-xs">/lab - prototype, not linked from the site.</p>
    </div>
  );
}
