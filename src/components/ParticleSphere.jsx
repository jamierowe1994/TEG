import React, { useEffect, useRef } from 'react';

// A globe of beads, spinning. Points are laid on a Fibonacci sphere so they
// spread evenly, rotated each frame, then projected with a little
// perspective so the near face reads brighter than the far one.
//
// The cursor pushes beads aside in screen space, opening a hole that trails
// and settles again — each bead carries its own eased offset, so the crowd
// flows rather than snapping.

const COUNT = 3200;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

export default function ParticleSphere({
  className = '',
  spin = 0.0022,
  repelRadius = 165,
  repelStrength = 78,
}) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -9999, y: -9999, inside: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // the sphere, built once
    const pts = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = GOLDEN * i;
      pts[i * 3] = Math.cos(theta) * r;
      pts[i * 3 + 1] = y;
      pts[i * 3 + 2] = Math.sin(theta) * r;
    }
    // where each bead has been pushed to, and where it's heading
    const offs = new Float32Array(COUNT * 2);

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let angle = 0;
    let raf;
    const TILT = -0.32; // a slight lean, so it reads as a globe not a disc

    const frame = () => {
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.4;
      const fov = 2.6;

      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my, inside } = pointerRef.current;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);

      for (let i = 0; i < COUNT; i++) {
        const px = pts[i * 3];
        const py = pts[i * 3 + 1];
        const pz = pts[i * 3 + 2];

        // spin around Y, then lean on X
        const x1 = px * cosA - pz * sinA;
        const z1 = px * sinA + pz * cosA;
        const y2 = py * cosT - z1 * sinT;
        const z2 = py * sinT + z1 * cosT;

        // perspective: nearer beads sit wider apart and burn brighter
        const depth = fov / (fov + z2);
        let sx = cx + x1 * R * depth;
        let sy = cy + y2 * R * depth;

        // the cursor opens a hole
        let tx = 0;
        let ty = 0;
        if (inside) {
          const dx = sx - mx;
          const dy = sy - my;
          const d = Math.hypot(dx, dy);
          if (d < repelRadius && d > 0.0001) {
            const push = (1 - d / repelRadius) ** 1.6;
            tx = (dx / d) * push * repelStrength;
            ty = (dy / d) * push * repelStrength;
          }
        }
        // ease toward the push, and drift back when it goes
        const oi = i * 2;
        offs[oi] += (tx - offs[oi]) * 0.12;
        offs[oi + 1] += (ty - offs[oi + 1]) * 0.12;
        sx += offs[oi];
        sy += offs[oi + 1];

        const alpha = 0.18 + (depth - 0.62) * 1.5;
        if (alpha <= 0.02) continue;
        const size = depth * 1.9;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(sx, sy, size, size);
      }
      ctx.globalAlpha = 1;

      if (!reduced) angle += spin;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [spin, repelRadius, repelStrength]);

  const onMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    };
  };
  const onLeave = () => {
    pointerRef.current = { x: -9999, y: -9999, inside: false };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      aria-hidden="true"
    />
  );
}
