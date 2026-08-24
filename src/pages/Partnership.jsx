import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';
import VintageFrame from '../components/VintageFrame';

// Partnership — a dark, open room. One line at the top, one photograph, then
// each brand gets its own space to be itself. No walls of copy: the job here
// is the feeling of belonging to something, not the spec sheet. The detail
// lives in the pack people can ask for when they actually want it.

const BRANDS = [
  {
    key: 'tpe',
    n: '01',
    name: 'The Property Experts',
    craft: 'Estate agency',
    why: 'For the agent who has outgrown the branch. Your patch, your name above the door, your way of doing it.',
    photo: '/media/tpe-1.jpg',
    accent: '#E8420D',
    to: '/partnership/property',
  },
  {
    key: 'fc',
    n: '02',
    name: 'Fine & Country',
    craft: 'Premium & luxury homes',
    why: 'For the agent whose market is the one everyone else gets nervous about.',
    photo: '/media/bbs-239.jpg',
    accent: '#B49A6A',
    to: '/partnership/fine-and-country',
  },
  {
    key: 'tle',
    n: '03',
    name: 'The Letting Experts',
    craft: 'Lettings & property management',
    why: 'For the letting agent tired of being the afterthought in someone else’s estate agency.',
    photo: '/media/tle-1.jpg',
    accent: '#ED1C24',
    to: '/partnership/lettings',
    ready: true,
  },
  {
    key: 'tme',
    n: '04',
    name: 'The Mortgage Experts',
    craft: 'Mortgage & protection',
    why: 'For the adviser who wants the whole market, and none of the politics.',
    photo: '/media/bbs-30.jpg',
    accent: '#2255A4',
    to: '/partnership/mortgages',
  },
  {
    key: 'tac',
    n: '05',
    name: 'The Auction Company',
    craft: 'Property auctions',
    why: 'For the agent who works best against a deadline and a room full of bidders.',
    photo: '/media/bbs-242.jpg',
    accent: '#A8D32A',
    to: '/partnership/auctions',
  },
  {
    key: 'tcpe',
    n: '06',
    name: 'The Commercial Property Experts',
    craft: 'Commercial sales, lettings & investment',
    why: 'For the agent who talks in yield and lease terms, not kerb appeal.',
    photo: '/media/bbs-162.jpg',
    accent: '#0094D2',
    to: '/partnership/commercial',
  },
  {
    key: 'tre',
    n: '07',
    name: 'The Recruitment Experts',
    craft: 'Property industry recruitment',
    why: 'For the recruiter who already knows this industry, because they came from it.',
    photo: '/media/tre-1.jpg',
    accent: '#E8222D',
    to: '/partnership/recruitment',
  },
];

function Hero() {
  return (
    <section className="relative bg-[#0d0c0f] pt-[16vh]">
      <div className="px-6 text-center">
        <h1 className="font-black-display font-extrabold uppercase tracking-tight text-white text-[2.6rem] md:text-[4.6rem] leading-[0.98]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.2 }}
            >
              Friends to your
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.33 }}
            >
              massive ambitions.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          className="mt-7 text-white/40 text-[0.6rem] md:text-[0.68rem] tracking-[0.22em] uppercase"
        >
          [ TEG / The Experts Group ]
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          className="mt-2 text-white/75 text-sm md:text-base leading-[1.6]"
        >
          Seven specialist brands, one group behind you.
          <br />
          Property, finance and recruitment — run on your terms.
        </motion.p>
      </div>

      {/* the photograph runs past the fold; the rest arrives as you scroll */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
        className="mt-[7vh] px-4 md:px-16"
      >
        <VintageFrame
          src="/media/vintage.jpg"
          mask="/media/vintage-mask.png"
          alt="Around the table at The Experts Group"
          className="w-full h-[88vh] rounded-lg"
        />
      </motion.div>

      <div className="flex items-center justify-between px-6 md:px-16 pt-5">
        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-white/35">Partnership</p>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/40"
        >
          <ArrowDown size={16} />
        </motion.span>
      </div>
    </section>
  );
}

function BrandPanel({ brand, index }) {
  const flip = index % 2 === 1;
  return (
    <section className="relative bg-[#0d0c0f] py-[13vh] md:py-[16vh] px-6 md:px-16">
      <div
        className={`max-w-[1500px] mx-auto flex flex-col gap-10 md:gap-20 md:items-center ${
          flip ? 'md:flex-row-reverse' : 'md:flex-row'
        }`}
      >
        {/* a small window, never a backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="w-full md:w-[30%] shrink-0"
        >
          <img
            src={brand.photo}
            alt=""
            loading="lazy"
            className="w-full aspect-[4/5] object-cover rounded-lg grayscale"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="flex-1 min-w-0"
        >
          <div className="flex items-center gap-4">
            <span className="text-[0.6rem] tracking-[0.28em]" style={{ color: brand.accent }}>
              {brand.n}
            </span>
            <span className="h-px w-[70px] bg-white/15" />
            <span className="text-[0.6rem] tracking-[0.2em] uppercase text-white/35">
              {brand.craft}
            </span>
            {brand.ready && (
              <span
                className="rounded-full px-3 py-1 text-[0.55rem] tracking-[0.18em] uppercase"
                style={{ backgroundColor: `${brand.accent}22`, color: brand.accent }}
              >
                Open now
              </span>
            )}
          </div>

          <h2 className="mt-6 font-sans font-light tracking-[-0.03em] text-white leading-[1.02] text-[8vw] md:text-[3.6vw]">
            {brand.name}
          </h2>

          <p className="mt-6 text-white/60 font-light text-base md:text-xl leading-[1.6] max-w-[26em]">
            {brand.why}
          </p>

          <Link
            to={brand.to}
            className="group mt-9 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            <span className="border-b border-white/30 group-hover:border-white pb-1 transition-colors">
              Look inside {brand.name}
            </span>
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="relative bg-[#0d0c0f] py-[18vh] px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.95, ease: EASE }}
        className="max-w-[1100px] mx-auto text-center"
      >
        <h2 className="font-sans font-light tracking-[-0.03em] text-white leading-[1.08] text-[9vw] md:text-[4.4vw]">
          You already know
          <br />
          how to do the work.
        </h2>
        <p className="mt-8 text-white/55 font-light text-base md:text-lg max-w-[30em] mx-auto leading-[1.7]">
          The rest — the brand, the technology, the compliance, the people who
          pick up the phone when it goes wrong — is what we're for.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:hello@theexpertsgroup.co.uk?subject=Partnership"
            className="rounded-lg bg-white text-[#131313] px-9 py-4 text-sm font-semibold hover:bg-white/85 transition-colors"
          >
            Start a conversation
          </a>
          <a
            href="mailto:hello@theexpertsgroup.co.uk?subject=Information%20pack"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 text-white px-8 py-4
              text-sm font-medium hover:border-white/60 transition-colors"
          >
            Or just take the pack <ArrowUpRight size={15} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default function Partnership() {
  useLenis();
  return (
    <div className="bg-[#0d0c0f] text-white min-h-screen overflow-x-clip">
      <ExperienceNav dark />
      <Hero />
      {BRANDS.map((b, i) => (
        <BrandPanel key={b.key} brand={b} index={i} />
      ))}
      <Closer />
      <SiteFooter />
    </div>
  );
}
