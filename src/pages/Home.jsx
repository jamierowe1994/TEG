import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ExperienceNav from '../experience/ExperienceNav';
import Hero from '../home/Hero';
import WhoWeAre from '../home/WhoWeAre';
import BrandsPeople from '../home/BrandsPeople';
import Seriously from '../home/Seriously';
import BrandCarousel from '../home/BrandCarousel';
import Outro from '../home/Outro';
import useLenis from '../lib/useLenis';

// Homepage structure (James's brief):
// Hero → Who We Are (fill text) → Our Brands (horizontal ride) →
// Built Around People (film + collage) → The Opportunity → closing fork.

export default function Home() {
  useLenis();

  // the whole page flicks dark while the brands section is in view — the
  // sections above and below go black with it, so there's never a hard line
  const brandsRef = useRef(null);
  const { scrollYProgress: brandsProgress } = useScroll({
    target: brandsRef,
    offset: ['start end', 'end start'],
  });
  const pageBg = useTransform(
    brandsProgress,
    [0.03, 0.11, 0.9, 0.97],
    ['#F1F1F1', '#0d0c0f', '#0d0c0f', '#F1F1F1']
  );

  return (
    <motion.div style={{ backgroundColor: pageBg }} className="text-foreground min-h-screen overflow-x-clip">
      <ExperienceNav dark />
      <Hero />
      <WhoWeAre />
      <div ref={brandsRef}>
        <BrandsPeople />
        <Seriously />
      </div>
      <BrandCarousel />
      <Outro />
    </motion.div>
  );
}