import React, { useRef, useCallback, useEffect } from 'react';

// A dark glass button lit from one side, after the uixamjad "Get Started"
// shot. The face is the page's own #111111 - nothing separates it from the
// background except light: a bloom behind it, a heavy shadow under it, a
// hairline rim, a patch of mist, and a few stars inside.
//
// All of that light comes from ONE point. The mist, the bloom and the rim's
// bright spot all sit at the same place and move together, so the far side
// of the button stays as black as the page and the light travels across it
// as the cursor moves round the edge. Drive them separately and the left
// side lifts off the background, which is exactly what looked wrong.

const STARS = [
  { x: 10, y: 30, s: 1.5, o: 0.85, d: 0.0 },
  { x: 16, y: 66, s: 1,   o: 0.5,  d: 1.3 },
  { x: 24, y: 24, s: 1,   o: 0.6,  d: 2.1 },
  { x: 31, y: 74, s: 1,   o: 0.4,  d: 0.9 },
  { x: 70, y: 22, s: 1,   o: 0.55, d: 2.6 },
  { x: 79, y: 30, s: 1.5, o: 0.9,  d: 0.7 },
  { x: 86, y: 64, s: 1,   o: 0.7,  d: 1.9 },
  { x: 91, y: 42, s: 1,   o: 0.55, d: 2.3 },
  { x: 62, y: 78, s: 1,   o: 0.45, d: 1.6 },
  { x: 48, y: 18, s: 1,   o: 0.4,  d: 0.4 },
];

// where the light rests when nothing is hovering: bottom right, as in
// the reference, so the left side sits flat against the page
const REST = { x: 0.84, y: 0.94 };

export default function GlowButton({
  children = "Let's talk",
  href,
  onClick,
  width = 158,
  height = 46,
  className = '',
}) {
  const boxRef = useRef(null);
  const cur = useRef({ x: REST.x * width, y: REST.y * height });
  const goal = useRef({ x: REST.x * width, y: REST.y * height });
  const raf = useRef(0);

  // one smoothed point, written to CSS variables, that everything reads
  const tick = useCallback(() => {
    const c = cur.current, g = goal.current, el = boxRef.current;
    if (!el) return;
    c.x += (g.x - c.x) * 0.16;
    c.y += (g.y - c.y) * 0.16;
    el.style.setProperty('--lx', `${c.x.toFixed(2)}px`);
    el.style.setProperty('--ly', `${c.y.toFixed(2)}px`);
    if (Math.abs(g.x - c.x) > 0.2 || Math.abs(g.y - c.y) > 0.2) {
      raf.current = requestAnimationFrame(tick);
    } else {
      raf.current = 0;
    }
  }, []);
  const nudge = useCallback(() => { if (!raf.current) raf.current = requestAnimationFrame(tick); }, [tick]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // the light hugs the rim: the cursor is projected onto whichever edge is
  // nearest, so it slides along the sides and round the corners
  const onMove = useCallback((e) => {
    const r = boxRef.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const dl = x, dr = r.width - x, dt = y, db = r.height - y;
    const m = Math.min(dl, dr, dt, db);
    let px = x, py = y;
    if (m === dl) px = 0; else if (m === dr) px = r.width;
    else if (m === dt) py = 0; else py = r.height;
    goal.current = { x: px, y: py };
    nudge();
  }, [nudge]);

  const onLeave = useCallback(() => {
    goal.current = { x: REST.x * width, y: REST.y * height };
    nudge();
  }, [nudge, width, height]);

  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      ref={boxRef}
      {...(href ? { href } : { type: 'button' })}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ width, height, '--lx': `${(REST.x * width).toFixed(2)}px`, '--ly': `${(REST.y * height).toFixed(2)}px` }}
      className={`group relative inline-flex items-center justify-center select-none rounded-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9565FF] ${className}`}
    >
      {/* the bloom behind: sits at the light point, so it only lifts one side */}
      <span
        aria-hidden
        className="absolute pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          left: 'calc(var(--lx) - 130px)', top: 'calc(var(--ly) - 90px)',
          width: 260, height: 180,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* the face: the page's own colour, with a heavy shadow under it */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl overflow-hidden bg-[#111111]"
        style={{ boxShadow: '0 22px 44px -14px rgba(0,0,0,0.95), 0 8px 18px -8px rgba(0,0,0,0.8)' }}
      >
        {/* the mist, at the light point */}
        <span
          className="absolute w-36 h-36 rounded-full pointer-events-none
            opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            left: 'calc(var(--lx) - 72px)', top: 'calc(var(--ly) - 72px)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.1) 38%, transparent 68%)',
            filter: 'blur(12px)',
          }}
        />

        {/* stars, all inside the face so the clip keeps them in */}
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white pointer-events-none twinkle"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.s, height: s.s,
              opacity: s.o,
              animationDelay: `${s.d}s`,
              boxShadow: s.s > 1 ? '0 0 4px rgba(255,255,255,0.7)' : 'none',
            }}
          />
        ))}
      </span>

      {/* the rim: a hairline whose bright spot sits at the light point and
          falls away to almost nothing on the far side */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          padding: 1,
          background: 'radial-gradient(circle at var(--lx) var(--ly), rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0.07) 60%, rgba(255,255,255,0.03) 100%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* the label, with a quiet glow */}
      <span
        className="relative z-10 text-[0.86rem] font-medium tracking-[0.01em] text-[#ECECEC]"
        style={{ textShadow: '0 0 10px rgba(255,255,255,0.35), 0 0 2px rgba(255,255,255,0.4)' }}
      >
        {children}
      </span>
    </Tag>
  );
}
