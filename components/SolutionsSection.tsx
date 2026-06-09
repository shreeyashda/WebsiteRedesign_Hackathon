'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import WorkShowcaseStack from '@/components/WorkShowcaseStack';

const SOLUTIONS = [
  {
    title: 'Websites & Web Apps',
    description:
      'Bespoke websites and web applications built for performance, conversion, and scale. From marketing sites to complex SaaS platforms.',
    label: 'Product Experience',
    chips: ['High Performance', 'Conversion Focus'],
    imageSrc: '/images/web.png',
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform apps for iOS and Android that your users will actually love.',
    label: 'Mobile Product',
    chips: ['iOS + Android', 'Native Feel'],
    imageSrc: '/images/mobile.png',
  },
  {
    title: 'Ecommerce',
    description: 'High-converting online stores and headless commerce experiences built to grow your revenue.',
    label: 'Revenue Systems',
    chips: ['Checkout Optimized', 'Headless Ready'],
    imageSrc: '/images/ecom.png',
  },
  {
    title: 'Data & Analytics',
    description:
      'Turn raw data into actionable insights. Dashboards, reporting pipelines, and analytics infrastructure that drive decisions.',
    label: 'Decision Engine',
    chips: ['Live Dashboards', 'Actionable Insights'],
    imageSrc: '/images/data.png',
  },
] as const;

const WORK_EXAMPLES = [
  {
    imageSrc: 'https://www.centauri.org.uk/assets/lys-cafe-CCGyaXzc.png',
    caption: '2024 • Lys Cafe',
    href: 'https://www.lyscafe.co.uk/',
  },
  {
    imageSrc: 'https://www.centauri.org.uk/assets/clean-4u-BzvHpdHt.png',
    caption: '2024 • Clean4U',
    href: 'https://clean4u-three.vercel.app/',
  },
  {
    imageSrc: 'https://www.centauri.org.uk/assets/rich-young-mind-award-D9rJ48ia.png',
    caption: '2026 • Rich Young Minds',
    href: 'https://www.richyoungmindaward.com/',
  },
  {
    imageSrc: 'https://www.centauri.org.uk/assets/ayla-clinic-DErC4GsL.png',
    caption: '2024 • Ayla Wellness',
    href: 'https://www.ayla-wellness.com/',
  },
];

/** Brand palette hover treatments (CSS vars from .home-page) */
const CARD_PALETTE = [
  {
    gradient:
      'from-[color:var(--brand-accent-blue)]/28 via-[color:var(--brand-purple)]/12 to-[color:var(--brand-dark-blue)]/14',
    border:
      'group-hover:border-[color:var(--brand-accent-blue)]/65 group-active:border-[color:var(--brand-accent-blue)]/65 group-focus-within:border-[color:var(--brand-accent-blue)]/65',
    bar: ['bg-[color:var(--brand-accent-blue)]', 'bg-[color:var(--brand-purple)]', 'bg-[color:var(--brand-dark-blue)]'],
  },
  {
    gradient:
      'from-[color:var(--brand-purple)]/26 via-[color:var(--brand-accent-blue)]/12 to-[color:var(--brand-dark-blue)]/16',
    border:
      'group-hover:border-[color:var(--brand-purple)]/60 group-active:border-[color:var(--brand-purple)]/60 group-focus-within:border-[color:var(--brand-purple)]/60',
    bar: ['bg-[color:var(--brand-purple)]', 'bg-[color:var(--brand-accent-blue)]', 'bg-[color:var(--brand-dark-blue)]'],
  },
  {
    gradient:
      'from-[color:var(--brand-dark-blue)]/22 via-[color:var(--brand-accent-blue)]/14 to-[color:var(--brand-purple)]/12',
    border:
      'group-hover:border-[color:var(--brand-dark-blue)]/70 group-active:border-[color:var(--brand-dark-blue)]/70 group-focus-within:border-[color:var(--brand-dark-blue)]/70',
    bar: ['bg-[color:var(--brand-dark-blue)]', 'bg-[color:var(--brand-accent-blue)]', 'bg-[color:var(--brand-purple)]'],
  },
  {
    gradient:
      'from-[color:var(--brand-purple)]/20 via-[color:var(--brand-dark-blue)]/12 to-[color:var(--brand-accent-blue)]/18',
    border:
      'group-hover:border-[color:var(--brand-accent-blue)]/55 group-active:border-[color:var(--brand-accent-blue)]/55 group-focus-within:border-[color:var(--brand-accent-blue)]/55',
    bar: ['bg-[color:var(--brand-purple)]', 'bg-[color:var(--brand-dark-blue)]', 'bg-[color:var(--brand-accent-blue)]'],
  },
] as const;

