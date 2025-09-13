import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "randomizer - Builder of strange, useful things",
  description: "Portfolio of randomizer - prototyping fast, shipping faster with a touch of controlled chaos.",
  keywords: ["ceo", "web development", "AI coding", "blockchain", "web3", "crypto", "DeFi"],
  authors: [{ name: "Michael randomizer" }],
  creator: "randomizer",
  publisher: "randomizer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://randomizer.dev",
    title: "randomiser - Builder of strange, useful things",
    description: "Randomiser, a builder of strange things",
    siteName: "randomiser",
  },
  twitter: {
    card: "summary_large_image",
    title: "randomiser - Builder of strange things",
    description: "Randomiser, a builder of strange things",
    creator: "@randomiser",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
