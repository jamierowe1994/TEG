import React from 'react';
import { motion } from 'framer-motion';
import { DoodleArrow, Sparkle, PlusMark } from './Doodles';
import { EASE } from '../experience/motion';

// Actual humans — polaroids at lazy angles with handwritten captions.
// Stock + a few real TLE faces for now; swapped wholesale when James
// dumps the real content on us.

const SNAPS = [
  { src: '/media/bbs-150.jpg', note: 'summit season', rot: -7, dx: 6, dy: 18 },
  { src: '/media/bbs-136.jpg', note: 'locked in', rot: 4, dx: -14, dy: -10 },
  { src: '/media/bbs-30.jpg', note: 'caught mid-idea', rot: -3, dx: -6, dy: 24 },
  {
    video: '/media/film-awards.mp4',
    poster: '/media/poster-awards.jpg',
    note: 'top agent, mid-hug',
    rot: 5,
    dx: -12,
    dy: -14,
    big: true,
  },
  { src: '/media/bbs-162.jpg', note: 'the good kind of meeting', rot: -5, dx: -8, dy: 20 },
  { src: '/media/bbs-242.jpg', note: 'notes were taken', rot: 3, dx: -16, dy: -8 },
  { src: '/media/bbs-77.jpg', note: 'the big laugh', rot: -4, dx: -6, dy: 26, big: true },
  { src: '/media/bbs-85.jpg', note: 'deal talk', rot: 6, dx: -14, dy: -12 },
  { src: '/media/bbs-89.jpg', note: 'family photo (work edition)', rot: -6, dx: -8, dy: 16 },
];

export default function PeopleWall() {
  return (
    <section className="relative bg-[#F1F1F1] py-24 md:py-32 overflow-hidden">
      <Sparkle className="absolute left-[7%] top-16 w-8 text-[#4D1D81]" />
      <PlusMark className="absolute right-[9%] top-24 w-9 text-[#9565FF]" />
      <DoodleArrow className="absolute left-[12%] bottom-24 w-20 text-[#9565FF] -scale-x-100 rotate-12 hidden md:block" />

      <div className="px-6 md:px-12 max-w-[1500px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-4xl md:text-6xl">
            <span className="font-script normal-case text-[#9565FF] text-[1.2em] align-middle mr-2">Actual</span>{' '}
            humans.
          </h2>
          <p className="mt-5 text-muted-foreground font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
            250-plus of us — real people with families, diaries of their own,
            and nobody to ask for a holiday form.
          </p>
        </motion.div>

        {/* the collage — overlapping, off-kilter, like a pinboard */}
        <div className="mt-14 md:mt-20 flex flex-wrap justify-center -space-x-2 md:-space-x-4">
          {SNAPS.map((s, i) => (
            <motion.figure
              key={s.note}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: s.dy, rotate: s.rot, x: s.dx }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ type: 'spring', stiffness: 150, damping: 20, delay: i * 0.07 }}
              whileHover={{ rotate: 0, scale: 1.07, zIndex: 30 }}
              style={{ zIndex: i % 3 === 1 ? 12 : 8 }}
              className={`bg-white rounded-2xl p-2.5 pb-8 shadow-[0_18px_40px_rgba(14,13,17,0.16)] ${
                s.big ? 'w-[170px] md:w-[215px]' : 'w-[140px] md:w-[175px]'
              }`}
            >
              {s.video ? (
                <video
                  src={s.video}
                  poster={s.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-[4/5] object-cover rounded-xl bg-neutral-200"
                />
              ) : (
                <img
                  src={s.src}
                  alt=""
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover rounded-xl bg-neutral-200"
                />
              )}
              <figcaption className="font-hand text-base md:text-lg text-neutral-600 mt-2.5 leading-tight">
                {s.note}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}