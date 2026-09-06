import React, { useEffect, useRef, useState } from 'react';

// "Let's talk" written in particles. Hover and every particle leaves on its
// own orbit, streams past the edge of the button, then finds its way back as
// "Let's go". Leave and it travels back.
//
// Two things that matter and are easy to get wrong:
//
// 1. Each particle runs on its OWN clock - it departs at its own moment and
//    arrives at its own moment, and BOTH its scatter and its travel between
//    the two words are driven by that same clock. An earlier version drove
//    the scatter per-particle but the word-to-word travel globally, so every
//    particle finished on the same frame and the word snapped into place.
//    Staggered arrivals are what make it flick together instead.
//
// 2. Orbits are centred near each particle's own letter. Centre them all on
//    the button and you get a twirl; scatter the centres across the canvas
//    and you get a firework.

const DPR = 2;
const PAD = 54;        // room outside the button for particles to fly into
const COLS = 52;       // density buckets across the face, for the light flecks

const easeInOutCubic = (u) =>
  u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;

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
  out.sort((a, b) => a[0] - b[0]);
  return out;
}

export default function ParticleButton({
  idle = "Let's talk",
  active = "Let's go",
  width = 240,
  height = 54,
  font = '600 26px Inter, system-ui, sans-serif',
  points = 4600,
  grain = 0.3,
  flecks = 0.4,
  href,
  onClick,
  className = '',
}) {
  const canvasRef = useRef(null);
  const hoverRef = useRef(false);
  const [label, setLabel] = useState(idle);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const IW = width * DPR, IH = height * DPR;
    const P = PAD * DPR;
    const W = IW + P * 2, H = IH + P * 2;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    const scaled = font.replace(/(\d+(?:\.\d+)?)px/, (_, n) => `${n * DPR}px`);
    const A = samplePoints(W, H, scaled, idle, points, P, P, IW, IH);
    const B = samplePoints(W, H, scaled, active, points, P, P, IW, IH);
    const n = Math.min(A.length, B.length);

    const ox = new Float32Array(n), oy = new Float32Array(n);
    const orad = new Float32Array(n), ospd = new Float32Array(n), oph = new Float32Array(n);
    const shine = new Float32Array(n);
    const lead = new Float32Array(n);    // when this one lets go
    const span = new Float32Array(n);    // and how long its whole journey takes
    const shape = new Float32Array(n);   // the curve of its own scatter
    for (let i = 0; i < n; i++) {
      ox[i] = A[i][0] + (Math.random() - 0.5) * 74 * DPR;
      oy[i] = A[i][1] + (Math.random() - 0.5) * 52 * DPR;
      orad[i] = (5 + Math.random() * 30) * DPR;
      ospd[i] = (Math.random() < 0.5 ? -1 : 1) * (0.9 + Math.random() * 3.8);
      oph[i] = Math.random() * Math.PI * 2;
      shine[i] = 0.5 + Math.random() * 0.5;
      lead[i] = Math.random() * 0.3;
      // the span MUST fit in what is left after the lead, or a particle that
      // departs late and travels slowly never reaches u = 1 - it sits at
      // partial chaos orbiting forever, even once the hover has settled.
      // Scaling by (1 - lead) guarantees every particle finishes; the factor
      // only decides how early it gets there, which is the stagger.
      span[i] = (1 - lead[i]) * (0.5 + Math.random() * 0.5);
      shape[i] = 0.45 + Math.random() * 0.7;
    }

    const prevX = new Float32Array(n), prevY = new Float32Array(n);
    for (let i = 0; i < n; i++) { prevX[i] = A[i][0]; prevY[i] = A[i][1]; }

    const topD = new Float32Array(COLS), botD = new Float32Array(COLS);
    const colW = W / COLS;

    let p = 0, raf = 0, last = performance.now(), announced = idle;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const BUCKETS = 5;

    const frame = (now) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      const t = now / 1000;

      const target = hoverRef.current ? 1 : 0;
      p += (target - p) * Math.min(1, dt * (reduced ? 14 : 3.6));
      if (Math.abs(target - p) < 0.002) p = target;

      const want = p > 0.5 ? active : idle;
      if (want !== announced) { announced = want; setLabel(want); }

      // the face is left transparent: the button's own background supplies
      // it, so it can share the icon nav's translucent tint and let whatever
      // sits behind the header show through the same way
      ctx.clearRect(0, 0, W, H);

      topD.fill(0); botD.fill(0);
      const paths = Array.from({ length: BUCKETS }, () => new Path2D());

      for (let i = 0; i < n; i++) {
        // one clock per particle drives BOTH the scatter and the travel, so
        // it arrives when it stops scattering rather than on a shared frame
        const u = Math.min(1, Math.max(0, (p - lead[i]) / span[i]));
        const chaos = reduced ? 0 : Math.sin(Math.PI * u) ** shape[i];
        const mix = easeInOutCubic(u);

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

        // thin out hard once past the edge of the button
        const outX = Math.max(0, P - x, x - (P + IW));
        const outY = Math.max(0, P - y, y - (P + IH));
        const out = Math.hypot(outX, outY);
        const fade = out > 0 ? Math.exp(-out / (16 * DPR)) : 1;

        // note where the crowd is heaviest as it crosses top and bottom
        if (out > 0 && flecks > 0) {
          const col = Math.min(COLS - 1, Math.max(0, (x / colW) | 0));
          if (y < P) topD[col] += fade;
          else if (y > P + IH) botD[col] += fade;
        }

        const dx = x - prevX[i], dy = y - prevY[i];
        const sp = Math.hypot(dx, dy);
        const b = Math.min(1, shine[i] * (1 - chaos * 0.25) * fade);
        prevX[i] = x; prevY[i] = y;
        if (b < 0.06) continue;

        const path = paths[Math.min(BUCKETS - 1, Math.round(b * (BUCKETS - 1)))];
        if (sp > 1.2) {
          const tail = Math.min(sp, 7 * DPR);
          path.moveTo(x - (dx / sp) * tail, y - (dy / sp) * tail);
          path.lineTo(x, y);
        } else {
          path.moveTo(x, y);
          path.lineTo(x + 1, y);
        }
      }

      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (let k = 0; k < BUCKETS; k++) {
        ctx.strokeStyle = `rgba(255,255,255,${(0.28 + (k / (BUCKETS - 1)) * 0.72).toFixed(3)})`;
        ctx.stroke(paths[k]);
      }

      // flecks of light: where the crowd crossing the edge is heaviest, a
      // short shot fires away from the button and fades out
      if (flecks > 0) {
        ctx.lineWidth = 1;
        for (let c = 0; c < COLS; c++) {
          for (let side = 0; side < 2; side++) {
            const d = side === 0 ? topD[c] : botD[c];
            if (d < 1.4) continue;
            const x = (c + 0.5) * colW;
            const edge = side === 0 ? P : P + IH;
            const dir = side === 0 ? -1 : 1;
            const len = Math.min(40 * DPR, d * 5.5 * DPR) * flecks;
            const a = Math.min(0.6, d * 0.075) * flecks;
            const g = ctx.createLinearGradient(x, edge, x, edge + dir * len);
            g.addColorStop(0, `rgba(255,255,255,${a.toFixed(3)})`);
            g.addColorStop(0.35, `rgba(255,255,255,${(a * 0.5).toFixed(3)})`);
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.strokeStyle = g;
            ctx.beginPath();
            ctx.moveTo(x, edge);
            ctx.lineTo(x, edge + dir * len);
            ctx.stroke();
          }
        }
      }

      // grain over the face. With a transparent face it has to lay itself
      // down as faint specks rather than nudging pixels that aren't there.
      if (grain > 0) {
        const im = ctx.getImageData(P, P, IW, IH);
        const d = im.data;
        for (let i = 0; i < d.length; i += 4) {
          const g = (Math.random() - 0.5) * grain;
          if (d[i + 3] > 0) {
            const v = Math.max(0, Math.min(255, d[i] + g * 255));
            d[i] = v; d[i + 1] = v; d[i + 2] = v;
          } else {
            const v = g > 0 ? 255 : 0;
            d[i] = v; d[i + 1] = v; d[i + 2] = v;
            d[i + 3] = Math.min(255, Math.abs(g) * 230);
          }
        }
        ctx.putImageData(im, P, P);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [idle, active, width, height, font, points, grain, flecks]);

  // a mailto or a route wants to stay a real link - middle click, right
  // click and open-in-new-tab all break if it becomes a button
  const Tag = href ? 'a' : 'button';
  const shared = {
    onClick,
    onMouseEnter: () => { hoverRef.current = true; },
    onMouseLeave: () => { hoverRef.current = false; },
    onFocus: () => { hoverRef.current = true; },
    onBlur: () => { hoverRef.current = false; },
    style: { width, height },
    className: `relative inline-block rounded-xl bg-white/[0.06] border border-[#D6D6D6]/45
      hover:border-[#D6D6D6]/80 transition-colors duration-300
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9565FF] ${className}`,
  };

  return (
    <Tag {...shared} {...(href ? { href } : { type: 'button' })}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: -PAD, top: -PAD, width: width + PAD * 2, height: height + PAD * 2 }}
      />
      <span className="sr-only">{label}</span>
    </Tag>
  );
}
