'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const MARKETING_STATS = [
  { value: '+300%', label: 'ROI in 3 months' },
  { value: '15k', label: 'New leads generated' },
  { value: '4.5x', label: 'ROAS on Meta ads' },
  { value: '$2.4M', label: 'Pipeline generated' },
];

export default function MarketingSummarySection() {
  return (
    <section id="marketing-summary" className="relative z-20 py-12 text-black md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <h2 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">With Marketing</h2>
          <p className="mt-4 max-w-2xl text-sm text-zinc-700 md:text-base">
            Proven campaign performance designed to convert attention into leads, revenue, and pipeline.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-7 rounded-3xl bg-zinc-900 px-6 py-10 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:px-10"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-white/70">Centauri Media</p>
          <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl md:text-6xl">
            1 billion views and counting
          </h2>
          <p className="mt-4 max-w-3xl text-sm text-zinc-300 md:text-base">
            A high-impact marketing engine built for brands that want visibility, engagement, and measurable
            pipeline outcomes in competitive feeds.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MARKETING_STATS.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6">
                <p className="text-4xl font-bold tracking-tight text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-zinc-300">{stat.label}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-7 sm:flex-row"
        >
          <Link
            href="/funnel"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-dark-blue)] hover:shadow-[0_0_0_1px_var(--brand-accent-blue),0_12px_40px_-12px_var(--brand-purple)]"
          >
            Get marketing growth
          </Link>
          <Link
            href="/marketing"
            className="inline-flex items-center justify-center rounded-md border border-black/30 px-6 py-3 text-sm font-semibold text-black transition hover:border-[color:var(--brand-accent-blue)] hover:text-[color:var(--brand-dark-blue)]"
          >
            Explore Marketing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
