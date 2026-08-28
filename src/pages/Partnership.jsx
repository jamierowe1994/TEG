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
    photo: '/media/tpe-1.jpg',
    n: '01',
    name: 'The Property Experts',
    craft: 'Estate agency',
    why: 'For the agent who has outgrown the branch. Your patch, your name above the door, your way of doing it.',
    accent: '#E8420D',
    to: '/partnership/property',
  },
  {
    key: 'fc',
    photo: '/media/bbs-239.jpg',
    n: '02',
    name: 'Fine & Country',
    craft: 'Premium & luxury homes',
    why: 'For the agent whose market is the one everyone else gets nervous about.',
    accent: '#B49A6A',
    to: '/partnership/fine-and-country',
  },
  {
    key: 'tle',
    photo: '/media/tle-1.jpg',
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
    photo: '/media/bbs-30.jpg',
    n: '04',
    name: 'The Mortgage Experts',
    craft: 'Mortgage & protection',
    why: 'For the adviser who wants the whole market, and none of the politics.',
    accent: '#2255A4',
    to: '/partnership/mortgages',
  },
  {
    key: 'tac',
    photo: '/media/bbs-242.jpg',
    n: '05',
    name: 'The Auction Company',
    craft: 'Property auctions',
    why: 'For the agent who works best against a deadline and a room full of bidders.',
    accent: '#A8D32A',
    to: '/partnership/auctions',
  },
  {
    key: 'tcpe',
    photo: '/media/bbs-162.jpg',
    n: '06',
    name: 'The Commercial Property Experts',
    craft: 'Commercial sales, lettings & investment',
    why: 'For the agent who talks in yield and lease terms, not kerb appeal.',
    accent: '#0094D2',
    to: '/partnership/commercial',
  },
  {
    key: 'tre',
    photo: '/media/tre-1.jpg',
    n: '07',
    name: 'The Recruitment Experts',
    craft: 'Property industry recruitment',
    why: 'For the recruiter who already knows this industry, because they came from it.',
    accent: '#E8222D',
    to: '/partnership/recruitment',
  },
  {
    key: 'tme2',
    photo: '/media/eass-63.jpg',
    n: '08',
    name: 'The Marketing Experts',
    craft: 'Brand & marketing',
    why: 'For the marketer tired of making someone else’s brand look good while their own sits in a drawer.',
    accent: '#E8A33D',
    to: '/partnership/marketing',
  },
  {
    key: 'teg',
    photo: '/media/eass-18.jpg',
    n: '09',
    name: 'The Experts Group',
    craft: 'The group itself',
    why: 'The thing all of them stand on: the brand, the technology, the back-office and the people.',
    accent: '#4D1D81',
    to: '/about',
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
        className="mt-[7vh] px-6 md:px-28 lg:px-40"
      >
        <VintageFrame
          src="/media/vintage.jpg"
          mask="/media/vintage-mask.png"
          alt="Around the table at The Experts Group"
          parallax
          className="w-full h-[88vh] rounded-lg"
        />
      </motion.div>

      <div className="flex items-center justify-between px-6 md:px-28 lg:px-40 pt-5">
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
    n: '10',
    head: 'Your diary is your own',
    body: 'Work the hours that fit your life. The school run, the training run, the long lunch — you decide what the day looks like, not a rota.',
  },
  {
    n: '11',
    head: 'Nobody over your shoulder',
    body: 'No micromanagement, no arbitrary targets, nobody asking why you left the office at three. You are trusted to run your own business.',
  },
  {
    n: '12',
    head: 'Do what you are good at',
    body: 'Compliance, marketing, technology and the back-office sit with us. Your day goes on the work only you can do.',
  },
  {
    n: '13',
    head: 'Start without betting the house',
    body: 'A low set-up cost and no premises to fund. The step into running your own business is a smaller one than most people expect.',
  },
];

