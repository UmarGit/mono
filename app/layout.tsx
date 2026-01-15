import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mono - Bionic Reading Editor",
  description: "A minimalist text editor with bionic reading functionality. Bold the first portion of each word to improve reading speed and comprehension.",
  keywords: ["bionic reading", "text editor", "reading comprehension", "speed reading", "minimalist editor"],
  authors: [{ name: "Mono" }],
  creator: "Mono",
  publisher: "Mono",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Mono - Bionic Reading Editor",
    description: "A minimalist text editor with bionic reading functionality. Improve reading speed and comprehension.",
    type: "website",
    locale: "en_US",
    siteName: "Mono",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mono - Bionic Reading Editor",
    description: "A minimalist text editor with bionic reading functionality. Improve reading speed and comprehension.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
