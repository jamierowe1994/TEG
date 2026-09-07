import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';
import InkLine from '../components/InkLine';

// About — a light, monochrome editorial page. One enormous condensed line
// across the top with a black-and-white film barely showing through the
// letters, then the story told the way a fashion house tells its own: a
// heading, a photograph, a few words, a smaller photograph, and the year
// it began sitting faint and huge underneath.

const CANVAS = '#F1F1F1';
const INK = '#131313';
const FADE = '#E1E1E1';
const PURPLE = '#9565FF';

// one page margin, set by the title and shared by every row beneath it
const PAD = 'px-6 md:px-16 lg:px-24 xl:px-32';

const CONDENSED = { fontStretch: '62.5%', fontWeight: 900 };

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12%' },
  transition: { duration: 0.9, ease: EASE, delay },
});

const CHAPTERS = [
  {
    key: 'started',
    heading: 'Where it all started',
    big: { src: '/media/office-placeholder.jpg', alt: 'The first office', pos: 'center' },
    small: { src: '/media/sean.jpg', alt: 'Sean Newman', pos: '58% 30%' },
    copy: 'This is Sean. He started his career in 1994 and has grown this business into a brand of more than 250 self-employed experts, each of them running a business of their own.',
    since: '1994',
  },
  {
    key: 'stories',
    heading: 'Their stories',
    big: { src: '/media/z63-5220.jpg', alt: 'The people of The Experts Group', pos: 'center' },
    small: { src: '/media/eass-63.jpg', alt: '', pos: 'center' },
    copy: 'Every person in the Group has a version of the same story: a moment where staying put stopped making sense. Some left branch management. Some left a desk they had sat at for a decade. Some had never worked for themselves for a single day before they did.',
  },
  {
    key: 'brands',
    heading: 'Seven brands',
    big: { src: '/media/bbs-239.jpg', alt: '', pos: 'center' },
    small: { src: '/media/tpe-1.jpg', alt: '', pos: 'center' },
    copy: 'Specialists across estate agency, lettings, mortgages, auctions, commercial property, recruitment and marketing, each brand led by someone who has made that discipline their life’s work. They share the technology and the community, but not a script.',
  },
];

