import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { EASE } from '../experience/motion';

// "Three things we take seriously" — Nexterra-style: a near-full-width film
// panel that rises out of the bottom as you arrive, broken up by a hairline
// grid with little diamond cutouts so it reads as a wall of screens. Hover
// a chip → the wall switches to that story's film. Click → the catalogue.

const COLS = 8;
const ROWS = 3;
const PAGE_BG = '#0d0c0f';

const THINGS = [
  {
    key: 'health',
    label: 'Health',
    video: '/media/health-full.mp4',
    poster: '/media/health-aerial.jpg',
    cell: { col: 1, row: 1 },
    tile: '#4D1D81',
    tileText: '#ffffff',
    blurb:
      "Success isn't just the P&L. When you run your own diary, training runs, school pick-ups and actual lunch breaks fit inside it.",
    media: [
      { video: '/media/health-run.mp4' },
      { src: '/media/health-medal.jpg' },
      { video: '/media/health-doc.mp4' },
      { video: '/media/health-clip.mp4' },
    ],
  },
  {
    key: 'wealth',
    label: 'Wealth',
    video: '/media/film-awards-reel.mp4',
    poster: '/media/poster-awards.jpg',
    cell: { col: 4, row: 0 },
    tile: '#9565FF',
    tileText: '#ffffff',
    blurb:
      'Better money than employment ever paid — earned on your own name, celebrated loudly when it lands.',
    media: [{ src: '/media/bbs-239.jpg' }, { src: '/media/poster-awards.jpg' }, { src: '/media/bbs-143.jpg' }],
  },
  {
    key: 'happiness',
    label: 'Happiness',
    video: '/media/film-summit.mp4',
    poster: '/media/poster-summit.jpg',
    cell: { col: 6, row: 2 },
    tile: '#E3D7FF',
    tileText: '#131313',
    blurb:
      "The unscientific measure that matters most. If the work isn't making life better, what's it for?",
    media: [{ src: '/media/z63-5220.jpg' }, { src: '/media/bbs-77.jpg' }, { src: '/media/eass-18.jpg' }],
  },
];

// tiles that get a whisper of blur so the wall feels like separate screens
const BLURRED = new Set([1, 6, 10, 13, 20]);

export default function Seriously() {
  const ref = useRef(null);
  const [activeKey, setActiveKey] = useState('health');
  const [open, setOpen] = useState(null);
  const active = open !== null ? THINGS[open] : null;

  // the section runs 60vh past its content; the content pins, and the next
  // section rolls up over the top of it
  return (
    <section ref={ref} className="relative pb-[100vh] text-white">
      <div className="sticky top-0 pt-20 md:pt-24 overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1700px] mx-auto">
        <h2 className="font-black-display font-extrabold uppercase tracking-tight text-4xl md:text-6xl leading-[1.02]">
          Three things we
          <br />
          take seriously<span className="text-[#9565FF]">.</span>
        </h2>
      </div>

      {/* the wall of screens — rises out of the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 160 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mt-12 md:mt-16 mx-3 md:mx-8 h-[58vh] md:h-[72vh] rounded-lg overflow-hidden bg-[#0d0c0f]"
      >
        {/* the films — one per story, cross-fading as you hover the chips */}
        {THINGS.map((t) => (
          <video
            key={t.key}
            src={t.video}
            poster={t.poster}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              activeKey === t.key ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* the grid — hairlines, blur panes, diamond cutouts */}
        <div
          className="absolute inset-0 grid pointer-events-none"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
        >
          {Array.from({ length: COLS * ROWS }, (_, i) => (
            <div
              key={i}
              className={`border-[0.5px] border-black/60 ${BLURRED.has(i) ? 'backdrop-blur-[2px] bg-white/[0.03]' : ''}`}
            />
          ))}
        </div>
        {/* diamonds at the intersections — the page peeking through */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: (COLS - 1) * (ROWS - 1) }, (_, i) => {
            const c = (i % (COLS - 1)) + 1;
            const r = Math.floor(i / (COLS - 1)) + 1;
            return (
              <span
                key={i}
                className="absolute w-[7px] h-[7px] rotate-45 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(c / COLS) * 100}%`, top: `${(r / ROWS) * 100}%`, backgroundColor: PAGE_BG }}
              />
            );
          })}
        </div>

        {/* the tiles — each claims a full pane of the wall. Hover switches the
            films; click opens the story. Deepest purple → lightest. */}
        {THINGS.map((t, i) => (
          <button
            key={t.key}
            onMouseEnter={() => setActiveKey(t.key)}
            onClick={() => setOpen(i)}
            style={{
              left: `${(t.cell.col / COLS) * 100}%`,
              top: `${(t.cell.row / ROWS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              backgroundColor: t.tile,
              color: t.tileText,
            }}
            className={`absolute z-10 text-left p-3 md:p-4 transition-all duration-300 cursor-pointer
              flex flex-col justify-between border-[0.5px] border-black/60
              ${activeKey === t.key ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
          >
            <Plus size={14} className="self-end opacity-70" />
            <span>
              <span className="block text-[0.7rem] opacity-60 leading-none mb-1">0{i + 1}</span>
              <span className="block text-[0.95rem] md:text-lg font-semibold leading-tight">{t.label}</span>
            </span>
          </button>
        ))}
      </motion.div>

      {/* the pop-out catalogue */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[86vh] overflow-y-auto rounded-2xl bg-[#141217] text-white p-6 md:p-10"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X size={17} />
              </button>
              <p className="font-brittany text-4xl md:text-5xl text-[#B78AF7]">{active.label}</p>
              <p className="mt-4 text-white/70 font-light text-sm md:text-base max-w-xl leading-relaxed">
                {active.blurb}
              </p>
              <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-3">
                {active.media.map((m, i) =>
                  m.video ? (
                    <video key={i} src={m.video} autoPlay muted loop playsInline className="w-full aspect-[3/4] object-cover rounded-lg bg-black/40" />
                  ) : (
                    <img key={i} src={m.src} alt="" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-lg bg-black/40" />
                  )
                )}
              </div>
              <p className="mt-6 text-white/35 text-xs">
                The catalogue keeps growing — more stories landing here soon.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
