import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { EASE } from '../experience/motion';

// Our Brands: Shaun mid-applause on the left, outline-only brand boxes on
// the right that blush their brand's pastel on hover. Clicking opens the
// brand story — the brand AND the person behind it, because round here the
// person IS the brand. TPE (Jim) is built out; the rest follow as James
// labels the folders.

const PHOTO = '/media/eass-18.jpg';

const BRANDS = [
  {
    key: 'tpe',
    brand: 'The Property Experts',
    line: 'Meet the estate agents',
    pastel: '#FADFD6',
    accent: '#E8420D',
    md: 'Jim',
    mdPhoto: '/media/tpe-jim.jpg',
    story:
      "This is Jim. Twenty-plus years in estate agency, and still the first to pick up the phone. He built The Property Experts so brilliant agents could run their own patch with a proper business behind them — and he's usually the one showing them how.",
    photos: ['/media/tpe-1.jpg', '/media/tpe-2.jpg', '/media/tpe-3.jpg', '/media/tpe-4.jpg', '/media/tpe-5.jpg', '/media/tpe-6.jpg', '/media/tpe-7.jpg', '/media/tpe-8.jpg', '/media/tpe-9.jpg'],
  },
  {
    key: 'fc',
    brand: 'Fine & Country',
    line: 'Meet the high-end agents',
    pastel: '#E8E4E2',
    accent: '#8B7355',
    photos: ['/media/bbs-239.jpg', '/media/bbs-95.jpg'],
  },
  {
    key: 'tle',
    brand: 'The Lettings Experts',
    line: 'Meet the letting agents',
    pastel: '#FBD9DB',
    accent: '#ED1C24',
    md: 'Sue',
    mdPhoto: '/media/tle-sue.jpg',
    story:
      "This is Sue. Lettings is a people business pretending to be a property business — and nobody knows that better. Sue leads The Lettings Experts: local agents who treat every landlord's property like their own book of business.",
    photos: ['/media/tle-1.jpg'],
  },
  {
    key: 'tme',
    brand: 'The Mortgage Experts',
    line: 'Meet the mortgage advisors',
    pastel: '#D8E2F1',
    accent: '#2255A4',
    photos: ['/media/bbs-30.jpg'],
  },
  {
    key: 'tac',
    brand: 'The Auction Company',
    line: 'Meet the auctioneers',
    pastel: '#EEF6D6',
    accent: '#7A9A1F',
    photos: ['/media/bbs-242.jpg'],
  },
  {
    key: 'tre',
    brand: 'The Recruitment Experts',
    line: 'Meet the recruiters',
    pastel: '#FBD9DC',
    accent: '#E8222D',
    photos: ['/media/bbs-89.jpg'],
  },
];

function BrandModal({ brand, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 44, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#F7F6F4] text-[#131313] p-6 md:p-12"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center"
        >
          <X size={17} />
        </button>

        <p className="type-label" style={{ color: brand.accent }}>
          {brand.line}
        </p>
        <h3 className="mt-2 font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-4xl">
          {brand.brand}
        </h3>

        {brand.md ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1.15fr,300px] gap-8 md:gap-10 items-start">
            {/* the agency in pictures — a proper square grid */}
            <div>
              <div className="grid grid-cols-3 gap-2.5">
                {Array.from({ length: 9 }, (_, i) => brand.photos[i % brand.photos.length]).map((p, i) => (
                  <img key={i} src={p} alt="" loading="lazy" className="w-full aspect-square object-cover rounded-lg" />
                ))}
              </div>
            </div>

            {/* the person — arrow scribbles out and points straight at them */}
            <div className="relative">
              <div className="flex items-end gap-1.5 mb-3">
                <p className="font-brittany text-4xl md:text-5xl" style={{ color: brand.accent }}>
                  Meet {brand.md}
                </p>
                <motion.img
                  src="/scribbles/arrow.svg"
                  alt=""
                  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                  animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.5 }}
                  className="w-14 h-14 rotate-[55deg] translate-y-4"
                />
              </div>
              <motion.img
                src={brand.mdPhoto}
                alt={brand.md}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                className="w-full aspect-[3/4] object-cover rounded-xl shadow-[0_18px_44px_rgba(0,0,0,0.18)]"
              />
              <p className="mt-5 text-sm font-light leading-relaxed text-black/70">
                {brand.story}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {brand.photos.map((p) => (
                <img key={p} src={p} alt="" loading="lazy" className="w-full aspect-square object-cover rounded-lg" />
              ))}
            </div>
            <p className="mt-6 text-sm font-light text-black/50">
              The full story — and the person behind it — lands here soon.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function BrandsPeople() {
  const ref = useRef(null);
  const [open, setOpen] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const fg = useTransform(scrollYProgress, [0.04, 0.13], ['#131313', '#ffffff']);
  // heavier, layered parallax — heading, subtext and boxes each at their own speed
  const headingY = useTransform(scrollYProgress, [0, 1], [64, -64]);
  const subY = useTransform(scrollYProgress, [0, 1], [96, -96]);
  const boxesY = useTransform(scrollYProgress, [0, 1], [140, -140]);

  const active = open !== null ? BRANDS[open] : null;

  return (
    <motion.section
      ref={ref}
      id="brands"
      style={{ color: fg }}
      className="relative pt-14 md:pt-16 pb-24 md:pb-28 overflow-hidden"
    >
      <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-14 px-6 md:px-10 lg:px-14 max-w-[1700px] mx-auto">
        <div className="relative w-full md:w-[36vw] shrink-0">
          <div className="relative h-[48vh] md:h-[68vh] overflow-hidden rounded-3xl">
            <img src={PHOTO} alt="One of ours, mid-applause" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <div className="relative z-10 flex-1 min-w-0">
          <motion.h2
            style={{ y: headingY }}
            className="font-black-display font-extrabold uppercase tracking-tight
              text-4xl md:text-[3.4rem] lg:text-[4.2rem] leading-[1.0]
              md:-ml-[13vw] relative z-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            Meet the people
            <br />
            behind the brands<span className="text-[#9565FF]">.</span>
          </motion.h2>
          <motion.p style={{ y: subY }} className="mt-6 opacity-60 font-light text-sm md:text-base max-w-md leading-relaxed">
            Seven specialist businesses, every one of them run by people who
            chose to do their best work on their own terms.
          </motion.p>

          {/* outline boxes — brand pastel blush on hover */}
          <motion.div style={{ y: boxesY }} className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BRANDS.map((b, i) => (
              <motion.button
                key={b.key}
                onClick={() => setOpen(i)}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.07 + Math.floor(i / 3) * 0.14 }}
                whileHover={{ backgroundColor: b.pastel, color: '#131313' }}
                className="group rounded-xl border border-current/30 p-4 md:p-5 text-left cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div>
                    <p className="font-semibold text-[0.88rem] leading-snug">{b.brand}</p>
                    <p className="mt-1 opacity-55 text-[0.75rem] font-light leading-relaxed">{b.line}</p>
                  </div>
                  <ArrowUpRight size={15} className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity mt-0.5" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {active && <BrandModal brand={active} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </motion.section>
  );
}
