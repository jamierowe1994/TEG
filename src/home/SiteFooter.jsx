import React from 'react';
import { Link } from 'react-router-dom';
import SocialGif, { SOCIAL_KEYS } from './SocialGif';

// The group footer — ported from the TEG Paid Ads platform: rounded card on
// white, logo + socials in the brand purple, link columns, legal row, and
// the giant cropped wordmark running off the bottom edge.
// Social hrefs are placeholders until marketing supplies the real URLs.
// Facebook, Instagram and LinkedIn only - YouTube and TikTok dropped.

function backToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

// `dark` is the footer for the black pages: the page black behind it and
// the card in the same soft grey the nav's icon shell uses, so the two
// ends of the page match.
export default function SiteFooter({ dark = false }) {
  const t = dark
    ? {
        page: 'bg-[#111111]',
        card: 'bg-white/[0.06] text-white',
        top: 'border-white/15 text-white/45 hover:text-white hover:border-white/50',
        label: 'text-white/40',
        link: 'text-white/60',
        hover: 'hover:text-white',
        rule: 'border-white/10',
        legal: 'text-white/35',
        logo: '/teg-logo-white.png',
        socialTone: 'white',
      }
    : {
        page: 'bg-background',
        card: 'bg-white text-[#131313] shadow-[0_18px_44px_-30px_rgba(17,24,39,0.18)]',
        top: 'border-black/15 text-black/45 hover:text-black hover:border-black/45',
        label: 'text-black/40',
        link: 'text-black/60',
        hover: 'hover:text-black',
        rule: 'border-black/10',
        legal: 'text-black/35',
        logo: '/teg-logo.png',
        socialTone: 'black',
      };

  return (
    <footer className={`relative z-30 overflow-hidden ${t.page} px-4 pt-10 sm:px-8`}>
      <div className={`relative w-full rounded-[2rem] ${t.card} p-8 sm:p-12`}>
        <button
          onClick={backToTop}
          aria-label="Back to top"
          className={`absolute right-6 top-6 sm:right-10 sm:top-10 w-10 h-10 rounded-full border ${t.top} transition-colors flex items-center justify-center`}
        >
          ↑
        </button>
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:gap-14">
          <div className="max-w-xs">
            <img src={t.logo} alt="The Experts Group" className="h-14 w-auto" />
            {/* 40px: the assets are 120px, so this stays pixel-sharp up to 3x */}
            <div className="mt-6 flex items-center gap-5">
              {SOCIAL_KEYS.map((key) => (
                <SocialGif key={key} platform={key} tone={t.socialTone} size={40} />
              ))}
            </div>
          </div>
          <div className="flex gap-12 pr-0 sm:gap-16 sm:pr-20">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest ${t.label}`}>Explore</p>
              <ul className={`mt-4 space-y-2.5 text-sm ${t.link}`}>
                <li><a href="#brands" className={t.hover}>Our Brands</a></li>
                <li><Link to="/partnership" className={t.hover}>Partnership</Link></li>
                <li><Link to="/about" className={t.hover}>About</Link></li>
                <li><Link to="/vacancies" className={t.hover}>Vacancies</Link></li>
              </ul>
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest ${t.label}`}>Contact</p>
              <ul className={`mt-4 space-y-2.5 text-sm ${t.link}`}>
                <li>
                  <a href="mailto:hello@theexpertsgroup.co.uk" className={t.hover}>
                    hello@theexpertsgroup.co.uk
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`mt-10 flex flex-col items-center justify-between gap-3 border-t ${t.rule} pt-6 text-xs ${t.legal} sm:flex-row`}>
          <span>© {new Date().getFullYear()} The Experts Group</span>
          <div className="flex gap-6">
            <Link to="/privacy" className={`transition ${t.hover}`}>Privacy</Link>
            <Link to="/terms" className={`transition ${t.hover}`}>Terms</Link>
          </div>
        </div>
      </div>

      {/* the giant wordmark, cropped by the footer's bottom edge */}
      <p aria-hidden className="footer-wordmark hidden sm:block text-[10.6vw] sm:-mb-[0.17em] sm:mt-12">
        The Experts Group
      </p>
      <p aria-hidden className="footer-wordmark -mb-[0.16em] mt-10 text-[36vw] sm:hidden">
        TEG
      </p>
    </footer>
  );
}
