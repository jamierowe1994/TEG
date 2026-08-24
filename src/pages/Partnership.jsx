import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';

// Partnership — the door in. A dark room where the seven brands are read
// as a list of huge names; whichever one you touch floods the room with
// its own picture and colour. Pick the one that's yours and it hands you
// over to that brand's own page.

const BRANDS = [
  {
    key: 'tpe',
    name: 'The Property Experts',
    craft: 'Estate agency',
    line: 'Run your own patch, keep your own name above the door.',
    accent: '#E8420D',
    photo: '/media/tpe-1.jpg',
    to: '/partnership/property',
  },
  {
    key: 'fc',
    name: 'Fine & Country',
    craft: 'Premium & luxury homes',
    line: 'The premium market, with a global name behind you.',
    accent: '#B49A6A',
    photo: '/media/bbs-239.jpg',
    to: '/partnership/fine-and-country',
  },
  {
    key: 'tle',
    name: 'The Letting Experts',
    craft: 'Lettings & property management',
    line: 'Built for lettings alone — not an estate agency hybrid.',
    accent: '#ED1C24',
    photo: '/media/tle-1.jpg',
    to: '/partnership/lettings',
    ready: true,
  },
  {
    key: 'tme',
    name: 'The Mortgage Experts',
    craft: 'Mortgage & protection',
    line: 'Whole-of-market advice, none of the branch politics.',
    accent: '#2255A4',
    photo: '/media/bbs-30.jpg',
    to: '/partnership/mortgages',
  },
  {
    key: 'tac',
    name: 'The Auction Company',
    craft: 'Property auctions',
    line: 'The fastest route to sold, run on your terms.',
    accent: '#A8D32A',
    photo: '/media/bbs-242.jpg',
    to: '/partnership/auctions',
  },
  {
    key: 'tcpe',
    name: 'The Commercial Property Experts',
    craft: 'Commercial sales, lettings & investment',
    line: 'Commercial deals, specialist backing.',
    accent: '#0094D2',
    photo: '/media/bbs-162.jpg',
    to: '/partnership/commercial',
  },
  {
    key: 'tre',
    name: 'The Recruitment Experts',
    craft: 'Property industry recruitment',
    line: 'Recruit for the industry you already know.',
    accent: '#E8222D',
    photo: '/media/tre-1.jpg',
    to: '/partnership/recruitment',
  },
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '18vh']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#0d0c0f]">
      <video
        src="/media/film-summit.mp4"
        poster="/media/poster-summit.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }}
      />

      <motion.div
        style={{ y, opacity: fade }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="text-[0.62rem] md:text-[0.7rem] tracking-[0.25em] uppercase text-[#E3D7FF] mb-7"
        >
          Partnership
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="font-black-display font-extrabold uppercase tracking-tight text-white
            text-[10vw] md:text-[6.4vw] leading-[0.92]"
        >
          Seven ways to
          <br />
          work for yourself
          <span className="text-[#9565FF]">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="mt-7 text-white/65 font-light text-sm md:text-base max-w-lg leading-relaxed"
        >
          Every brand in the Group is its own business, with its own craft and
          its own MD. Find the one that fits what you already do brilliantly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-14 flex flex-col items-center gap-2 text-white/45"
        >
          <span className="text-[0.6rem] tracking-[0.25em] uppercase">Choose your brand</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function BrandRow({ brand, index, hovered, setHovered }) {
  const isHot = hovered === brand.key;
  const dimmed = hovered !== null && !isHot;

  return (
    <Link
      to={brand.to}
      onMouseEnter={() => setHovered(brand.key)}
      onMouseLeave={() => setHovered(null)}
      className="group relative block border-b border-white/10"
    >
      <motion.div
        animate={{ opacity: dimmed ? 0.28 : 1, x: isHot ? 22 : 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative z-10 px-6 md:px-12 py-7 md:py-9 flex items-center gap-6 md:gap-10"
      >
        <span className="text-[0.6rem] md:text-xs tracking-[0.25em] text-white/35 w-8 shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <h2
            className="font-black-display font-extrabold uppercase tracking-[-0.02em] leading-[0.95]
              text-[6.2vw] md:text-[3.4vw] transition-colors duration-500"
            style={{ color: isHot ? brand.accent : '#F1F1F1' }}
          >
            {brand.name}
          </h2>
          <motion.p
            animate={{ opacity: isHot ? 1 : 0, height: isHot ? 'auto' : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden text-white/60 font-light text-sm md:text-base mt-1"
          >
            {brand.line}
          </motion.p>
        </div>

        <span className="hidden md:block text-[0.62rem] tracking-[0.2em] uppercase text-white/40 shrink-0">
          {brand.craft}
        </span>

        <motion.span
          animate={{ opacity: isHot ? 1 : 0.25, rotate: isHot ? 0 : -30 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="shrink-0 text-white"
        >
          <ArrowUpRight size={22} />
        </motion.span>

        {brand.ready && (
          <span
            className="hidden md:inline-flex shrink-0 rounded-full px-3 py-1 text-[0.58rem] tracking-[0.18em] uppercase"
            style={{ backgroundColor: `${brand.accent}22`, color: brand.accent }}
          >
            Open now
          </span>
        )}
      </motion.div>
    </Link>
  );
}

function Chooser() {
  const [hovered, setHovered] = useState(null);
  const hot = BRANDS.find((b) => b.key === hovered);

  return (
    <section className="relative bg-[#0d0c0f] py-20 md:py-28 overflow-hidden">
      {/* whichever brand you touch floods the room. One image stack and one
          tint layer — mounting a fresh overlay per hover let them pile up and
          wash the room out. */}
      <div className="absolute inset-0 pointer-events-none">
        {BRANDS.map((b) => (
          <img
            key={b.key}
            src={b.photo}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-700 ${
              hovered === b.key ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ${
            hot ? 'opacity-[0.72]' : 'opacity-0'
          }`}
        />
        <motion.div
          animate={{ backgroundColor: hot ? hot.accent : '#0d0c0f', opacity: hot ? 0.2 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute inset-0 mix-blend-overlay"
        />
      </div>

      <div className="relative z-10">
        <div className="px-6 md:px-12 mb-10 md:mb-14">
          <p className="text-[0.62rem] tracking-[0.25em] uppercase text-[#E3D7FF]">Our brands</p>
        </div>
        <div className="border-t border-white/10">
          {BRANDS.map((b, i) => (
            <BrandRow key={b.key} brand={b} index={i} hovered={hovered} setHovered={setHovered} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="relative bg-background text-foreground py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.05]">
            Not sure which
            <br />
            one is yours?
          </h2>
          <p className="mt-5 font-script text-[#9565FF] text-2xl md:text-3xl">
            Tell us what you do. We'll tell you where you'd fit.
          </p>
          <p className="mt-5 text-muted-foreground font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
            One conversation, no pitch. We'd rather point you at the right
            brand than the nearest one.
          </p>
          <a
            href="mailto:hello@theexpertsgroup.co.uk?subject=Partnership%20enquiry"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#9565FF] text-white px-9 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start a conversation <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function Partnership() {
  useLenis();
  return (
    <div className="bg-[#0d0c0f] text-white min-h-screen overflow-x-clip">
      <ExperienceNav dark />
      <Hero />
      <Chooser />
      <Closer />
      <SiteFooter />
    </div>
  );
}
