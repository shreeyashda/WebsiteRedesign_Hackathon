'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const LOGOS = [
  '/client_logos/arabiantailor.png',
  '/client_logos/astonuniversity.png',
  '/client_logos/birminghamcityuniversity.png',
  '/client_logos/diwankitchen.png',
  '/client_logos/frankys.png',
  '/client_logos/juci.png',
  '/client_logos/onahousing.png',
  '/client_logos/paktravels.png',
  '/client_logos/sizzlerz.png',
  '/client_logos/theroyalpalm.png',
  '/client_logos/umrahsupermarket.png',
  '/client_logos/vivace.png',
];

const BELT_LOGOS = [...LOGOS, ...LOGOS];

export default function TrustedClientsCluster() {
  return (
    <section className="relative z-20 py-8 text-black md:py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold tracking-tight text-zinc-600 md:text-base">
          Brands that have trusted us
        </p>

        <div className="group relative mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-xl bg-white py-4">
          <motion.div
            className="flex min-w-max items-center gap-14 px-1 will-change-transform md:gap-16"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          >
            {BELT_LOGOS.map((src, index) => (
              <motion.div
                key={`${src}-${index}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="shrink-0"
              >
                <Image
                  src={src}
                  alt="Client logo"
                  width={248}
                  height={104}
                  className="h-24 w-auto object-contain opacity-65 brightness-0 transition duration-200 hover:opacity-100 md:h-28"
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />
        </div>
      </div>
    </section>
  );
}
