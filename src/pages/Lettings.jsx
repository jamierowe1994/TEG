import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowDown, Plus, Minus } from 'lucide-react';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';

// The Letting Experts — the join page, told the way the homepage is told:
// dark rooms, film, big type, one idea at a time. Copy is TLE's own from
// join.thelettingexperts.co.uk.

const RED = '#ED1C24';
const QUIZ = 'https://sa.theexpertsgroup.co.uk/tle';

const LOVES = [
  'Flexible working hours built around your family and lifestyle',
  'A higher income to support the lifestyle you strive toward',
  'Control of your own destiny: working how you want',
  'A better quality of life that nurtures your health and wellbeing',
];

const WHO = [
  {
    who: 'Letting agency employees',
    text: "Feeling trapped in a high street office, restricted by rigid rules and limitations. Working hard for someone else's dream, yet unappreciated, undervalued and limited in what you can earn.",
  },
  {
    who: 'Letting agency owners',
    text: 'Working hard to cover every bill and salary, and finding little profit left once the obligations are met — with no time left for the core of your business.',
  },
  {
    who: 'Self-employed letting agents',
    text: 'Feeling unsupported and lacking guidance, training and assistance with your current brand. Looking for a network committed to the best tools, marketing and coaching.',
  },
  {
    who: 'Budding entrepreneurs',
    text: 'Ambitious, entrepreneurial, and set on owning a successful business so that you are in control of your destiny: flexible hours and a significant income.',
  },
  {
    who: 'Career changers',
    text: 'Eager to break free from the 9-to-5, the office politics and the daily commute — ready to use a background in sales, marketing and service to raise standards in this industry.',
  },
];

const GIVE = [
  { t: 'Training, coaching and accountability', d: "A step-by-step Success Blueprint with proven systems, processes and strategies to build your lettings business." },
  { t: 'Industry-leading tools and technology', d: 'A CRM built specifically for self-employed agents, lead generation tools, and pre-tenancy and management platforms that cut the admin.' },
  { t: 'Property management and legislation', d: 'The latest training, keeping you up to speed with legislation and your portfolio compliant — including accredited qualifications.' },
  { t: 'Lettings and compliance support team', d: 'Full support with pre-tenancy compliance, the move-in process and rent collection, so you can focus on income-producing work.' },
  { t: 'Your own Agent Success Coach', d: 'There to help you succeed, on everything from admin and tech to pipeline management and compliance.' },
  { t: 'No postcode restrictions', d: 'List any property, in any location, in any price range. No geographical restrictions placed upon you.' },
  { t: 'Support to build your personal brand', d: "This business is your name as much as ours — and we help you build it, on camera and off." },
  { t: 'Printed and digital marketing', d: 'A dedicated marketing team creating assets you can personalise and use to generate business.' },
  { t: 'Support to build your portfolio', d: 'The Letting Experts Blueprint gives you everything you need to build a profitable management portfolio.' },
];

const STEPS = [
  ['Suitability quiz', 'Take the short quiz to make sure becoming a Letting Expert is the right opportunity for you.'],
  ['Our info pack', 'Download the info pack for the detail on joining as a self-employed letting agent.'],
  ['The video vault', 'A series of very short films on what achieving success as a Letting Expert actually takes.'],
  ['The discovery call', 'A call with our team to find out about you, answer your questions, and see if the model fits.'],
  ['Meet Susan Liles', 'Meet the Managing Director for the finer details — and talk to other Letting Experts and the support team.'],
  ['Licence agreement', "If everyone's happy, we issue your licence agreement and the instructions for the set-up fee."],
  ['Onboarding', 'Our Agent Support Team start the onboarding and compliance process.'],
  ['Induction training', 'An intensive five-day online programme, giving you everything you need to launch.'],
  ['CELA certification', 'You begin your Level 3 Certificate for Estate and Lettings Agents.'],
  ['Launch your business', 'Tools, tech and support in place — now go and win listings.'],
];

const GIVES_YOU = [
  ['Time', 'Set your own schedule around your life. Work when you want, and stop missing the things that matter.'],
  ['Money', 'Unlimited earning potential: the family home, the car, the bucket-list holidays — all within reach.'],
  ['Freedom', 'Work from wherever you need or want to, instead of wherever the office happens to be.'],
  ['Satisfaction', 'Build something you are proud of — one that earns well and gives back to your community.'],
];

