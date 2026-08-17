import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';

// About — a launch screen. One tilted cutout is held in the middle of a
// black room; scrolling folds the next chapter down into it and swaps the
// word beneath. Click the cutout to open that chapter.

const CHAPTERS = [
  {
    key: 'person',
    title: 'The Guy',
    left: ['One person,', 'one idea'],
    right: ['Where it', 'all started'],
    photo: '/media/sean-2.png',
    focus: '55% center',
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

// the fold: the new frame drops in from the top edge, with a flicker as it lands
const FOLD_IN = {
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

function Launch({ chapter, index, onOpen, exiting }) {
  const size = Math.min(13, 90 / (chapter.title.length * 0.6));
  return (
    <>
      {/* the cutout */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ rotate: -11 }}
          className="relative w-[50vw] max-w-[760px] h-[80vh] overflow-hidden cursor-pointer"
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={chapter.key}
              src={chapter.photo}
              alt={chapter.title}
              {...FOLD_IN}
              style={{ objectPosition: chapter.focus }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </motion.button>
      </div>

      {/* the notes either side — they sink as the chapter opens */}
      <motion.div
        animate={exiting ? { y: 80, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-6 md:px-10
          flex items-center justify-between pointer-events-none"
      >
        <div className="flex items-center gap-6 md:gap-12">
          <span className="text-[0.6rem] md:text-xs tracking-[0.25em] text-white/40">
            {String(index + 1).padStart(2, '0')}
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={chapter.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="text-[0.62rem] md:text-[0.7rem] tracking-[0.22em] uppercase leading-[1.7] text-[#E3D7FF] text-center"
            >
              {chapter.left[0]}
              <br />
              {chapter.left[1]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-6 md:gap-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={chapter.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="text-[0.62rem] md:text-[0.7rem] tracking-[0.22em] uppercase leading-[1.7] text-[#E3D7FF] text-center"
            >
              {chapter.right[0]}
              <br />
              {chapter.right[1]}
            </motion.p>
          </AnimatePresence>
          <span className="text-[0.6rem] md:text-xs tracking-[0.25em] text-white/40">
            {String(CHAPTERS.length).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* the word — folds with the picture, then rises into the middle */}
      <div className="absolute inset-x-0 bottom-0 z-30 pointer-events-none">
        <AnimatePresence initial={false} mode="wait">
          <motion.h2
            key={chapter.key}
            initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.4, y: '12%' }}
            animate={
              exiting
                ? {
                    clipPath: 'inset(-40% 0% -40% 0%)',
                    y: '-260%',
                    opacity: 0,
                    transition: { duration: 0.9, ease: EASE },
                  }
                : {
                    clipPath: 'inset(-20% 0% 0% 0%)',
                    opacity: [0.4, 1, 0.6, 1],
                    y: '12%',
                    transition: {
                      clipPath: { duration: 0.6, ease: EASE },
                      opacity: { duration: 0.6, times: [0, 0.35, 0.55, 1] },
                    },
                  }
            }
            className="font-black-display font-extrabold uppercase tracking-[-0.03em]
              text-[#E3D7FF] leading-[0.85] text-center whitespace-nowrap px-4"
            style={{ fontSize: `${size}vw` }}
          >
            {chapter.title}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* which chapter you're on */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[13vh] z-30 flex items-center gap-2">
        {CHAPTERS.map((c, i) => (
          <span
            key={c.key}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              i === index ? 'w-8 bg-[#E3D7FF]' : 'w-3 bg-white/25'
            }`}
          />
        ))}
      </div>
    </>
  );
}

function ChapterDetail({ chapter, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed inset-0 z-[80] overflow-y-auto bg-[#0d0c0f]"
    >
      <button
        onClick={onClose}
        className="fixed top-6 left-5 md:left-10 z-[95] inline-flex items-center gap-2 rounded-full
          bg-white/10 hover:bg-white/20 backdrop-blur px-5 py-3 text-xs font-semibold text-white transition-colors"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* the frame twists straight and opens all the way out */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ width: '50vw', height: '80vh', rotate: -11 }}
          animate={{ width: '100vw', height: '100vh', rotate: 0 }}
          exit={{ width: '50vw', height: '80vh', rotate: -11 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="overflow-hidden"
        >
          <img
            src={chapter.photo}
            alt={chapter.title}
            style={{ objectPosition: chapter.focus }}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/80 pointer-events-none"
        />

        {/* the title climbs to the top */}
        <motion.h2
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 font-black-display font-extrabold
            uppercase tracking-[-0.03em] text-[#E3D7FF] leading-[0.85] text-center whitespace-nowrap
            text-[11vw] md:text-[7vw] pointer-events-none"
        >
          {chapter.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="absolute bottom-[6vh] inset-x-0 z-10 text-center font-script text-[#E3D7FF]
            text-2xl md:text-4xl px-6 pointer-events-none"
        >
          {chapter.lede}
        </motion.p>
      </div>

      {/* and the chapter runs on beneath it */}
      <div className="px-5 md:px-10 pb-24 pt-16 md:pt-24">
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
  );
}

export default function About() {
  useLenis();
  const ref = React.useRef(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(null);
  const [exiting, setExiting] = useState(null);

  const openChapter = (key) => {
    setExiting(key);
    window.setTimeout(() => {
      setOpen(key);
      setExiting(null);
    }, 700);
  };
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // each scroll lands on the next chapter
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(CHAPTERS.length - 1, Math.floor(v * CHAPTERS.length * 0.999));
    setIndex((prev) => (prev === i ? prev : i));
  });

  const active = open !== null ? CHAPTERS.find((c) => c.key === open) : null;

  useEffect(() => {
    document.documentElement.style.overflow = active ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [active]);

  return (
    <div className="bg-[#0d0c0f] text-white min-h-screen overflow-x-clip">
      <ExperienceNav dark />

      <section ref={ref} style={{ height: `${CHAPTERS.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Launch
            chapter={CHAPTERS[index]}
            index={index}
            exiting={exiting === CHAPTERS[index].key}
            onOpen={() => openChapter(CHAPTERS[index].key)}
          />
        </div>
      </section>

      <SiteFooter />

      <AnimatePresence>
        {active && <ChapterDetail key={active.key} chapter={active} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}
