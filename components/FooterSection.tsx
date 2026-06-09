'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const SERVICES_LINKS = [
  { href: '/marketing', label: 'Marketing' },
  { href: '/solutions', label: 'Tech Solutions' },
  { href: '/funnel', label: 'Start Growing' },
];

const COMPANY_LINKS = [
  { href: '/#why-us', label: 'About Us' },
  { href: '/marketing#case-studies', label: 'Case Studies' },
];

export default function FooterSection() {
  return (
    <footer className="relative z-20 border-t border-zinc-300 bg-zinc-200 text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Link href="/" className="font-brand-heading text-base tracking-[0.3em] text-zinc-900">
              CENTAURI
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-600">
              We build experiences that translate digitally. From first click to final sale, we engineer
              growth for forward-thinking brands.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.06, opacity: 0.88 }}
                href="https://www.tiktok.com/@centaurimedia_"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-700 transition hover:text-zinc-900"
              >
                <svg className="h-4 w-4 block" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.06, opacity: 0.88 }}
                href="https://www.linkedin.com/company/centauri-media-ltd/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-700 transition hover:text-zinc-900"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M6.94 8.5H3.56V19h3.38V8.5ZM5.25 7.03a1.97 1.97 0 1 0 0-3.94 1.97 1.97 0 0 0 0 3.94ZM20.44 19h-3.38v-5.13c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V19H9.02V8.5h3.24v1.43h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.25 4.06 5.18V19Z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.06, opacity: 0.88 }}
                href="https://www.instagram.com/centauri.media/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-zinc-700 transition hover:text-zinc-900"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Zm4.85-2.25a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
                </svg>
              </motion.a>
            </div>

            <div className="mt-7 space-y-3 text-sm text-zinc-600">
              <a
                href="mailto:info@centauri.org.uk"
                className="inline-flex items-center gap-2 transition hover:text-zinc-900"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500" fill="none" aria-hidden="true">
                  <path d="M3 6.75h18v10.5H3z" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m4 8 8 6 8-6" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                info@centauri.org.uk
              </a>
              <p className="inline-flex items-start gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                <span>
                  Remote-first team
                  <br />
                  Serving clients worldwide
                </span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.22em] text-zinc-900">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-500 transition hover:text-zinc-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.22em] text-zinc-900">Company</h3>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-500 transition hover:text-zinc-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h3 className="text-2xl tracking-tight text-zinc-900">Stay ahead of the curve</h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Get the latest marketing insights and strategies delivered to your inbox weekly.
            </p>
            <Link
              href="/funnel"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-dark-blue)] hover:shadow-[0_0_0_1px_var(--brand-accent-blue),0_10px_36px_-10px_var(--brand-purple)]"
            >
              Get in touch &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-200 pt-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Centauri Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
