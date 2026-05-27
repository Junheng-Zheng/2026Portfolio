import { Alice, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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

const siteTitle = "Junheng Zheng | Design Engineer";
const siteDescription =
  "Junheng Zheng is a design engineer with a passion for creating user-friendly and efficient designs.";

export const metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/coverimage.png", alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/coverimage.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${alice.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
