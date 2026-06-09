'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ClientBubbleProps {
  src: string;
  alt: string;
  size: number;
  x: string;
  y: string;
  isActive?: boolean;
  delay?: number;
}

export default function ClientBubble({ src, alt, size, x, y, isActive = false, delay = 0 }: ClientBubbleProps) {
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      animate={{ y: [0, -3, 0] }}
      whileHover={{ scale: 1.08, y: -4, opacity: 1 }}
      whileTap={{ scale: 1.02 }}
    >
      <div
        className={`group flex items-center justify-center rounded-full border border-white/10 bg-black p-2 opacity-90 shadow-[0_6px_20px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all hover:bg-black hover:opacity-100 hover:shadow-[0_0_26px_rgba(0,0,0,0.35)] ${
          isActive ? 'bg-black opacity-100 shadow-[0_0_26px_rgba(0,0,0,0.35)]' : ''
        }`}
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={alt}
          width={Math.round(size * 0.88)}
          height={Math.round(size * 0.88)}
          className="h-auto w-auto object-contain brightness-0 invert"
        />
      </div>
    </motion.div>
  );
}
