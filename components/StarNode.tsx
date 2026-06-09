'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export interface StarData {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  metric?: string;
  logoSrc: string;
}

interface StarNodeProps {
  star: StarData;
  isActive: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
}

export default function StarNode({
  star,
  isActive,
  onActivate,
  onDeactivate,
}: StarNodeProps) {
  const isRightEdgeStar = star.x >= 78;

  return (
    <motion.div
      className="absolute"
      style={{ left: `${star.x}%`, top: `${star.y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <motion.button
        type="button"
        className="pointer-events-auto group relative -translate-x-1/2 -translate-y-1/2"
        onHoverStart={() => onActivate(star.id)}
        onHoverEnd={onDeactivate}
        onFocus={() => onActivate(star.id)}
        onBlur={onDeactivate}
        whileHover={{ scale: 1.3 }}
        animate={{
          y: [0, -2, 0],
          scale: isActive ? 1.34 : 1,
        }}
        transition={{
          y: {
            duration: 3.4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: {
            duration: 0.2,
            ease: 'easeOut',
          },
        }}
        aria-label={`View story: ${star.title}`}
      >
        <motion.span
          className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-[11px]"
          animate={{
            opacity: isActive ? 1 : [0.32, 0.84, 0.32],
            scale: isActive ? 1.9 : [0.9, 1.38, 0.9],
          }}
          transition={{
            opacity: { duration: 2.1, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 2.1, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/55"
          animate={{
            opacity: isActive ? 0.9 : [0.14, 0.52, 0.14],
            scale: isActive ? 1.55 : [0.94, 1.4, 0.94],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="relative block size-14 overflow-hidden rounded-full border border-white/55 bg-white/95 p-2 shadow-[0_0_38px_rgba(255,255,255,0.95)]">
          <Image
            src={star.logoSrc}
            alt={`${star.title} logo`}
            fill
            sizes="56px"
            className="object-contain p-1 brightness-0 contrast-125"
          />
        </span>
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`pointer-events-none absolute top-3 z-40 w-56 rounded-lg border border-white/25 bg-black p-3 text-left shadow-[0_10px_35px_rgba(0,0,0,0.8)] ${
              isRightEdgeStar ? 'right-4' : 'left-4'
            }`}
          >
            <p className="text-sm font-semibold text-white">{star.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-300">{star.description}</p>
            {star.metric ? <p className="mt-2 text-xs font-medium text-white/80">{star.metric}</p> : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
