import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE } from '../experience/motion';

// Find your brand — a phone rises into the room with what the group
// carries on one side and what you keep on the other. Keep scrolling and
// the phone grows until its screen is the whole page: the black room
// becomes the light one, and the brands float up through it for you to
// pick from.

const INK = '#111111';
const PURPLE = '#9565FF';
const PAD = 'px-6 md:px-16 lg:px-24 xl:px-32';

const CARRY = ['The brand', 'Marketing', 'Technology', 'Compliance', 'Coaching', 'Back-office'];
const KEEP = ['Your name', 'Your diary', 'Your clients', '50 to 80% of the fee'];

function Pill({ children, tone }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
      style={{ backgroundColor: tone === 'purple' ? PURPLE : 'rgba(255,255,255,0.08)', color: '#fff' }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
      {children}
    </span>
  );
}

function Panel({ title, items, tone, style, align = 'left' }) {
  return (
    <motion.div
      style={style}
      className={`absolute top-1/2 w-[300px] rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-6 ${
        align === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      <p className="text-[0.62rem] tracking-[0.22em] uppercase text-white/55">{title}</p>
      <div className={`mt-4 flex flex-wrap gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
        {items.map((it, i) => (
          <Pill key={it} tone={tone && i % 3 === 1 ? 'purple' : undefined}>{it}</Pill>
        ))}
      </div>
    </motion.div>
  );
}

// the phone: a silver frame, a thin black bezel, and a white screen that
// says one thing. It only ever scales.
function Phone({ scale }) {
  return (
    <motion.div
      style={{ scale }}
      className="relative w-[272px] h-[560px] md:w-[300px] md:h-[620px] origin-center will-change-transform"
    >
      <div
        className="absolute inset-0 rounded-[46px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)]"
        style={{ background: 'linear-gradient(160deg, #f2f2f4 0%, #c9c9ce 45%, #a9a9af 100%)' }}
      />
      <div className="absolute inset-[4px] rounded-[42px] bg-[#0b0b0c]" />
      <div className="absolute inset-[10px] rounded-[36px] overflow-hidden bg-white flex items-center justify-center">
        <p className="font-black-display font-extrabold uppercase tracking-tight text-[#131313] text-[18px] md:text-[20px] leading-[0.95] text-center">
          The
          <br />
          Experts
          <br />
          Group
        </p>
      </div>
    </motion.div>
  );
}

function ZoomIntro() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // the title arrives and stays; the phone climbs to sit under it and stays
  const titleOpacity = useTransform(p, [0, 0.06], [0, 1]);
  const titleY = useTransform(p, [0, 0.1], [40, 0]);
  const phoneY = useTransform(p, [0, 0.26], ['78vh', '28vh']);
  // the two panels rise up past the phone; as they cross its middle, the zoom begins
  const panelY = useTransform(p, [0.24, 0.62], ['70vh', '-90vh']);
  const panelOpacity = useTransform(p, [0.24, 0.3, 0.56, 0.62], [0, 1, 1, 0]);
  const scale = useTransform(p, [0.42, 0.9], [1, 11]);
  const hint = useTransform(p, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);
  // once the screen has swallowed the room, the room itself goes white so
  // there is no seam where the pinned screen hands over to the next section
  const room = useTransform(p, [0.86, 0.92], [INK, '#FFFFFF']);

  return (
    <section ref={ref} className="relative h-[360vh]">
      <motion.div style={{ backgroundColor: room }} className="sticky top-0 h-screen overflow-hidden">
        {/* the title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className={`absolute inset-x-0 top-[9vh] md:top-[11vh] ${PAD} text-center`}
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-white text-[2.2rem] md:text-[3.8rem] leading-[0.98]">
            It might be time
            <br />
            to find your brand.
          </h2>
          <p className="mt-4 text-white/55 text-sm md:text-base">
            Nine brands. One group behind every one of them.
          </p>
        </motion.div>

        {/* the room: the phone in the middle, the panels rising either side */}
        <div className={`absolute inset-0 ${PAD}`}>
          <div className="relative h-full max-w-[1200px] mx-auto">
            <div className="hidden md:block">
              <Panel title="What we carry" items={CARRY} tone style={{ y: panelY, opacity: panelOpacity }} />
              <Panel title="What you keep" items={KEEP} align="right" style={{ y: panelY, opacity: panelOpacity }} />
            </div>
            <motion.div style={{ y: phoneY }} className="absolute inset-0 flex items-start justify-center">
              <Phone scale={scale} />
            </motion.div>
          </div>
        </div>

        <motion.p
          style={{ opacity: hint }}
          className="absolute bottom-[5vh] inset-x-0 text-center text-[0.62rem] tracking-[0.22em] uppercase text-white/40"
        >
          Keep scrolling
        </motion.p>
      </motion.div>
    </section>
  );
}

// the brands, floating up through the light room at three speeds
function BrandFloat({ brands }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const cols = [
    useTransform(p, [0, 1], [120, -160]),
    useTransform(p, [0, 1], [260, -60]),
    useTransform(p, [0, 1], [60, -220]),
  ];
  const lanes = [[], [], []];
  brands.forEach((b, i) => lanes[i % 3].push(b));

  return (
    <section ref={ref} className={`${PAD} pt-[8vh] pb-[18vh]`} style={{ backgroundColor: '#FFFFFF', color: '#131313' }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-[2.4rem] md:text-[4.4rem] leading-[0.95]">
            Nine brands.
            <br />
            One group.
          </h2>
          <p className="text-sm md:text-base text-[#131313]/60 max-w-[26em] leading-[1.6] md:text-right">
            Pick the brand that fits the work you already do. Each one has its
            own page, its own people, and its own way of doing things.
          </p>
        </motion.div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {lanes.map((lane, c) => (
            <motion.div key={c} style={{ y: cols[c] }} className="space-y-5 md:space-y-6 will-change-transform">
              {lane.map((b) => (
                <Link
                  key={b.key}
                  to={b.to}
                  className="group block rounded-[1.6rem] bg-[#F1F1F1] p-6 md:p-7
                    transition-transform duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="h-1.5 w-10 rounded-full" style={{ backgroundColor: b.accent }} />
                    <span className="text-[0.6rem] tracking-[0.2em] text-[#131313]/40">{b.n}</span>
                  </div>
                  <h3 className="mt-6 font-sans font-normal tracking-[-0.02em] text-[1.4rem] md:text-[1.6rem] leading-[1.1]">
                    {b.name}
                  </h3>
                  <p className="mt-1.5 text-[0.62rem] tracking-[0.16em] uppercase text-[#131313]/45">{b.craft}</p>
                  <p className="mt-4 text-sm text-[#131313]/65 leading-[1.6]">{b.why}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                    {b.ready ? 'See the brand' : 'Coming soon'}
                    <span
                      className="grid place-items-center w-8 h-8 rounded-full border border-[#131313]/20 transition-colors
                        group-hover:bg-[#131313] group-hover:text-white group-hover:border-transparent"
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </Link>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BrandZoom({ brands }) {
  return (
    <>
      <ZoomIntro />
      <BrandFloat brands={brands} />
    </>
  );
}
