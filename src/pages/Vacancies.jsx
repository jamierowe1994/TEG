import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import InkLine from '../components/InkLine';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';
import { VACANCIES } from '../lib/vacancies';

// Vacancies — a dark room with one enormous line across it in the group's
// purple, a hand holding a phone rising through the middle of it, and a
// light card climbing out of the bottom that carries straight on into the
// list of open roles.

const PURPLE = '#9565FF';
const CANVAS = '#F1F1F1';
const INK = '#131313';
const PAD = 'px-6 md:px-16 lg:px-24 xl:px-32';

// ── the phone screen ──────────────────────────────────────────────────
// The four corners of the screen inside /media/hand.png, as fractions of
// the image, measured from the photograph. A flat card is drawn at
// SCREEN_W × SCREEN_H and projected onto that quad, so the app shown on
// the phone is real DOM: it can carry whatever roles are live.
const SCREEN = [
  [0.3253, 0.0028], // top left
  [0.7129, 0.0754], // top right
  [0.4729, 0.7158], // bottom right
  [0.0613, 0.6206], // bottom left
];
const SCREEN_W = 300;
const SCREEN_H = 652;

// Heckbert's projective mapping: unit-square basis → quadrilateral
function adj(m) {
  return [
    m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3],
  ];
}
function mul(a, b) {
  const c = new Array(9).fill(0);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) c[3 * i + j] += a[3 * i + k] * b[3 * k + j];
  return c;
}
function mulv(m, v) {
  return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
}
function basis([x1, y1], [x2, y2], [x3, y3], [x4, y4]) {
  const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  const v = mulv(adj(m), [x4, y4, 1]);
  return mul(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}
function matrix3d(w, h, [tl, tr, br, bl]) {
  const s = basis([0, 0], [w, 0], [0, h], [w, h]);
  const d = basis(tl, tr, bl, br);
  const t = mul(d, adj(s)).map((n, _, arr) => n / arr[8]);
  const m = [t[0], t[3], 0, t[6], t[1], t[4], 0, t[7], 0, 0, 1, 0, t[2], t[5], 0, t[8]];
  return `matrix3d(${m.join(',')})`;
}

function PhoneScreen({ transform }) {
  return (
    <div
      className="absolute top-0 left-0 overflow-hidden bg-white text-[#131313]"
      style={{ width: SCREEN_W, height: SCREEN_H, transform, transformOrigin: '0 0', borderRadius: 34 }}
    >
      <div className="flex items-center justify-between px-6 pt-4 text-[11px] font-semibold">
        <span>9:41</span>
        <span className="flex gap-1">
          <span className="w-3 h-2.5 rounded-[2px] bg-[#131313]" />
          <span className="w-3 h-2.5 rounded-[2px] bg-[#131313]/40" />
        </span>
      </div>

      <div className="mt-16 px-7 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 1.5 }}
          className="relative grid place-items-center w-24 h-24 rounded-full"
          style={{ backgroundColor: PURPLE }}
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${PURPLE}` }}
            animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 2 }}
          />
          <motion.span
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.75, duration: 0.3 }}
          >
            <Check size={46} strokeWidth={2.6} className="text-white" />
          </motion.span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.8 }}
          className="mt-8 font-black-display font-extrabold tracking-tight text-[24px] leading-[1.05]"
        >
          Application
          <br />
          accepted
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 2 }}
          className="mt-3 text-[12px] leading-[1.5] text-[#131313]/55"
        >
          Estate Agent (Partner)
          <br />
          The Property Experts
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 2.15 }}
          className="mt-9 w-full rounded-2xl bg-[#F1F1F1] px-4 py-3.5 text-left"
        >
          <p className="text-[9px] tracking-[0.14em] uppercase text-[#131313]/45">Next step</p>
          <p className="mt-1 text-[12px] font-medium leading-[1.4]">
            Your Success Coach will call you tomorrow at 10:00.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 2.3 }}
          className="mt-4 w-full rounded-full py-3.5 text-center text-[12px] font-semibold text-white"
          style={{ backgroundColor: PURPLE }}
        >
          View next steps
        </motion.div>
      </div>
    </div>
  );
}

function Hand() {
  const ref = useRef(null);
  const [transform, setTransform] = useState(null);
  useLayoutEffect(() => {
    const img = ref.current;
    if (!img) return undefined;
    const fit = () => {
      const w = img.clientWidth;
      const h = img.clientHeight;
      if (!w || !h) return;
      setTransform(matrix3d(SCREEN_W, SCREEN_H, SCREEN.map(([x, y]) => [x * w, y * h])));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(img);
    img.addEventListener('load', fit);
    return () => ro.disconnect();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
      className="absolute left-1/2 -bottom-[6vw] md:-bottom-[3.5vw] z-10 w-[70vw] sm:w-[44vw] md:w-[30vw] max-w-[500px] pointer-events-none"
      style={{ x: '-50%' }}
    >
      <div className="relative">
        <img ref={ref} src="/media/hand.png" alt="" className="relative block w-full h-auto" />
        {/* the screen is projected onto the phone's glass, inside the bezel */}
        {transform && <PhoneScreen transform={transform} />}
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative bg-[#111111] text-white overflow-hidden">
      <div className={`relative ${PAD} pt-[16vh] md:pt-[18vh]`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        >
          <InkLine text="YOUR NEXT MOVE" fill={PURPLE} weight={800} stretch="normal" />
        </motion.div>

        <div className="mt-6 md:mt-8 flex items-start justify-between gap-8">
          <motion.img
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            src="/media/tre-1.jpg"
            alt=""
            className="w-20 h-20 md:w-32 md:h-32 rounded-2xl object-cover grayscale shrink-0"
            style={{ objectPosition: '68% 32%' }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className="text-right text-white/70 font-light text-sm md:text-base leading-[1.6] max-w-[17em]"
          >
            Roles across the group&apos;s brands, in property, finance and
            recruitment. Run your own business, with the group behind you.
          </motion.p>
        </div>
      </div>

      {/* the stage: the hand rises through here, the card climbs over its wrist */}
      <div className="relative h-[42vh] md:h-[25vw]">
        <Hand />
      </div>

      {/* the box: pulled in from the edges, and everything lives inside it */}
      <div className="relative z-20 px-4 md:px-10 pb-[10vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
          style={{ backgroundColor: CANVAS, color: INK }}
        >
          <div className="px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
            <h2 className="font-sans font-light tracking-[-0.03em] leading-[1.1] text-[2rem] md:text-[3.6rem] max-w-[16em] mx-auto">
              Roles with the brands,
              <br className="hidden md:block" />
              the group, and the people
              <br className="hidden md:block" />
              who run them.
            </h2>
          </div>
          <Roles />
        </motion.div>
      </div>
    </section>
  );
}

function Roles() {
  return (
    <div className="px-6 md:px-14 pb-14 md:pb-20">
      <div className="flex items-end justify-between border-b border-[#131313]/15 pb-5">
        <p className="type-label" style={{ color: PURPLE }}>Open roles</p>
        <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#131313]/45">
          {VACANCIES.length} partner roles
        </p>
      </div>

      <ul>
        {VACANCIES.map((v, i) => (
          <motion.li
            key={v.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.06 }}
            className="border-b border-[#131313]/15"
          >
            <Link
              to={`/vacancies/${v.id}`}
              className="group flex flex-col md:flex-row md:items-center gap-y-2 md:gap-x-6 py-7 md:py-9"
            >
              <span className="md:w-[24%] shrink-0 flex items-center gap-3 text-[0.62rem] tracking-[0.18em] uppercase text-[#131313]/55">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: v.accent }} />
                {v.brand}
              </span>
              <span className="md:flex-1 min-w-0 font-sans font-normal tracking-[-0.02em] text-[1.35rem] md:text-[1.5rem] lg:text-[1.9rem] leading-[1.15]">
                {v.role}
              </span>
              <span className="shrink-0 text-sm text-[#131313]/60 whitespace-nowrap">
                {v.salary}
              </span>
              <span className="hidden md:grid shrink-0 place-items-center w-10 h-10 rounded-full border border-[#131313]/20
                transition-colors group-hover:bg-[#131313] group-hover:text-white group-hover:border-[#131313]">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-[#131313]/55 max-w-[38em] leading-[1.7]">
        Every role here is a partner role: you run your own business under the
        brand, and the group handles the technology, compliance, marketing and
        back-office. Not sure which brand fits? Write to{' '}
        <a href="mailto:hello@theexpertsgroup.co.uk" className="underline underline-offset-4">
          hello@theexpertsgroup.co.uk
        </a>{' '}
        and we will point you at the right person.
      </p>
    </div>
  );
}

export default function Vacancies() {
  useLenis();
  return (
    <div className="min-h-screen overflow-x-clip bg-[#111111]">
      <ExperienceNav dark />
      <Hero />
      <SiteFooter dark />
    </div>
  );
}