// The title with the film inside it. Screen blends the light wall over the
// film so it only survives inside the black letters; darken then pins the
// wall to the exact canvas grey.
function Hero() {
  return (
    <section className={`${PAD} pt-[15vh] md:pt-[18vh]`} style={{ backgroundColor: CANVAS }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        className="relative overflow-hidden"
        style={{ isolation: 'isolate', backgroundColor: CANVAS }}
      >
        <video
          src="/media/fc-aerial-loop.mp4"
          poster="/media/fc-aerial-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute -inset-px w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover"
          style={{ filter: 'grayscale(1) brightness(0.34) contrast(1.15)' }}
        />
        <div className="relative" style={{ backgroundColor: CANVAS, mixBlendMode: 'screen' }}>
          <InkLine text="OUR STORY" fill={INK} stretch="extra-condensed" />
        </div>
        <div className="absolute -inset-px pointer-events-none" style={{ backgroundColor: CANVAS, mixBlendMode: 'darken' }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
        className="mt-4 md:mt-5 flex justify-between gap-6 text-[0.58rem] md:text-[0.64rem] tracking-[0.04em] uppercase leading-[1.5]"
        style={{ ...CONDENSED, fontWeight: 700, color: INK }}
      >
        <span>One person, one idea</span>
        <span className="hidden md:block text-center">More than 250 self-employed experts</span>
        <span className="text-right">Seven brands, one group</span>
      </motion.div>
    </section>
  );
}

function Chapter({ chapter, index }) {
  return (
    <section className={`${PAD} pt-[12vh] md:pt-[16vh]`} style={{ backgroundColor: CANVAS }}>
      <motion.h2
        {...rise(0)}
        className="font-black-display uppercase leading-[0.92] tracking-[-0.02em] text-[13vw] md:text-[6.4vw] max-w-[9em]"
        style={{ ...CONDENSED, color: INK }}
      >
        {chapter.heading}
      </motion.h2>

      <div className="mt-8 md:mt-12 grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-10 items-start">
        <motion.div {...rise(0.05)} className="col-span-12 md:col-span-5">
          <img
            src={chapter.big.src}
            alt={chapter.big.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            style={{ objectPosition: chapter.big.pos }}
            className="w-full aspect-[4/5] object-cover grayscale"
          />
        </motion.div>

        <motion.div
          {...rise(0.15)}
          className="col-span-12 md:col-span-4 md:pt-[16%] md:px-6 lg:px-10"
        >
          <p
            className="text-[0.72rem] md:text-[0.68rem] tracking-[0.06em] uppercase leading-[1.85] max-w-[30em]"
            style={{ color: INK }}
          >
            {chapter.copy}
          </p>
          {chapter.since && (
            <p
              className="mt-10 md:mt-16 text-[0.58rem] md:text-[0.62rem] tracking-[0.08em] uppercase"
              style={{ ...CONDENSED, fontWeight: 700, color: INK }}
            >
              Since
            </p>
          )}
        </motion.div>

        <motion.div {...rise(0.25)} className="col-span-8 col-start-3 md:col-span-3 md:col-start-10 md:pt-[6%]">
          <img
            src={chapter.small.src}
            alt={chapter.small.alt}
            loading="lazy"
            style={{ objectPosition: chapter.small.pos }}
            className="w-full aspect-[3/4] object-cover grayscale"
          />
        </motion.div>
      </div>

      {chapter.since && (
        <motion.div {...rise(0.1)} className="mt-[-2vw] md:mt-[-6vw] md:ml-[22%] relative -z-0 pointer-events-none">
          <InkLine text={chapter.since} fill={FADE} stretch="extra-condensed" />
        </motion.div>
      )}
    </section>
  );
}


// ── the timeline ──────────────────────────────────────────────────────
// Sean's story, as he told it to his son Tyler on their podcast. Every
// step is a full screen and the page settles on it. A black line runs
// from stop to stop: it wanders down while you read, and as the page
// pings to the next screen it loops the loop and lands on the next mark.
const STEPS = [
  {
    mark: 'The first job',
    title: 'A wet Saturday in Northampton',
    body: 'He got the bus in and walked into every estate agent on the high street asking for a job. One was left: Taylor’s. The man who came down the stairs was Bob Butler, who had already turned him down in Daventry. He liked the determination. Start Monday.',
    quote: 'Get rid of that disco suit. Get rid of the white socks.',
  },
  {
    mark: 'The franchise',
    title: 'His name above the door',
    body: 'The owner offered him the business as a franchise: £500 a month, starting in month three, because Sean did not have £500. Soon he was outperforming the other offices. So he bought the building, bought out the franchise, and Newman Estate Agents opened in Rugby.',
  },
  {
    mark: '1997',
    title: 'Bigger premises, and a son',
    body: 'The grand opening on 1 January 1997 brought the Gladiators to Rugby. The queue closed the road and the police wanted it stopped. Tyler was born a week or two later.',
  },
  {
    mark: 'Today',
    title: 'The Experts Group',
    body: 'More than 250 people running businesses of their own, with the brand, the marketing and the tools behind them. Or, as Sean puts it, helping people be their own boss.',
    quote: 'If you want happiness, give happiness. The more you give, the more you get back.',
  },
];

const NODE = 15; // the dot on the line, px

// Where each stop sits on its screen, as percentages of the screen. The
// mark (dot and label) and the text live in different corners so the eye
// travels, and the line has somewhere to go between them.
const LAYOUTS = [
  { node: [0, 40], text: [48, 38], w: 46 },
  { node: [58, 52], text: [2, 46], w: 44 },
  { node: [16, 64], text: [50, 28], w: 44 },
  { node: [40, 42], text: [2, 64], w: 44 },
];
const MOBILE = { node: [0, 30], text: [0, 42], w: 100 };

function useIsDesktop() {
  const [is, setIs] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = (e) => setIs(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return is;
}

// settle the page on the nearest step once the scroll comes to rest
function useSnap(ref) {
  useEffect(() => {
    let lenis = null;
    let timer = null;
    let snapping = false;
    const onScroll = () => {
      clearTimeout(timer);
      if (snapping) return;
      timer = setTimeout(() => {
        const steps = [...(ref.current?.querySelectorAll('[data-step]') || [])];
        if (!steps.length) return;
        const y = window.scrollY;
        const tops = steps.map((el) => el.getBoundingClientRect().top + y);
        const inside = y > tops[0] - window.innerHeight * 0.5 && y < tops[tops.length - 1] + window.innerHeight * 0.5;
        if (!inside) return;
        const nearest = tops.reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a));
        const d = Math.abs(nearest - y);
        if (d < 4 || d > window.innerHeight * 0.55) return;
        snapping = true;
        lenis.scrollTo(nearest, { duration: 0.75, onComplete: () => { snapping = false; } });
      }, 140);
    };
    // Lenis is created by the page after this effect runs, so wait for it
    const wait = setInterval(() => {
      if (!window.__lenis) return;
      clearInterval(wait);
      lenis = window.__lenis;
      lenis.on('scroll', onScroll);
    }, 50);
    return () => {
      clearInterval(wait);
      clearTimeout(timer);
      lenis?.off('scroll', onScroll);
    };
  }, [ref]);
}

// The line from one stop to the next: a wandering run most of the way,
// then a loop and a short drop onto the mark. Two paths, so the run can
// draw while you read and the loop can flash in as the page pings over.
function segment([x0, y0], [x1, y1], i) {
  const pts = [];
  const N = 48;
  const mx = x0 + (x1 - x0) * 0.55;
  const my = y0 + (y1 - y0) * 0.6;
  const dx = mx - x0;
  const dy = my - y0;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len; // a unit normal, for the wobble
  const ny = dx / len;
  for (let k = 0; k <= N; k++) {
    const t = k / N;
    const e = t * t * (3 - 2 * t); // ease so it leaves and arrives softly
    const wob = Math.sin(t * Math.PI * 2.5 + i) * 26 * Math.sin(t * Math.PI);
    pts.push([x0 + dx * e + nx * wob, y0 + dy * e + ny * wob]);
  }
  const descent = 'M' + pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' L');

  // the loop, thrown to whichever side has the room. It starts exactly
  // where the run ends and keeps turning until it is pointing at the next
  // stop, then eases onto it, so there is never a kink.
  const side = x1 >= x0 ? 1 : -1;
  const r = 58 + (i % 3) * 16;
  const cx = mx + side * r;
  const cy = my;
  const target = [x1, y1];
  const loop = [];
  const step = (Math.PI * 2) / 72;
  const minTurn = Math.PI * 2 * (i % 2 === 0 ? 1 : 1.3);
  const maxTurn = minTurn + Math.PI * 1.6;
  for (let a = 0; a <= maxTurn; a += step) {
    const phi = Math.PI + side * a;
    const rr = r * (1 + 0.16 * Math.min(1, a / (Math.PI * 2)));
    const pt = [cx + side * rr * Math.cos(phi), cy - rr * Math.sin(phi)];
    loop.push(pt);
    if (a >= minTurn && loop.length > 1) {
      const prev = loop[loop.length - 2];
      const tx = pt[0] - prev[0];
      const ty = pt[1] - prev[1];
      const vx = target[0] - pt[0];
      const vy = target[1] - pt[1];
      const cos = (tx * vx + ty * vy) / ((Math.hypot(tx, ty) || 1) * (Math.hypot(vx, vy) || 1));
      if (cos > 0.985) break;
    }
  }
  // leave along the tangent and bend onto the stop
  const [lx, ly] = loop[loop.length - 1];
  const [px, py] = loop[loop.length - 2];
  const tl = Math.hypot(lx - px, ly - py) || 1;
  const dist = Math.hypot(x1 - lx, y1 - ly);
  const c1 = [lx + ((lx - px) / tl) * dist * 0.45, ly + ((ly - py) / tl) * dist * 0.45];
  const R = 20;
  for (let k = 1; k <= R; k++) {
    const t = k / R;
    const q = (a, b, c) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;
    loop.push([q(lx, c1[0], x1), q(ly, c1[1], y1)]);
  }
  const swirl = 'M' + loop.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' L');
  return { descent, swirl };
}

