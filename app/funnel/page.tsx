'use client';

import { Bayon, Open_Sans } from 'next/font/google';
import Link from 'next/link';
import { AnimatePresence, motion, useSpring } from 'framer-motion';
import { useMemo, useState } from 'react';
import TopBar from '@/components/TopBar';

type FunnelData = {
  stage: string;
  goals: string[];
  brandName: string;
  brandDescription: string;
  bottleneck: string;
  investment: string;
  name: string;
  email: string;
  phone: string;
  companyOrInstagram: string;
};

const STAGE_OPTIONS = ['Just starting', 'Growing but stuck', 'Scaling / need systems', 'Already established'];
const GOAL_OPTIONS = [
  'More customers',
  'Build a strong brand',
  'Launch something new',
  'Automate & scale',
  "Fix what's not working",
];
const BOTTLENECK_OPTIONS = ['Website / product', 'Marketing', 'Conversion', 'Systems / operations'];
const INVESTMENT_OPTIONS = ['Just exploring', 'GBP 1k-5k', 'GBP 5k-15k', 'GBP 15k+'];

const TOTAL_STEPS = 7;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const bayon = Bayon({
  subsets: ['latin'],
  variable: '--font-bayon',
  weight: '400',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function OptionCard({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-all duration-200 sm:text-base ${
        active
          ? 'border-[color:var(--brand-accent-blue)]/70 bg-[color:var(--brand-accent-blue)]/10 text-zinc-900 shadow-[0_0_0_1px_rgba(81,208,212,0.28)]'
          : 'border-zinc-300 bg-white text-zinc-800 hover:border-[color:var(--brand-purple)]/55 hover:bg-[color:var(--brand-purple)]/8'
      }`}
    >
      {label}
    </button>
  );
}

export default function FunnelPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FunnelData>({
    stage: '',
    goals: [],
    brandName: '',
    brandDescription: '',
    bottleneck: '',
    investment: '',
    name: '',
    email: '',
    phone: '',
    companyOrInstagram: '',
  });
  const navbarOpacity = useSpring(1, { stiffness: 120, damping: 24, mass: 0.25 });
  const navbarY = useSpring(0, { stiffness: 120, damping: 24, mass: 0.25 });

  const progress = useMemo(() => Math.min((step / TOTAL_STEPS) * 100, 100), [step]);
  const descriptionWords = useMemo(() => countWords(data.brandDescription), [data.brandDescription]);

  const canContinue = useMemo(() => {
    if (step === 1) return !!data.stage;
    if (step === 2) return data.goals.length > 0;
    if (step === 3) return data.brandName.trim().length > 0 && descriptionWords >= 10;
    if (step === 4) return !!data.bottleneck;
    if (step === 5) return !!data.investment;
    if (step === 6) return !!data.name.trim() && !!data.email.trim();
    return true;
  }, [data, descriptionWords, step]);

  const goNext = () => {
    if (!canContinue) return;
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep((current) => current + 1);
      return;
    }
    setSubmitted(true);
  };

  const goBack = () => {
    if (step === 1) return;
    setDirection(-1);
    setStep((current) => current - 1);
  };

  const submitFunnel = () => {
    console.log('Funnel submitted:', data);
    setSubmitted(true);
  };

  return (
    <main
      className={`${bayon.variable} ${openSans.variable} home-page relative min-h-screen overflow-hidden bg-black text-black`}
    >
      <TopBar opacity={navbarOpacity} y={navbarY} />
      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28">
        {!submitted && (
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Centauri Growth Funnel
            </p>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-white/90">Step {step} of 7</p>
                <p className="mt-1 text-xs text-white/70">A guided experience in under 2 minutes.</p>
              </div>
              <p className="text-sm font-semibold text-[color:var(--brand-accent-blue)]">
                {Math.round(progress)}%
              </p>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/20">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[color:var(--brand-accent-blue)] to-[color:var(--brand-purple)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </div>
          </header>
        )}

        <section className="flex flex-1 items-center">
          <AnimatePresence custom={direction} mode="wait">
            {!submitted ? (
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 36 : -36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -36 : 36 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="w-full rounded-3xl border border-zinc-200 bg-zinc-50/95 p-5 text-black shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:p-8"
              >
                {step === 1 && (
                  <>
                    <h1 className="text-4xl tracking-tight sm:text-6xl">Where are you right now?</h1>
                    <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                      Start by choosing the stage that best reflects your current position.
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {STAGE_OPTIONS.map((option) => (
                        <OptionCard
                          key={option}
                          label={option}
                          active={data.stage === option}
                          onClick={() => setData((prev) => ({ ...prev, stage: option }))}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="text-4xl tracking-tight sm:text-6xl">What are you focused on?</h2>
                    <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                      Pick all that match your current goals.
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {GOAL_OPTIONS.map((option) => {
                        const active = data.goals.includes(option);
                        return (
                          <OptionCard
                            key={option}
                            label={option}
                            active={active}
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                goals: active
                                  ? prev.goals.filter((goal) => goal !== option)
                                  : [...prev.goals, option],
                              }))
                            }
                          />
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-4xl tracking-tight sm:text-6xl">Tell us your story</h2>
                    <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                      Share context so we can understand your world before proposing next steps.
                    </p>
                    <div className="mt-8 space-y-4">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                          Brand or project name
                        </label>
                        <input
                          value={data.brandName}
                          onChange={(event) =>
                            setData((prev) => ({ ...prev, brandName: event.target.value }))
                          }
                          placeholder="Centauri Media"
                          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[color:var(--brand-accent-blue)]"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                          What does your brand do?
                        </label>
                        <textarea
                          value={data.brandDescription}
                          onChange={(event) =>
                            setData((prev) => ({ ...prev, brandDescription: event.target.value }))
                          }
                          placeholder="Tell us what you offer, who you serve, and where you want to go next."
                          rows={4}
                          className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[color:var(--brand-purple)]"
                        />
                        <p className="mt-2 text-xs text-zinc-500">{descriptionWords} / 10 words minimum</p>
                      </div>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className="text-4xl tracking-tight sm:text-6xl">Where is the main bottleneck?</h2>
                    <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                      Choose the area that currently slows growth the most.
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {BOTTLENECK_OPTIONS.map((option) => (
                        <OptionCard
                          key={option}
                          label={option}
                          active={data.bottleneck === option}
                          onClick={() => setData((prev) => ({ ...prev, bottleneck: option }))}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 5 && (
                  <>
                    <h2 className="text-4xl tracking-tight sm:text-6xl">
                      What level of investment feels realistic?
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                      This helps us shape scope and pace. No pressure, just direction.
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {INVESTMENT_OPTIONS.map((option) => (
                        <OptionCard
                          key={option}
                          label={option}
                          active={data.investment === option}
                          onClick={() => setData((prev) => ({ ...prev, investment: option }))}
                        />
                      ))}
                    </div>
                  </>
                )}

                {step === 6 && (
                  <>
                    <h2 className="text-4xl tracking-tight sm:text-6xl">Where should we follow up?</h2>
                    <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                      Final step. Add your details and we will contact you with tailored next steps.
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <input
                        value={data.name}
                        onChange={(event) => setData((prev) => ({ ...prev, name: event.target.value }))}
                        placeholder="Name *"
                        className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[color:var(--brand-accent-blue)]"
                      />
                      <input
                        value={data.email}
                        onChange={(event) => setData((prev) => ({ ...prev, email: event.target.value }))}
                        placeholder="Email *"
                        type="email"
                        className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[color:var(--brand-accent-blue)]"
                      />
                      <input
                        value={data.phone}
                        onChange={(event) => setData((prev) => ({ ...prev, phone: event.target.value }))}
                        placeholder="Phone (optional)"
                        className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[color:var(--brand-purple)]"
                      />
                      <input
                        value={data.companyOrInstagram}
                        onChange={(event) =>
                          setData((prev) => ({ ...prev, companyOrInstagram: event.target.value }))
                        }
                        placeholder="Company or Instagram (optional)"
                        className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[color:var(--brand-purple)]"
                      />
                    </div>
                  </>
                )}

                {step === 7 && (
                  <>
                    <h2 className="text-4xl tracking-tight sm:text-6xl">Ready for your next move?</h2>
                    <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                      We have enough context to make your next step strategic, not generic.
                    </p>
                    <div className="mt-8 rounded-2xl border border-[color:var(--brand-accent-blue)]/35 bg-[color:var(--brand-accent-blue)]/10 p-5">
                      <p className="text-sm leading-relaxed text-zinc-800">
                        You are currently <span className="font-semibold text-zinc-950">{data.stage}</span>,
                        focused on{' '}
                        <span className="font-semibold text-zinc-950">
                          {data.goals.length ? data.goals.join(', ') : 'growth'}
                        </span>
                        , and your biggest pressure point is{' '}
                        <span className="font-semibold text-zinc-950">{data.bottleneck}</span>. We will use this
                        context to shape a focused strategy conversation.
                      </p>
                    </div>
                  </>
                )}

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 1}
                    className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-[color:var(--brand-accent-blue)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={step === 7 ? submitFunnel : goNext}
                    disabled={!canContinue && step < 7}
                    className="inline-flex items-center justify-center rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-dark-blue)] hover:shadow-[0_0_0_1px_var(--brand-accent-blue),0_12px_40px_-12px_var(--brand-purple)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {step === 7 ? 'Finish & submit' : 'Continue'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="w-full rounded-3xl border border-zinc-200 bg-zinc-50/95 p-6 text-center text-black shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">Confirmation</p>
                <h2 className="mt-4 text-4xl tracking-tight sm:text-6xl">You are all set.</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-700 sm:text-base">
                  Thanks {data.name || 'there'} - we understand where you are, what you want to achieve,
                  and where support is most needed. A Centauri strategist will follow up for the next
                  step.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/marketing"
                    className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-6 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-[color:var(--brand-accent-blue)] hover:text-[color:var(--brand-dark-blue)]"
                  >
                    Explore our work
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-dark-blue)] hover:shadow-[0_0_0_1px_var(--brand-accent-blue),0_12px_40px_-12px_var(--brand-purple)]"
                  >
                    Back to home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
