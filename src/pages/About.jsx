import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ExperienceNav from '../experience/ExperienceNav';
import SiteFooter from '../home/SiteFooter';
import useLenis from '../lib/useLenis';
import { EASE } from '../experience/motion';

// About — the origin story. The hero is one tilted frame of Shaun held in
// the middle of a black room, the page split either side of him, with the
// line running along the bottom edge like a title card.

const PHOTO = '/media/eass-18.jpg';

export default function About() {
  useLenis();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // the frame drifts and straightens a touch as you leave
  const photoY = useTransform(scrollYProgress, [0, 1], ['0vh', '-14vh']);
  const photoRot = useTransform(scrollYProgress, [0, 1], [6.5, 1.5]);
  const wordY = useTransform(scrollYProgress, [0, 1], ['0vh', '6vh']);

  return (
    <div className="bg-[#0d0c0f] text-white min-h-screen overflow-x-clip">
      <ExperienceNav dark />

      <section ref={ref} className="relative h-screen overflow-hidden">
        {/* the frame */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 11 }}
            animate={{ opacity: 1, scale: 1, rotate: 6.5 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            style={{ y: photoY, rotate: photoRot }}
            className="w-[54vmin] h-[74vmin] max-w-[40vw] overflow-hidden"
          >
            <img src={PHOTO} alt="Shaun, where it started" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* the split — a label either side of him */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-6 md:px-10
            flex items-center justify-between pointer-events-none"
        >
          <div className="flex items-center gap-6 md:gap-12">
            <span className="text-[0.6rem] md:text-xs tracking-[0.25em] text-white/40">01</span>
            <p className="text-[0.62rem] md:text-[0.7rem] tracking-[0.22em] uppercase leading-[1.7] text-[#E3D7FF] text-center">
              One person,
              <br />
              one idea
            </p>
          </div>
          <div className="flex items-center gap-6 md:gap-12">
            <p className="text-[0.62rem] md:text-[0.7rem] tracking-[0.22em] uppercase leading-[1.7] text-[#E3D7FF] text-center">
              Now 250+,
              <br />
              seven brands
            </p>
            <span className="text-[0.6rem] md:text-xs tracking-[0.25em] text-white/40">07</span>
          </div>
        </motion.div>

        {/* the title card */}
        <motion.div
          style={{ y: wordY }}
          className="absolute inset-x-0 bottom-0 z-30 pointer-events-none overflow-hidden"
        >
          <motion.h1
            initial={{ y: '38%', opacity: 0 }}
            animate={{ y: '12%', opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
            className="font-black-display font-extrabold uppercase tracking-[-0.03em]
              text-[#E3D7FF] text-[7.6vw] leading-[0.85] text-center whitespace-nowrap px-4"
          >
            It all started here
          </motion.h1>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
