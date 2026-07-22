'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  ['#problem', 'Problem'],
  ['#solution', 'Solution'],
  ['#how', 'How it works'],
  ['#vision', 'Vision'],
  ['#investors', 'Investors'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          Cleophis
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="nav-link" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#beta" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Join the beta
          </a>
        </nav>

        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
