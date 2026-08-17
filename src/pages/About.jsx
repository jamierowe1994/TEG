import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';

// About — a launch screen. One tilted cutout is held in the middle of a
// black room; scrolling folds the next chapter down into it and swaps the
// word beneath.
//
// Opening a chapter never swaps one element for another: the same frame,
// the same word and the same two notes stay mounted and simply trade
// places — the frame twists open to fill the room, the word climbs to the
// middle, the notes drop to the floor. The story then scrolls up over it.

const CHAPTERS = [
  {
    key: 'person',
    title: 'The Guy',
    left: ['One person,', 'one idea'],
    right: ['Where it', 'all started'],
    photo: '/media/sean-2.png',
    focus: '55% center',
    mono: true,
    lede: 'It all started here.',
    body: [
      "Shaun started The Experts Group with a straightforward belief: that good people do their best work when nobody is standing over them. He had spent long enough inside the traditional model to know what it costs — the targets that have nothing to do with the client, the talent that leaves because the ceiling is too low.",
      "So he built the thing he wished had existed. A group that hands experts the brand, the technology and the back-office, then gets out of their way. What began as one person and an idea now stands behind hundreds of people running businesses of their own.",
    ],
    gallery: ['/media/sean.jpg', '/media/eass-18.jpg', '/media/bbs-143.jpg'],
  },
  {
    key: 'stories',
    title: 'The Stories',
    left: ['Real people,', 'real decisions'],
    right: ['The leap,', 'and after'],
    photo: '/media/z63-5220.jpg',
    focus: 'center',
    lede: 'Everyone here left something behind.',
    body: [
      "Every person in the Group has a version of the same story: a moment where staying put stopped making sense. Some left branch management. Some left a desk they had sat at for a decade. Some had never worked for themselves for a single day before they did.",
      "These are their stories, in their words — the money, the diaries, the school runs made and the ones missed, and what actually changed once the name above the door became their own.",
    ],
    gallery: ['/media/bbs-95.jpg', '/media/eass-63.jpg', '/media/z63-5157.jpg'],
  },
  {
    key: 'brands',
    title: 'The Brands',
    left: ['Seven specialisms,', 'one group'],
    right: ['Property, finance', 'and people'],
    photo: '/media/z63-0884.jpg',
    focus: 'center',
    lede: 'Seven businesses. One set of standards.',
    body: [
      "The Experts Group brings together specialists across estate agency, lettings, mortgages, auctions, commercial property, recruitment and marketing — each brand led by someone who has made that discipline their life's work.",
      "They share infrastructure, technology and a community, but not a script. Each business runs on its own terms, which is precisely why the people inside them stay.",
    ],
    gallery: ['/media/bbs-239.jpg', '/media/tpe-1.jpg', '/media/tre-1.jpg'],
  },
];

// the fold: a new chapter drops in from the top edge with a flicker
const FOLD = {
  initial: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 },
  animate: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: [0.35, 1, 0.55, 1],
    transition: {
      clipPath: { duration: 0.62, ease: EASE },
      opacity: { duration: 0.62, times: [0, 0.35, 0.55, 1] },
    },
  },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const SWAP = { duration: 1.2, ease: EASE };

function Note({ chapter, side }) {
  const lines = chapter[side];
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={chapter.key}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="text-[0.62rem] md:text-[0.7rem] tracking-[0.22em] uppercase leading-[1.7] text-[#E3D7FF] text-center"
      >
        {lines[0]}
        <br />
        {lines[1]}
      </motion.p>
    </AnimatePresence>
  );
}

