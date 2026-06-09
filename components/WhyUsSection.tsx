'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function ScrollKeyword({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const line = useTransform(progress, [range[0], range[1]], [0, 1], { clamp: true });
  const dotLeft = useTransform(line, (v: number) => `${v * 100}%`);

  return (
    <span className="relative inline-block pb-1.5">
      <span className="font-medium text-zinc-900">{children}</span>
      <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5" aria-hidden>
        <span className="absolute inset-0 rounded-full bg-zinc-200/80" />
        <motion.span
          className="absolute left-0 top-0 h-full w-full origin-left rounded-full bg-black"
          style={{ scaleX: line }}
        />
        <motion.span
          className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-1 ring-white/90"
          style={{ left: dotLeft }}
        />
      </span>
    </span>
  );
}

export default function WhyUsSection() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.88', 'end 0.28'],
  });

  const r1: [number, number] = [0.02, 0.32];
  const r2: [number, number] = [0.22, 0.48];
  const r3: [number, number] = [0.4, 0.88];

  return (
    <section id="why-us" className="relative z-20 py-8 text-black md:py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center text-3xl tracking-tight sm:text-4xl md:text-5xl"
        >
          Why Us?
        </motion.h2>

        {/* Equal-width columns on lg+; matched row height; image capped and centered (no overflow). */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-7 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <motion.div
            ref={cardRef}
            role="article"
            aria-labelledby="about-us-heading"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 min-w-0 flex-col lg:h-full"
          >
            <div className="flex h-full min-h-0 flex-1 flex-col rounded-xl border border-zinc-200 bg-zinc-50/95 px-5 py-5 shadow-[0_8px_22px_rgba(0,0,0,0.05)] sm:px-6 sm:py-5">
              <h3 id="about-us-heading" className="text-xl tracking-tight text-zinc-900 sm:text-2xl">
                About Us
              </h3>

              <div className="mt-4 min-h-0 flex-1 space-y-3.5 text-sm leading-relaxed text-zinc-700">
              <p>
                We&apos;re{' '}
                <ScrollKeyword progress={scrollYProgress} range={r1}>
                  not an agency
                </ScrollKeyword>
                .
              </p>

              <p>
                We&apos;re a{' '}
                <ScrollKeyword progress={scrollYProgress} range={r2}>
                  consultancy
                </ScrollKeyword>{' '}
                focused on building and developing businesses.
              </p>

              <p>
                We partner with you — not just to deliver, but to understand, identify gaps, and grow what&apos;s
                already there.
              </p>

              <div className="space-y-0.5">
                <p>From brand and online presence</p>
                <p>to systems, tech, and operations —</p>
                <p className="font-medium text-zinc-900">
                  we build what your business needs, when it needs it.
                </p>
              </div>

              <div className="space-y-0.5 border-l-2 border-zinc-300 pl-2.5">
                <p className="font-medium text-zinc-900">We don&apos;t fix and leave.</p>
                <p>We stay, iterate, and grow with you.</p>
              </div>

              <p>
                We&apos;re your{' '}
                <ScrollKeyword progress={scrollYProgress} range={r3}>
                  growth partner
                </ScrollKeyword>
                .
              </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="flex min-h-0 min-w-0 flex-col lg:h-full"
          >
            <div className="flex h-full w-full min-h-[min(56vw,17rem)] flex-1 flex-col overflow-hidden rounded-xl bg-white p-3 sm:min-h-[min(52vw,18rem)] sm:p-4 lg:min-h-0">
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <Image
                  src="/images/teampic.png"
                  alt="Centauri team"
                  width={960}
                  height={720}
                  className="h-full w-full max-h-full max-w-full object-contain object-center"
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 85vw, 100vw"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
