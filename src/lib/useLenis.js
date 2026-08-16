import { useEffect } from 'react';
import Lenis from 'lenis';

// Butter-smooth scrolling with a floaty tail. Plays fine with framer's
// scroll-linked animation because Lenis drives the real scroll position.
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 1 });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