function Reasons() {
  return (
    <section className="relative bg-[#0d0c0f] pt-[14vh] pb-[4vh] px-6 md:px-16">
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

        <div className="mt-[4.5vh] grid grid-cols-1 md:grid-cols-2">
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

// The economics, said plainly and given room: two huge lines pinned to
// opposite corners with the argument sitting off-centre between them.
function VisionLed() {
  const rise = (delay) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-15%' },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section className="relative bg-[#0d0c0f] min-h-screen flex flex-col justify-between
      px-6 md:px-12 py-[12vh] overflow-hidden">
      {/* top left, and the small print opposite it */}
      <div className="flex items-start justify-between gap-8">
        <motion.h2
          {...rise(0)}
          className="font-black-display font-extrabold uppercase tracking-[-0.04em] text-white
            text-[16vw] md:text-[10vw] leading-[0.8]"
        >
          Vision
          <br />
          led.
        </motion.h2>

        <motion.div
          {...rise(0.15)}
          className="text-right text-white/50 text-[0.62rem] md:text-[0.72rem] tracking-[0.08em] leading-[1.9] shrink-0"
        >
          <p className="text-white/80 mb-1">The Experts Group</p>
          <p>[&nbsp; 50–80% of the fee &nbsp;]</p>
          <p>[&nbsp; tech &amp; tools &nbsp;]</p>
          <p>[&nbsp; back-office &nbsp;]</p>
        </motion.div>
      </div>

      {/* the argument, off-centre to the left */}
      <motion.div
        {...rise(0.1)}
        className="md:ml-[24%] max-w-[42ch] space-y-6 py-[6vh]"
      >
        <p className="text-white/45 text-sm md:text-base leading-[1.65] text-justify">
          Most groups take the lion's share of the fee and call it support.
        </p>
        <p className="text-white/45 text-sm md:text-base leading-[1.65] text-justify">
          Our brands pay <span className="text-[#9565FF]">between 50% and 80% of the fee</span> to
          the agent who earned it. That single number changes what the job can
          be: fewer transactions to chase, more time on each one, and the room
          to actually care about every customer who comes through the door.
        </p>
        <p className="text-white/45 text-sm md:text-base leading-[1.65] text-justify">
          The technology, the tools and the back-office are ours to worry
          about. What's left is the part you're good at.
        </p>
      </motion.div>

      {/* bottom right */}
      <motion.h2
        {...rise(0.2)}
        className="font-black-display font-extrabold uppercase tracking-[-0.04em] text-white
          text-[16vw] md:text-[10vw] leading-[0.8] text-right self-end"
      >
        People
        <br />
        built.
      </motion.h2>
    </section>
  );
}

// The fan, done the way the reference actually does it — which the inspector
// settled: every strip is the SAME height and width, evenly spaced, and the
// curve is real 3D. Each one is rotated on its Y axis and pushed toward the
// viewer along Z, inside a container with perspective. The size difference is
// perspective doing the work, so the drop between neighbours stays gentle
// instead of stepping down like a staircase.
const CURVE = {
  step: 4.6,     // degrees between neighbouring strips
  radius: 1750,  // how hard the row wraps toward you
  depth: 1400,   // perspective on the container
};

// One photograph — the whole room at the Agents Success Day — laid across the
// full width of the viewport, with each strip acting as a window onto its own
// slice of it. The row reads as a single group shot until you hover a brand,
// at which point that strip's own picture takes over. Collective first, then
// the individual.
const COLLECTIVE = '/media/z63-0884.jpg';

// vw, and they have to agree with the padding and width classes below: the
// slice offsets are worked out from them, so changing one without the other
// slides the photograph out of register.
const LAYOUT = { pad: 4, strip: 8.6 };

// At natural size the row would spend its two end strips on curtain and its
// top third on the projector screen, so the picture is pushed in and dropped
// down until every strip has a face in it.
const FRAME = { zoom: 1.3, y: 62 };

function BrandArc() {
  const mid = (BRANDS.length - 1) / 2;
  const slot = (100 - LAYOUT.pad * 2) / BRANDS.length;
  // where this strip's left edge lands across the viewport, which is exactly
  // the part of the photograph it should be showing
  const sliceX = (i) => LAYOUT.pad + i * slot + (slot - LAYOUT.strip) / 2;
  // zooming keeps the picture centred, so the whole row shifts by half the
  // overspill — every strip has to use the same origin or the seams break
  const origin = 50 * (1 - FRAME.zoom);

  return (
    <section className="relative bg-[#0d0c0f] h-screen flex items-center overflow-hidden">
      <div
        className="flex w-full items-center px-[3.5vw] md:px-[4vw]"
        style={{ perspective: `${CURVE.depth}px`, transformStyle: 'preserve-3d' }}
      >
        {BRANDS.map((b, i) => {
          const off = i - mid;
          const angle = off * CURVE.step;
          const rad = (angle * Math.PI) / 180;
          // the ends of the row lean toward you; the middle sits furthest back
          const z = CURVE.radius * (1 - Math.cos(rad));
          const away = Math.abs(off) / mid;

          return (
            <div
              key={b.key}
              className="shrink-0 flex justify-center"
              style={{ width: `${100 / BRANDS.length}%`, transformStyle: 'preserve-3d' }}
            >
              {/* the 3D placement sits on a plain wrapper: motion writes its own
                  transform for the entrance and would wipe this one out */}
              <div
                style={{
                  transform: `translate3d(0, 0, ${z.toFixed(1)}px) rotateY(${(-angle).toFixed(2)}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1 - away * 0.12, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, ease: EASE, delay: (1 - away) * 0.18 }}
              >
                <Link to={b.to} className="group block">
                  <div
                    className="relative w-[8.6vw] h-[74vh] overflow-hidden bg-neutral-900
                      transition-transform duration-500 group-hover:-translate-y-4"
                  >
                    {/* the brand's own picture waits underneath */}
                    <img
                      src={b.photo}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                        transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    {/* its slice of the group shot sits over the top and clears
                        out of the way on hover */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                      style={{
                        backgroundImage: `url(${COLLECTIVE})`,
                        // width-driven so the picture keeps its shape: forcing
                        // it to a fixed height would stretch the room sideways
                        backgroundSize: `${FRAME.zoom * 100}vw auto`,
                        backgroundPosition: `-${(sliceX(i) - origin).toFixed(2)}vw ${FRAME.y}%`,
                      }}
                    />
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${b.accent}66, transparent 55%)` }}
                    />
                    {b.ready && (
                      <span
                        className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1
                          text-[0.5rem] tracking-[0.16em] uppercase whitespace-nowrap"
                        style={{ backgroundColor: b.accent, color: '#fff' }}
                      >
                        Open
                      </span>
                    )}
                  </div>

                  <div className="mt-4 w-[8.6vw] mx-auto flex flex-col items-center gap-1">
                    <span className="text-[0.55rem] tracking-[0.2em] text-white/30">{b.n}</span>
                    <span className="text-[0.5rem] md:text-[0.56rem] tracking-[0.1em] uppercase
                      text-white/55 group-hover:text-white transition-colors text-center leading-[1.35] text-balance">
                      {b.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
              </div>
            </div>
          );
        })}
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
      <VisionLed />
      <BrandArc />
      <Closer />
      <SiteFooter />
    </div>
  );
}
