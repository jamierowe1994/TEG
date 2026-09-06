import React, { useEffect, useRef } from 'react';

// A mark - a logo, or a line of type - rebuilt out of drifting points.
//
// The metallic read in the Spline piece isn't a metal shader: it's density.
// Points are drawn additively, so where they crowd they sum toward white and
// where they thin they fall away to black. So the whole job is deciding how
// bright each point should be, and then letting the noise field push them
// about without losing the shape.
//
// Brightness comes from pretending the flat mark has a surface. Blur its
// alpha and you get a soft dome over it; the gradient of that dome behaves
// like a normal, so it can be lit from a direction. Add a rim where the
// original alpha still stands proud of the blurred version and you get the
// bright edge that sells the bevel.

const LIGHT = { x: -0.55, y: -0.68, z: 0.48 }; // upper left, slightly toward us

function boxBlur(src, w, h, r) {
  const tmp = new Float32Array(w * h);
  const out = new Float32Array(w * h);
  const inv = 1 / (r * 2 + 1);
  for (let y = 0; y < h; y++) {
    let sum = 0;
    for (let x = -r; x <= r; x++) sum += src[y * w + Math.min(w - 1, Math.max(0, x))];
    for (let x = 0; x < w; x++) {
      tmp[y * w + x] = sum * inv;
      sum += src[y * w + Math.min(w - 1, x + r + 1)] - src[y * w + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < w; x++) {
    let sum = 0;
    for (let y = -r; y <= r; y++) sum += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
    for (let y = 0; y < h; y++) {
      out[y * w + x] = sum * inv;
      sum += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
    }
  }
  return out;
}

// cheap value noise - smooth enough for drift, far cheaper than simplex
function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise2(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}

export default function ParticleMark({
  src,
  text,
  font = '700 150px Archivo, system-ui, sans-serif',
  width = 900,
  height = 460,
  count = 90000,
  drift = 5.2,        // how far the static pushes a point, in pixels
  grain = 0.0075,     // noise frequency - higher is finer static
  speed = 0.22,
  focusSweep = true,  // the slow blur in and out
  sheen = 0.75,       // light falling across the whole mark, not just its edges
  crop,               // [x, y, w, h] as fractions of the source, to isolate part of it
  padding = 0.1,
  className = '',
  style,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = width, H = height;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(W, H);
    const rgba = image.data;

    let cancelled = false;

    const build = (stamp) => {
      if (cancelled) return;

      // ---- 1. the mark's alpha, drawn to fit with a little air around it
      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const octx = off.getContext('2d', { willReadFrequently: true });
      stamp(octx);
      const px = octx.getImageData(0, 0, W, H).data;

      const alpha = new Float32Array(W * H);
      for (let i = 0, n = W * H; i < n; i++) alpha[i] = px[i * 4 + 3] / 255;

      // ---- 2. blur it into a dome, and light that dome
      const dome = boxBlur(alpha, W, H, Math.round(Math.min(W, H) * 0.028));
      const shade = new Float32Array(W * H);

      // the mark's own bounds, so the sweep lands on the artwork rather than
      // on the canvas - a logo with air around it would otherwise stay flat
      let minX = W, maxX = 0, minY = H, maxY = 0;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (alpha[y * W + x] > 0.04) {
            if (x < minX) minX = x; if (x > maxX) maxX = x;
            if (y < minY) minY = y; if (y > maxY) maxY = y;
          }
        }
      }
      const spanX = Math.max(1, maxX - minX), spanY = Math.max(1, maxY - minY);
      const len = Math.hypot(LIGHT.x, LIGHT.y, LIGHT.z);
      const lx = LIGHT.x / len, ly = LIGHT.y / len, lz = LIGHT.z / len;

      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x;
          if (alpha[i] < 0.04) continue;
          // gradient of the dome stands in for a surface normal
          const gx = (dome[i + 1] - dome[i - 1]) * 26;
          const gy = (dome[i + W] - dome[i - W]) * 26;
          const nl = Math.hypot(gx, gy, 1);
          const d = Math.max(0, (-gx / nl) * lx + (-gy / nl) * ly + (1 / nl) * lz);
          // rim: where the hard edge still stands proud of the soft dome
          const rim = Math.max(0, alpha[i] - dome[i] * 1.06);
          const spec = Math.pow(d, 7) * 0.85;
          // one light travelling across the whole mark: bright where it lands
          // first, falling away to almost nothing on the far side. This is what
          // makes it read as a single metal object instead of a grainy stencil.
          const u = (x - minX) / spanX, v = (y - minY) / spanY;
          const sweep = Math.pow(Math.max(0, 1 - (u * 0.46 + v * 0.54)), 1.35);
          const lit = (1 - sheen) + sheen * (0.12 + sweep * 1.5);
          shade[i] = Math.min(1, (0.1 + d * 0.62 + spec + rim * 2.6) * lit);
        }
      }

      // ---- 3. scatter points, keeping brighter areas denser
      const xs = new Float32Array(count);
      const ys = new Float32Array(count);
      const bs = new Float32Array(count);
      const zs = new Float32Array(count);
      let made = 0, guard = 0;
      while (made < count && guard < count * 60) {
        guard++;
        const x = Math.random() * W, y = Math.random() * H;
        const i = (y | 0) * W + (x | 0);
        if (alpha[i] < 0.35) continue;
        const b = shade[i];
        if (Math.random() > 0.18 + b * 0.82) continue; // density follows light
        xs[made] = x; ys[made] = y;
        bs[made] = 0.25 + b * 0.75;
        zs[made] = Math.random();
        made++;
      }

      // ---- 4. the loop
      const acc = new Float32Array(W * H);
      const t0 = performance.now();

      const frame = () => {
        if (cancelled) return;
        const t = ((performance.now() - t0) / 1000) * speed;
        acc.fill(0);

        // the whole field drifts between sharp and dissolved
        const focus = focusSweep ? 0.5 + 0.5 * Math.sin(t * 1.7) : 0.5;

        for (let p = 0; p < made; p++) {
          const bx = xs[p], by = ys[p];
          const n1 = noise2(bx * grain + t * 2.1, by * grain);
          const n2 = noise2(bx * grain, by * grain + t * 2.1 + 37.2);
          const x = bx + (n1 - 0.5) * 2 * drift;
          const y = by + (n2 - 0.5) * 2 * drift;
          const xi = x | 0, yi = y | 0;
          if (xi < 1 || yi < 1 || xi >= W - 1 || yi >= H - 1) continue;

          // distance from the focal plane decides how far the point smears
          const blur = Math.abs(zs[p] - focus);
          const b = bs[p];

          if (blur < 0.22) {
            acc[yi * W + xi] += b;
          } else {
            // spread it over a small cross, dimmer the further out of focus
            const w = b * (0.34 - blur * 0.16);
            const i = yi * W + xi;
            acc[i] += w * 1.5;
            acc[i - 1] += w; acc[i + 1] += w;
            acc[i - W] += w; acc[i + W] += w;
          }
        }

        // tone map the accumulation into white points on black
        for (let i = 0, n = W * H; i < n; i++) {
          const v = acc[i];
          if (v <= 0) { rgba[i * 4 + 3] = 0; continue; }
          const c = Math.min(255, Math.round(255 * (1 - Math.exp(-v * 1.35))));
          const o = i * 4;
          rgba[o] = c; rgba[o + 1] = c; rgba[o + 2] = c; rgba[o + 3] = c;
        }
        ctx.putImageData(image, 0, 0);
        rafRef.current = requestAnimationFrame(frame);
      };
      frame();
    };

    // stamp the mark into the offscreen canvas, whichever kind it is
    if (src) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const pad = padding;
        const sx = crop ? crop[0] * img.width : 0;
        const sy = crop ? crop[1] * img.height : 0;
        const sw = crop ? crop[2] * img.width : img.width;
        const sh = crop ? crop[3] * img.height : img.height;
        const scale = Math.min((W * (1 - pad * 2)) / sw, (H * (1 - pad * 2)) / sh);
        const dw = sw * scale, dh = sh * scale;
        build((octx) =>
          octx.drawImage(img, sx, sy, sw, sh, (W - dw) / 2, (H - dh) / 2, dw, dh));
      };
      img.src = src;
    } else {
      build((octx) => {
        octx.fillStyle = '#fff';
        octx.font = font;
        octx.textAlign = 'center';
        octx.textBaseline = 'middle';
        octx.fillText(text || '', W / 2, H / 2);
      });
    }

    return () => { cancelled = true; cancelAnimationFrame(rafRef.current); };
  }, [src, text, font, width, height, count, drift, grain, speed, focusSweep, sheen, crop, padding]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto', ...style }}
    />
  );
}
