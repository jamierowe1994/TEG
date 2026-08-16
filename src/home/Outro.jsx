import React from 'react';
import { Link } from 'react-router-dom';
import { TEG_LOGO_WHITE, EXPERIENCE_BRANDS } from '../experience/brands';

// Big friendly full-stop of a CTA, then a small dark footer.

export default function Outro() {
  return (
    <>
      <footer className="bg-[#141217] text-white/60 px-6 md:px-12 py-14">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <img src={TEG_LOGO_WHITE} alt="The Experts Group" className="h-10 w-auto" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[0.8rem]">
            {EXPERIENCE_BRANDS.map((b) => (
              <Link key={b.id} to={b.url} className="hover:text-white transition-colors">
                {b.name}
              </Link>
            ))}
          </div>
          <div className="text-[0.8rem] md:text-right space-y-2">
            <p><a href="mailto:hello@theexpertsgroup.co.uk" className="hover:text-white transition-colors">hello@theexpertsgroup.co.uk</a></p>
            <p><Link to="/vacancies" className="hover:text-white transition-colors">Vacancies</Link> · <Link to="/about" className="hover:text-white transition-colors">About</Link></p>
            <p className="text-white/35">© {new Date().getFullYear()} The Experts Group</p>
          </div>
        </div>
      </footer>
    </>
  );
}