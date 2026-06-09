'use client';

import { motion } from 'framer-motion';

export default function HowSection() {
  return (
    <section id="how" className="relative z-20 py-6 text-black md:py-8">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">How?</h2>
        </motion.div>
      </div>
    </section>
  );
}
