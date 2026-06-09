'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import caseStudies from '@/public/case-studies/case-studies.json';

import FooterSection from '@/components/FooterSection';
import TopBar from '@/components/TopBar';
import { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

type MarketingCaseStudy = {
  name: string;
  category: string;
  description: string;
  image: string;
  stat: { value: string; label: string } | null;
  fullDescription: string;
  challenge: string;
  solution: string;
};

const MARKETING_CASE_STUDY_SLUGS = ['rizq-pure', 'cake-inn', 'case-studies-somalinimo-uk-birmingham'] as const;

const CASE_STUDIES: MarketingCaseStudy[] = MARKETING_CASE_STUDY_SLUGS.map((slug) => {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) {
    return {
      name: slug,
      category: 'Case Study',
      description: 'Case study details are being prepared.',
      image: '/case-studies/rizq-pure.png',
      stat: null,
      fullDescription: '',
      challenge: '',
      solution: '',
    };
  }

  return {
    name: study.company.trim(),
    category: study['solution-type'],
    description: study.overview,
    image: study.heroImage || '/case-studies/rizq-pure.png',
    stat: study.metrics[0] ?? null,
    fullDescription: study.fullDescription || study.overview,
    challenge: study.challenge || '',
    solution: study.solution || '',
  };
});

const CAMPAIGNS = [
  {
    title: 'Creator Summit 2024',
    description: '500+ creators connected with 50+ brands in a single weekend.',
    metrics: ['500+ Attendees', '50+ Brand Partners', '200+ Deals Closed'],
    impact: '$2M+ in creator earnings',
  },
  {
    title: 'Viral Video Challenge',
    description: 'Multi-platform campaign generating 100M+ views across TikTok and Instagram.',
    metrics: ['100M+ Views', '50+ Creators', '30-Day Campaign'],
    impact: '25M new followers gained',
  },
  {
    title: 'Brand Partnership Program',
    description: 'Connecting emerging creators with premium brands for authentic collaborations.',
    metrics: ['100+ Creators', '25+ Brands', 'Ongoing Program'],
    impact: '$5M+ in partnerships',
  },
];

const MARKETING_STATS = [
  { value: '+300%', label: 'ROI in 3 months' },
  { value: '15k', label: 'New leads generated' },
  { value: '4.5x', label: 'ROAS on Meta ads' },
  { value: '$2.4M', label: 'Pipeline generated' },
];

const BY_THE_NUMBERS = [
  { value: '500+', label: 'Creators Scaled' },
  { value: '10M+', label: 'Followers Gained' },
  { value: '$25M+', label: 'Creator Earnings' },
  { value: '100+', label: 'Brand Partners' },
];

const VIDEOS = [
  {
    handle: '@dairykinguk',
    videoId: '7599009327290092822',
    caption: 'Fresh content that keeps audiences craving more.',
    likes: '69.4K',
    comments: '1.2K',
    shares: '602',
    saves: '1.1K',
  },
  {
    handle: '@dairykinguk',
    videoId: '7573776001054805270',
    caption: 'High-retention food creatives built for scale.',
    likes: '44.5K',
    comments: '896',
    shares: '411',
    saves: '738',
  },
  {
    handle: '@umrahsupermarket',
    videoId: '7577459880261324034',
    caption: 'Community-first campaign with strong organic pull.',
    likes: '84.3K',
    comments: '2.4K',
    shares: '1.5K',
    saves: '1.9K',
  },
  {
    handle: '@beautychoice.uk',
    videoId: '7570422561436142870',
    caption: 'Beauty storytelling that drives repeat viewers.',
    likes: '34.9K',
    comments: '542',
    shares: '284',
    saves: '503',
  },
];
const VIDEO_FEED = Array.from({ length: 8 }, (_, idx) => ({
  ...VIDEOS[idx % VIDEOS.length],
  key: `${VIDEOS[idx % VIDEOS.length].videoId}-${idx}`,
}));

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MARKETING_FAQS = [
  {
    question: 'What marketing services does Centauri provide?',
    answer:
      'We provide integrated content marketing, social media execution, and paid advertising focused on measurable growth outcomes.',
  },
  {
    question: 'Do you handle strategy and execution together?',
    answer:
      'Yes. We align strategy, creative production, distribution, and reporting so performance feedback improves each campaign cycle.',
  },
  {
    question: 'What metrics do you optimize for?',
    answer:
      'We optimize for qualified reach, engagement quality, lead volume, conversion performance, and return on ad spend based on your goals.',
  },
  {
    question: 'How quickly can we get started?',
    answer:
      'After scope alignment, we define a practical launch plan and begin execution with clear milestones and reporting expectations.',
  },
] as const;

