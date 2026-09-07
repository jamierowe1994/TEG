import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Heart, MessageCircle, Bookmark, Send, Wifi, Signal, BatteryFull, Home, Search, PlusSquare, Clapperboard, UserRound, Camera } from 'lucide-react';
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
      className={`absolute top-1/2 w-[300px] ${align === 'left' ? 'left-0 lg:-left-[6vw]' : 'right-0 lg:-right-[6vw] text-right'}`}
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

// The phone is drawn at twice its resting size and scaled down to rest, so
// there is real detail to enlarge when it zooms. Silver body with antenna
// lines and buttons, a thin black bezel, the Dynamic Island, a status bar,
// and a film playing behind a reel's worth of buttons.
const PHONE_W = 600;
const PHONE_H = 1240;

function SideButton({ side, top, height }) {
  return (
    <div
      className="absolute w-[7px] rounded-[3px]"
      style={{
        [side]: -6,
        top,
        height,
        background: side === 'left'
          ? 'linear-gradient(90deg, #8f8f96, #d8d8dc)'
          : 'linear-gradient(90deg, #d8d8dc, #8f8f96)',
      }}
    />
  );
}

function Phone({ scale, width, sheetY }) {
  return (
    <motion.div
      // drawn at 2x and scaled about its centre, so pull it up by the
      // quarter-height the centre origin would otherwise push it down
      style={{ scale, width, height: PHONE_H, marginTop: -PHONE_H / 4 }}
      className="relative origin-center"
    >
      {/* the body */}
      <div
        className="absolute inset-0 rounded-[96px] shadow-[0_60px_160px_-40px_rgba(0,0,0,0.9)]"
        style={{ background: 'linear-gradient(160deg, #f4f4f6 0%, #cfcfd4 40%, #a6a6ad 100%)' }}
      />
      {/* antenna lines in the band */}
      {[[0, 150], [0, 1060], [PHONE_W - 5, 150], [PHONE_W - 5, 1060]].map(([x, y], i) => (
        <span key={i} className="absolute w-[5px] h-[6px] bg-[#6f6f76]/60" style={{ left: x, top: y }} />
      ))}
      {[[130, 0], [430, 0], [130, PHONE_H - 5], [430, PHONE_H - 5]].map(([x, y], i) => (
        <span key={i} className="absolute w-[6px] h-[5px] bg-[#6f6f76]/60" style={{ left: x, top: y }} />
      ))}
      <SideButton side="left" top={210} height={44} />
      <SideButton side="left" top={300} height={92} />
      <SideButton side="left" top={420} height={92} />
      <SideButton side="right" top={330} height={150} />

      {/* bezel and screen */}
      <div className="absolute inset-[9px] rounded-[88px] bg-[#0a0a0b]" />
      <div className="absolute inset-[22px] rounded-[76px] overflow-hidden bg-black text-white">
        <video
          src="/media/film-awards-reel.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-black/55 to-transparent" />

        {/* the island and the status bar */}
        <div className="absolute top-[26px] left-1/2 -translate-x-1/2 w-[186px] h-[54px] rounded-full bg-black" />
        <div className="absolute top-[34px] left-[56px] text-[30px] font-semibold tracking-[-0.02em]">9:41</div>
        <div className="absolute top-[36px] right-[52px] flex items-center gap-2">
          <Signal size={30} strokeWidth={2.4} />
          <Wifi size={30} strokeWidth={2.4} />
          <BatteryFull size={34} strokeWidth={2.2} />
        </div>

        {/* the reel's chrome */}
        <div className="absolute top-[118px] inset-x-[46px] flex items-center justify-between">
          <span className="text-[38px] font-semibold tracking-[-0.02em]">Reels</span>
          <Camera size={40} strokeWidth={2} />
        </div>

        <div className="absolute right-[36px] bottom-[250px] flex flex-col items-center gap-[38px]">
          {[[Heart, '12.4k'], [MessageCircle, '318'], [Bookmark, ''], [Send, '']].map(([Icon, n]) => (
            <div key={n || Icon.displayName} className="flex flex-col items-center gap-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              <Icon size={54} strokeWidth={2} />
              {n && <span className="text-[22px] font-medium">{n}</span>}
            </div>
          ))}
        </div>

        <div className="absolute left-[44px] right-[140px] bottom-[232px]">
          <div className="flex items-center gap-4">
            <span className="w-[68px] h-[68px] shrink-0 rounded-full grid place-items-center text-[19px] tracking-[0.02em] font-black-display font-extrabold" style={{ backgroundColor: PURPLE }}>
              TEG
            </span>
            <span className="text-[26px] font-semibold">theexpertsgroup</span>
            <span className="rounded-lg border border-white/60 px-4 py-1.5 text-[22px] font-medium">Follow</span>
          </div>
          <p className="mt-4 text-[24px] leading-[1.35] text-white/90">
            Success Day 2026. Nine brands, one room, and everyone running their own business.
          </p>
          <p className="mt-3 text-[20px] text-white/70">
            <span className="mr-2">&#9835;</span>The Experts Group · Original audio
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[150px] border-t border-white/15 bg-black/75">
          <div className="flex items-center justify-around px-6 pt-8 text-white/90">
            <Home size={42} strokeWidth={2} />
            <Search size={42} strokeWidth={2} />
            <PlusSquare size={42} strokeWidth={2} />
            <Clapperboard size={42} strokeWidth={2} className="text-white" />
            <UserRound size={42} strokeWidth={2} />
          </div>
          <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 w-[220px] h-[8px] rounded-full bg-white/85" />
        </div>

        {/* the sheet: rises over the reel as the phone grows. The words that
            ride on it are drawn outside the phone, in real pixels, so they
            never blur as the phone scales */}
        <motion.div style={{ y: sheetY }} className="absolute inset-0 rounded-t-[72px] bg-white" />
      </div>
    </motion.div>
  );
}

