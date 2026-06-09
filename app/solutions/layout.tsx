import type { Metadata } from "next";
import { Bayon, Open_Sans } from "next/font/google";
import { absoluteUrl } from "@/lib/site";

const bayon = Bayon({
  subsets: ["latin"],
  variable: "--font-bayon",
  weight: "400",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Digital solutions spanning websites, mobile apps, ecommerce, and analytics, backed by real case studies and measurable outcomes.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Solutions | Centauri",
    description:
      "Digital solutions spanning websites, mobile apps, ecommerce, and analytics, backed by real case studies and measurable outcomes.",
    url: absoluteUrl("/solutions"),
    type: "website",
  },
};

export default function SolutionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${bayon.variable} ${openSans.variable} home-page min-h-full`}>{children}</div>;
}
