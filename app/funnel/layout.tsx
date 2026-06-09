import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Growth Funnel",
  description:
    "Start your growth journey with Centauri. Share your goals and get a tailored plan for marketing, solutions, and scale.",
  alternates: {
    canonical: "/funnel",
  },
  openGraph: {
    title: "Growth Funnel | Centauri",
    description:
      "Start your growth journey with Centauri. Share your goals and get a tailored plan for marketing, solutions, and scale.",
    url: absoluteUrl("/funnel"),
    type: "website",
  },
};

export default function FunnelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
