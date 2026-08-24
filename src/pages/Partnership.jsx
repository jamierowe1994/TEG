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
  const photoY = useTransform(scrollYProgress, [0, 1], ['0vh', '-12vh']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0vh', '-22vh']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-background text-foreground">
      {/* the statement, sitting behind her */}
      <motion.div
        style={{ y: titleY }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none"
      >
        <div className="w-full max-w-[1400px]">
          <h1 className="font-sans font-light tracking-[-0.045em] leading-[0.92] text-[13vw] md:text-[9.5vw]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-center md:pl-[24%]"
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, ease: EASE, delay: 0.25 }}
              >
                Work for
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-center md:pl-[40%]"
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, ease: EASE, delay: 0.38 }}
              >
                yourself
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-5 md:mt-7 text-center md:pl-[42%] text-muted-foreground font-light text-sm md:text-base"
          >
            seven specialist brands, one group behind you
          </motion.p>
        </div>
      </motion.div>

      {/* one of ours, cut out and standing in the room. The placement lives on
          a plain wrapper — motion writes its own transform, which would wipe
          out a Tailwind translate. */}
      <div className="absolute bottom-0 left-1/2 z-20 -translate-x-[72%] md:-translate-x-[104%] pointer-events-none">
        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
        >
          <img
            src="/media/tle-lauren.png"
            alt="One of our agents"
            className="h-[62vh] md:h-[80vh] w-auto object-contain object-bottom grayscale"
          />
        </motion.div>
      </div>

      {/* the way down */}
      <motion.a
        href="#brands"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-8 left-6 md:left-10 z-30 w-12 h-12 rounded-full border border-foreground/25
          flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
        aria-label="Scroll to the brands"
      >
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>

      {/* the label, quietly */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-11 right-6 md:right-10 z-30 text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground"
      >
        Partnership
      </motion.p>
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
    <section id="brands" className="relative bg-[#0d0c0f] py-20 md:py-28 overflow-hidden">
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
    <div className="bg-background text-foreground min-h-screen overflow-x-clip">
      <ExperienceNav />
      <Hero />
      <Chooser />
      <Closer />
      <SiteFooter />
    </div>
  );
}
