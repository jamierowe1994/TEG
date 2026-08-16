import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE } from '../experience/motion';

// MIRA-style opening, fully monochrome: square snaps cascade up over one
// another, then the awards film lands and expands out to become the moving
// background. A dark veil sinks the film back so the words hold the frame —
// hovering lifts the veil in a soft circle under the cursor.

const CASCADE = [
  { src: '/media/bbs-129.jpg', x: '-6vw', y: '-4vh', rot: -3 },
  { src: '/media/eass-63.jpg', x: '5vw', y: '3vh', rot: 2.5 },
  { src: '/media/eass-18.jpg', x: '-4vw', y: '4vh', rot: -2 },
  { src: '/media/bbs-143.jpg', x: '6vw', y: '-3vh', rot: 3 },
  { src: '/media/z63-5220.jpg', x: '-3vw', y: '2vh', rot: -2.5 },
];

const FILM = '/media/film-awards-reel.mp4';
const POSTER = '/media/poster-awards.jpg';

const STEP = 0.34; // seconds between cascade snaps
const T_FINAL = 0.3 + CASCADE.length * STEP; // the film lands
const T_EXPAND = T_FINAL + 1.05; // holds a beat longer, then grows
const T_TEXT = T_FINAL + 2.75; // words arrive after the expansion

export default function Hero() {
  const reduced = useReducedMotion();
  const veilRef = useRef(null);
  const sectionRef = useRef(null);

  // once you start scrolling, the film squeezes in — radius, margins, a
  // gentle push downward so it feels like it's travelling with you
  const { scrollYProgress: exit } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const filmScale = useTransform(exit, [0, 0.6], [1, 0.88]);
  const filmRadius = useTransform(exit, [0, 0.6], ['0rem', '2.5rem']);
  // the canvas colour of the next section fades in behind the shrinking
  // film, so the hand-off reads as one fluid surface
  const canvasIn = useTransform(exit, [0, 0.1], [0, 1]);
  const filmY = useTransform(exit, [0, 1], ['0vh', '10vh']);

  // the veil lifts in a soft circle that follows the cursor
  const onMove = (e) => {
    const el = veilRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  const onLeave = () => {
    const el = veilRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '-999px');
    el.style.setProperty('--my', '-999px');
  };

  // the spotlight: a grayscale layer over the colour film, with a soft
  // hole that follows the cursor — colour shows through where you hover
  const monoMask =
    'radial-gradient(circle 230px at var(--mx, -999px) var(--my, -999px), transparent 0 130px, black 230px)';

  if (reduced) {
    return (
      <section className="relative h-screen overflow-hidden bg-[#0d0c0f] text-white">
        <video src={FILM} poster={POSTER} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-black/60" />
        <HeroCopy />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#0d0c0f] text-white"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* the cascade — square snaps stacking up over each other */}
      {CASCADE.map((s, i) => (
        <motion.div
          key={s.src}
          initial={{ opacity: 0, scale: 0.82, y: 46 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 + i * STEP }}
          className="absolute left-1/2 top-1/2 w-[38vmin] h-[38vmin] rounded-2xl overflow-hidden"
          style={{
            translateX: `calc(-50% + ${s.x})`,
            translateY: `calc(-50% + ${s.y})`,
            rotate: s.rot,
            zIndex: i,
          }}
        >
          <img src={s.src} alt="" className="w-full h-full object-cover grayscale" />
        </motion.div>
      ))}

      {/* the next section's canvas, revealed behind the squeezing film */}
      <motion.div
        style={{ opacity: canvasIn, zIndex: 6 }}
        className="absolute inset-0 bg-[#F1F1F1] pointer-events-none"
      />

      {/* the film — lands as a snap, then expands into the moving background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, borderRadius: '1.5rem' }}
        animate={{
          opacity: [0, 1, 1, 1],
          scale: [0.3, 0.34, 0.34, 1],
          borderRadius: ['1.5rem', '1.5rem', '1.5rem', '0rem'],
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.14, 0.5, 1],
          ease: ['easeOut', 'linear', EASE],
          delay: T_FINAL,
        }}
        className="absolute inset-0"
        style={{ zIndex: 10, y: filmY }}
      >
        <motion.div
          style={{ scale: filmScale, borderRadius: filmRadius }}
          className="absolute inset-0 overflow-hidden will-change-transform"
        >
          <video
            src={FILM}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* monochrome layer with a colour spotlight under the cursor */}
          <div
            ref={veilRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: 'grayscale(1)',
              WebkitBackdropFilter: 'grayscale(1)',
              WebkitMaskImage: monoMask,
              maskImage: monoMask,
            }}
          />
          {/* base veil — sinks the film so the letters hold */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: T_TEXT - 0.3 }}
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75 pointer-events-none"
          />
          {/* vignette — a darker tint pulling in from the edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.55) 100%)' }}
          />
        </motion.div>
      </motion.div>

      <HeroCopy animated />
    </section>
  );
}

function HeroCopy({ animated = false }) {
  const rise = (delay) =>
    animated
      ? {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        }
      : {};
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
      <motion.h1
        {...rise(T_TEXT)}
        className="font-black-display font-extrabold uppercase tracking-tight text-[2.6rem] md:text-[4.6rem] leading-[0.98] drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]"
      >
        Let's do something
        <br />
        <span className="font-brittany normal-case tracking-normal text-[1.3em] align-middle mr-3 text-[#B78AF7]">
          {'Brave'.split('').map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ clipPath: 'inset(-60% 100% -40% -10%)', opacity: 0 }}
              animate={{ clipPath: 'inset(-60% -20% -40% -10%)', opacity: 1 }}
              transition={{ duration: 0.32, ease: 'easeInOut', delay: T_TEXT + 0.25 + i * 0.34 }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
        together.
      </motion.h1>
      <motion.p
        {...rise(T_TEXT + 0.18)}
        className="mt-6 text-white/75 font-light text-sm md:text-base max-w-md leading-relaxed"
      >
        Escape the 9-to-5 and build a business of your own — backed by 250+
        experts who've already made the leap.
      </motion.p>
      <motion.div {...rise(T_TEXT + 0.34)} className="mt-8 flex items-center justify-center gap-5 pointer-events-auto">
        <Link
          to="/partnership"
          className="rounded-xl bg-white text-[#131313] border-2 border-white px-9 py-4 text-sm font-semibold hover:bg-transparent hover:text-white hover:border-[#9565FF] transition-all duration-300"
        >
          Join the Group
        </Link>
        <a
          href="#brands"
          className="inline-flex items-center gap-1.5 rounded-xl border-2 border-white/70 text-white px-8 py-4 text-sm font-semibold hover:border-white hover:bg-white/10 transition-all duration-300"
        >
          Explore our brands <ArrowUpRight size={15} />
        </a>
      </motion.div>
    </div>
  );
}
