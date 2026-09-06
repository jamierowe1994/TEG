import React, { useEffect, useRef } from 'react';

// A mark rendered as a solid, swelling metal body with hard static over it,
// and a little smoke coming off the silhouette.
//
// The first attempt drew the whole thing out of scattered points, which is
// why it read as grainy - you could see black between them. The reference
// isn't a particle field at all. It's a filled, smoothly shaded form; the
// static is a fine modulation ON TOP of that fill, and only the wisps
// drifting off the edges are actual particles.
//
// So there are three layers here:
//   1. the body   - per-pixel shading of a dome built from the mark's alpha
//   2. the static - high-frequency noise multiplied over the body each frame
//   3. the wisps  - points seeded on the silhouette, drifting outward

const TWO_PI = Math.PI * 2;

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

export default function ParticleMark({
  src,
  text,
  font = '700 150px Archivo, system-ui, sans-serif',
  crop,
  width = 900,
  height = 460,
  grit = 0.42,       // how hard the static bites. 0 is a clean render
  swell = 0.5,       // how much the body breathes in and out
  wisps = 5000,      // points of smoke coming off the edge
  sheen = 0.62,      // light travelling across the whole mark
  speed = 0.5,
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
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(W, H);
    const rgba = image.data;
    let cancelled = false;

    const build = (stamp) => {
      if (cancelled) return;

      const off = document.createElement('canvas');
      off.width = W; off.height = H;
      const octx = off.getContext('2d', { willReadFrequently: true });
      stamp(octx);
      const px = octx.getImageData(0, 0, W, H).data;

      const alpha = new Float32Array(W * H);
      let minX = W, maxX = 0, minY = H, maxY = 0;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const a = px[(y * W + x) * 4 + 3] / 255;
          alpha[y * W + x] = a;
          if (a > 0.04) {
            if (x < minX) minX = x; if (x > maxX) maxX = x;
            if (y < minY) minY = y; if (y > maxY) maxY = y;
          }
        }
      }
      const spanX = Math.max(1, maxX - minX), spanY = Math.max(1, maxY - minY);
      const R = Math.max(2, Math.round(Math.min(spanX, spanY) * 0.09));

      // the dome: a soft swelling over the mark. Blurring twice gives a
      // rounder falloff than one pass, which is what makes it look inflated
      // rather than merely soft.
      const dome = boxBlur(boxBlur(alpha, W, H, R), W, H, Math.round(R * 0.6));

      // work out the shading once - only the static and the wisps move
      const body = new Float32Array(W * H);
      const slopeArr = new Float32Array(W * H);
      const outX = new Float32Array(W * H);
      const outY = new Float32Array(W * H);

      const shadeInto = (target, lightAngle, inflate) => {
        const lx = Math.cos(lightAngle), ly = Math.sin(lightAngle), lz = 0.62;
        for (let y = 1; y < H - 1; y++) {
          for (let x = 1; x < W - 1; x++) {
            const i = y * W + x;
            if (alpha[i] < 0.03) { target[i] = 0; continue; }
            const gx = (dome[i + 1] - dome[i - 1]) * 22 * inflate;
            const gy = (dome[i + W] - dome[i - W]) * 22 * inflate;
            const slope = Math.hypot(gx, gy);
            slopeArr[i] = slope;
            const nl = Math.hypot(gx, gy, 1);
            outX[i] = -gx / (slope || 1); outY[i] = -gy / (slope || 1);
            const diff = Math.max(0, (-gx / nl) * lx + (-gy / nl) * ly + (1 / nl) * lz);
            const spec = Math.pow(diff, 12) * 0.9;
            // the bright contour: strongest where the dome falls away fastest
            const rim = Math.min(1, slope * 0.85) * 0.9;
            const u = (x - minX) / spanX, v = (y - minY) / spanY;
            const sweep = Math.pow(Math.max(0, 1 - (u * 0.42 + v * 0.5)), 1.2);
            const lit = (1 - sheen) + sheen * (0.28 + sweep * 1.25);
            const val = (0.2 + diff * 0.72 + spec + rim) * lit;
            // fade the very outside so the silhouette isn't a cut edge
            target[i] = Math.min(1.25, val) * Math.min(1, alpha[i] * 2.2);
          }
        }
      };

      // ---- the smoke. Seeded on the silhouette, drifting outward.
      shadeInto(body, -2.2, 1);
      const edge = [];
      for (let y = 1; y < H - 1; y += 1) {
        for (let x = 1; x < W - 1; x += 1) {
          const i = y * W + x;
          if (slopeArr[i] > 0.35 && alpha[i] > 0.2) edge.push(i);
        }
      }
      const wN = Math.min(wisps, 20000);
      const wx = new Float32Array(wN), wy = new Float32Array(wN);
      const wvx = new Float32Array(wN), wvy = new Float32Array(wN);
      const wlife = new Float32Array(wN), wmax = new Float32Array(wN);
      const seed = (p) => {
        if (!edge.length) return;
        const i = edge[(Math.random() * edge.length) | 0];
        const x = i % W, y = (i / W) | 0;
        wx[p] = x; wy[p] = y;
        const a = Math.random() * TWO_PI, s = 0.25 + Math.random() * 0.55;
        wvx[p] = outX[i] * s + Math.cos(a) * 0.18;
        wvy[p] = outY[i] * s + Math.sin(a) * 0.18;
        wlife[p] = 0;
        wmax[p] = 28 + Math.random() * 70;
      };
      for (let p = 0; p < wN; p++) { seed(p); wlife[p] = Math.random() * wmax[p]; }

      // xorshift - much cheaper than Math.random at this volume
      let rng = 2463534242;
      const rand = () => {
        rng ^= rng << 13; rng ^= rng >>> 17; rng ^= rng << 5;
        return (rng >>> 0) / 4294967296;
      };

      const t0 = performance.now();
      const frame = () => {
        if (cancelled) return;
        const t = ((performance.now() - t0) / 1000) * speed;

        // the swell: the body inflates and the light swings a little, so the
        // shadow inside the bite creeps in and out
        const inflate = 1 + Math.sin(t * 0.9) * 0.3 * swell;
        shadeInto(body, -2.2 + Math.sin(t * 0.62) * 0.28, inflate);

        rgba.fill(0);

        // 1 + 2: the body, with hard fine static over it
        const lo = 1 - grit, hi = grit * 2;
        for (let y = minY - R; y <= maxY + R; y++) {
          if (y < 0 || y >= H) continue;
          for (let x = minX - R; x <= maxX + R; x++) {
            if (x < 0 || x >= W) continue;
            const i = y * W + x;
            const b = body[i];
            if (b <= 0.002) continue;
            const c = b * (lo + rand() * hi);
            const v = c > 1 ? 255 : (c * 255) | 0;
            const o = i * 4;
            rgba[o] = v; rgba[o + 1] = v; rgba[o + 2] = v; rgba[o + 3] = 255;
          }
        }

        // 3: the wisps, added on top
        for (let p = 0; p < wN; p++) {
          wlife[p] += 1;
          if (wlife[p] >= wmax[p]) { seed(p); continue; }
          wx[p] += wvx[p]; wy[p] += wvy[p];
          wvx[p] += (rand() - 0.5) * 0.09;
          wvy[p] += (rand() - 0.5) * 0.09 - 0.008; // drifts up, like smoke
          const xi = wx[p] | 0, yi = wy[p] | 0;
          if (xi < 0 || yi < 0 || xi >= W || yi >= H) continue;
          const k = 1 - wlife[p] / wmax[p];
          const v = (k * k * 190 * (0.4 + rand() * 0.6)) | 0;
          const o = (yi * W + xi) * 4;
          const nv = rgba[o] + v;
          const cl = nv > 255 ? 255 : nv;
          rgba[o] = cl; rgba[o + 1] = cl; rgba[o + 2] = cl;
          rgba[o + 3] = Math.max(rgba[o + 3], cl);
        }

        ctx.putImageData(image, 0, 0);
        rafRef.current = requestAnimationFrame(frame);
      };
      frame();
    };

    if (src) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const sx = crop ? crop[0] * img.width : 0;
        const sy = crop ? crop[1] * img.height : 0;
        const sw = crop ? crop[2] * img.width : img.width;
        const sh = crop ? crop[3] * img.height : img.height;
        const scale = Math.min((W * (1 - padding * 2)) / sw, (H * (1 - padding * 2)) / sh);
        const dw = sw * scale, dh = sh * scale;
        build((octx) => octx.drawImage(img, sx, sy, sw, sh, (W - dw) / 2, (H - dh) / 2, dw, dh));
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
  }, [src, text, font, crop, width, height, grit, swell, wisps, sheen, speed, padding]);

  return (
    <canvas ref={canvasRef} className={className}
      style={{ display: 'block', width: '100%', height: 'auto', ...style }} />
  );
}
