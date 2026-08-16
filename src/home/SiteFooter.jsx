import React from 'react';
import { Link } from 'react-router-dom';
import ICONS, { SocialIcon } from './SocialIcons';

// The group footer — ported from the TEG Paid Ads platform: rounded card on
// white, logo + socials in the brand purple, link columns, legal row, and
// the giant cropped wordmark running off the bottom edge.
// Social hrefs are placeholders until marketing supplies the real URLs.

const SOCIALS = ['Meta / Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok'];

function backToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function SiteFooter() {
  return (
    <footer className="relative z-30 overflow-hidden bg-white px-4 pt-10 sm:px-8">
      <div className="relative mx-auto max-w-6xl rounded-[2rem] bg-[#f4f4f5] p-8 shadow-[0_18px_44px_-30px_rgba(17,24,39,0.14)] sm:p-12">
        <button
          onClick={backToTop}
          aria-label="Back to top"
          className="absolute right-6 top-6 sm:right-10 sm:top-10 w-10 h-10 rounded-full border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-500 transition-colors flex items-center justify-center"
        >
          ↑
        </button>
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:gap-14">
          <div className="max-w-xs">
            <img src="/teg-logo.png" alt="The Experts Group" className="h-14 w-auto" />
            <div className="mt-5 flex items-center gap-4 text-[#4D1D81]">
              {SOCIALS.map((name) => {
                const icon = ICONS.find((i) => i.name === name);
                return (
                  <a
                    key={name}
                    href="#"
                    aria-label={name}
                    className="transition hover:-translate-y-0.5 hover:text-[#5f2599]"
                  >
                    <SocialIcon icon={icon} className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex gap-12 pr-0 sm:gap-16 sm:pr-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-600">
                <li><a href="#brands" className="hover:text-gray-900">Our Brands</a></li>
                <li><Link to="/partnership" className="hover:text-gray-900">Partnership</Link></li>
                <li><Link to="/about" className="hover:text-gray-900">About</Link></li>
                <li><Link to="/vacancies" className="hover:text-gray-900">Vacancies</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-600">
                <li>
                  <a href="mailto:hello@theexpertsgroup.co.uk" className="hover:text-gray-900">
                    hello@theexpertsgroup.co.uk
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-400 sm:flex-row">
          <span>© {new Date().getFullYear()} The Experts Group</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition hover:text-gray-900">Privacy</Link>
            <Link to="/terms" className="transition hover:text-gray-900">Terms</Link>
          </div>
        </div>
      </div>

      {/* the giant wordmark, cropped by the footer's bottom edge */}
      <p aria-hidden className="footer-wordmark hidden sm:block text-[9vw] sm:-mb-[0.16em] sm:mt-10">
        The Experts Group
      </p>
      <p aria-hidden className="footer-wordmark -mb-[0.16em] mt-10 text-[36vw] sm:hidden">
        TEG
      </p>
    </footer>
  );
}
