import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CalendarDays, Wrench, Quote, PiggyBank } from 'lucide-react';
import { EASE } from '../experience/motion';

// What changes — the four things people actually notice once they join,
// each carried on a tile in one of the brands' colours. A tile opens into a
// panel of the same colour with the detail; click off, or Escape, and it
// folds away again. No wall of copy on the page, the detail is one tap away.

const TILES = [
  {
    key: 'diary',
    n: '01.',
    brand: 'The Property Experts',
    bg: '#E8420D',
    ink: '#131313',
    Icon: CalendarDays,
    head: 'Your diary is your own',
    blurb: 'The school run, the training run, the long lunch. You decide what the day looks like, not a rota.',
    panel: {
      lede: 'Work the hours that fit your life, not the other way round.',
      body: [
        'There is no office to be seen in and no rota to work around. Viewings, valuations and calls go where you put them, and the rest of the day is yours.',
        'Most of our people build the week around the things that used to be squeezed out: the school gate, the gym, the parents, the long weekend. The work still gets done. It just gets done on your terms.',
      ],
      points: [
        ['No fixed hours', 'Start when you like, finish when the work is done.'],
        ['No commute', 'You work from home, from the car, from wherever the next appointment is.'],
        ['No permission needed', 'Holidays, half days and the afternoon off are your decision.'],
      ],
    },
  },
  {
    key: 'craft',
    n: '02.',
    brand: 'The Letting Experts',
    bg: '#F6B8D3',
    ink: '#131313',
    Icon: Wrench,
    head: 'Do what you are good at',
    blurb: 'Compliance, marketing, technology and the back-office sit with us. Your day goes on the work only you can do.',
    panel: {
      lede: 'Nobody over your shoulder. Everything under your feet.',
      body: [
        'No micromanagement, no arbitrary targets, nobody asking why you left the office at three. You are trusted to run your own business, and we build the ground it stands on.',
        'That starts with a five-day induction and carries on with a Success Coach, a step-by-step Success Blueprint, and training that keeps you and your clients on the right side of the legislation.',
      ],
      points: [
        ['We handle', 'Compliance, client accounting, marketing, the tech stack and the admin.'],
        ['We teach', 'A five-day induction, ongoing online training and in-person events.'],
        ['You do', 'The relationships, the deals and the service only you can give.'],
      ],
    },
  },
  {
    key: 'voices',
    n: '03.',
    brand: 'The Mortgage Experts',
    bg: '#2255A4',
    ink: '#FFFFFF',
    Icon: Quote,
    head: 'What our people say',
    blurb: 'Not the brochure version. The people already running their own business with us, in their own words.',
    panel: {
      lede: 'The people who have already made the move.',
      quotes: [
        {
          quote: 'With The Letting Experts I can provide a personable and collaborative service to my clients without compromising on standards, accountability, compliance and security.',
          who: 'Dan Richards',
          where: 'Wolverhampton',
        },
        {
          quote: 'The combination of industry leading software and ongoing support allows my business to grow and ensures my landlords are compliant at all times, which is invaluable for me.',
          who: 'Rhiannon Dodge',
          where: 'Teignbridge & Torbay',
        },
        {
          quote: "I've always had a passion for lettings. The Letting Experts model allows me to run my own business and provide exceptional service without compromising on my family life.",
          who: 'Bernadine Williams',
          where: 'Herts & Beds',
        },
        {
          quote: "The Letting Experts' customer-first mindset aligns perfectly with my values and high standards. Exactly what I need to grow and make a meaningful impact in the industry.",
          who: 'James Crumpton',
          where: 'Bristol',
        },
      ],
    },
  },
  {
    key: 'money',
    n: '04.',
    brand: 'Fine & Country',
    bg: '#F4EFE6',
    ink: '#131313',
    accent: '#B49A6A',
    Icon: PiggyBank,
    head: 'Start without betting the house',
    blurb: 'A low set-up cost and no premises to fund. The step into your own business is smaller than most people expect.',
    panel: {
      lede: 'What it costs to start, and what our agents actually earn.',
      body: [
        'There are no premises to lease, no staff to carry and no fit-out to fund. You pay a set-up cost, and from there the business runs on the fee you earn.',
        'Our brands pay between 50% and 80% of the fee to the agent who earned it. That single number is why the same amount of work pays so differently here.',
      ],
      figures: [
        ['Set-up cost', 'From £X,XXX', 'Confirm figure'],
        ['Your share of the fee', '50 - 80%', 'Depending on brand'],
        ['Premises to fund', 'None', 'You work from home'],
        ['Typical first-year earnings', '£XX,XXX', 'Confirm figure'],
      ],
    },
  },
];

