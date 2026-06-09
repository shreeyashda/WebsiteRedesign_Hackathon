'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState, type CSSProperties } from 'react';

export type WorkExample = {
  imageSrc: string;
  caption: string;
  /** Live project URL (opens in a new tab) */
  href: string;
};

/** Hard cap (px) */
const CARD_MAX_PX = 380;

/**
 * Single width rule (inline CSS avoids Tailwind arbitrary/cascade bugs with w-full).
 * Scales on narrow viewports, never exceeds CARD_MAX_PX, never wider than parent.
 */
const cardWidthStyle = (): CSSProperties => ({
  width: `min(92vw, ${CARD_MAX_PX}px)`,
  maxWidth: '100%',
});

/** next/image hint: card is at most CARD_MAX_PX wide */
const IMAGE_SIZES = `(max-width: 480px) 92vw, ${CARD_MAX_PX}px`;

function WorkCard({ item }: { item: WorkExample }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      className="block w-full max-w-full overflow-hidden rounded-xl bg-white shadow-[0_12px_32px_-18px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.07] transition hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)] hover:ring-[color:var(--brand-accent-blue)]/45 active:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)] active:ring-[color:var(--brand-accent-blue)]/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-dark-blue)]"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image src={item.imageSrc} alt="" fill unoptimized sizes={IMAGE_SIZES} className="object-cover" />
      </div>
      <p className="border-t border-zinc-100 bg-white px-3 py-2 text-center text-[11px] font-medium leading-snug tracking-tight text-zinc-700 sm:py-2.5 sm:text-xs md:text-sm">
        {item.caption}
      </p>
    </a>
  );
}

export default function WorkShowcaseStack({ items }: { items: WorkExample[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollTo(index: number) {
    const total = items.length;
    if (total === 0) return;
    const clamped = Math.max(0, Math.min(index, total - 1));
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-work-card]');
    cards[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track || items.length === 0) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-work-card]'));
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

    if (nearest !== activeIndex) setActiveIndex(nearest);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mt-14 md:mt-16"
    >
      <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
        See some of our work
      </p>

      <div className="mx-auto mt-5 max-w-5xl md:mt-6">
        <div role="region" aria-label="Selected client work" className="relative">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-5"
          >
            <div className="w-[max(0px,calc(50%-190px))] shrink-0" aria-hidden />
            {items.map((item, index) => (
              <div
                key={`${item.caption}-${index}`}
                data-work-card
                className={`shrink-0 snap-center transition-all duration-300 ease-out ${
                  index === activeIndex ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-55 saturate-75'
                }`}
                style={cardWidthStyle()}
              >
                <WorkCard item={item} />
              </div>
            ))}
            <div className="w-[max(0px,calc(50%-190px))] shrink-0" aria-hidden />
          </div>

          <div className="mt-7 flex items-center justify-between px-1">
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to work example ${i + 1}`}
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
                aria-label="Previous work example"
                onClick={() => scrollTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black/60 transition hover:border-black/50 hover:text-black disabled:opacity-25"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next work example"
                onClick={() => scrollTo(activeIndex + 1)}
                disabled={activeIndex === items.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black/60 transition hover:border-black/50 hover:text-black disabled:opacity-25"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