export default function About() {
  useLenis();
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // each scroll lands on the next chapter
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (open) return;
    const i = Math.min(CHAPTERS.length - 1, Math.floor(v * CHAPTERS.length * 0.999));
    setIndex((prev) => (prev === i ? prev : i));
  });

  const isOpen = open !== null;
  const chapter = isOpen ? CHAPTERS.find((c) => c.key === open) : CHAPTERS[index];

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const titleSize = Math.min(13, 90 / (chapter.title.length * 0.6));

  return (
    <div className="bg-[#0d0c0f] text-white min-h-screen overflow-x-clip">
      <ExperienceNav dark />

      <section ref={ref} style={{ height: `${CHAPTERS.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: isOpen ? 90 : 10 }}>
          {/* the frame — twists open to fill the room */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={() => !isOpen && setOpen(chapter.key)}
              animate={
                isOpen
                  ? { width: '100vw', height: '100vh', rotate: 0, maxWidth: '100vw' }
                  : { width: '50vw', height: '80vh', rotate: -11, maxWidth: '760px' }
              }
              transition={SWAP}
              whileHover={isOpen ? undefined : { scale: 1.015 }}
              className={`relative overflow-hidden ${isOpen ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={chapter.key}
                  src={chapter.photo}
                  alt={chapter.title}
                  {...FOLD}
                  style={{ objectPosition: chapter.focus }}
                  className={`absolute inset-0 w-full h-full object-cover ${chapter.mono ? 'grayscale' : ''}`}
                />
              </AnimatePresence>
              {/* a veil so the word still reads once the frame is the room */}
              <motion.span
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/75"
              />
            </motion.button>
          </div>

          {/* the two notes — they drop to the floor as the word rises */}
          <motion.div
            animate={{ y: isOpen ? '36vh' : '0vh' }}
            transition={SWAP}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-6 md:px-10
              flex items-center justify-between pointer-events-none"
          >
            <div className="flex items-center gap-6 md:gap-12">
              <span className="text-[0.6rem] md:text-xs tracking-[0.25em] text-white/40">
                {String(CHAPTERS.indexOf(chapter) + 1).padStart(2, '0')}
              </span>
              <Note chapter={chapter} side="left" />
            </div>
            <div className="flex items-center gap-6 md:gap-12">
              <Note chapter={chapter} side="right" />
              <span className="text-[0.6rem] md:text-xs tracking-[0.25em] text-white/40">
                {String(CHAPTERS.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>

          {/* the word — one element, floor of the room to the middle of it */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ y: isOpen ? '0vh' : '38vh', scale: isOpen ? 0.55 : 1 }}
              transition={SWAP}
              className="w-full"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.h2
                  key={chapter.key}
                  initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.4 }}
                  animate={{
                    clipPath: 'inset(-30% 0% -10% 0%)',
                    opacity: [0.4, 1, 0.6, 1],
                    transition: {
                      clipPath: { duration: 0.6, ease: EASE },
                      opacity: { duration: 0.6, times: [0, 0.35, 0.55, 1] },
                    },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.16 } }}
                  className="font-black-display font-extrabold uppercase tracking-[-0.03em]
                    text-[#E3D7FF] leading-[0.85] text-center whitespace-nowrap px-4"
                  style={{ fontSize: `${titleSize}vw` }}
                >
                  {chapter.title}
                </motion.h2>
              </AnimatePresence>

              {/* the line under it, once the chapter is open */}
              <motion.p
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: isOpen ? 0.7 : 0 }}
                className="mt-6 font-script text-[#E3D7FF] text-[3.4vw] text-center px-6"
              >
                {chapter.lede}
              </motion.p>
            </motion.div>
          </div>

          {/* which chapter you're on */}
          <motion.div
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[13vh] z-30 flex items-center gap-2"
          >
            {CHAPTERS.map((c) => (
              <span
                key={c.key}
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  c.key === chapter.key ? 'w-8 bg-[#E3D7FF]' : 'w-3 bg-white/25'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <SiteFooter />

      {/* the story scrolls up over the opened frame */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="fixed inset-0 z-[95] overflow-y-auto"
          >
            {/* the opened frame shows through here */}
            <div className="h-screen pointer-events-none" />

            <div className="relative bg-[#0d0c0f] px-5 md:px-10 pt-20 pb-24">
              <div className="max-w-[900px] mx-auto space-y-5">
                {chapter.body.map((para, i) => (
                  <p key={i} className="text-white/70 font-light text-base md:text-lg leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-14 md:mt-20 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {chapter.gallery.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover rounded-xl"
                  />
                ))}
              </div>

              <p className="mt-10 text-center text-white/30 text-xs">
                More from this chapter — films and stories — landing here soon.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            onClick={() => setOpen(null)}
            className="fixed top-6 left-5 md:left-10 z-[99] inline-flex items-center gap-2 rounded-full
              bg-white/10 hover:bg-white/20 backdrop-blur px-5 py-3 text-xs font-semibold text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