function Timeline() {
  const ref = useRef(null);
  const desktop = useIsDesktop();
  const [active, setActive] = useState(-1);
  const [segs, setSegs] = useState([]);
  const pathRefs = useRef([]);
  const marks = useRef([]);
  const texts = useRef([]);
  useSnap(ref);

  // measure the dots and build the line between them, again on resize
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const build = () => {
      const box = el.getBoundingClientRect();
      const dots = [...el.querySelectorAll('[data-dot]')].map((d) => {
        const r = d.getBoundingClientRect();
        return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
      });
      setSegs(dots.slice(0, -1).map((p, i) => segment(p, dots[i + 1], i)));
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, [desktop]);

  // size every dash to its path, then drive the drawing and the parallax
  // straight from the scroll position, with no React in the loop
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    pathRefs.current.forEach((pair) => {
      (pair || []).forEach((node) => {
        if (!node) return;
        const len = node.getTotalLength();
        node.dataset.len = len;
        node.style.strokeDasharray = len;
        node.style.strokeDashoffset = len;
      });
    });
    let raf = 0;
    const draw = () => {
      raf = 0;
      const steps = [...el.querySelectorAll('[data-step]')];
      if (steps.length < 2) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const tops = steps.map((st) => st.getBoundingClientRect().top + y);
      const gap = tops[1] - tops[0];
      const p = (y - tops[0]) / gap; // in screens, from the first stop
      pathRefs.current.forEach((pair, g) => {
        if (!pair) return;
        const u = Math.max(0, Math.min(1, p - g));
        const d = Math.min(1, u / 0.6);
        const w = Math.max(0, (u - 0.6) / 0.4);
        const [de, sw] = pair;
        if (de) de.style.strokeDashoffset = de.dataset.len * (1 - d);
        if (sw) sw.style.strokeDashoffset = sw.dataset.len * (1 - w);
      });
      // each stop rises to meet you and carries on up past you
      steps.forEach((st, i) => {
        const c = (tops[i] + st.offsetHeight / 2 - (y + vh / 2)) / vh; // 0 when centred
        const t = texts.current[i];
        const m = marks.current[i];
        if (t) {
          t.style.transform = `translateY(${(c * 220).toFixed(1)}px)`;
          t.style.opacity = Math.max(0, 1 - Math.abs(c) * 1.4).toFixed(3);
        }
        if (m) {
          m.style.transform = `translateY(${(c * 90).toFixed(1)}px)`;
          m.style.opacity = Math.max(0.15, 1 - Math.abs(c) * 1.2).toFixed(3);
        }
      });
      const i = Math.min(STEPS.length - 1, Math.floor(p + 0.45));
      setActive((prev) => (prev === i ? prev : i));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(draw); };
    draw();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [segs]);

  // stable ref callbacks, so a re-render never touches the paths
  const pathRef = useMemo(
    () => STEPS.map((_, g) => [0, 1].map((which) => (node) => {
      if (!pathRefs.current[g]) pathRefs.current[g] = [null, null];
      pathRefs.current[g][which] = node;
    })),
    [],
  );

  return (
    <section className={PAD} style={{ backgroundColor: CANVAS, color: INK }}>
      {/* the way in: a small arrow under the year */}
      <div className="flex items-center gap-4 pt-6 md:pt-10">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="grid place-items-center w-9 h-9 rounded-full border border-[#131313]/25"
        >
          <ArrowDown size={15} />
        </motion.span>
        <span className="text-[0.62rem] tracking-[0.2em] uppercase text-[#131313]/50">The story, from the start</span>
      </div>

      <div ref={ref} className="relative mt-6">
        {/* the line, drawn stop to stop */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
          {segs.map((sg, g) => (
            <g key={g} fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path ref={pathRef[g][0]} d={sg.descent} />
              <path ref={pathRef[g][1]} d={sg.swirl} />
            </g>
          ))}
        </svg>

        {STEPS.map((step, i) => {
          const on = i <= active;
          const L = desktop ? LAYOUTS[i % LAYOUTS.length] : MOBILE;
          return (
            <div key={step.mark} data-step className="relative min-h-screen overflow-visible">
              {/* the dot stays put: the line lands on it */}
              <motion.span
                data-dot
                animate={{ scale: on ? 1 : 0.6, backgroundColor: on ? INK : CANVAS }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute rounded-full border-2 z-10"
                style={{ left: `${L.node[0]}%`, top: `${L.node[1]}%`, width: NODE, height: NODE, marginLeft: -NODE / 2, marginTop: -NODE / 2, borderColor: INK }}
              />

              {/* the mark, beside its dot */}
              <div
                ref={(n) => { marks.current[i] = n; }}
                className="absolute will-change-transform"
                style={{ left: `calc(${L.node[0]}% + 30px)`, top: `${L.node[1]}%`, transform: 'translateY(0)' }}
              >
                <p
                  className="font-black-display uppercase leading-[0.95] tracking-[-0.01em] text-[2.4rem] md:text-[3.4rem] -translate-y-1/2 whitespace-nowrap"
                  style={CONDENSED}
                >
                  {step.mark}
                </p>
              </div>

              {/* the words, in their own corner */}
              <div
                ref={(n) => { texts.current[i] = n; }}
                className="absolute will-change-transform pl-12 md:pl-0"
                style={{ left: `${L.text[0]}%`, top: `${L.text[1]}%`, width: `${L.w}%` }}
              >
                <h3 className="font-sans font-light tracking-[-0.03em] leading-[1.1] text-[1.7rem] md:text-[2.4rem]">
                  {step.title}
                </h3>
                <p className="mt-5 text-[0.95rem] md:text-base font-light leading-[1.75] text-[#131313]/65 max-w-[34em]">
                  {step.body}
                </p>
                {step.quote && (
                  <p className="mt-6 font-script text-[1.5rem] md:text-[1.9rem] leading-[1.25]" style={{ color: PURPLE }}>
                    {step.quote}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── the podcast ───────────────────────────────────────────────────────
function Podcast() {
  return (
    <section className={`${PAD} pt-[14vh] md:pt-[18vh]`} style={{ backgroundColor: CANVAS, color: INK }}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end">
        <motion.div {...rise(0)} className="col-span-12 md:col-span-7">
          <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#131313]/50">In his own words</p>
          <h2
            className="mt-4 font-black-display uppercase leading-[0.92] tracking-[-0.02em] text-[13vw] md:text-[6.4vw]"
            style={{ ...CONDENSED, color: INK }}
          >
            Hear the whole story
          </h2>
        </motion.div>
        <motion.p {...rise(0.1)} className="col-span-12 md:col-span-4 md:col-start-9 text-sm md:text-base font-light leading-[1.7] text-[#131313]/65">
          Two hours with Sean and his son Tyler: the family, the first job, the crash,
          the business, and what he wants to leave behind.
        </motion.p>
      </div>

      <motion.div {...rise(0.15)} className="mt-10 md:mt-14">
        <div className="relative w-full aspect-video overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[#131313]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/jaoYYrKQ3Mk"
            title="Sean Newman in conversation with his son Tyler"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </motion.div>
    </section>
  );
}

export default function About() {
  useLenis();
  return (
    <div className="min-h-screen overflow-x-clip" style={{ backgroundColor: CANVAS, color: INK }}>
      <ExperienceNav />
      <Hero />
      <Chapter chapter={CHAPTERS[0]} index={0} />
      <Timeline />
      <Podcast />
      {CHAPTERS.slice(1).map((c, i) => (
        <Chapter key={c.key} chapter={c} index={i + 1} />
      ))}
      <div className="h-[14vh]" style={{ backgroundColor: CANVAS }} />
      <SiteFooter />
    </div>
  );
}
