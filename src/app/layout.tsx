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

const SITE_URL = "https://portfolio-murex-six-zi0w3lp1g3.vercel.app";
const FULL_NAME = "Moxirbek Solijonov";
const TITLE = "Moxirbek Solijonov | Full-Stack & Systems Engineer";
const DESCRIPTION =
  "Moxirbek Solijonov — Full-Stack & Systems Engineer from Tashkent, Uzbekistan. Specializing in TypeScript, NestJS, Next.js, WebRTC VoIP proxies, multi-tenant SaaS, and high-throughput real-time systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Moxirbek Solijonov",
    "Moxirbek Solijonov portfolio",
    "Moxirbek Solijonov engineer",
    "Moxirbek Solijonov developer",
    "Moxirbek Solijonov Tashkent",
    "Moxirbek Solijonov NestJS",
    "Moxirbek Solijonov WebRTC",
    "Full-Stack Engineer Tashkent",
    "TypeScript Backend Engineer Uzbekistan",
    "NestJS Developer Uzbekistan",
    "Next.js App Router Developer",
    "WebRTC VoIP Engineer",
    "Multi-tenant SaaS Backend",
    "PostgreSQL Prisma Engineer",
    "Node.js Real-time Systems",
    "Software Engineer Uzbekistan",
    "Tashkent Software Developer",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: `${FULL_NAME} Portfolio`,
    locale: "en_US",
    firstName: "Moxirbek",
    lastName: "Solijonov",
    username: "Moxirbek236",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — Full-Stack & Systems Engineer`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
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
  verification: {
    google: "JcmWu3zfv0jZe-yPnj0HTWiiD00dFTi-1s6FG_x9-no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: FULL_NAME,
    alternateName: ["Moxirbek", "Moxirbek S."],
    jobTitle: "Full-Stack & Systems Engineer",
    description: DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/aang-avatar.jpg`,
    email: "moxirbekmoxirbek29@gmail.com",
    telephone: "+998991459686",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
      addressRegion: "Tashkent",
    },
    nationality: {
      "@type": "Country",
      name: "Uzbekistan",
    },
    sameAs: [
      "https://github.com/Moxirbek236",
      "https://linkedin.com/in/moxirbek-solijonov",
      "https://t.me/Rakhimberdiyev_1970",
      SITE_URL,
    ],
    knowsAbout: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "Next.js",
      "React",
      "WebRTC",
      "Multi-Tenancy SaaS",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "Docker",
      "Socket.IO",
      "Real-time Systems",
      "Backend Architecture",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Najot Ta'lim",
        address: { "@type": "PostalAddress", addressLocality: "Tashkent" },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Available for Remote Roles",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${FULL_NAME} Portfolio`,
    description: DESCRIPTION,
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#080C14] text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950"
      >
        <Script
          id="json-ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
