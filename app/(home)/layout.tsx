import { Bayon, Open_Sans } from "next/font/google";

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

export default function HomeLayout({
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
