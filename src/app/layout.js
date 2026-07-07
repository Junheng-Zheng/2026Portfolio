import {
  Alice,
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Instrument_Serif,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-instrument-serif",
  display: "swap",
});

const alice = Alice({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alice",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-space-mono",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

const siteTitle = "Junheng Zheng | Design Engineer";
const siteDescription = "Junheng Zheng is a design engineer";

export const metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/v12026cover.png", alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/v12026cover.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full bg-[#1a1a1a]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${alice.variable} ${spaceMono.variable} ${ibmPlexSans.variable} ${bricolageGrotesque.variable} min-h-dvh bg-[#1a1a1a] text-white antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
