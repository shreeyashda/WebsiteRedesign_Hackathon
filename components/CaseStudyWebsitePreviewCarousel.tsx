'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CaseStudyItem } from '@/components/CaseStudyCard';

type Props = {
  studies: CaseStudyItem[];
  solutionTypes?: string[];
};

function safeHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** Slug → `public/case-studies/site-previews/{slug}.png` (non-alphanumeric → `_`). */
function sitePreviewSrc(slug: string | null | undefined): string | null {
  const safe = String(slug ?? '')
    .trim()
    .replace(/[^a-zA-Z0-9-_]/g, '_');
  return safe ? `/case-studies/site-previews/${safe}.png` : null;
}

function PreviewSlide({
  company,
  website,
  slug,
  loadMedia,
  eagerLoad,
}: {
  company: string;
  website: string;
  slug?: string | null;
  loadMedia: boolean;
  eagerLoad: boolean;
}) {
  const [imgReady, setImgReady] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const hostname = safeHostname(website);
  const favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`;
  const previewSrc = sitePreviewSrc(slug);

  useEffect(() => {
    if (!loadMedia) {
      setImgReady(false);
      setImgFailed(false);
    }
  }, [loadMedia]);

  useEffect(() => {
    setImgReady(false);
    setImgFailed(false);
  }, [slug]);

  useEffect(() => {
    if (!loadMedia || !previewSrc) return;
    const img = imgRef.current;
    if (!img) return;
    // Handles cached images where onLoad may fire before React subscribes.
    if (img.complete) {
      setImgReady(img.naturalWidth > 0);
      setImgFailed(img.naturalWidth === 0);
    }
  }, [loadMedia, previewSrc]);

  const showImage = previewSrc && !imgFailed;

  return (
    <article
      data-preview-slide
      className="w-[min(92vw,52rem)] shrink-0 cursor-pointer"
      style={{ scrollSnapAlign: 'center' }}
      onClick={() => {
        window.location.href = website;
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          window.location.href = website;
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`Open ${company} website`}
    >
      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-none">
        <div className="flex items-center gap-2 border-b border-white/[0.08] bg-black px-3 py-2.5">
          <span aria-hidden className="flex gap-1.5 pl-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-black/45 px-3 py-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={favicon} alt="" width={16} height={16} className="h-4 w-4 shrink-0 opacity-80" />
            <span className="truncate text-[11px] tracking-wide text-white/45">{hostname}</span>
          </div>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="shrink-0 rounded-lg border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white/70 transition hover:border-white/35 hover:text-white"
          >
            Open
          </a>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={previewSrc!}
              alt={`${company} website screenshot`}
              className="h-full w-full object-cover object-top"
              loading={eagerLoad ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setImgReady(true)}
              onError={() => {
                setImgFailed(true);
                setImgReady(false);
              }}
            />
          ) : null}

          {(!previewSrc || imgFailed) ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/85 px-6 text-center">
              <p className="text-sm text-black/55">
                {!previewSrc
                  ? 'Add a slug to map this card to a PNG in site-previews.'
                  : 'Screenshot not found or failed to load.'}
              </p>
              <p className="text-xs text-black/45">
                Add a matching PNG under{' '}
                <span className="text-black/60">public/case-studies/site-previews/</span> (same rules as the slug).
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-medium text-black/65">{company}</p>
    </article>
  );
}

export default function CaseStudyWebsitePreviewCarousel({ studies, solutionTypes }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredStudies = useMemo(() => {
    let list = studies;
    if (solutionTypes && solutionTypes.length > 0) {
      const allowed = new Set(solutionTypes);
      list = studies.filter((s) => allowed.has(s['solution-type']));
    }
    return list.filter((s) => (s.website ?? '').trim().length > 0);
  }, [studies, solutionTypes]);

  function scrollTo(index: number) {
    const total = filteredStudies.length;
    if (total === 0) return;
    const clamped = Math.max(0, Math.min(index, total - 1));
    setActiveIndex(clamped);
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll<HTMLElement>('[data-preview-slide]');
    slides[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  useEffect(() => {
    setActiveIndex(0);
    const track = trackRef.current;
    if (!track) return;
    const firstSlide = track.querySelector<HTMLElement>('[data-preview-slide]');
    if (firstSlide) {
      requestAnimationFrame(() => {
        firstSlide.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
      });
    }
  }, [filteredStudies.length]);

  useEffect(() => {
    const track = trackRef.current;
    const total = filteredStudies.length;
    if (!track || total === 0) return;
    const el = track;

    function onScroll() {
      const slides = Array.from(el.querySelectorAll<HTMLElement>('[data-preview-slide]'));
      if (slides.length === 0) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((child, i) => {
        const c = child.offsetLeft + child.offsetWidth / 2;
        const d = Math.abs(c - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIndex(Math.max(0, Math.min(best, total - 1)));
    }

    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [filteredStudies.length]);

  if (filteredStudies.length === 0) return null;

  return (
    <section className="border-t border-black/10 bg-white py-20 text-black">
      <div className="px-6 md:px-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-black/40">Web Presence</p>
        <h2 className="text-3xl tracking-tight sm:text-5xl md:text-6xl">Live sites we&apos;ve built and scaled.</h2>
        <p className="mt-3 max-w-xl text-sm text-black/55">
          Real screenshots from active client websites. Explore each brand&apos;s digital experience in the wild.
        </p>
      </div>

      <div
        ref={trackRef}
        className="mt-10 flex gap-6 overflow-x-auto px-4 pb-4 md:gap-8 md:px-10 [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div
          className="shrink-0"
          style={{ width: 'calc((100vw - min(92vw, 52rem)) / 2)' }}
          aria-hidden
        />
        {filteredStudies.map((study, index) => {
          const url = (study.website ?? '').trim();
          return (
            <PreviewSlide
              key={`${study.slug ?? study.company}-web-${url}`}
              company={study.company.trim()}
              website={url}
              slug={study.slug}
              loadMedia
              eagerLoad={index === activeIndex}
            />
          );
        })}
        <div
          className="shrink-0"
          style={{ width: 'calc((100vw - min(92vw, 52rem)) / 2)' }}
          aria-hidden
        />
      </div>

      <div className="mt-8 flex items-center justify-between px-6 md:px-16">
        <div className="flex flex-wrap gap-1.5">
          {filteredStudies.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to site preview ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-black' : 'w-1.5 bg-black/25'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Previous preview"
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black/60 transition hover:border-black/50 hover:text-black disabled:opacity-25"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next preview"
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === filteredStudies.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black/60 transition hover:border-black/50 hover:text-black disabled:opacity-25"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
