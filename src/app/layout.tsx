import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moxirbek Solijonov | Full-Stack & Systems Engineer",
  description: "Production-grade Full-Stack Engineer specializing in TypeScript, NestJS, Next.js, WebRTC, Multi-tenant SaaS architectures, and real-time automation systems.",
  keywords: [
    "Moxirbek Solijonov",
    "Full-Stack Engineer",
    "TypeScript Engineer",
    "NestJS Developer",
    "Next.js App Router",
    "WebRTC Voice Engine",
    "PostgreSQL & Prisma",
    "Tashkent Software Engineer",
    "Uzbekistan Developer"
  ],
  authors: [{ name: "Moxirbek Solijonov" }],
  creator: "Moxirbek Solijonov",
  openGraph: {
    title: "Moxirbek Solijonov | Full-Stack & Systems Engineer",
    description: "I build production-grade web applications, real-time systems, and developer-focused products from architecture to deployment.",
    url: "https://moxirbek.dev",
    siteName: "Moxirbek Solijonov Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moxirbek Solijonov | Full-Stack Engineer",
    description: "Production-grade Full-Stack Engineer building complex systems, multi-tenant SaaS, and real-time WebRTC products.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-[#080C14] text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
