import React, { useState } from 'react';
import ParticleMark from '../lab/ParticleMark';

// Prototype only - not linked from anywhere and not part of the site.
// Two questions to answer here: does the TEG mark survive being made of
// static, and is the effect any use at button size.

function Slider({ label, value, set, min, max, step }) {
  return (
    <label className="flex items-center gap-3 text-[0.7rem] tracking-[0.1em] uppercase text-white/45">
      <span className="w-24 shrink-0">{label}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(parseFloat(e.target.value))}
        className="w-44 accent-[#9565FF]"
      />
      <span className="w-12 text-white/70 tabular-nums">{value}</span>
    </label>
  );
}

export default function Lab() {
  const [drift, setDrift] = useState(5.2);
  const [grain, setGrain] = useState(0.0075);
  const [count, setCount] = useState(90000);
  const [speed, setSpeed] = useState(0.22);
  const [sheen, setSheen] = useState(0.75);
  const [hot, setHot] = useState(false);

  return (
    <div className="bg-[#111111] text-white min-h-screen px-6 md:px-12 py-16">
      <p className="text-[0.6rem] tracking-[0.25em] uppercase text-white/35">Prototype</p>
      <h1 className="mt-2 font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl">
        The mark, made of static
      </h1>
      <p className="mt-4 max-w-xl text-white/45 text-sm leading-relaxed">
        No metal shader anywhere in this. Every point is white and additive, so
        the shape is drawn purely by where they crowd and where they thin. The
        shading comes from treating a blurred copy of the logo as a dome and
        lighting it from the top left.
      </p>

      {/* ---- the logo ---- */}
      <div className="mt-12 rounded-lg bg-black/40 overflow-hidden">
        <ParticleMark
          src="/teg-logo-white.png"
          width={1100}
          height={560}
          count={count}
          drift={drift}
          grain={grain}
          speed={speed}
          sheen={sheen}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Slider label="Drift" value={drift} set={setDrift} min={0} max={16} step={0.2} />
        <Slider label="Grain" value={grain} set={setGrain} min={0.002} max={0.03} step={0.0005} />
        <Slider label="Density" value={count} set={setCount} min={20000} max={200000} step={5000} />
        <Slider label="Speed" value={speed} set={setSpeed} min={0} max={1} step={0.02} />
        <Slider label="Sheen" value={sheen} set={setSheen} min={0} max={1} step={0.05} />
      </div>

      {/* ---- the monogram on its own ---- */}
      <h2 className="mt-20 font-black-display font-extrabold uppercase tracking-tight text-2xl md:text-3xl">
        The monogram alone
      </h2>
      <p className="mt-3 max-w-xl text-white/45 text-sm leading-relaxed">
        The effect wants mass. The Apple mark is one solid blob, which is why
        it can carry a bevel and a falloff; our wordmark is thin strokes, so it
        can only ever read as sandy type. The monogram on its own has more to
        shade, and gets closer to the reference.
      </p>
      <div className="mt-8 rounded-lg bg-black/40 overflow-hidden max-w-[680px]">
        <ParticleMark
          src="/teg-logo-white.png"
          crop={[0, 0, 0.31, 1]}
          width={760}
          height={620}
          count={count}
          drift={drift}
          grain={grain}
          speed={speed}
          sheen={sheen}
          padding={0.12}
        />
      </div>

      {/* ---- the button ---- */}
      <h2 className="mt-20 font-black-display font-extrabold uppercase tracking-tight text-2xl md:text-3xl">
        Let&rsquo;s talk
      </h2>
      <p className="mt-3 max-w-xl text-white/45 text-sm leading-relaxed">
        Same treatment at nav scale. The left one runs the effect the whole
        time; the right one is a normal button until you hover it, which is
        the version I would actually ship - a call to action has to be legible
        before it is clever.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-10">
        {/* always on */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/40 px-2 w-[240px]">
            <ParticleMark
              text="Let's talk"
              font="600 64px Inter, system-ui, sans-serif"
              width={480} height={150} count={16000}
              drift={drift * 0.5} grain={grain * 2.2} speed={speed} padding={0.16}
            />
          </div>
          <p className="mt-3 text-[0.6rem] tracking-[0.18em] uppercase text-white/30">Always on</p>
        </div>

        {/* settles to a real button until hovered */}
        <div className="text-center">
          <button
            onMouseEnter={() => setHot(true)}
            onMouseLeave={() => setHot(false)}
            className="relative w-[240px] h-[54px] rounded-xl overflow-hidden bg-white text-[#111111]
              text-sm font-medium transition-colors duration-300 hover:bg-transparent hover:text-white
              border border-white/15"
          >
            <span className={`transition-opacity duration-300 ${hot ? 'opacity-0' : 'opacity-100'}`}>
              Let&rsquo;s talk
            </span>
            {hot && (
              <span className="absolute inset-0 flex items-center justify-center">
                <ParticleMark
                  text="Let's talk"
                  font="600 64px Inter, system-ui, sans-serif"
                  width={480} height={150} count={16000}
                  drift={9} grain={grain * 2.2} speed={0.5} padding={0.16}
                />
              </span>
            )}
          </button>
          <p className="mt-3 text-[0.6rem] tracking-[0.18em] uppercase text-white/30">On hover</p>
        </div>
      </div>

      <p className="mt-16 text-white/25 text-xs">
        /lab - prototype, not linked from the site.
      </p>
    </div>
  );
}
