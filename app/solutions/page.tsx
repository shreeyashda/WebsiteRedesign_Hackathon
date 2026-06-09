'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import CaseStudiesCarousel from '@/components/CaseStudiesCarousel';
import TopBar from '@/components/TopBar';
import caseStudies from '@/public/case-studies/case-studies.json';
import CaseStudyWebsitePreviewCarousel from '@/components/CaseStudyWebsitePreviewCarousel';
import FooterSection from '@/components/FooterSection';
import { useRef, useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

type SolutionItem = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};

const SOLUTIONS: SolutionItem[] = [
  {
    number: '01',
    title: 'Websites & Web Apps',
    description:
      'Bespoke websites and web applications built for performance, conversion, and scale. From marketing sites to complex SaaS platforms.',
    tags: ['High Performance', 'Conversion Focus'],
  },
  {
    number: '02',
    title: 'Mobile Apps',
    description:
      'Native and cross-platform apps for iOS and Android that your users will actually love.',
    tags: ['iOS + Android', 'Native Feel'],
  },
  {
    number: '03',
    title: 'Ecommerce',
    description: 'High-converting online stores and headless commerce experiences built to grow your revenue.',
    tags: ['Checkout Optimized', 'Headless Ready'],
  },
  {
    number: '04',
    title: 'Data & Analytics',
    description:
      'Turn raw data into actionable insights. Dashboards, reporting pipelines, and analytics infrastructure that drive decisions.',
    tags: ['Live Dashboards', 'Actionable Insights'],
  },
];
const FEATURED_SOLUTION_TYPES = [
  'Content Marketing',
  'Social Media',
  'Paid Advertising',
  'Development',
];

const SOLUTIONS_FAQS = [
  {
    question: 'What digital solutions does Centauri provide?',
    answer:
      'We provide websites and web apps, mobile apps, ecommerce experiences, and analytics systems designed for measurable growth.',
  },
  {
    question: 'How do you decide which solution is right for a business?',
    answer:
      'We start with your goals, current bottlenecks, and timeline, then prioritize the solution stack that can generate the highest short-term and long-term impact.',
  },
  {
    question: 'Can you combine marketing and technical delivery?',
    answer:
      'Yes. We combine strategy, content, media, and product execution so your growth plan and implementation stay aligned.',
  },
  {
    question: 'How quickly can a project start?',
    answer:
      'Most projects can start quickly after scope alignment. We define milestones early so execution begins with clear deliverables and accountability.',
  },
] as const;

const DIGITAL_SOLUTIONS_PALETTE = [
  {
    gradient:
      'from-[color:var(--brand-accent-blue)]/28 via-[color:var(--brand-purple)]/12 to-[color:var(--brand-dark-blue)]/14',
    border: 'group-hover:border-[color:var(--brand-accent-blue)]/65',
  },
  {
    gradient:
      'from-[color:var(--brand-purple)]/26 via-[color:var(--brand-accent-blue)]/12 to-[color:var(--brand-dark-blue)]/16',
    border: 'group-hover:border-[color:var(--brand-purple)]/60',
  },
  {
    gradient:
      'from-[color:var(--brand-dark-blue)]/22 via-[color:var(--brand-accent-blue)]/14 to-[color:var(--brand-purple)]/12',
    border: 'group-hover:border-[color:var(--brand-dark-blue)]/70',
  },
  {
    gradient:
      'from-[color:var(--brand-purple)]/20 via-[color:var(--brand-dark-blue)]/12 to-[color:var(--brand-accent-blue)]/18',
    border: 'group-hover:border-[color:var(--brand-accent-blue)]/55',
  },
] as const;

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-jet-black pt-20 text-pure-white">
      {/* Page logo */}
      <div className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2">
        <div className="w-[clamp(160px,23vw,290px)]">
          <Image
            src="/logo/centauri-solutions.svg"
            alt="Centauri Solutions"
            width={1716}
            height={445}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 84% 62% at 50% 52%, rgba(81,208,212,0.24) 0%, rgba(81,208,212,0.12) 40%, transparent 75%)',
        }}
      />

      {/* Thin grid lines — decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow blob */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(123,97,255,0.12) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="max-w-4xl text-5xl tracking-tight sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Built to{' '}
          <motion.span
            className="inline-block"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            scale.
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-lg text-white/55 sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
        >
          Websites. Apps. Content. Talent. Everything a growing brand needs — in one place.
        </motion.p>

        <motion.div
          className="pointer-events-auto mt-8 mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34 }}
        >
          <a
            href="/funnel"
            className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white hover:shadow-[0_0_0_2px_var(--brand-accent-blue),0_8px_32px_-8px_var(--brand-purple)]"
          >
            Start Growing
          </a>
        </motion.div>
      </div>

    </section>
  );
}