function Tile({ tile, index, onOpen }) {
  const { Icon } = tile;
  const dim = tile.ink === '#FFFFFF' ? 'rgba(255,255,255,0.72)' : 'rgba(19,19,19,0.68)';
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(tile.key)}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.09 }}
      whileHover="hover"
      whileFocus="hover"
      aria-haspopup="dialog"
      aria-label={`${tile.head}. Open for more`}
      className="group relative text-left rounded-2xl p-7 md:p-8 min-h-[380px] md:min-h-[440px]
        flex flex-col justify-between overflow-hidden outline-none
        focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
      style={{ backgroundColor: tile.bg, color: tile.ink }}
    >
      <Icon size={34} strokeWidth={1.6} style={{ color: tile.accent || tile.ink }} aria-hidden="true" />

      <div>
        <span className="block text-[0.72rem] tracking-[0.02em] font-medium" style={{ color: dim }}>
          {tile.n}
        </span>
        <span className="mt-1 flex items-end justify-between gap-4">
          <span className="font-sans font-normal tracking-[-0.02em] text-[1.55rem] md:text-[1.7rem] leading-[1.12]">
            {tile.head}
          </span>
          <motion.span
            variants={{ hover: { opacity: 1, x: 0 } }}
            initial={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="shrink-0 grid place-items-center w-9 h-9 rounded-full border"
            style={{ borderColor: tile.ink }}
            aria-hidden="true"
          >
            <ArrowRight size={16} strokeWidth={1.8} />
          </motion.span>
        </span>
        <motion.span
          variants={{ hover: { height: 'auto', opacity: 1, marginTop: 14 } }}
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="block overflow-hidden text-[0.86rem] leading-[1.6] font-light max-w-[26em]"
          style={{ color: dim }}
        >
          <span className="block border-t pt-4" style={{ borderColor: dim }}>
            {tile.blurb}
          </span>
        </motion.span>
      </div>
    </motion.button>
  );
}

