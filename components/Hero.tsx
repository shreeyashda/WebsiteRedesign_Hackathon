'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import StarNode, { type StarData } from '@/components/StarNode';
import {
  CONSTELLATION_CONNECTIONS,
  CONSTELLATION_STORIES,
} from '@/data/constellationStories';

const STAR_NODES: StarData[] = CONSTELLATION_STORIES.map((story) => ({
  id: story.id,
  x: story.x,
  y: story.y,
  title: story.title,
  description: story.description,
  metric: story.metric,
  logoSrc: story.logoSrc,
}));

export default function Hero() {
  const [manualActiveStarId, setManualActiveStarId] = useState<string | null>(null);
  const [autoActiveStarId, setAutoActiveStarId] = useState<string | null>(STAR_NODES[0]?.id ?? null);

  const starMap = useMemo(
    () =>
      STAR_NODES.reduce<Record<string, StarData>>((acc, star) => {
        acc[star.id] = star;
        return acc;
      }, {}),
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAutoActiveStarId((prev) => {
        const ids = STAR_NODES.map((node) => node.id);
        const candidates = ids.filter((id) => id !== prev);
        return candidates[Math.floor(Math.random() * candidates.length)] ?? ids[0] ?? null;
      });
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const activeStarId = manualActiveStarId ?? autoActiveStarId;

  return (
    <section className="relative min-h-screen overflow-hidden text-pure-white">
      <div className="pointer-events-none absolute left-1/2 top-6 z-30 -translate-x-1/2 md:top-8">
        <div className="w-[clamp(190px,28vw,340px)]">
          <Image
            src="/logo/CENTAURI-LOGO-2.svg"
            alt="Centauri"
            width={1710}
            height={287}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-14 z-20 md:top-20">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {CONSTELLATION_CONNECTIONS.map(([from, to]) => {
            const start = starMap[from];
            const end = starMap[to];

            if (!start || !end) {
              return null;
            }

            return (
              <line
                key={`${from}-${to}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="0.18"
              />
            );
          })}
        </svg>

        {STAR_NODES.map((star) => (
          <StarNode
            key={star.id}
            star={star}
            isActive={activeStarId === star.id}
            onActivate={setManualActiveStarId}
            onDeactivate={() => setManualActiveStarId(null)}
          />
        ))}
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto mt-8 max-w-4xl text-center sm:mt-10 md:mt-12">
          <h1 className="text-[clamp(1.9rem,7.2vw+1.2vh,6.1rem)] leading-[0.9] tracking-tight text-white">
            <span className="block">Your business</span>
            <motion.span
              className="block text-white"
              animate={{ opacity: [0.82, 1, 0.82] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              growth
            </motion.span>
            <span className="block">partner</span>
          </h1>

          <div className="pointer-events-auto mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/funnel"
              className="rounded-md bg-white px-7 py-3 text-sm font-semibold text-black shadow-none ring-offset-2 ring-offset-black transition hover:bg-white hover:shadow-[0_0_0_2px_var(--brand-accent-blue),0_8px_32px_-8px_var(--brand-purple)]"
            >
              Grow Your Business
            </Link>
          </div>
          <div className="relative mx-auto mt-10 w-fit rounded-md border border-white/25 bg-black/70 px-3 py-2">
            <div className="flex items-center gap-2">
              <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden>
                <line x1="2.5" y1="11" x2="10" y2="7" stroke="rgba(255,255,255,0.62)" strokeWidth="1" />
                <line x1="10" y1="7" x2="19.5" y2="3" stroke="rgba(255,255,255,0.62)" strokeWidth="1" />
                <circle cx="2.5" cy="11" r="1.4" fill="white" />
                <circle cx="10" cy="7" r="1.4" fill="white" />
                <circle cx="19.5" cy="3" r="1.4" fill="white" />
              </svg>
              <p className="text-xs tracking-wide text-white/90">Hover to discover growth stories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