// ─── What We Do ───────────────────────────────────────────────────────────────

function WhatWeDo() {
  return (
    <section className="bg-white py-24 text-black">
      <div className="px-6 md:px-16">
        {/* Header */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-black/35">What We Do</p>
        <h2 className="text-4xl tracking-tight sm:text-6xl md:text-7xl">
          Solutions that scale brands.
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-zinc-700 md:text-base">
          A focused suite of digital capabilities designed to help ambitious brands scale with clarity, consistency,
          and measurable growth.
        </p>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-7">
          {SOLUTIONS.map((s, i) => (
            <motion.article
              key={s.number}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/95 px-7 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-colors duration-300 md:px-8 md:py-7 ${DIGITAL_SOLUTIONS_PALETTE[i % DIGITAL_SOLUTIONS_PALETTE.length].border}`}
              initial={false}
              transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.35) }}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${DIGITAL_SOLUTIONS_PALETTE[i % DIGITAL_SOLUTIONS_PALETTE.length].gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border border-zinc-300/60 bg-white/60 blur-[1px]" />

              <div className="relative z-10 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Solution</p>
                <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-[11px] font-medium text-zinc-600">
                  {s.number}
                </span>
              </div>

              <h3 className="relative z-10 mt-3 text-2xl tracking-tight text-zinc-900">{s.title}</h3>
              <p className="relative z-10 mt-3 mb-6 flex-1 text-sm leading-relaxed text-zinc-600">{s.description}</p>
              <div className="relative z-10 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-300 bg-white/85 px-2.5 py-1 text-xs font-medium text-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionsFaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SOLUTIONS_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-18 text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="px-6 md:px-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-black/35">FAQs</p>
        <h2 className="text-3xl tracking-tight sm:text-5xl">Solutions, answered clearly.</h2>
        <div className="mt-8 space-y-3">
          {SOLUTIONS_FAQS.map((faq, index) => (
            <article key={faq.question} className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <button
                type="button"
                aria-expanded={openIndex === index}
                onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <h3 className="pr-4 text-base font-semibold text-zinc-900">{faq.question}</h3>
                <span className="text-xl leading-none text-zinc-500">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index ? (
                <p className="border-t border-zinc-200 px-5 py-4 text-sm leading-relaxed text-zinc-600">{faq.answer}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section id="grow" className="bg-jet-black py-32 text-pure-white">
      <div className="px-6 text-center md:px-16">
        <motion.h2
          className="mx-auto max-w-2xl text-5xl tracking-tight sm:text-7xl"
          initial={false}
          transition={{ duration: 0.5 }}
        >
          Ready to grow?
        </motion.h2>
        <motion.p
          className="mt-5 text-lg text-white/50"
          initial={false}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Let&apos;s build something that scales.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={false}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <a
            href="/funnel"
            className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white hover:shadow-[0_0_0_2px_var(--brand-accent-blue),0_8px_32px_-8px_var(--brand-purple)]"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Solutions() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const navbarOpacity = useSpring(useTransform(scrollYProgress, [0.06, 0.24], [0, 1]), {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });
  const navbarY = useSpring(useTransform(scrollYProgress, [0.06, 0.24], [-14, 0]), {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  return (
    <div className="relative">
      <TopBar opacity={navbarOpacity} y={navbarY} />
      <div ref={heroRef} className="relative">
        <HeroSection />
      </div>
      <CaseStudyWebsitePreviewCarousel studies={caseStudies} solutionTypes={FEATURED_SOLUTION_TYPES} />
      <CaseStudiesCarousel studies={caseStudies} solutionTypes={FEATURED_SOLUTION_TYPES} />
      <WhatWeDo />
      <CTASection />
      <SolutionsFaqSection />
      <FooterSection />
    </div>
  );
}