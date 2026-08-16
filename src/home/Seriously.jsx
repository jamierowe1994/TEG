import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

// "Three things we take seriously" — a full-screen wall of screens. Films
// play behind a hairline grid; when one finishes its word takes the wall and
// the people fade in around it, one at a time. Click a person and everyone
// else clears the room so you can read their story.

const COLS = 8;
const ROWS = 3;
const PAGE_BG = '#0d0c0f';

const THINGS = [
  {
    key: 'health',
    label: 'Health',
    video: '/media/health-full.mp4',
    poster: '/media/health-aerial.jpg',
    videoPos: 'center 30%',
    cell: { col: 0, row: 2 },
    tile: '#4D1D81',
    tileText: '#ffffff',
    blurb:
      "Success isn't just the P&L. When you run your own diary, training runs, school pick-ups and actual lunch breaks fit inside it.",
    media: [
      { video: '/media/health-run.mp4' },
      { src: '/media/health-medal.jpg' },
      { video: '/media/health-doc.mp4' },
      { video: '/media/health-clip.mp4' },
    ],
  },
  {
    key: 'wealth',
    label: 'Wealth',
    video: '/media/film-awards-reel.mp4',
    poster: '/media/poster-awards.jpg',
    cell: { col: 4, row: 0 },
    tile: '#9565FF',
    tileText: '#ffffff',
    blurb:
      'Better money than employment ever paid — earned on your own name, celebrated loudly when it lands.',
    media: [{ src: '/media/bbs-239.jpg' }, { src: '/media/poster-awards.jpg' }, { src: '/media/bbs-143.jpg' }],
  },
  {
    key: 'happiness',
    label: 'Happiness',
    video: '/media/film-summit.mp4',
    poster: '/media/poster-summit.jpg',
    cell: { col: 6, row: 2 },
    tile: '#E3D7FF',
    tileText: '#131313',
    blurb:
      "The unscientific measure that matters most. If the work isn't making life better, what's it for?",
    media: [{ src: '/media/z63-5220.jpg' }, { src: '/media/bbs-77.jpg' }, { src: '/media/eass-18.jpg' }],
  },
];

// The people who fade in once the health film finishes. Click one and the
// wall clears so their story can be read.
const PEOPLE = [
  {
    key: 'shaun',
    video: '/media/health-clip.mp4',
    cell: [1, 0],
    name: 'Shaun',
    role: 'Founder, The Recruitment Experts',
    story:
      "Shaun loves a bit of last-minute spontaneity, so naturally he entered an Ironman with less than three months to train. As all good things do, it started with a poor decision. This was his third time crossing the line at Frankfurt — and the second time doing it alongside his son, Tyler.",
  },
  {
    key: 'lee',
    src: '/media/health-medal.jpg',
    cell: [3, 0],
    name: 'Lee',
    role: 'Managing Director, Fine & Country Midlands',
    story:
      "Lee describes his marathon pace as a leisurely stroll, which the finish photos generously support. What he actually does is keep signing up for harder and harder challenges — and keep finishing them. We wish him luck. Break a leg, Lee. Not literally.",
  },
  {
    key: 'gareth',
    pair: ['/media/gareth-1.jpg', '/media/gareth-2.jpg'],
    cell: [6, 0],
    wide: true,
    name: 'Gareth',
    role: 'Managing Director, The Mortgage Experts',
    story:
      "Gareth is an avid rugby player and runs The Mortgage Experts — but in 2024 he decided enough was enough and set out to lose more than 30kg. He set the task, he did the work, and he got there. He looks fantastic, and he knows it.",
  },
  {
    key: 'james',
    video: '/media/james-walk.mp4',
    cell: [2, 2],
    name: 'James',
    role: 'Managing Director, The Recruitment Experts',
    story:
      "James loves to challenge himself with long-distance events. Here he is making his way up a very mild hill, visibly struggling. In September 2025 — after nineteen weeks of training — he ran 100km in one go and completed an ultra marathon. Well done, James.",
  },
];

