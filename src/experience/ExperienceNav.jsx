import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { TEG_LOGO, TEG_LOGO_WHITE } from './brands';
import { EASE } from './motion';

const dot = (dark) => <span className={dark ? "w-[3px] h-[3px] rounded-full bg-white/30" : "w-[3px] h-[3px] rounded-full bg-foreground/25"} />;

const LINKS = [
  { label: 'Our Brands', href: '#brands' },
  { label: 'Partnership', to: '/partnership' },
  { label: 'About', to: '/about' },
  { label: 'Vacancies', to: '/vacancies' },
];

export default function ExperienceNav({ dark = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  const scrollToBrands = (e) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' });
  };

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

          <div className="hidden md:flex items-center gap-6">
            {LINKS.map((l, i) => (
              <React.Fragment key={l.label}>
                {i > 0 && dot(dark)}
                {l.href ? (
                  <a href={l.href} onClick={scrollToBrands}
                    className={dark ? "text-[0.925rem] font-medium text-white/80 hover:text-white transition-colors" : "text-[0.925rem] font-medium text-foreground/75 hover:text-foreground transition-colors"}>
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.to}
                    className={dark ? "text-[0.925rem] font-medium text-white/80 hover:text-white transition-colors" : "text-[0.925rem] font-medium text-foreground/75 hover:text-foreground transition-colors"}>
                    {l.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>

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
                  {l.href ? (
                    <a href={l.href} onClick={scrollToBrands} className="type-display text-5xl text-foreground block py-2">
                      {l.label}
                    </a>
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