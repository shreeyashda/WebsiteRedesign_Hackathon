'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import CaseStudyCard, { CaseStudyItem } from '@/components/CaseStudyCard';

type Props = {
  studies: CaseStudyItem[];
  solutionTypes?: string[];
};

export default function CaseStudiesCarousel({ studies, solutionTypes }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudyItem | null>(null);

  const filteredStudies = useMemo(() => {
    if (!solutionTypes || solutionTypes.length === 0) return studies;
    const allowedTypes = new Set(solutionTypes);
    return studies.filter((study) => allowedTypes.has(study['solution-type']));
  }, [studies, solutionTypes]);
  const safeActiveIndex = Math.min(activeIndex, Math.max(filteredStudies.length - 1, 0));

  function scrollTo(index: number) {
    const total = filteredStudies.length;
    if (total === 0) return;
    const clamped = Math.max(0, Math.min(index, total - 1));
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>('[data-case-study-card]')[clamped];
    if (card) {
      const targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    }
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track || filteredStudies.length === 0) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-case-study-card]'));
    if (cards.length === 0) return;

    const trackMid = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardMid = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardMid - trackMid);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    if (nearest !== safeActiveIndex) {
      setActiveIndex(nearest);
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedStudy(null);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section className="overflow-hidden bg-black py-24 text-white">
      <div className="px-6 md:px-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/40">Case Studies</p>
        <h2 className="heading-bold text-4xl sm:text-6xl md:text-7xl">Growth outcomes, broken down.</h2>
        <p className="mt-3 max-w-2xl text-sm text-white/55">
          From strategy to execution, each story shows what we built, why it worked, and the measurable impact.
        </p>
      </div>

      {filteredStudies.length === 0 ? (
        <div className="px-6 pt-12 text-sm text-white/60 md:px-16">No stories available.</div>
      ) : (
        <>
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="mt-12 flex gap-4 overflow-x-auto px-4 pb-6 md:gap-5 md:px-10 lg:gap-6 lg:px-14"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="w-[calc(50vw-10rem)] shrink-0 sm:w-[calc(50vw-14rem)]" />
            {filteredStudies.map((study, index) => (
              <div
                key={`${study.company}-${study.industry}-${study['solution-type']}`}
                data-case-study-card
                className={`shrink-0 transition-all duration-300 ease-out ${
                  index === safeActiveIndex
                    ? 'z-10 scale-100 opacity-100'
                    : 'z-0 scale-[0.94] opacity-55 saturate-75'
                }`}
                aria-current={index === safeActiveIndex ? 'true' : undefined}
                style={{ scrollSnapAlign: 'center' }}
              >
                <CaseStudyCard study={study} index={index} onClick={() => setSelectedStudy(study)} />
              </div>
            ))}
            <div className="w-[calc(50vw-10rem)] shrink-0 sm:w-[calc(50vw-14rem)]" />
          </div>

          <div className="mt-8 flex items-center justify-between px-6 md:px-16">
            <div className="flex gap-1.5">
              {filteredStudies.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to story ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === safeActiveIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/25'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => scrollTo(safeActiveIndex - 1)}
                disabled={safeActiveIndex === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/50 hover:text-white disabled:opacity-25"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => scrollTo(safeActiveIndex + 1)}
                disabled={safeActiveIndex === filteredStudies.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/50 hover:text-white disabled:opacity-25"
              >
                →
              </button>
            </div>
          </div>
        </>
      )}

      {selectedStudy ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 md:p-8"
          onClick={() => setSelectedStudy(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedStudy.company} case study details`}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0f1013] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close case study details"
              onClick={() => setSelectedStudy(null)}
              className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white/90 transition hover:border-white/45 hover:text-white"
            >
              ×
            </button>

            {selectedStudy.heroImage ? (
              <div className="relative mb-6 aspect-[16/8] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <Image
                  src={selectedStudy.heroImage}
                  alt={`${selectedStudy.company} case study`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1000px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75">
                {selectedStudy.industry}
              </span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75">
                {selectedStudy['solution-type']}
              </span>
            </div>

            <h3 className="heading-bold text-3xl tracking-tight sm:text-4xl">{selectedStudy.company}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {selectedStudy.fullDescription?.trim() || selectedStudy.overview}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Challenge</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {selectedStudy.challenge?.trim() || 'Challenge details coming soon.'}
                </p>
              </section>
              <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Solution</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {selectedStudy.solution?.trim() || 'Solution details coming soon.'}
                </p>
              </section>
            </div>

            {selectedStudy.metrics.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedStudy.metrics.map((metric) => (
                  <span
                    key={`${selectedStudy.company}-${metric.label}-${metric.value}`}
                    className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/85"
                  >
                    <strong className="font-semibold text-white">{metric.value}</strong>{' '}
                    <span className="text-white/70">{metric.label}</span>
                  </span>
                ))}
              </div>
            ) : null}

            {selectedStudy.website ? (
              <a
                href={selectedStudy.website}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                Visit Website
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