export default function Seriously() {
  const ref = useRef(null);
  const videoRefs = useRef({});
  const [activeKey, setActiveKey] = useState('health');
  const [ended, setEnded] = useState({});
  const [open, setOpen] = useState(null);
  const [story, setStory] = useState(null);
  const [startWord, setStartWord] = useState(false);
  const [armed, setArmed] = useState(false);
  const [hint, setHint] = useState(null);
  const panelRef = useRef(null);

  // nothing plays until the wall is properly on screen — scroll away and it
  // resets to a black wall holding its word, so the film is always watched
  // from the top
  React.useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setArmed(e.intersectionRatio > 0.75),
      { threshold: [0, 0.4, 0.75, 0.95] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (armed) return;
    Object.values(videoRefs.current).forEach((v) => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });
    setEnded({});
    setStory(null);
  }, [armed]);

  // the film's viewpoint drops for Sean's finish line and the golf swing,
  // then comes home. Times are seconds.
  const PAN = [[0, 30], [5.7, 30], [6.3, 58], [12.5, 58], [13.3, 30], [25, 30]];
  React.useEffect(() => {
    let raf;
    const tick = () => {
      const v = videoRefs.current.health;
      if (v) {
        const t = v.currentTime;
        const sw = !v.paused && t < 1.35;
        setStartWord((prev) => (prev === sw ? prev : sw));
        let y = 30;
        for (let i = 0; i < PAN.length - 1; i++) {
          const [t0, y0] = PAN[i];
          const [t1, y1] = PAN[i + 1];
          if (t >= t0 && t <= t1) {
            y = y0 + ((t - t0) / (t1 - t0)) * (y1 - y0);
            break;
          }
        }
        v.style.objectPosition = `center ${y}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // only the active film plays; the others hold their frame
  React.useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, v]) => {
      if (!v) return;
      if (armed && key === activeKey && !ended[key]) v.play().catch(() => {});
      else v.pause();
    });
  }, [activeKey, ended, armed]);

  // hovering only swaps films while nothing has finished — once you've
  // earned an end state it stays put until you click another tile
  const hoverThing = (t) => {
    if (story || ended[activeKey]) return;
    setActiveKey(t.key);
  };

  const clickThing = (t) => {
    setStory(null);
    setActiveKey(t.key);
    setEnded((e) => ({ ...e, [t.key]: false }));
    const v = videoRefs.current[t.key];
    if (v) {
      v.currentTime = 0;
      if (armed) v.play().catch(() => {});
    }
  };

  const active = open !== null ? THINGS[open] : null;
  const peopleShown = activeKey === 'health' && ended.health;

  return (
    <section ref={ref} className="relative h-[300vh] text-white">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-12 md:pt-16">
        <div className="px-6 md:px-12 w-full max-w-[1700px] mx-auto shrink-0">
          <h2 className="font-black-display font-extrabold uppercase tracking-tight text-3xl md:text-5xl leading-[1.02]">
            Three things we
            <br />
            take seriously<span className="text-[#9565FF]">.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 160 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          ref={panelRef}
          className="relative mt-6 md:mt-8 mx-3 md:mx-8 mb-10 md:mb-14 flex-1 rounded-lg overflow-hidden bg-[#0d0c0f]"
        >
          {THINGS.map((t) => (
            <video
              key={t.key}
              ref={(el) => (videoRefs.current[t.key] = el)}
              src={t.video}
              poster={t.poster}
              muted
              playsInline
              preload="auto"
              onEnded={() => setEnded((e) => ({ ...e, [t.key]: true }))}
              style={t.videoPos ? { objectPosition: t.videoPos } : undefined}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                activeKey === t.key && !ended[t.key] ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* the grid — hairlines, blur panes, diamond cutouts */}
          <div
            className="absolute inset-0 grid pointer-events-none"
            style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
          >
            {Array.from({ length: COLS * ROWS }, (_, i) => (
              <div key={i} className="border-[0.5px] border-black/60" />
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: (COLS - 1) * (ROWS - 1) }, (_, i) => {
              const c = (i % (COLS - 1)) + 1;
              const r = Math.floor(i / (COLS - 1)) + 1;
              return (
                <span
                  key={i}
                  className="absolute w-[7px] h-[7px] rotate-45 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(c / COLS) * 100}%`, top: `${(r / ROWS) * 100}%`, backgroundColor: PAGE_BG }}
                />
              );
            })}
          </div>

          {/* the word opens the film too */}
          {THINGS.map((t) => (
            <div
              key={`rest-${t.key}`}
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
                activeKey === t.key && !story && (!armed || startWord) ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p
                className="font-black-display font-extrabold uppercase tracking-tight text-white leading-none"
                style={{ fontSize: `${Math.min(17, 82 / (t.label.length * 0.62))}vw` }}
              >
                {t.label}
              </p>
            </div>
          ))}

          {/* when a film finishes, its word takes the wall */}
          {THINGS.map((t) => (
            <div
              key={`word-${t.key}`}
              className={`absolute inset-0 z-[6] flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${
                activeKey === t.key && ended[t.key] && !story ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p
                className="font-black-display font-extrabold uppercase tracking-tight text-white leading-none"
                style={{ fontSize: `${Math.min(17, 82 / (t.label.length * 0.62))}vw` }}
              >
                {t.label}
              </p>
            </div>
          ))}

          {/* the people — fade in one by one, then step forward when clicked */}
          {PEOPLE.map((p, i) => {
            const isStory = story === p.key;
            const cellStyle = {
              left: `${(p.cell[0] / COLS) * 100}%`,
              top: `${(p.cell[1] / ROWS) * 100}%`,
              width: `${((p.wide ? 2 : 1) / COLS) * 100}%`,
              height: `${100 / ROWS}%`,
            };
            const bigStyle = {
              left: '5%',
              top: '12%',
              width: p.wide ? '44%' : '27%',
              height: '76%',
            };
            const target = isStory ? bigStyle : cellStyle;
            return (
              <motion.button
                key={p.key}
                onClick={() => setStory(p.key)}
                onMouseEnter={() => !story && setHint(p.name)}
                onMouseLeave={() => setHint(null)}
                animate={{
                  ...target,
                  opacity: story && !isStory ? 0 : peopleShown ? 1 : 0,
                  scale: peopleShown ? 1 : 0.55,
                  y: peopleShown ? 0 : 24,
                }}
                transition={{
                  duration: story ? 0.7 : 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: story || !peopleShown ? 0 : 0.3 + i * 0.32,
                }}
                style={{ ...target, position: 'absolute' }}
                className={`z-[7] overflow-hidden border-[0.5px] border-black/60 ${
                  isStory ? 'rounded-xl cursor-default' : 'cursor-pointer'
                } ${story && !isStory ? 'pointer-events-none' : ''} ${
                  peopleShown ? '' : 'pointer-events-none'
                }`}
              >
                {p.pair ? (
                  <span className="flex w-full h-full">
                    {p.pair.map((src) => (
                      <img key={src} src={src} alt="" className="w-1/2 h-full object-cover" />
                    ))}
                  </span>
                ) : p.video ? (
                  <video src={p.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={p.src} alt={p.name} className="w-full h-full object-cover" />
                )}
              </motion.button>
            );
          })}

          {/* nudge — so it's obvious these are worth a click */}
          <AnimatePresence>
            {hint && !story && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute z-[9] bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white text-[#131313] px-5 py-2.5 text-xs font-semibold pointer-events-none"
              >
                Read {hint}'s story
              </motion.div>
            )}
          </AnimatePresence>

          {/* the story itself */}
          <AnimatePresence>
            {story && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="absolute z-[8] right-[5%] top-1/2 -translate-y-1/2 w-[42%] md:w-[38%]"
              >
                {(() => {
                  const p = PEOPLE.find((x) => x.key === story);
                  return (
                    <>
                      <p className="font-brittany text-4xl md:text-6xl text-[#B78AF7] leading-none">
                        Meet {p.name}
                      </p>
                      <p className="mt-3 text-white/50 text-xs md:text-sm uppercase tracking-widest">
                        {p.role}
                      </p>
                      <p className="mt-5 text-white/80 font-light text-sm md:text-base leading-relaxed">
                        {p.story}
                      </p>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* back out of a story */}
          <AnimatePresence>
            {story && (
              <motion.button
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onClick={() => setStory(null)}
                className="absolute z-[9] top-4 left-4 inline-flex items-center gap-2 rounded-full
                  bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </motion.button>
            )}
          </AnimatePresence>

          {/* the tiles — each claims a full pane of the wall */}
          {THINGS.map((t, i) => (
            <button
              key={t.key}
              onMouseEnter={() => hoverThing(t)}
              onClick={() => clickThing(t)}
              style={{
                left: `${(t.cell.col / COLS) * 100}%`,
                top: `${(t.cell.row / ROWS) * 100}%`,
                width: `${100 / COLS}%`,
                height: `${100 / ROWS}%`,
                backgroundColor: t.tile,
                color: t.tileText,
              }}
              className={`absolute z-10 text-left p-3 md:p-4 transition-all duration-500 cursor-pointer
                flex flex-col justify-between border-[0.5px] border-black/60
                ${story ? 'opacity-0 pointer-events-none' : activeKey === t.key ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
            >
              <span className="self-end opacity-70 text-lg leading-none">+</span>
              <span>
                <span className="block text-[0.7rem] opacity-60 leading-none mb-1">0{i + 1}</span>
                <span className="block text-[0.95rem] md:text-lg font-semibold leading-tight">{t.label}</span>
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* the pop-out catalogue (wealth + happiness) */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[86vh] overflow-y-auto rounded-2xl bg-[#141217] text-white p-6 md:p-10"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X size={17} />
              </button>
              <p className="font-brittany text-4xl md:text-5xl text-[#B78AF7]">{active.label}</p>
              <p className="mt-4 text-white/70 font-light text-sm md:text-base max-w-xl leading-relaxed">
                {active.blurb}
              </p>
              <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-3">
                {active.media.map((m, i) =>
                  m.video ? (
                    <video key={i} src={m.video} autoPlay muted loop playsInline className="w-full aspect-[3/4] object-cover rounded-lg bg-black/40" />
                  ) : (
                    <img key={i} src={m.src} alt="" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-lg bg-black/40" />
                  )
                )}
              </div>
              <p className="mt-6 text-white/35 text-xs">
                The catalogue keeps growing — more stories landing here soon.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