const ROW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type SolutionItem = (typeof SOLUTIONS)[number];

function SolutionRow({ item, idx }: { item: SolutionItem; idx: number }) {
  const palette = CARD_PALETTE[idx % CARD_PALETTE.length];
  /** Even index: copy left, image right. Odd: image left, copy right. */
  const imageOnRight = idx % 2 === 0;

  const textFromX = imageOnRight ? -36 : 36;
  const imageFromX = imageOnRight ? 36 : -36;

  const textColOrder = imageOnRight ? 'order-1 md:order-1' : 'order-1 md:order-2';
  const imageColOrder = imageOnRight ? 'order-2 md:order-2' : 'order-2 md:order-1';

  // md+: strict 50/50 — Tailwind `grid-cols-2` is repeat(2, minmax(0, 1fr)).
  return (
    <article className="grid min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
      <motion.div
        initial={{ opacity: 0, x: textFromX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.55, ease: ROW_EASE, delay: idx * 0.04 }}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ y: -4, scale: 1.01 }}
        className={`${textColOrder} flex h-full min-h-0 min-w-0 flex-col`}
      >
        <div
          className={`group relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/95 px-7 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-colors duration-300 md:px-8 md:py-7 ${palette.border}`}
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${palette.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100`}
          />
          <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border border-zinc-300/60 bg-white/60 blur-[1px]" />

          <div className="relative z-10 flex shrink-0 items-center justify-between gap-3">
            <p className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{item.label}</p>
            <span className="shrink-0 rounded-full border border-zinc-300 bg-white px-3 py-1 text-[11px] font-medium text-zinc-600">
              0{idx + 1}
            </span>
          </div>

          <h3 className="relative z-10 mt-3 shrink-0 text-2xl tracking-tight text-zinc-900">{item.title}</h3>

          <div className="relative z-10 mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <p className="text-sm leading-relaxed text-zinc-600">{item.description}</p>
          </div>

          <div className="relative z-10 mt-4 flex w-full min-w-0 shrink-0 flex-col gap-4 pt-1">
            <div className="flex w-full min-w-0 flex-wrap gap-2">
              {item.chips.map((chip) => (
                <span
                  key={chip}
                  className="max-w-full break-words rounded-md border border-zinc-300 bg-white/85 px-2.5 py-1 text-xs font-medium text-zinc-700"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="grid w-full min-w-0 grid-cols-3 gap-2">
              {palette.bar.map((barClass, barIdx) => (
                <div
                  key={`${barClass}-${barIdx}`}
                  className={`min-w-0 h-1.5 rounded-full opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100 ${barClass}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: imageFromX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, ease: ROW_EASE, delay: idx * 0.04 + 0.08 }}
        className={`${imageColOrder} flex h-full min-h-0 min-w-0 flex-col`}
      >
        <div className="flex h-full min-h-[min(56vw,17rem)] w-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-white p-3 sm:min-h-[min(52vw,18rem)] sm:p-4 md:min-h-0">
          <div className="flex min-h-[12rem] flex-1 items-center justify-center md:min-h-0">
            <Image
              src={item.imageSrc}
              alt={`${item.title} illustration`}
              width={960}
              height={720}
              className="h-full w-full max-h-full max-w-full object-contain object-center"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={idx === 0}
            />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export default function SolutionsSection() {
  return (
    <section id="solutions" className="relative z-20 py-12 text-black md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <h2 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">With Digital Solutions</h2>
          <p className="mt-4 max-w-2xl text-sm text-zinc-700 md:text-base">
            A focused suite of digital capabilities designed to help ambitious brands scale with clarity,
            consistency, and measurable growth.
          </p>
        </motion.div>

        <div className="relative mt-8 flex flex-col gap-10 md:mt-12 md:gap-12">
          {SOLUTIONS.map((item, idx) => (
            <SolutionRow key={item.title} item={item} idx={idx} />
          ))}
        </div>

        <WorkShowcaseStack items={WORK_EXAMPLES} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/funnel"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-dark-blue)] hover:shadow-[0_0_0_1px_var(--brand-accent-blue),0_12px_40px_-12px_var(--brand-purple)]"
          >
            Start your journey
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center rounded-md border border-black/30 px-6 py-3 text-sm font-semibold text-black transition hover:border-[color:var(--brand-accent-blue)] hover:text-[color:var(--brand-dark-blue)]"
          >
            Explore solutions
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
