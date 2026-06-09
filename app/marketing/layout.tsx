import type { Metadata } from 'next';
import { Bayon, Open_Sans } from 'next/font/google';
import { absoluteUrl } from '@/lib/site';

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

export const metadata: Metadata = {
  title: 'Marketing Services',
  description:
    'Performance-led marketing services across content, social media, and paid advertising to help brands grow faster.',
  alternates: {
    canonical: '/marketing',
  },
  openGraph: {
    title: 'Marketing Services | Centauri',
    description:
      'Performance-led marketing services across content, social media, and paid advertising to help brands grow faster.',
    url: absoluteUrl('/marketing'),
    type: 'website',
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${bayon.variable} ${openSans.variable} home-page min-h-full`}>
      {children}
    </div>
  );
}
