import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';

// About — a light, monochrome editorial page. One enormous condensed line
// across the top with a black-and-white film barely showing through the
// letters, then the story told the way a fashion house tells its own: a
// heading, a photograph, a few words, a smaller photograph, and the year
// it began sitting faint and huge underneath.

const CANVAS = '#F1F1F1';
const INK = '#131313';
const FADE = '#E1E1E1';

const CONDENSED = { fontStretch: '62%', fontWeight: 900 };

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

// One line of condensed type that fills its container edge to edge. The
// natural width is measured after the font lands so the glyphs are never
// stretched, only scaled.
function Display({ text, fill = INK, className = '' }) {
  const ref = useRef(null);
  const [w, setW] = useState(null);
  useLayoutEffect(() => {
    const measure = () => {
      const len = ref.current?.getComputedTextLength();
      if (len) setW(Math.ceil(len));
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [text]);
  const width = w || 1000;
  return (
    <svg viewBox={`0 0 ${width} 158`} className={`block w-full h-auto ${className}`} aria-hidden="true">
      <text
        ref={ref}
        x="0"
        y="150"
        fill={fill}
        className="font-black-display"
        style={{ fontSize: 200, letterSpacing: '-0.02em', ...CONDENSED }}
      >
        {text}
      </text>
    </svg>
  );
}

// The title with the film inside it. Screen blends the light wall over the
// film so it only survives inside the black letters; darken then pins the
// wall to the exact canvas grey.
function Hero() {
  return (
    <section className="px-5 md:px-10 pt-[15vh] md:pt-[18vh]" style={{ backgroundColor: CANVAS }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        className="relative overflow-hidden"
        style={{ isolation: 'isolate' }}
      >
        <video
          src="/media/fc-aerial-loop.mp4"
          poster="/media/fc-aerial-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(1) brightness(0.22) contrast(1.2)' }}
        />
        <div className="relative" style={{ backgroundColor: CANVAS, mixBlendMode: 'screen' }}>
          <Display text="OUR VISION" />
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
        <span className="text-center">More than 250 self-employed experts</span>
        <span className="text-right">Seven brands, one group</span>
      </motion.div>
    </section>
  );
}

function Chapter({ chapter, index }) {
  return (
    <section className="px-5 md:px-10 pt-[12vh] md:pt-[16vh]" style={{ backgroundColor: CANVAS }}>
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
          <Display text={chapter.since} fill={FADE} />
        </motion.div>
      )}
    </section>
  );
}

export default function About() {
  useLenis();
  return (
    <div className="min-h-screen overflow-x-clip" style={{ backgroundColor: CANVAS, color: INK }}>
      <ExperienceNav />
      <Hero />
      {CHAPTERS.map((c, i) => (
        <Chapter key={c.key} chapter={c} index={i} />
      ))}
      <div className="h-[14vh]" style={{ backgroundColor: CANVAS }} />
      <SiteFooter />
    </div>
  );
}
