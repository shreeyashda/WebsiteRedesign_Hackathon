'use client';

import { motion } from 'framer-motion';

interface SolutionCardProps {
  title: string;
  description: string;
  accent: 'circle' | 'arc' | 'diamond';
  className?: string;
}

export default function SolutionCard({ title, description, accent, className = '' }: SolutionCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-2xl bg-zinc-50 p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] md:p-8 ${className}`}
    >
      <div className="pointer-events-none absolute right-5 top-5 opacity-55 transition group-hover:opacity-80">
        {accent === 'circle' ? (
          <div className="size-10 rounded-full border border-zinc-300 bg-zinc-100/80" />
        ) : null}
        {accent === 'arc' ? (
          <div className="size-10 rounded-full border-2 border-zinc-300 border-l-transparent border-t-transparent" />
        ) : null}
        {accent === 'diamond' ? <div className="size-8 rotate-45 rounded-sm border border-zinc-300 bg-zinc-100/80" /> : null}
      </div>

      <h3 className="max-w-[16ch] text-2xl font-bold tracking-tight text-zinc-900">{title}</h3>
      <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-zinc-600">{description}</p>
    </motion.article>
  );
}
