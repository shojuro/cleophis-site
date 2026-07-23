'use client';

import { useEffect, useRef } from 'react';

// variant: 'up' (default) | 'blur' | 'left' | 'right' | 'zoom'
export default function Reveal({ children, delay = 0, variant = 'up', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass = variant !== 'up' ? `reveal-${variant}` : '';

  return (
    <div
      ref={ref}
      className={`reveal ${variantClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
