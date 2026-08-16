import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Who We Are — big justified block text, part-shadowed, that fills in word
// by word (quickly) as you scroll through. AMES-Foundation style.

const PARAGRAPHS = [
  `The Experts Group brings together people working across estate agency, lettings, mortgages, auctions, recruitment and marketing.`,
  `Different businesses, different specialisms and plenty of different personalities, all connected by a belief that people do their best work when they're given the freedom to focus on what they're really good at.`,
  `We bring together people who are brilliant at what they do, and give them the backing to build careers, grow businesses and see just how far their expertise can take them with the right people and support around them.`,
];

const TOTAL_WORDS = PARAGRAPHS.reduce((n, p) => n + p.split(' ').length, 0);

function FillWord({ word, index, progress }) {
  const start = 0.04 + (index / TOTAL_WORDS) * 0.52;
  const opacity = useTransform(progress, [start, start + 0.04], [0.13, 1]);
  return (
    <motion.span style={{ opacity }}>
      {word}{' '}
    </motion.span>
  );
}

export default function WhoWeAre() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // rises up to meet you while the section approaches…
  const { scrollYProgress: approach } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  const riseY = useTransform(approach, [0, 1], ['24vh', '0vh']);
  // …holds while it fills, then pans down with the scroll at the end to
  // close the gap into the next section
  const blockY = useTransform(scrollYProgress, [0.05, 1], ['0vh', '6vh']);
  // the invitation appears once the words have finished filling
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.72], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.6, 0.72], [24, 0]);

  let wordIndex = 0;

  return (
    <section ref={ref} className="relative h-[112vh]">
      <div className="sticky top-0 h-screen flex items-start pt-[9vh] md:pt-[11vh] px-6 md:px-16 overflow-hidden">
        <motion.div style={{ y: riseY }} className="w-full">
        <motion.div style={{ y: blockY }} className="max-w-[1250px] mx-auto space-y-6 md:space-y-8">
          {PARAGRAPHS.map((para, pi) => (
            <p
              key={pi}
              className="font-black-display font-extrabold uppercase tracking-tight
                text-[1.15rem] md:text-[2.1rem] leading-[1.24]"
              style={{ textAlign: 'justify' }}
            >
              {para.split(' ').map((w) => {
                const idx = wordIndex++;
                return <FillWord key={idx} word={w} index={idx} progress={scrollYProgress} />;
              })}
            </p>
          ))}
          <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="pt-4">
            <a
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold border-b-2 border-foreground pb-1 hover:text-[#9565FF] hover:border-[#9565FF] transition-colors"
            >
              Read more about us
            </a>
          </motion.div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}