export default function Marketing() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<MarketingCaseStudy | null>(null);
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
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MARKETING_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedCaseStudy(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <TopBar opacity={navbarOpacity} y={navbarY} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col overflow-hidden bg-jet-black pt-20 text-pure-white"
      >
        {/* Page logo */}
        <div className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2">
          <div className="w-[clamp(160px,23vw,290px)]">
            <Image
              src="/logo/centauri-marketing.svg"
              alt="Centauri Marketing"
              width={1709}
              height={473}
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
              'radial-gradient(ellipse 84% 62% at 50% 52%, rgba(134,81,212,0.24) 0%, rgba(134,81,212,0.12) 40%, transparent 75%)',
          }}
        />

        {/* Thin grid lines */}
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

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.h1
            className="max-w-4xl text-5xl tracking-tight sm:text-7xl md:text-8xl"
            initial={{ opacity: 0, y: 18 }}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            Real creators. Real growth. Real numbers.
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

      {/* All content below hero */}
      <div className="relative z-20">
        {/* Stats Summary — matches MarketingSummarySection */}
        <section className="relative z-20 bg-white py-12 text-black md:py-14">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-3xl bg-zinc-900 px-6 py-10 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] md:px-10"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">Centauri Media</p>
              <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl md:text-6xl">
                1 billion views and counting
              </h2>
              <p className="mt-4 max-w-3xl text-sm text-zinc-300 md:text-base">
                We create a massive gravitational pull in a noisy, boring, and plain feed. A
                high-impact marketing engine built for brands that want visibility, engagement, and
                measurable pipeline outcomes.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MARKETING_STATS.map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6"
                  >
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
              className="mt-8 flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row"
            >
              <Link
                href="/funnel"
                className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-dark-blue)] hover:shadow-[0_0_0_1px_var(--brand-accent-blue),0_12px_40px_-12px_var(--brand-purple)]"
              >
                Get started
              </Link>
              <Link
                href="#case-studies"
                className="inline-flex items-center justify-center rounded-md border border-black/30 px-6 py-3 text-sm font-semibold text-black transition hover:border-[color:var(--brand-accent-blue)] hover:text-[color:var(--brand-dark-blue)]"
              >
                See proof in case studies
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Video Showcase */}
        <section className="relative z-20 bg-jet-black py-10 text-pure-white md:py-12">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                The Feed
              </p>
              <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl md:text-6xl">
                We Go Viral.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-10 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex snap-x snap-mandatory gap-4 pr-6 lg:gap-6">
                {VIDEO_FEED.map((video) => (
                  <VideoCard key={video.key} handle={video.handle} videoId={video.videoId} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="relative z-20 bg-white py-10 text-black md:py-14">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Case Studies
              </p>
              <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl md:text-6xl">
                Proof in the work
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-zinc-700 md:text-base">
                Real results from real partnerships. Each campaign designed to move the needle on
                reach, engagement, and revenue.
              </p>
            </motion.div>

            <div className="mt-10 flex flex-col gap-8 md:gap-10">
              {CASE_STUDIES.map((study, idx) => (
                <CaseStudyRow key={idx} study={study} idx={idx} onOpen={() => setSelectedCaseStudy(study)} />
              ))}
            </div>
          </div>
        </section>

        {/* Campaign Showcase */}
        <section className="relative z-20 bg-jet-black py-10 text-pure-white md:py-14">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <h2 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">
                Campaign Showcase
              </h2>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {CAMPAIGNS.map((campaign, idx) => (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: EASE, delay: idx * 0.06 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group flex flex-col rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_8px_22px_rgba(0,0,0,0.2)] transition-colors duration-300 md:p-7"
                >
                  <div className="flex-grow">
                    <h3 className="text-2xl tracking-tight text-white">{campaign.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                      {campaign.description}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-b border-white/15 pb-5">
                      {campaign.metrics.map((metric, mIdx) => (
                        <li key={mIdx} className="flex items-start text-sm text-zinc-200">
                          <span className="mr-2.5 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-accent-blue)]" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      Impact
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                      {campaign.impact}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* By the Numbers */}
        <section className="relative z-20 bg-white py-10 text-black md:py-14">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <h2 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">By the Numbers</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
            >
              {BY_THE_NUMBERS.map((item, idx) => (
                <article
                  key={idx}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50/95 px-5 py-6 text-center shadow-[0_8px_22px_rgba(0,0,0,0.05)]"
                >
                  <p className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm text-zinc-600">{item.label}</p>
                </article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-20 bg-jet-black py-10 text-pure-white md:py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <h2 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">
                Be the Next Success Story
              </h2>
              <p className="mt-4 text-sm text-zinc-300 md:text-base">Your growth starts here.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/funnel"
                className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-dark-blue)] hover:shadow-[0_0_0_1px_var(--brand-accent-blue),0_12px_40px_-12px_var(--brand-purple)]"
              >
                Start growing
              </Link>
              <Link
                href="#case-studies"
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[color:var(--brand-accent-blue)] hover:text-white"
              >
                View case studies
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="relative z-20 bg-white py-12 text-black md:py-14">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">FAQs</p>
            <h2 className="mt-3 text-4xl tracking-tight sm:text-5xl md:text-6xl">Marketing, answered clearly.</h2>
            <div className="mt-8 space-y-3">
              {MARKETING_FAQS.map((faq, index) => (
                <article key={faq.question} className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                  <button
                    type="button"
                    aria-expanded={openFaqIndex === index}
                    onClick={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <h3 className="pr-4 text-base font-semibold text-zinc-900">{faq.question}</h3>
                    <span className="text-xl leading-none text-zinc-500">{openFaqIndex === index ? '−' : '+'}</span>
                  </button>
                  {openFaqIndex === index ? (
                    <p className="border-t border-zinc-200 px-5 py-4 text-sm leading-relaxed text-zinc-600">
                      {faq.answer}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedCaseStudy ? (
          <div
            className="fixed inset-0 z-[120] flex items-start justify-center bg-black/75 p-4 pt-24 md:p-8 md:pt-28"
            onClick={() => setSelectedCaseStudy(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedCaseStudy.name} case study details`}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0f1013] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close case study details"
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/90 transition hover:border-white/45 hover:text-white"
              >
                ×
              </button>

              <div className="relative mb-6 aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <Image
                  src={selectedCaseStudy.image}
                  alt={`${selectedCaseStudy.name} case study`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1000px"
                  className="object-cover"
                />
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75">
                  {selectedCaseStudy.category}
                </span>
              </div>
              <h3 className="heading-bold text-3xl tracking-tight sm:text-4xl">{selectedCaseStudy.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{selectedCaseStudy.fullDescription}</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Challenge</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {selectedCaseStudy.challenge || 'Challenge details coming soon.'}
                  </p>
                </section>
                <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Solution</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {selectedCaseStudy.solution || 'Solution details coming soon.'}
                  </p>
                </section>
              </div>

              {selectedCaseStudy.stat ? (
                <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                  <strong className="text-2xl text-white">{selectedCaseStudy.stat.value}</strong>
                  <span className="text-sm text-white/70">{selectedCaseStudy.stat.label}</span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <FooterSection />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Case Study Row — alternating layout matching SolutionsSection style */
/* ------------------------------------------------------------------ */

function CaseStudyRow({
  study,
  idx,
  onOpen,
}: {
  study: MarketingCaseStudy;
  idx: number;
  onOpen: () => void;
}) {
  const imageOnRight = idx % 2 === 0;
  const textFromX = imageOnRight ? -36 : 36;
  const imageFromX = imageOnRight ? 36 : -36;
  const textColOrder = imageOnRight ? 'order-1 md:order-1' : 'order-1 md:order-2';
  const imageColOrder = imageOnRight ? 'order-2 md:order-2' : 'order-2 md:order-1';

  return (
    <article className="grid min-w-0 grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
      {/* Text card */}
      <motion.div
        initial={{ opacity: 0, x: textFromX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.55, ease: EASE, delay: idx * 0.04 }}
        className={`${textColOrder} flex h-full min-h-0 min-w-0 flex-col`}
      >
        <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/95 px-7 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)] md:px-8 md:py-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {study.category}
          </p>
          <h3 className="mt-3 text-2xl tracking-tight text-zinc-900">Project Overview</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">{study.description}</p>

          {study.stat && (
            <div className="mt-5 flex items-center gap-5 border-t border-zinc-200 pt-5">
              <p className="text-4xl font-bold tracking-tight text-zinc-900">{study.stat.value}</p>
              <span className="text-sm text-zinc-500">{study.stat.label}</span>
            </div>
          )}

          <div className="mt-5">
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-dark-blue)] hover:shadow-[0_0_0_1px_var(--brand-accent-blue),0_12px_40px_-12px_var(--brand-purple)]"
            >
              Read full case
            </button>
          </div>
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: imageFromX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, ease: EASE, delay: idx * 0.04 + 0.08 }}
        className={`${imageColOrder} flex h-full min-h-0 min-w-0 flex-col`}
      >
        <div className="flex h-full min-h-[min(56vw,17rem)] w-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl sm:min-h-[min(52vw,18rem)] md:min-h-0">
          <div className="relative flex min-h-[14rem] flex-1 items-center justify-center md:min-h-0">
            <Image
              src={study.image}
              alt={`${study.category} case study`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={idx === 0}
            />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Video Card — matching home page card system                         */
/* ------------------------------------------------------------------ */

function VideoCard({
  handle,
  videoId,
}: {
  handle: string;
  videoId: string;
}) {
  const embedSrc = `https://www.tiktok.com/player/v1/${videoId}?autoplay=1&mute=1&loop=1`;

  return (
    <article className="group relative aspect-[9/16] w-[min(72vw,240px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-900 shadow-[0_10px_28px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-[1.015] sm:w-[min(45vw,255px)] lg:w-[230px]">
      <iframe
        src={embedSrc}
        title={`TikTok video from ${handle}`}
        className="h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        loading="lazy"
        allowFullScreen
      />
    </article>
  );
}
