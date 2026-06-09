import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_URL, absoluteUrl } from "@/lib/site";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Centauri",
  url: SITE_URL,
  logo: absoluteUrl("/logo/CENTAURI-LOGO-2.svg"),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@centauri.org.uk",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Centauri",
  url: SITE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Centauri — Your Growth Partner",
    template: "%s | Centauri",
  },
  description:
    "Creative growth partner at the intersection of talent, content, and media. Helping individuals and brands scale in the creator economy.",
  applicationName: "Centauri",
  keywords: [
    "marketing agency",
    "content marketing",
    "paid advertising",
    "social media",
    "web development",
    "mobile app development",
    "case studies",
    "growth partner",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Centauri",
    title: "Centauri — Your Growth Partner",
    description:
      "Creative growth partner at the intersection of talent, content, and media. Helping individuals and brands scale in the creator economy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centauri — Your Growth Partner",
    description:
      "Creative growth partner at the intersection of talent, content, and media. Helping individuals and brands scale in the creator economy.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
