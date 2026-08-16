import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// The awards reel — three moments stitched with a white-flash cut so the
// loop breathes. The panel arrives small with margins either side, scales
// up as you scroll, then sticks; the wording parallaxes over it for depth.

const FILM = '/media/film-summit.mp4';
const POSTER = '/media/poster-summit.jpg';

export default function VideoManifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // grows on approach, sticks at full (still-margined) size
  const scale = useTransform(scrollYProgress, [0.05, 0.4], [0.82, 1]);
  const radius = useTransform(scrollYProgress, [0.05, 0.4], ['3rem', '1.75rem']);
  // the wording drifts slower than the scroll — a little depth
  const textY = useTransform(scrollYProgress, [0.2, 0.9], [90, -90]);

  return (
    <section ref={ref} className="relative h-[170vh]">
      <div className="sticky top-0 h-screen flex items-center px-4 md:px-12">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative w-full h-[82vh] overflow-hidden bg-[#141217] will-change-transform"
        >
          <video
            src={FILM}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141217]/55 via-transparent to-[#141217]/55" />

          <div className="absolute inset-0 flex items-center justify-center px-6 overflow-hidden">
            <motion.p
              style={{ y: textY }}
              className="font-black-display uppercase text-center text-[#F4F1EA] font-extrabold
                text-[1.5rem] md:text-[2.5rem] leading-[1.3] max-w-4xl tracking-tight"
            >
              We're 250+ people who escaped the 9-to-5 to build businesses of
              our <span className="font-script normal-case text-[#B78AF7] text-[1.35em]">own.</span>{' '}
              Better money, our own diaries, and nobody looking over our{' '}
              <span className="font-script normal-case text-[#B78AF7] text-[1.35em]">shoulder.</span>
              <br />
              <span className="font-script normal-case text-[#B78AF7] text-[1.35em]">Your turn?</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}