const VOICES = [
  {
    head: 'Fresh and modern approach',
    quote: 'With The Letting Experts I can provide a personable and collaborative service to my clients without compromising on standards, accountability, compliance and security.',
    who: 'Dan Richards',
    where: 'Wolverhampton',
    photo: '/media/tle-dan.png',
  },
  {
    head: 'Exceptional support',
    quote: 'The combination of industry leading software and ongoing support allows my business to grow and ensures my landlords are compliant at all times, which is invaluable for me.',
    who: 'Rhiannon Dodge',
    where: 'Teignbridge & Torbay',
    photo: '/media/tle-lauren.png',
  },
  {
    head: 'A commitment to excellence',
    quote: "The Letting Experts' customer-first mindset aligns perfectly with my values and high standards — exactly what I need to grow and make a meaningful impact in the industry.",
    who: 'James Crumpton',
    where: 'Bristol',
    photo: '/media/tle-james.png',
  },
  {
    head: 'Absolute game changer',
    quote: "I've always had a passion for lettings. The Letting Experts model allows me to run my own business and provide exceptional service without compromising on my family life.",
    who: 'Bernadine Williams',
    where: 'Herts & Beds',
    photo: '/media/tle-angela.png',
  },
];

const FAQS = [
  ['Is there a salary?', 'No. This is a business opportunity, not a job opportunity. You will be starting your own business.'],
  ['How do I generate leads?', "We have designed a Success Blueprint — a step-by-step guide with proven systems, processes and strategies. You'll also have a dedicated Success Coach who holds you accountable."],
  ['Am I limited to an area?', 'There is no restriction on areas — you can let a property in any location. You must know the area and be close enough to conduct appointments and offer a local service.'],
  ['Do I need letting agency experience?', 'A minimum of two years is required. Lettings legislation knowledge, great marketing and excellent service are the skills that matter here.'],
  ['Is there any training?', 'Yes — a five-day induction, ongoing training online, and in-person events. Full training is provided in every aspect.'],
];

const VALUES = [
  ['We love what we do', 'We bring passion and enthusiasm to each day, have a positive can-do attitude, have fun and wear a smile.'],
  ['We take responsibility', 'We take ownership of our business and what happens in it. We are in control of our own destiny.'],
  ['We care about relationships', 'We care about our clients, colleagues and community — and about our family, friends and wellbeing.'],
  ['We commit to personal progress', 'We are constantly improving, expanding our knowledge and learning new skills.'],
  ['We get s*t done', 'Clear goals, action every day, and a focus on outstanding results for our clients.'],
];

