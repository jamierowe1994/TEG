import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE } from '../experience/motion';

// The Opportunity — the closing nudge before the fork.

export default function Opportunity() {
  return (
    <section className="bg-background py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="type-label text-[#9565FF] mb-5">The opportunity</p>
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.06]">
            Expertise, without
            <br />
            going it alone.
          </h2>
          <p className="mt-5 font-script text-2xl md:text-3xl text-[#9565FF]">
            Good at what you do? Imagine what you could build with the right things around you.
          </p>
          <p className="mt-5 text-muted-foreground font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Marketing, technology, compliance, community — the unglamorous
            stuff handled, so your name can do the work it deserves to.
          </p>
          <div className="mt-9 flex items-center justify-center gap-5">
            <Link
              to="/partnership"
              className="rounded-xl bg-[#9565FF] text-white px-9 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Find out more
            </Link>
            <Link
              to="/vacancies"
              className="inline-flex items-center gap-1.5 text-sm font-semibold border-b-2 border-foreground pb-0.5 hover:text-[#9565FF] hover:border-[#9565FF] transition-colors"
            >
              Open roles <ArrowUpRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
