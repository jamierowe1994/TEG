import React, { useEffect, useRef, useState } from 'react';

// "Let's talk" written in particles. Hover and every particle leaves on its
// OWN orbit - its own centre, radius, speed and direction - so the crowd
// scatters rather than the word spinning. They stream out past the edge of
// the button, then whip back into formation as "Let's go".
//
// The first version rotated everything about one shared centre, which is a
// twirl filter, not a swarm. Independent orbits are the whole difference.
//
// Fast particles draw as hairline streaks (previous position to current),
// slow ones as points, so the scatter reads as motion and the settled word
// reads as type.

const DPR = 2;
const PAD = 54;   // room outside the button for particles to fly into

const easeInOutQuint = (p) =>
  p < 0.5 ? 16 * p ** 5 : 1 - Math.pow(-2 * p + 2, 5) / 2;

function samplePoints(w, h, font, str, want, offX, offY, boxW, boxH) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.fillStyle = '#fff';
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(str, offX + boxW / 2, offY + boxH / 2);
  const d = g.getImageData(0, 0, w, h).data;
  const hits = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 128) hits.push([x, y]);
  }
  const out = [];
  const stride = hits.length / want;
  for (let i = 0; i < want; i++) out.push(hits[Math.min(hits.length - 1, Math.floor(i * stride))]);
  out.sort((a, b) => a[0] - b[0]);   // left to right in both words, so they correspond
  return out;
}

export default function ParticleButton({
  idle = "Let's talk",
  active = "Let's go",
  width = 240,
  height = 54,
  font = '600 26px Inter, system-ui, sans-serif',
  points = 2400,
  grain = 0.1,
  onClick,
  className = '',
}) {
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);
  const [label, setLabel] = useState(idle);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const IW = width * DPR, IH = height * DPR;        // the button face
    const P = PAD * DPR;
    const W = IW + P * 2, H = IH + P * 2;             // canvas, with room around
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    const scaled = font.replace(/(\d+(?:\.\d+)?)px/, (_, n) => `${n * DPR}px`);
    const A = samplePoints(W, H, scaled, idle, points, P, P, IW, IH);
    const B = samplePoints(W, H, scaled, active, points, P, P, IW, IH);
    const n = Math.min(A.length, B.length);

    // every particle gets its own little world to orbit in
    const ox = new Float32Array(n), oy = new Float32Array(n);
    const orad = new Float32Array(n), ospd = new Float32Array(n), oph = new Float32Array(n);
    const shine = new Float32Array(n);
    const lead = new Float32Array(n);   // how early this one breaks formation
    for (let i = 0; i < n; i++) {
      // each orbit sits near the particle's OWN letter, not in the middle of
      // the button. Scattering the centres across the whole canvas made every
      // particle bolt outward from one point, which reads as an explosion.
      ox[i] = A[i][0] + (Math.random() - 0.5) * 74 * DPR;
      oy[i] = A[i][1] + (Math.random() - 0.5) * 52 * DPR;
      orad[i] = (5 + Math.random() * 30) * DPR;
      ospd[i] = (Math.random() < 0.5 ? -1 : 1) * (0.9 + Math.random() * 3.8);
      oph[i] = Math.random() * Math.PI * 2;
      shine[i] = 0.5 + Math.random() * 0.5;
      lead[i] = Math.random() * 0.4;
    }

    const px = new Float32Array(n), py = new Float32Array(n);
    for (let i = 0; i < n; i++) { px[i] = A[i][0]; py[i] = A[i][1]; }

    let p = 0, raf = 0, last = performance.now(), announced = idle;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const BUCKETS = 5;

    const frame = (now) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      const t = now / 1000;

      const target = hoverRef.current ? 1 : 0;
      p += (target - p) * Math.min(1, dt * (reduced ? 14 : 4.6));
      if (Math.abs(target - p) < 0.002) p = target;

      const want = p > 0.5 ? active : idle;
      if (want !== announced) { announced = want; setLabel(want); }

      const mix = easeInOutQuint(p);

      ctx.clearRect(0, 0, W, H);

      // the face: jet black, only inside the button itself
      ctx.fillStyle = '#000';
      ctx.fillRect(P, P, IW, IH);

      const paths = Array.from({ length: BUCKETS }, () => new Path2D());
      for (let i = 0; i < n; i++) {
        // each particle breaks formation on its own schedule
        const local = Math.min(1, Math.max(0, (p - lead[i]) / (1 - lead[i])));
        const chaos = reduced ? 0 : Math.sin(Math.PI * local) ** 0.5;

        const wx = A[i][0] + (B[i][0] - A[i][0]) * mix;
        const wy = A[i][1] + (B[i][1] - A[i][1]) * mix;

        let x = wx, y = wy;
        if (chaos > 0.001) {
          const a = t * ospd[i] + oph[i];
          const fx = ox[i] + Math.cos(a) * orad[i];
          const fy = oy[i] + Math.sin(a) * orad[i] * 0.78;
          x = wx + (fx - wx) * chaos;
          y = wy + (fy - wy) * chaos;
        }

        const dx = x - px[i], dy = y - py[i];
        const sp = Math.hypot(dx, dy);
        const b = Math.min(1, shine[i] * (1 - chaos * 0.25));
        const k = Math.min(BUCKETS - 1, Math.round(b * (BUCKETS - 1)));
        const path = paths[k];

        if (sp > 1.2) {
          // a hairline flick, trailing behind where it has come from
          const tail = Math.min(sp, 7 * DPR);
          path.moveTo(x - (dx / sp) * tail, y - (dy / sp) * tail);
          path.lineTo(x, y);
        } else {
          path.moveTo(x, y);
          path.lineTo(x + 1, y);
        }
        px[i] = x; py[i] = y;
      }

      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (let k = 0; k < BUCKETS; k++) {
        ctx.strokeStyle = `rgba(255,255,255,${(0.3 + (k / (BUCKETS - 1)) * 0.7).toFixed(3)})`;
        ctx.stroke(paths[k]);
      }

      // grain, over the face only
      if (grain > 0) {
        const im = ctx.getImageData(P, P, IW, IH);
        const d = im.data;
        for (let i = 0; i < d.length; i += 4) {
          const g = (Math.random() - 0.5) * grain * 255;
          d[i] = Math.max(0, Math.min(255, d[i] + g));
          d[i + 1] = d[i]; d[i + 2] = d[i];
        }
        ctx.putImageData(im, P, P);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [idle, active, width, height, font, points, grain]);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
      onFocus={() => { hoverRef.current = true; }}
      onBlur={() => { hoverRef.current = false; }}
      style={{ width, height }}
      className={`relative rounded-xl bg-black border border-[#D6D6D6]/45
        hover:border-[#D6D6D6]/80 transition-colors duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9565FF] ${className}`}
    >
      {/* sits over the face and spills past it, so particles can leave */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: -PAD, top: -PAD, width: width + PAD * 2, height: height + PAD * 2 }}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
