'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type MotionValue } from 'framer-motion';

interface TopBarProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

const LINKS = [
  { href: '/solutions', label: 'Solutions' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/funnel', label: 'Grow' },
];

const LINK_HOVER_STYLES: Record<string, string> = {
  Solutions:
    'hover:border-[color:var(--brand-accent-blue)]/45 hover:bg-[color:var(--brand-accent-blue)]/14',
  Marketing:
    'hover:border-[rgba(134,81,212,0.55)] hover:bg-[rgba(134,81,212,0.16)]',
  Grow: 'hover:bg-[color:var(--brand-accent-blue)]/88',
};

export default function TopBar({ opacity, y }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.header
      style={{ opacity, y }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6"
    >
      <div className="relative mx-auto max-w-7xl rounded-xl border border-white/25 bg-black/72 px-4 py-3 text-white shadow-[0_12px_36px_rgba(0,0,0,0.3)] backdrop-blur-md">
        <div className="flex items-center justify-between">
        <Link
          href="/"
          className="pointer-events-auto transition-opacity hover:opacity-100"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/logo/CENTAURI-LOGO-2.svg"
            alt="Centauri"
            width={140}
            height={28}
            className="h-6 w-auto opacity-95"
            priority
          />
        </Link>
        <nav className="pointer-events-auto hidden items-center gap-2 md:flex">
          {LINKS.map((link) => {
            const isGrow = link.label === 'Grow';
            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isGrow
                    ? `inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_10px_30px_-12px_var(--brand-purple)] transition hover:-translate-y-0.5 ${LINK_HOVER_STYLES[link.label]} hover:text-black`
                    : `inline-flex items-center justify-center rounded-md border border-white/25 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 transition hover:text-white ${LINK_HOVER_STYLES[link.label]}`
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="topbar-mobile-menu"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-opacity duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition-transform duration-200 ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </span>
        </button>
        </div>

        {isMenuOpen ? (
          <nav
            id="topbar-mobile-menu"
            className="pointer-events-auto mt-3 grid gap-2 border-t border-white/15 pt-3 md:hidden"
          >
            {LINKS.map((link) => {
              const isGrow = link.label === 'Grow';
              return (
                <Link
                  key={`mobile-${link.label}`}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    isGrow
                      ? `inline-flex items-center justify-center rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_10px_30px_-12px_var(--brand-purple)] transition hover:-translate-y-0.5 ${LINK_HOVER_STYLES[link.label]} hover:text-black`
                      : `inline-flex items-center justify-center rounded-md border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:text-white ${LINK_HOVER_STYLES[link.label]}`
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
    </motion.header>
  );
}
