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
    accent: '#E8420D',
    to: '/partnership/property',
  },
  {
    key: 'fc',
    n: '02',
    name: 'Fine & Country',
    craft: 'Premium & luxury homes',
    why: 'For the agent whose market is the one everyone else gets nervous about.',
    accent: '#B49A6A',
    to: '/partnership/fine-and-country',
  },
  {
    key: 'tle',
    n: '03',
    name: 'The Letting Experts',
    craft: 'Lettings & property management',
    why: 'For the letting agent tired of being the afterthought in someone else’s estate agency.',
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
    accent: '#2255A4',
    to: '/partnership/mortgages',
  },
  {
    key: 'tac',
    n: '05',
    name: 'The Auction Company',
    craft: 'Property auctions',
    why: 'For the agent who works best against a deadline and a room full of bidders.',
    accent: '#A8D32A',
    to: '/partnership/auctions',
  },
  {
    key: 'tcpe',
    n: '06',
    name: 'The Commercial Property Experts',
    craft: 'Commercial sales, lettings & investment',
    why: 'For the agent who talks in yield and lease terms, not kerb appeal.',
    accent: '#0094D2',
    to: '/partnership/commercial',
  },
  {
    key: 'tre',
    n: '07',
    name: 'The Recruitment Experts',
    craft: 'Property industry recruitment',
    why: 'For the recruiter who already knows this industry, because they came from it.',
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
          parallax
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

const REASONS = [
  {
    n: '01',
    head: 'Your diary is your own',
    body: 'Work the hours that fit your life. The school run, the training run, the long lunch — you decide what the day looks like, not a rota.',
  },
  {
    n: '02',
    head: 'Nobody over your shoulder',
    body: 'No micromanagement, no arbitrary targets, nobody asking why you left the office at three. You are trusted to run your own business.',
  },
  {
    n: '03',
    head: 'Do what you are good at',
    body: 'Compliance, marketing, technology and the back-office sit with us. Your day goes on the work only you can do.',
  },
  {
    n: '04',
    head: 'Start without betting the house',
    body: 'A low set-up cost and no premises to fund. The step into running your own business is a smaller one than most people expect.',
  },
];

function Reasons() {
  return (
    <section className="relative bg-[#0d0c0f] pt-[14vh] pb-[6vh] px-6 md:px-16">
      <div className="max-w-[1500px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-black-display font-extrabold uppercase tracking-tight text-white
            text-[2.2rem] md:text-[3.6rem] leading-[1] max-w-[14em]"
        >
          What actually changes
        </motion.h2>

        <div className="mt-[9vh] grid grid-cols-1 md:grid-cols-2">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.12 }}
              className={`py-10 md:py-14 md:px-12 first:pt-0 md:first:pt-14
                border-t border-white/10
                ${i % 2 === 0 ? 'md:border-r md:pl-0' : ''}
                ${i < 2 ? 'md:border-t-0' : ''}`}
            >
              <span className="text-[0.6rem] tracking-[0.28em] text-white/30">{r.n}</span>
              <h3 className="mt-5 font-sans font-light tracking-[-0.02em] text-white text-[1.8rem] md:text-[2.4rem] leading-[1.1]">
                {r.head}
              </h3>
              <p className="mt-4 text-white/55 font-light text-base leading-[1.7] max-w-[30em]">
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandPicker() {
  return (
    <section className="relative bg-[#0d0c0f] py-[14vh] px-6 md:px-16">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-white
            text-[2.2rem] md:text-[3.6rem] leading-[1]">
            Seven brands.
            <br />
            One of them is yours.
          </h2>
          <p className="mt-6 text-white/50 font-light text-base md:text-lg max-w-[32em] leading-[1.7]">
            Each one is its own business with its own MD. Pick the one that
            matches what you already do brilliantly.
          </p>
        </motion.div>

        <div className="mt-[8vh] border-t border-white/10">
          {BRANDS.map((b, i) => (
            <motion.div
              key={b.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
            >
              <Link
                to={b.to}
                className="group flex items-center gap-5 md:gap-8 py-6 md:py-7 border-b border-white/10
                  transition-colors hover:bg-white/[0.03]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-500 group-hover:scale-[2.2]"
                  style={{ backgroundColor: b.accent }}
                />
                <span className="font-sans font-light tracking-[-0.02em] text-white text-[1.4rem] md:text-[2.1rem] leading-none">
                  {b.name}
                </span>
                <span className="hidden md:block ml-auto text-[0.62rem] tracking-[0.2em] uppercase text-white/30">
                  {b.craft}
                </span>
                {b.ready && (
                  <span
                    className="hidden md:inline-flex rounded-full px-3 py-1 text-[0.55rem] tracking-[0.18em] uppercase shrink-0"
                    style={{ backgroundColor: `${b.accent}22`, color: b.accent }}
                  >
                    Open now
                  </span>
                )}
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-white/25 group-hover:text-white transition-colors ml-auto md:ml-0"
                />
              </Link>
            </motion.div>
          ))}
        </div>
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
      <Reasons />
      <BrandPicker />
      <Closer />
      <SiteFooter />
    </div>
  );
}
