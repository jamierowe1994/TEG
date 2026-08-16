import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE } from '../experience/motion';

// The last word — HopeRise-style: a huge statement with a pill of someone
// having the time of their life set into the first line. Descending
// hierarchy, two buttons, nothing else.

export default function FinalCta() {
  return (
    <section className="relative bg-background text-foreground min-h-[72vh] flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="text-center max-w-6xl"
      >
        <h2 className="font-black-display font-extrabold uppercase tracking-tight leading-[1.0]">
          <span className="block text-[11vw] md:text-[7.6vw]">
            Do
            <span className="inline-block align-middle mx-3 md:mx-5 w-[30vw] h-[19vw] md:w-[16vw] md:h-[10.5vw] rounded-[1.4rem] md:rounded-[2rem] overflow-hidden">
              <img
                src="/media/bbs-77.jpg"
                alt="One of ours, mid-laugh"
                style={{ objectPosition: 'center 28%' }}
                className="w-full h-full object-cover"
              />
            </span>
            something
          </span>
          <span className="block text-[9vw] md:text-[6.2vw] mt-1">you're proud of.</span>
        </h2>
        <p className="mt-6 font-script text-[6vw] md:text-[2.6vw] text-[#9565FF]">
          Live a life you love.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="mailto:hello@theexpertsgroup.co.uk"
            className="rounded-xl bg-[#9565FF] text-white px-9 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Contact us
          </a>
          <Link
            to="/vacancies"
            className="rounded-xl border-2 border-foreground/60 px-8 py-[0.9rem] text-sm font-semibold hover:border-foreground hover:bg-foreground/5 transition-all"
          >
            Vacancies
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
