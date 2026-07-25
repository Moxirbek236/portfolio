import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
  description: "Full-Stack Engineer specializing in TypeScript, NestJS, Next.js, WebRTC, Multi-tenant SaaS architectures, and high-throughput real-time systems.",
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
    description: "I engineer multi-tenant SaaS backends, WebRTC VoIP proxies, and high-throughput real-time automation engines.",
    url: "https://moxirbek.dev",
    siteName: "Moxirbek Solijonov Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moxirbek Solijonov | Full-Stack Engineer",
    description: "Full-Stack Engineer building multi-tenant SaaS, WebRTC VoIP proxies, and automation engines.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Moxirbek Solijonov",
    jobTitle: "Full-Stack & Systems Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "Uzbekistan"
    },
    url: "https://github.com/Moxirbek236",
    sameAs: [
      "https://github.com/Moxirbek236",
      "https://linkedin.com/in/moxirbek-solijonov",
      "https://t.me/Rakhimberdiyev_1970"
    ],
    knowsAbout: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "Next.js",
      "WebRTC",
      "Multi-Tenancy",
      "PostgreSQL",
      "Prisma ORM",
      "Redis"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#080C14] text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
        <Script
          id="json-ld-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
