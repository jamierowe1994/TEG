import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';

// Actual humans, measured in numbers — Hope-Rise-style full-screen stat
// slides. Starts black (carrying the dark span onward), then each slide
// sweeps up over the last with a semicircle curve in a different brand
// pastel, polaroids of the team scattered around the big counting numbers.
// It spits you back out into the grey at the far end.
// Figures are James's; update them here as they move.

const SLIDES = [
  {
    key: 'stock',
    bg: '#0d0c0f',
    fg: '#ffffff',
    accent: '#9565FF',
    pre: 'Our agents have helped sell over',
    target: 2,
    render: (v) => `£${v.toFixed(v < 2 ? 1 : 0)} billion`,
    caption: 'worth of property in the last two years',
    snaps: [
      { src: '/media/tpe-5.jpg', note: 'sold, again', rot: -6, pos: 'left-[6%] top-[16%]' },
      { src: '/media/bbs-95.jpg', note: 'the good kind of day', rot: 5, pos: 'right-[7%] bottom-[14%]' },
    ],
  },
  {
    key: 'mortgages',
    bg: '#D8E2F1',
    fg: '#131313',
    accent: '#2255A4',
    pre: "We've helped lend over",
    target: 1.4,
    render: (v) => `£${v.toFixed(1)} billion`,
    caption: 'worth of mortgages',
    snaps: [
      { src: '/media/bbs-30.jpg', note: 'rates chat, obviously', rot: 4, pos: 'left-[7%] bottom-[16%]' },
      { src: '/media/z63-5157.jpg', note: 'the whole crew', rot: -5, pos: 'right-[6%] top-[18%]' },
    ],
  },
  {
    key: 'auction',
    bg: '#EEF6D6',
    fg: '#131313',
    accent: '#7A9A1F',
    pre: "We've sold over",
    target: 17,
    render: (v) => `£${Math.round(v)} million`,
    caption: 'worth of property at auction',
    snaps: [
      { src: '/media/bbs-242.jpg', note: 'going once…', rot: -4, pos: 'left-[8%] top-[20%]' },
      { src: '/media/bbs-143.jpg', note: 'and the award goes to', rot: 6, pos: 'right-[8%] bottom-[18%]' },
    ],
  },
  {
    key: 'tenants',
    bg: '#FBD9DB',
    fg: '#131313',
    accent: '#ED1C24',
    pre: "We've helped over",
    target: 1000,
    render: (v) => `${Math.round(v).toLocaleString()}`,
    caption: 'tenants find their dream home',
    snaps: [
      { src: '/media/tle-sue.jpg', note: 'Sue — lettings', rot: -5, pos: 'left-[7%] bottom-[15%]' },
      { src: '/media/tle-1.jpg', note: 'keys handed over', rot: 4, pos: 'right-[7%] top-[17%]' },
    ],
  },
];

function CountNumber({ target, render, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const [text, setText] = useState(render(0));
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(render(v)),
    });
    return () => controls.stop();
  }, [inView, target, render]);
  return (
    <p
      ref={ref}
      className="font-black-display font-extrabold tracking-tight text-[13vw] md:text-[9vw] leading-none"
      style={{ color: accent }}
    >
      {text}
    </p>
  );
}

function Snap({ s }) {
  return (
    <div
      className={`absolute ${s.pos} hidden md:block bg-white rounded-2xl p-2 pb-6 w-[150px] shadow-[0_18px_40px_rgba(14,13,17,0.18)]`}
      style={{ transform: `rotate(${s.rot}deg)` }}
    >
      <img src={s.src} alt="" loading="lazy" className="w-full aspect-[4/5] object-cover rounded-xl" />
      <p className="font-hand text-base text-neutral-600 mt-1.5 leading-tight">{s.note}</p>
    </div>
  );
}

function Slide({ slide, index, total, progress }) {
  const n = total; // slides stack over one another inside the sticky frame
  const start = index / n;
  const end = (index + 0.82) / n;
  const y = useTransform(progress, [start, end], index === 0 ? ['0vh', '0vh'] : ['102vh', '0vh']);
  const curve = useTransform(progress, [start, end], index === 0 ? [0, 0] : [16, 0]);
  const radius = useTransform(curve, (v) => `50% 50% 0 0 / ${v}vh ${v}vh 0 0`);

  return (
    <motion.div
      style={{ y, borderRadius: radius, backgroundColor: slide.bg, color: slide.fg, zIndex: index + 1 }}
      className="absolute inset-0 overflow-hidden"
    >
      {slide.snaps.map((s) => (
        <Snap key={s.src} s={s} />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="font-black-display font-bold uppercase tracking-tight text-xl md:text-3xl max-w-2xl leading-tight">
          {slide.pre}
        </p>
        <div className="my-4 md:my-6">
          <CountNumber target={slide.target} render={slide.render} accent={slide.accent} />
        </div>
        <p className="font-script text-2xl md:text-4xl opacity-80">{slide.caption}</p>
      </div>
    </motion.div>
  );
}

export default function StatsJourney() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section ref={ref} className="relative" style={{ height: `${(SLIDES.length + 0.6) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {SLIDES.map((s, i) => (
          <Slide key={s.key} slide={s} index={i} total={SLIDES.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
