import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE } from '../experience/motion';

// The Experts Foundation — because it's not just about us.
// Figures are PLACEHOLDERS until James sends the real ones.

const STATS = [
  { num: '£250k+', label: 'raised for charity' },
  { num: '40+', label: 'charity events run' },
  { num: '12', label: 'causes supported' },
];

export default function Foundation() {
  return (
    <section className="bg-background text-foreground py-24 md:py-36 px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="font-black-display font-bold uppercase tracking-tight text-2xl md:text-4xl">
            But it's not just about us.
          </p>
          <p className="mt-3 font-script text-4xl md:text-6xl text-[#9565FF]">
            Have you heard about The Experts Foundation?
          </p>
          <p className="mt-6 text-muted-foreground font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            The Group's charitable arm — raising money and rolling up sleeves
            for the causes closest to our people's hearts.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            >
              <p className="font-black-display font-extrabold tracking-tight text-4xl md:text-5xl text-[#4D1D81]">
                {s.num}
              </p>
              <p className="mt-2 text-muted-foreground text-sm font-light">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          href="/about"
          className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold border-b-2 border-foreground pb-1 hover:text-[#9565FF] hover:border-[#9565FF] transition-colors"
        >
          Meet the Foundation <ArrowUpRight size={15} />
        </motion.a>
      </div>
    </section>
  );
}