function useViewport() {
  const [v, setV] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    const on = () => setV({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return v;
}

function ZoomIntro() {
  const ref = useRef(null);
  const { w: vw, h: vh } = useViewport();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // the uniform scale at which the phone fills the page's height (bezels just off-screen)
  const tall = vh / 820;
  // the unscaled width the phone needs so its screen spans the page
  const wide = (vw + 60) / tall;
  const rest = 0.34 * vh + PHONE_H / 4; // where the phone's centre sits at rest

  // 1. title in, phone climbs to rest beneath it, and the two hold together for a beat
  const titleOpacity = useTransform(p, [0, 0.05, 0.3, 0.38], [0, 1, 1, 0]);
  const titleY = useTransform(p, [0, 0.08, 0.3, 0.4], [40, 0, 0, -0.4 * vh]);
  const phoneY = useTransform(p, [0, 0.16], ['85vh', '34vh']);
  // 2. title leaves, phone moves to the centre of the page
  const centreShift = useTransform(p, [0.3, 0.42], [0, 0.5 * vh - rest]);
  // 3. pills rise past while the sheet climbs inside the screen and the phone
  //    grows at the same rate until it fills the page's height
  const sheetY = useTransform(p, [0.42, 0.62], ['100%', '0%']);
  const scale = useTransform(p, [0.42, 0.62], [0.5, tall]);
  const wordsOpacity = useTransform(p, [0.48, 0.62], [0, 1]);
  const wordsY = useTransform(p, [0.46, 0.66], [80, 0]);
  // where the sheet is, as a fraction of the screen still to climb
  const sheetFrac = useTransform(p, [0.42, 0.62], [1, 0]);
  // 4. a zoom into the words, the phone holding its shape
  const wordsScale = useTransform(p, [0.62, 0.7, 0.86], [0.9, 1, 1.22]);
  // 5. then outward: the screen widens until the phone's edges leave the page
  const width = useTransform(p, [0.7, 0.86], [PHONE_W, wide]);
  // the crisp words: clipped to the screen's rectangle, riding the sheet,
  // sized in real pixels from the phone's scale so they are never rasterised
  // small. Everything derives straight from the scroll progress, one input each.
  const SCREEN_H = PHONE_H - 44;
  const at = (v, ks, vs) => {
    if (v <= ks[0]) return vs[0];
    for (let i = 1; i < ks.length; i++) {
      if (v <= ks[i]) return vs[i - 1] + ((v - ks[i - 1]) / (ks[i] - ks[i - 1])) * (vs[i] - vs[i - 1]);
    }
    return vs[vs.length - 1];
  };
  const scaleAt = (v) => at(v, [0.42, 0.62], [0.5, tall]);
  const wsAt = (v) => at(v, [0.62, 0.7, 0.86], [0.9, 1, 1.22]);
  const widthAt = (v) => at(v, [0.7, 0.86], [PHONE_W, wide]);
  const sheetAt = (v) => at(v, [0.42, 0.62], [1, 0]);
  const wordsYAt = (v) => at(v, [0.46, 0.66], [80, 0]);
  const clipW = useTransform(p, (v) => (widthAt(v) - 44) * scaleAt(v));
  const clipH = useTransform(p, (v) => SCREEN_H * scaleAt(v));
  const clipR = useTransform(p, (v) => 76 * scaleAt(v));
  const overlayY = useTransform(p, (v) => (sheetAt(v) * SCREEN_H + wordsYAt(v)) * scaleAt(v));
  const titleSize = useTransform(p, (v) => `${58 * scaleAt(v) * wsAt(v)}px`);
  const subSize = useTransform(p, (v) => `${22 * scaleAt(v) * wsAt(v)}px`);
  const blockW = useTransform(p, (v) => 460 * scaleAt(v) * wsAt(v));
  const gap = useTransform(p, (v) => `${24 * scaleAt(v) * wsAt(v)}px`);
  const room = useTransform(p, [0.84, 0.9], [INK, '#FFFFFF']);
  const hint = useTransform(p, [0, 0.05, 0.26, 0.32], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[320vh]">
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

        {/* the room: just the phone, in the middle */}
        <div className={`absolute inset-0 ${PAD}`}>
          <div className="relative h-full max-w-[1200px] mx-auto">
            <motion.div style={{ y: phoneY }} className="absolute inset-0 flex items-start justify-center">
              <motion.div style={{ y: centreShift }}>
                <Phone scale={scale} width={width} sheetY={sheetY} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* the words, outside the phone: clipped to its screen and riding the sheet */}
        <motion.div
          style={{ width: clipW, height: clipH, borderRadius: clipR }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex items-center justify-center pointer-events-none"
        >
          <motion.div style={{ y: overlayY, opacity: wordsOpacity, width: blockW }} className="text-center shrink-0">
            <motion.p
              style={{ fontSize: titleSize }}
              className="font-black-display font-extrabold uppercase tracking-tight text-[#131313] leading-[0.95] whitespace-nowrap"
            >
              Your name
              <br />
              above
              <br />
              the door.
            </motion.p>
            <motion.p style={{ fontSize: subSize, marginTop: gap }} className="leading-[1.5] text-[#131313]/55">
              Nine brands, one group behind every one of them. Pick the one that fits the work you already do.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.p
          style={{ opacity: hint }}
          className={`absolute bottom-[5vh] left-0 ${PAD} text-[0.62rem] tracking-[0.22em] uppercase text-white/40`}
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
    <section ref={ref} className={`relative z-10 ${PAD} pt-[10vh] pb-[18vh] -mt-[30vh]`} style={{ backgroundColor: '#FFFFFF', color: '#131313' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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
