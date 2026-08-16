import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { EXPERIENCE_BRANDS } from '../experience/brands';
import { EASE } from '../experience/motion';

// The call to action after the video wall: find the brand that fits.
// Hope-Rise-style carousel — four tall rounded cards per screen, each an MD
// with their brand mark. Hover bobbles a card up and reveals the detail +
// a contact button. Arrows rotate through the family.

const VISIBLE = 4;

// local, better shots for the MDs we have them for
const MD_OVERRIDES = {
  'the-property-experts': '/media/tpe-jim.jpg',
  'the-lettings-experts': '/media/tle-sue.jpg',
};

const CARDS = EXPERIENCE_BRANDS.map((b) => ({
  key: b.id,
  brand: b.name,
  specialty: b.specialty,
  md: b.md?.name,
  photo: MD_OVERRIDES[b.id] || b.md?.photo || b.cardPhoto,
  logo: b.whiteLogo,
  isRecruitment: b.id === 'the-recruitment-experts',
  url: b.url,
  blurb: b.description,
}));

function Card({ c }) {
  return (
    <motion.div
      whileHover={{ y: -14, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative shrink-0 w-[78vw] sm:w-[38vw] lg:w-[22.5vw] h-[52vh] md:h-[58vh]
        rounded-[1.8rem] overflow-hidden bg-neutral-300 cursor-pointer"
    >
      <img
        src={c.photo}
        alt={c.md ? `${c.md} — ${c.brand}` : c.brand}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500
          grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />
      {c.isRecruitment ? (
        <p className="absolute top-4 left-4 text-white font-semibold text-[0.85rem] leading-tight">
          The<br />Recruitment<br />Experts
        </p>
      ) : (
        <img src={c.logo} alt="" className="absolute top-4 left-4 h-8 w-auto max-w-[62%] object-contain object-left" />
      )}

      {/* the reveal — slides up on hover */}
      <div
        className="absolute inset-x-0 bottom-0 p-5 translate-y-[52%] group-hover:translate-y-0
          transition-transform duration-400 ease-out"
      >
        {c.md && <p className="font-brittany text-3xl text-white leading-none mb-1">{c.md}</p>}
        <p className="text-white font-semibold text-sm leading-snug">{c.brand}</p>
        <p className="mt-2 text-white/70 text-xs font-light leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          {c.blurb}
        </p>
        <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <a
            href={`mailto:hello@theexpertsgroup.co.uk?subject=${encodeURIComponent(c.brand)}`}
            className="rounded-xl bg-white text-[#131313] px-5 py-2.5 text-xs font-semibold hover:bg-[#E3D7FF] transition-colors"
          >
            Contact us
          </a>
          <Link to={c.url} className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white transition-colors">
            The brand <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function BrandCarousel() {
  const [i, setI] = useState(0);
  const max = CARDS.length - VISIBLE;
  const prev = () => setI((v) => Math.max(0, v - 1));
  const next = () => setI((v) => Math.min(max, v + 1));

  return (
    <section className="relative bg-background text-foreground py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1700px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-center"
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.05]">
            Find the brand
            <br />
            that fits<span className="text-[#9565FF]">.</span>
          </h2>
          <p className="mt-4 font-script text-2xl md:text-3xl text-[#9565FF]">
            Seven ways in — one conversation to start.
          </p>
          <p className="mt-4 text-muted-foreground font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Every brand is led by someone who's already made the leap. Hover
            for the detail, then come and talk to us.
          </p>
        </motion.div>
      </div>

      {/* the carousel */}
      <div className="mt-12 md:mt-16 overflow-hidden">
        <motion.div
          animate={{ x: `calc(-${i} * (min(78vw, 22.5vw) + 1.25rem))` }}
          transition={{ type: 'spring', stiffness: 140, damping: 26 }}
          className="flex gap-5 px-6 md:px-12 w-max"
        >
          {CARDS.map((c) => (
            <Card key={c.key} c={c} />
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          disabled={i === 0}
          aria-label="Previous brands"
          className="w-11 h-11 rounded-full border border-foreground/25 flex items-center justify-center
            hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowLeft size={17} />
        </button>
        <button
          onClick={next}
          disabled={i === max}
          aria-label="More brands"
          className="w-11 h-11 rounded-full border border-foreground/25 flex items-center justify-center
            hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
