'use client';

import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';

export default function Nav({ links, cta }) {
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
        <a href="/" className="brand" onClick={() => setOpen(false)}>
          <BrandMark />
          Cleophis
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="nav-link" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href={cta.href} className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            {cta.label}
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