function Panel({ tile, onClose }) {
  const { Icon, panel } = tile;
  const white = tile.ink === '#FFFFFF';
  const dim = white ? 'rgba(255,255,255,0.72)' : 'rgba(19,19,19,0.66)';
  const rule = white ? 'rgba(255,255,255,0.25)' : 'rgba(19,19,19,0.15)';

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-0 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#111111]/70 backdrop-blur-sm cursor-default"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`panel-${tile.key}`}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-[1040px] max-h-[92vh] md:max-h-[86vh] overflow-y-auto
          rounded-t-3xl md:rounded-3xl p-7 md:p-14"
        style={{ backgroundColor: tile.bg, color: tile.ink }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 md:top-7 md:right-7 grid place-items-center w-10 h-10 rounded-full border
            hover:opacity-70 transition-opacity"
          style={{ borderColor: tile.ink, color: tile.ink }}
        >
          <X size={18} strokeWidth={1.8} />
        </button>

        <div className="flex items-center gap-3">
          <Icon size={28} strokeWidth={1.6} style={{ color: tile.accent || tile.ink }} aria-hidden="true" />
          <span className="text-[0.62rem] tracking-[0.22em] uppercase" style={{ color: dim }}>
            {tile.n} {tile.brand}
          </span>
        </div>

        <h3
          id={`panel-${tile.key}`}
          className="mt-8 font-sans font-normal tracking-[-0.025em] text-[2rem] md:text-[3rem] leading-[1.05] max-w-[14em]"
        >
          {tile.head}
        </h3>
        <p className="mt-4 text-[1.05rem] md:text-[1.2rem] leading-[1.5] font-light max-w-[30em]" style={{ color: dim }}>
          {panel.lede}
        </p>

        {panel.body && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {panel.body.map((p) => (
              <p key={p} className="text-[0.95rem] leading-[1.7] font-light" style={{ color: dim }}>
                {p}
              </p>
            ))}
          </div>
        )}

        {panel.points && (
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 border-t" style={{ borderColor: rule }}>
            {panel.points.map(([t, d]) => (
              <li key={t} className="py-5 md:py-6 border-b md:border-b-0" style={{ borderColor: rule }}>
                <span className="block text-[0.62rem] tracking-[0.2em] uppercase" style={{ color: dim }}>
                  {t}
                </span>
                <span className="mt-2 block text-[0.95rem] leading-[1.55]">{d}</span>
              </li>
            ))}
          </ul>
        )}

        {panel.quotes && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 border-t" style={{ borderColor: rule }}>
            {panel.quotes.map((q) => (
              <blockquote key={q.who} className="py-6 border-b" style={{ borderColor: rule }}>
                <p className="text-[0.98rem] leading-[1.6] font-light">"{q.quote}"</p>
                <footer className="mt-4 text-[0.72rem] tracking-[0.06em]" style={{ color: dim }}>
                  {q.who}, {q.where}
                </footer>
              </blockquote>
            ))}
          </div>
        )}

        {panel.figures && (
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 border-t" style={{ borderColor: rule }}>
            {panel.figures.map(([label, value, note]) => (
              <div key={label} className="py-6 pr-6 border-b" style={{ borderColor: rule }}>
                <dt className="text-[0.62rem] tracking-[0.2em] uppercase" style={{ color: dim }}>
                  {label}
                </dt>
                <dd
                  className="mt-3 font-sans font-normal tracking-[-0.02em] text-[1.6rem] md:text-[2rem] leading-none"
                  style={{ color: tile.accent || tile.ink }}
                >
                  {value}
                </dd>
                <dd className="mt-2 text-[0.78rem] font-light" style={{ color: dim }}>
                  {note}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="mailto:hello@theexpertsgroup.co.uk?subject=Partnership"
            className="rounded-lg px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-85"
            style={{ backgroundColor: tile.ink, color: tile.bg }}
          >
            Start a conversation
          </a>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Back to the page
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhatChanges() {
  const [open, setOpen] = useState(null);
  const tile = open ? TILES.find((t) => t.key === open) : null;

  useEffect(() => {
    if (!open) return undefined;
    document.documentElement.style.overflow = 'hidden';
    window.__lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.__lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <section className="relative bg-[#111111] pt-[14vh] pb-[6vh] px-6 md:px-16">
      <div className="max-w-[1500px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-white/45 text-[0.62rem] md:text-[0.7rem] tracking-[0.22em] uppercase leading-[1.8]"
        >
          Your diary is your own. Nobody over your shoulder.
          <br className="hidden md:block" /> The rest is ours to worry about.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
          className="mt-6 font-black-display font-extrabold uppercase tracking-tight text-white
            text-[2.2rem] md:text-[3.6rem] leading-[1]"
        >
          The work stays yours.
          <br />
          <span className="md:whitespace-nowrap">Everything else changes.</span>
        </motion.h2>

        <div className="mt-[6vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {TILES.map((t, i) => (
            <Tile key={t.key} tile={t} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {tile && <Panel key={tile.key} tile={tile} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
