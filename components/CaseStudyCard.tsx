'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudyItem = {
  company: string;
  industry: string;
  'solution-type': string;
  overview: string;
  metrics: CaseStudyMetric[];
  slug?: string;
  heroImage?: string | null;
  website?: string | null;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
};

type Props = {
  study: CaseStudyItem;
  index: number;
  onClick?: () => void;
};

export default function CaseStudyCard({ study, index, onClick }: Props) {
  const metrics = study.metrics.length ? study.metrics : [{ label: 'Status', value: 'Active' }];
  const company = study.company.trim() || 'Unnamed Company';
  const overview = study.overview?.trim() || 'No overview provided for this case study yet.';
  const heroSrc = study.heroImage?.trim();

  return (
    <motion.article
      className={`group relative flex w-80 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-dark-grey sm:w-[28rem] ${
        onClick ? 'cursor-pointer' : ''
      }`}
      initial={false}
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.28)' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Open ${company} case study details` : undefined}
    >
      {/* Subtle accent glow for depth without overpowering text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at 20% 0%, rgba(123,97,255,0.14), transparent 45%)',
        }}
      />

      {heroSrc ? (
        <div className="relative z-[1] aspect-[16/10] w-full shrink-0 bg-black/40">
          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]">
            <Image
              src={heroSrc}
              alt={`${company} case study`}
              fill
              unoptimized
              sizes="(max-width: 640px) 320px, 448px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-px -top-px bg-gradient-to-t from-dark-grey via-dark-grey/20 to-transparent"
            />
          </div>
        </div>
      ) : null}

      <div className="relative z-[1] -mt-px flex flex-1 flex-col p-7">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
            {study.industry}
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
            {study['solution-type']}
          </span>
        </div>

        <h3 className="heading-bold text-3xl tracking-tight">{company}</h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/65">{overview}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <span
              key={`${study.company}-${metric.label}-${metric.value}`}
              className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors group-hover:border-white/25 group-hover:bg-white/[0.08]"
            >
              <strong className="font-semibold text-white">{metric.value}</strong>{' '}
              <span className="text-white/70">{metric.label}</span>
            </span>
          ))}
        </div>

        {onClick ? (
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/65 transition-colors group-hover:text-white">
            <span>View full case study</span>
            <span aria-hidden className="text-sm leading-none">↗</span>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
