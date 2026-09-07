import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';
import { findVacancy, WHO_THRIVES } from '../lib/vacancies';

// One role, told plainly: what it pays, what the group puts behind you,
// who it suits, and an honest word about who thrives in the model.

const PURPLE = '#9565FF';
const CANVAS = '#F1F1F1';
const INK = '#131313';
const PAD = 'px-6 md:px-16 lg:px-24 xl:px-32';

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.8, ease: EASE, delay },
});

function Block({ label, children }) {
  return (
    <motion.section {...rise()} className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-[#131313]/15 py-10 md:py-14">
      <p className="col-span-12 md:col-span-3 type-label" style={{ color: PURPLE }}>{label}</p>
      <div className="col-span-12 md:col-span-8 md:col-start-5">{children}</div>
    </motion.section>
  );
}

export default function Vacancy() {
  useLenis();
  const { id } = useParams();
  const v = findVacancy(id);
  if (!v) return <Navigate to="/vacancies" replace />;
  const apply = `mailto:hello@theexpertsgroup.co.uk?subject=${encodeURIComponent(`${v.role} - ${v.brand}`)}`;

  return (
    <div className="min-h-screen overflow-x-clip" style={{ backgroundColor: CANVAS, color: INK }}>
      <ExperienceNav />

      <header className={`${PAD} pt-[16vh] md:pt-[20vh] pb-12 md:pb-16`}>
        <Link to="/vacancies" className="inline-flex items-center gap-2 text-xs font-medium text-[#131313]/55 hover:text-[#131313] transition-colors">
          <ArrowLeft size={14} /> All roles
        </Link>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mt-10 flex items-center gap-3 text-[0.62rem] tracking-[0.18em] uppercase text-[#131313]/55"
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.accent }} />
          {v.brand}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="mt-4 font-black-display font-extrabold uppercase tracking-tight leading-[0.98] text-[2.4rem] md:text-[4.4rem] max-w-[12em]"
        >
          {v.role}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <span className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: PURPLE }}>
            {v.salary}
          </span>
          <span className="rounded-full border border-[#131313]/20 px-5 py-2.5 text-sm">Self-employed partner</span>
          <a href={apply} className="inline-flex items-center gap-2 rounded-full bg-[#131313] text-white px-6 py-2.5 text-sm font-semibold hover:opacity-85 transition-opacity">
            Apply <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </header>

      <main className={PAD}>
        <Block label="The role">
          <p className="text-base md:text-lg font-light leading-[1.7]">{v.intro}</p>
        </Block>

        <Block label="What you earn">
          <p className="text-base md:text-lg font-light leading-[1.7]">{v.earnings[0]}</p>
          <ul className="mt-6 space-y-2">
            {v.earnings.slice(1).map((e) => (
              <li key={e} className="flex gap-3 text-sm text-[#131313]/70 leading-[1.6]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: PURPLE }} />
                {e}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="What we put behind you">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
            {v.provides.map((p) => (
              <div key={p.title}>
                <h3 className="font-sans font-medium text-base">{p.title}</h3>
                <p className="mt-1.5 text-sm text-[#131313]/65 leading-[1.65]">{p.text}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="Who we are looking for">
          <ul className="space-y-3">
            {v.lookingFor.map((l) => (
              <li key={l} className="flex gap-3 text-base font-light leading-[1.6]">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: PURPLE }} />
                {l}
              </li>
            ))}
          </ul>
        </Block>

        <Block label={`About ${v.brand}`}>
          <p className="text-base font-light leading-[1.7] text-[#131313]/80">{v.about}</p>
        </Block>

        <Block label="Who thrives here">
          <p className="font-sans font-normal tracking-[-0.02em] text-xl md:text-2xl leading-[1.3]">{WHO_THRIVES.intro}</p>
          <p className="mt-4 text-sm text-[#131313]/65 leading-[1.65]">{WHO_THRIVES.sub}</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {WHO_THRIVES.traits.map((t) => (
              <div key={t.title}>
                <h3 className="font-sans font-medium text-base">{t.title}</h3>
                <p className="mt-1.5 text-sm text-[#131313]/65 leading-[1.65]">{t.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-base font-light leading-[1.7]">{WHO_THRIVES.closingQuestion}</p>
        </Block>

        <motion.section {...rise()} className="border-t border-[#131313]/15 py-14 md:py-20 text-center">
          <h2 className="font-sans font-light tracking-[-0.03em] leading-[1.1] text-[2rem] md:text-[3rem]">
            Ready to build it?
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={apply} className="inline-flex items-center gap-2 rounded-full text-white px-8 py-4 text-sm font-semibold hover:opacity-90 transition-opacity" style={{ backgroundColor: PURPLE }}>
              Apply for this role <ArrowUpRight size={15} />
            </a>
            <Link to="/vacancies" className="rounded-full border border-[#131313]/25 px-8 py-4 text-sm font-medium hover:border-[#131313] transition-colors">
              See every role
            </Link>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
