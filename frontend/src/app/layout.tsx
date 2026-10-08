import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource-variable/fraunces/full.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightBar from "@/components/HighlightBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bristi.edu.np"),
  title: {
    default: "Bristi Educational Consultancy Pvt. Ltd. | Study Abroad Experts Kathmandu Nepal",
    template: "%s | Bristi Educational Consultancy",
  },
  description:
    "Bristi Educational Consultancy Pvt. Ltd. guides Nepali students to top universities across Australia, UK, USA, Canada, Japan, New Zealand, Europe and South Korea with counselling, applications, visas and test preparation.",
  openGraph: {
    siteName: "Bristi Educational Consultancy Pvt. Ltd.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bristi Educational Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <Header />
        <HighlightBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}