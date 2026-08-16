import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EXPERIENCE_BRANDS } from '../experience/brands';

// Our Brands — a horizontal ride. Scroll pins the section and slides the
// panels left: first "Meet our brands / We help [rotating word]", then one
// full panel per brand with its own photos or film. At the end, the pin
// releases and the page carries on down as normal.
// Media is placeholder — James swaps in per-brand shots later.

const HELP_WORDS = [
  'home movers',
  'estate agents',
  'mortgage advisors',
  'lettings agents',
  'high-end agents',
  'commercial agents',
  'recruiters',
  'landlords',
  'first-time buyers',
];

// per-brand placeholder media — five tiles each for the bento collage.
// 'CARD' resolves to the brand's own property photo. James swaps in the
// real per-brand shots later.
const PANEL_MEDIA = {
  'the-property-experts': [{ src: '/media/bbs-150.jpg' }, 'CARD', { src: '/media/bbs-136.jpg' }, { src: '/media/bbs-26.jpg' }, { src: '/media/bbs-85.jpg' }],
  'fine-and-country': [{ src: '/media/bbs-239.jpg' }, { src: '/media/bbs-95.jpg' }, 'CARD', { src: '/media/bbs-162.jpg' }, { src: '/media/bbs-89.jpg' }],
  'the-lettings-experts': [{ video: '/media/film-awards-reel.mp4', poster: '/media/poster-awards.jpg' }, { src: '/media/bbs-85.jpg' }, 'CARD', { src: '/media/bbs-242.jpg' }, { src: '/media/bbs-30.jpg' }],
  'the-mortgage-experts': [{ src: '/media/bbs-30.jpg' }, 'CARD', { src: '/media/bbs-77.jpg' }, { src: '/media/bbs-136.jpg' }, { src: '/media/bbs-150.jpg' }],
  'the-auction-experts': [{ src: '/media/bbs-242.jpg' }, 'CARD', { src: '/media/bbs-26.jpg' }, { src: '/media/bbs-95.jpg' }, { src: '/media/bbs-162.jpg' }],
  'the-commercial-property-experts': [{ src: '/media/bbs-162.jpg' }, 'CARD', { src: '/media/bbs-89.jpg' }, { src: '/media/bbs-150.jpg' }, { src: '/media/bbs-77.jpg' }],
  'the-recruitment-experts': [{ video: '/media/film-summit.mp4', poster: '/media/poster-summit.jpg' }, { src: '/media/bbs-77.jpg' }, 'CARD', { src: '/media/bbs-136.jpg' }, { src: '/media/bbs-239.jpg' }],
};

// bento shapes for the five tiles — fills a 3×3 grid
const BENTO = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HELP_WORDS.length), 1700);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ height: '1.3em', minWidth: '7.5em' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={HELP_WORDS[i]}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '-110%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap text-[#9565FF]"
        >
          {HELP_WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function IntroPanel() {
  return (
    <div className="w-screen h-full shrink-0 flex flex-col justify-center px-8 md:px-24">
      <p className="type-label text-[#9565FF] mb-6">Our brands</p>
      <h2 className="font-black-display font-extrabold uppercase tracking-tight text-4xl md:text-7xl leading-[1.05]">
        Meet the group.
      </h2>
      <p className="mt-6 text-2xl md:text-5xl font-light">
        We help <RotatingWord />
      </p>
      <p className="mt-10 text-muted-foreground text-sm flex items-center gap-2">
        Keep scrolling <ArrowRight size={14} />
      </p>
    </div>
  );
}

function BrandPanel({ brand, index, total }) {
  const media = PANEL_MEDIA[brand.id] || {};
  return (
    <div className="w-screen h-full shrink-0 grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-8 md:px-24">
      <div>
        <p className="type-label text-muted-foreground mb-5">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <h3 className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.04]">
          {brand.name}
        </h3>
        <p className="mt-3 font-script text-[#9565FF] text-2xl md:text-3xl">{brand.specialty}</p>
        <p className="mt-5 text-muted-foreground font-light text-sm md:text-base max-w-md leading-relaxed">
          {brand.description}
        </p>
        <Link
          to={brand.url}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-semibold hover:opacity-85 transition-opacity"
        >
          Visit {brand.shortName || brand.name} <ArrowRight size={15} />
        </Link>
      </div>

      {/* the bento collage — photos surrounding the brand */}
      <div className="relative h-[46vh] md:h-[68vh] hidden sm:grid grid-cols-3 grid-rows-3 gap-3">
        {media.map((m, i) => {
          const item = m === 'CARD' ? { src: brand.cardPhoto } : m;
          return (
            <div key={i} className={`relative overflow-hidden rounded-xl md:rounded-2xl ${BENTO[i]}`}>
              {item.video ? (
                <video
                  src={item.video}
                  poster={item.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              {i === 0 && brand.id !== 'the-recruitment-experts' && (
                <img
                  src={brand.whiteLogo}
                  alt=""
                  className="absolute top-3 left-3 h-8 w-auto max-w-[55%] object-contain object-left drop-shadow"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BrandsSlider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const total = EXPERIENCE_BRANDS.length; // 7 brands + 1 intro = 8 panels
  const panels = total + 1;
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(panels - 1) * 100}vw`]);

  return (
    <section ref={ref} id="brands" className="relative bg-background" style={{ height: `${panels * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full will-change-transform">
          <IntroPanel />
          {EXPERIENCE_BRANDS.map((b, i) => (
            <BrandPanel key={b.id} brand={b} index={i} total={total} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}