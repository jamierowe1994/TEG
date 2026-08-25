import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Handshake, BookOpen, Briefcase } from 'lucide-react';
import { TEG_LOGO, TEG_LOGO_WHITE } from './brands';
import { EASE } from './motion';

// Three destinations, shown as icons with the name on hover. "Our Brands"
// used to sit here too, but it only jumped you down the page you were already
// on — and Partnership now lists all nine brands and links straight into
// them, so the entry was doing the same job twice.
//
// Vacancies has no page yet, so it wears the "Soon" label rather than
// pretending to be a link.

const LINKS = [
  { label: 'Partnership', to: '/partnership', Icon: Handshake },
  { label: 'About', to: '/about', Icon: BookOpen },
  { label: 'Vacancies', to: '/vacancies', Icon: Briefcase, soon: true },
];

function IconNav({ dark }) {
  const { pathname } = useLocation();
  const [hover, setHover] = useState(null);

  const shell = dark ? 'bg-white/[0.06]' : 'bg-foreground/[0.05]';
  // written out in full, not composed — Tailwind scans source text, so a
  // `hover:${…}` template would emit a class that never gets generated
  const idle = dark
    ? 'text-white/60 hover:text-white'
    : 'text-foreground/55 hover:text-foreground';
  const live = dark ? 'text-white' : 'text-foreground';
  const on = dark ? 'bg-white/10' : 'bg-foreground/10';
  const off = dark ? 'text-white/25' : 'text-foreground/25';
  const tip = dark
    ? 'bg-[#1a1a1c] text-white/90 border-white/10'
    : 'bg-foreground text-background border-transparent';

  return (
    <div className={`hidden md:flex items-center gap-1 rounded-2xl p-1.5 ${shell}`}>
      {LINKS.map(({ label, to, Icon, soon }, i) => {
        const active = pathname === to;
        const inner = (
          <>
            <Icon size={19} strokeWidth={1.6} />
            {soon && (
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[0.5rem] tracking-[0.1em]
                  ${dark ? 'text-white/40' : 'text-foreground/40'}`}
              >
                Soon
              </span>
            )}
            {/* the label lives on a plain wrapper — motion writes its own
                transform and would wipe the centring */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 pointer-events-none" aria-hidden>
              <AnimatePresence>
                {hover === i && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className={`block whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.78rem] ${tip}`}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </>
        );

        const box = `relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors`;

        return soon ? (
          <span
            key={label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`${box} ${off} cursor-default`}
          >
            {inner}
          </span>
        ) : (
          <Link
            key={label}
            to={to}
            aria-label={label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className={`${box} ${active ? `${on} ${live}` : idle}`}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

export default function ExperienceNav({ dark = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="absolute top-0 inset-x-0 z-50 bg-transparent"
      >
        <nav className="mx-auto max-w-[1480px] px-5 md:px-12 h-24 md:h-28 flex items-center justify-between">
          <Link to="/" aria-label="The Experts Group — home" className="shrink-0">
            <img src={dark ? TEG_LOGO_WHITE : TEG_LOGO} alt="The Experts Group" className="h-14 md:h-[4.5rem] w-auto" />
          </Link>

          <IconNav dark={dark} />

          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@theexpertsgroup.co.uk"
              className={dark ? "hidden md:inline-flex items-center gap-2 rounded-xl bg-white text-[#131313] text-sm font-medium pl-6 pr-5 py-3 hover:bg-white/85 transition-colors" : "hidden md:inline-flex items-center gap-2 rounded-xl bg-foreground text-background text-sm font-medium pl-6 pr-5 py-3 hover:bg-foreground/85 transition-colors"}
            >
              Let's talk <ArrowUpRight size={15} strokeWidth={2} />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="md:hidden inline-flex items-center justify-center w-10 h-10"
            >
              <Menu size={22} strokeWidth={1.75} className={dark ? "text-white" : undefined} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] bg-secondary flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-16">
              <img src={TEG_LOGO} alt="The Experts Group" className="h-8 w-auto" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/70"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.06 }}
                >
                  {l.soon ? (
                    <span className="type-display text-5xl text-foreground/30 flex items-baseline gap-3 py-2">
                      {l.label}
                      <span className="text-[0.6rem] tracking-[0.18em] uppercase text-foreground/40">Soon</span>
                    </span>
                  ) : (
                    <Link to={l.to} onClick={() => setOpen(false)} className="type-display text-5xl text-foreground block py-2">
                      {l.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-12">
              <Link
                to="/partnership"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-7 py-4"
              >
                Build with us <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
