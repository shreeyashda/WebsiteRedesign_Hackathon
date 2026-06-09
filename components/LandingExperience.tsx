'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

import FooterSection from '@/components/FooterSection';
import Hero from '@/components/Hero';
import HowSection from '@/components/HowSection';
import TrustedClientsCluster from '@/components/TrustedClientsCluster';
import MarketingSummarySection from '@/components/MarketingSummarySection';
import SolutionsSection from '@/components/SolutionsSection';
import TopBar from '@/components/TopBar';
import WhyUsSection from '@/components/WhyUsSection';

export default function LandingExperience() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const navbarOpacity = useSpring(useTransform(scrollYProgress, [0.06, 0.24], [0, 1]), {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });
  const navbarY = useSpring(useTransform(scrollYProgress, [0.06, 0.24], [-14, 0]), {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.52], [1, 0.35]), {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.6, 1],
    ['rgb(0,0,0)', 'rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(255,255,255)']
  );

  return (
    <div className="relative">
      <motion.div style={{ background }} className="pointer-events-none fixed inset-0 -z-10" />

      <TopBar opacity={navbarOpacity} y={navbarY} />

      <div ref={heroRef} className="relative z-10">
        {/* Hero content fades to support narrative transition */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10">
          <Hero />
        </motion.div>
      </div>

      <div className="relative z-20">
        <WhyUsSection />
        <TrustedClientsCluster />
        <HowSection />
        <SolutionsSection />
        <MarketingSummarySection />
        <FooterSection />
      </div>
    </div>
  );
}