function Quiz({ dark = false, label = 'Take the suitability quiz' }) {
  return (
    <a
      href={QUIZ}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold transition-colors ${
        dark ? 'bg-white text-[#131313] hover:bg-white/85' : 'text-white hover:opacity-90'
      }`}
      style={dark ? undefined : { backgroundColor: RED }}
    >
      {label} <ArrowUpRight size={15} />
    </a>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.9]);
  const radius = useTransform(scrollYProgress, [0, 0.7], ['0rem', '2.5rem']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#0d0c0f]">
      <motion.div style={{ scale, borderRadius: radius }} className="absolute inset-0 overflow-hidden">
        <video
          src="/media/md-susan.mp4"
          poster="/media/tle-1.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.65) 100%)' }}
        />
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mb-7 flex items-center gap-3"
        >
          <Link
            to="/partnership"
            className="inline-flex items-center gap-1.5 text-[0.62rem] tracking-[0.22em] uppercase text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Partnership
          </Link>
          <span className="text-white/25">/</span>
          <span className="text-[0.62rem] tracking-[0.22em] uppercase" style={{ color: RED }}>
            The Letting Experts
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="font-black-display font-extrabold uppercase tracking-tight text-white
            text-[9.5vw] md:text-[5.8vw] leading-[0.94] max-w-[16em]"
        >
          Thinking about starting
          <br />
          your own lettings
          <br />
          business<span style={{ color: RED }}>?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          className="mt-7 text-white/65 font-light text-sm md:text-base max-w-md leading-relaxed"
        >
          Build your own successful letting agency with The Letting Experts —
          a model made for lettings alone, not an estate agency hybrid.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          className="mt-9"
        >
          <Quiz />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[0.6rem] tracking-[0.25em] uppercase">What it actually is</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={14} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

function Loves() {
  return (
    <section className="bg-[#0d0c0f] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1300px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-black-display font-extrabold uppercase tracking-tight text-white
            text-3xl md:text-5xl leading-[1.04] max-w-[14em]"
        >
          Why people love
          <br />
          this business
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {LOVES.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="bg-[#0d0c0f] p-8 md:p-10 flex items-start gap-5"
            >
              <span className="text-[0.62rem] tracking-[0.22em] mt-1.5 shrink-0" style={{ color: RED }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-white/80 font-light text-base md:text-lg leading-relaxed">{l}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Who() {
  return (
    <section className="bg-background text-foreground py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.04]">
            Who is this for<span style={{ color: RED }}>?</span>
          </h2>
          <p className="mt-5 text-muted-foreground font-light text-sm md:text-base max-w-xl leading-relaxed">
            The model suits people with estate agency, lettings or property
            management experience. Most of ours arrived from one of these five
            places.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHO.map((w, i) => (
            <motion.div
              key={w.who}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
              className="rounded-2xl border border-foreground/12 p-7 md:p-8 hover:border-foreground/30 transition-colors"
            >
              <p className="font-semibold text-base md:text-lg leading-snug">{w.who}</p>
              <p className="mt-3 text-muted-foreground font-light text-sm leading-relaxed">{w.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderQuote() {
  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden bg-[#0d0c0f]">
      <img src="/media/eass-18.jpg" alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c0f] via-[#0d0c0f]/70 to-[#0d0c0f]" />
      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <p className="font-script text-[#E3D7FF] text-3xl md:text-5xl leading-[1.25]">
          "Everyone deserves to live their best life. Working hard, but still
          having time for family and friends — and being able to provide an
          amazing future for them."
        </p>
        <footer className="mt-8 text-white/50 text-[0.68rem] tracking-[0.22em] uppercase">
          Sean Newman — Founder, The Experts Group
        </footer>
      </motion.blockquote>
    </section>
  );
}

function Give() {
  return (
    <section className="bg-background text-foreground py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.04]">
            What we give you
          </h2>
          <p className="mt-5 font-script text-2xl md:text-3xl" style={{ color: RED }}>
            Everything you need to be confident, competent and successful.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/12">
          {GIVE.map((g, i) => (
            <motion.div
              key={g.t}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 3) * 0.07 }}
              className="bg-background p-7 md:p-8"
            >
              <span className="text-[0.6rem] tracking-[0.22em]" style={{ color: RED }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 font-semibold text-base leading-snug">{g.t}</p>
              <p className="mt-2.5 text-muted-foreground font-light text-sm leading-relaxed">{g.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Quiz />
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} className="bg-[#0d0c0f] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-white text-3xl md:text-5xl leading-[1.04]">
            Ten steps in
          </h2>
          <p className="mt-5 text-white/55 font-light text-sm md:text-base">
            The journey to becoming a Letting Expert, start to launch.
          </p>
        </motion.div>

        <div className="relative mt-16 pl-10 md:pl-16">
          {/* the line fills as you go */}
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-white/12" />
          <motion.div
            style={{ height: line }}
            className="absolute left-[7px] md:left-[11px] top-2 w-px origin-top"
            initial={false}
          >
            <div className="w-full h-full" style={{ backgroundColor: RED }} />
          </motion.div>

          {STEPS.map(([t, d], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative pb-11 last:pb-0"
            >
              <span
                className="absolute -left-10 md:-left-16 top-1 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: RED, backgroundColor: '#0d0c0f' }}
              />
              <p className="text-[0.6rem] tracking-[0.22em] text-white/35">
                Step {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-1.5 font-semibold text-white text-lg md:text-xl">{t}</p>
              <p className="mt-2 text-white/55 font-light text-sm md:text-base leading-relaxed max-w-xl">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GivesYou() {
  return (
    <section className="bg-background text-foreground py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1300px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.04] max-w-[13em]"
        >
          What it gives you
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {GIVES_YOU.map(([t, d], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.09 }}
            >
              <p
                className="font-black-display font-extrabold uppercase tracking-tight text-4xl md:text-5xl"
                style={{ color: RED }}
              >
                {t}
              </p>
              <p className="mt-4 text-muted-foreground font-light text-sm leading-relaxed">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Susan() {
  return (
    <section className="bg-[#0d0c0f] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-[0.85fr,1.15fr] gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative"
        >
          <img src="/media/tle-sue.jpg" alt="Susan Liles" className="w-full aspect-[3/4] object-cover rounded-2xl" />
          <span
            className="absolute -bottom-4 left-6 rounded-full px-4 py-2 text-[0.6rem] tracking-[0.2em] uppercase text-white"
            style={{ backgroundColor: RED }}
          >
            Managing Director
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
        >
          <p className="font-brittany text-5xl md:text-6xl" style={{ color: RED }}>
            Meet Susan
          </p>
          <p className="mt-5 text-white/70 font-light text-sm md:text-base leading-relaxed">
            Twenty-five years in the industry — leading national corporate
            branches, pioneering self-employed models, advising proptech and
            insurance firms. Susan has seen the lettings landscape change, and
            helped shape it.
          </p>
          <p className="mt-4 text-white/70 font-light text-sm md:text-base leading-relaxed">
            She founded The Letting Experts as a future-focused model built
            exclusively for self-employed letting agents. Not an estate agency
            hybrid — a dedicated platform for people who want to run their own
            business, earn more, and take control of their careers.
          </p>
          <blockquote className="mt-7 border-l-2 pl-5" style={{ borderColor: RED }}>
            <p className="text-white/85 font-light text-base md:text-lg leading-relaxed italic">
              "I built this model because I believe letting agents deserve
              more: more freedom, more support, more reward. It's a community
              where the best agents can thrive, on their terms."
            </p>
          </blockquote>
          <a
            href="https://www.linkedin.com/in/susan-liles-89647761/"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-white border-b-2 border-white pb-0.5 hover:opacity-70 transition-opacity"
          >
            Connect with Susan <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="bg-background text-foreground py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1300px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.04]"
        >
          What they say
        </motion.h2>
      </div>

      <div className="mt-12 md:mt-16 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-6 md:px-12 pb-4">
        {VOICES.map((v, i) => (
          <motion.figure
            key={v.who}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
            className="snap-start shrink-0 w-[82vw] sm:w-[52vw] lg:w-[30vw] rounded-2xl border border-foreground/12 p-7 md:p-8 flex flex-col"
          >
            <p className="text-[0.6rem] tracking-[0.22em] uppercase" style={{ color: RED }}>
              {v.head}
            </p>
            <blockquote className="mt-4 flex-1 font-light text-base md:text-lg leading-relaxed">
              "{v.quote}"
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              <img src={v.photo} alt={v.who} className="w-12 h-12 rounded-full object-cover bg-neutral-200" />
              <span>
                <span className="block font-semibold text-sm">{v.who}</span>
                <span className="block text-muted-foreground text-xs">{v.where} Letting Expert</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Faqs() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#0d0c0f] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-white text-3xl md:text-5xl leading-[1.04]">
            Still not sure<span style={{ color: RED }}>?</span>
          </h2>
          <p className="mt-5 text-white/55 font-light text-sm md:text-base max-w-lg leading-relaxed">
            Making the move to self-employment can feel a little scary. We're
            here to help in any way we can.
          </p>
        </motion.div>

        <div className="mt-12 border-t border-white/12">
          {FAQS.map(([q, a], i) => (
            <div key={q} className="border-b border-white/12">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-6 flex items-center justify-between gap-6 text-left group"
              >
                <span className="text-white font-medium text-base md:text-lg group-hover:opacity-80 transition-opacity">
                  {q}
                </span>
                <span className="shrink-0 text-white/60">
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-white/60 font-light text-sm md:text-base leading-relaxed max-w-2xl">{a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="bg-background text-foreground py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1300px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.04]"
        >
          What we live by
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {VALUES.map(([t, d], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <p className="text-[0.6rem] tracking-[0.22em]" style={{ color: RED }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 font-semibold text-lg">{t}</p>
              <p className="mt-2 text-muted-foreground font-light text-sm leading-relaxed">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden bg-[#0d0c0f]">
      <img src="/media/tle-4.jpg" alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c0f]/85 via-[#0d0c0f]/70 to-[#0d0c0f]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <h2 className="font-black-display font-extrabold uppercase tracking-tight text-white text-4xl md:text-6xl leading-[1.02]">
          Your future
          <br />
          begins here
        </h2>
        <p className="mt-6 text-white/60 font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Two minutes, a handful of questions, and an honest answer on whether
          this is right for you.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Quiz />
          <Link
            to="/partnership"
            className="inline-flex items-center gap-1.5 rounded-xl border-2 border-white/60 text-white px-7 py-4 text-sm font-semibold hover:border-white hover:bg-white/10 transition-all"
          >
            See the other brands
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function Lettings() {
  useLenis();
  return (
    <div className="bg-[#0d0c0f] text-white min-h-screen overflow-x-clip">
      <ExperienceNav dark />
      <Hero />
      <Loves />
      <Who />
      <FounderQuote />
      <Give />
      <Steps />
      <GivesYou />
      <Susan />
      <Voices />
      <Faqs />
      <Values />
      <Closer />
      <SiteFooter />
    </div>
  );
}
