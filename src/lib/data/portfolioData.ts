export interface Product {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  description: string;
  problem: string;
  solution: string;
  tags: string[];
  metrics: string[];
  features: string[];
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
  githubUrl?: string;
  liveUrl?: string;
}

export interface DeepDiveArticle {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  content: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Moxirbek Solijonov",
    role: "Full-Stack & Systems Engineer",
    locationPill: "Full-Stack Engineer • Tashkent, Uzbekistan",
    availability: "Available for Senior/Mid Full-Stack & Backend Roles (Remote / Relocation)",
    location: "Tashkent, Uzbekistan",
    phone: "+998 99 145 96 86",
    email: "moxirbekmoxirbek29@gmail.com",
    telegram: "https://t.me/solijonov_m",
    telegramHandle: "@solijonov_m",
    github: "https://github.com/Moxirbek236",
    linkedin: "https://linkedin.com/in/moxirbek",
    headline: "I build multi-tenant SaaS, WebRTC voice systems, and Telegram automation platforms. Currently teaching CS at Najot Ta'lim.",
    storyBio: "From teaching programming fundamentals at Najot Ta'lim to building multi-tenant educational platforms, real-time communication systems, and automation products, my focus is turning complex ideas into reliable software.",
  },

  products: [
    {
      id: "educoin",
      title: "Educoin",
      subtitle: "Multi-Tenant Educational CRM & LMS Backend",
      period: "2026.04 – Present",
      role: "Backend Architect",
      description: "Multi-tenant CRM and LMS platform supporting tenant isolation across educational centers, automated attendance accounting, coin reward marketplace, and Redis OTP verification.",
      problem: "Educational centers lacked isolated multi-tenancy, resulting in cross-center data leakage risks and fragmented attendance & payment accounting.",
      solution: "Engineered a tenant-isolated NestJS backend utilizing Prisma middleware, dynamic RBAC guards, Redis OTP authentication, and OpenTelemetry query tracing.",
      tags: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "OpenTelemetry"],
      metrics: [
        "Schema-level multi-tenant isolation across educational centers",
        "Redis-backed OTP verification with 15-minute sliding TTL window",
        "OpenTelemetry distributed tracing for database query optimization",
        "Automated Telegram Bot notification dispatch for attendance alerts"
      ],
      features: [
        "Multi-tenant database schema architecture using Prisma tenant middleware",
        "Role-based access control (RBAC) with NestJS custom decorators",
        "Gamified student rewards system with coin economy & marketplace",
        "Docker containerization with GitLab CI/CD automated deployment pipeline"
      ],
      codeSnippet: {
        filename: "src/common/middleware/tenant-isolation.middleware.ts",
        language: "typescript",
        code: `import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantIsolationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;
    if (!tenantId) {
      throw new UnauthorizedException('Tenant header X-Tenant-ID is required');
    }
    // Attach validated tenant context to request lifecycle
    req['tenantId'] = tenantId;
    next();
  }
}`
      },
      githubUrl: "https://github.com/Moxirbek236/educoin",
      liveUrl: "https://github.com/Moxirbek236/educoin"
    },
    {
      id: "ross-messenger",
      title: "Ross Messenger",
      subtitle: "Telegram-Inspired WebRTC Voice & Messaging Engine",
      period: "2025.11 – 2026.02",
      role: "Full-Stack Engineer & Telecom DevOps",
      description: "Cross-platform messaging and VoIP application featuring end-to-end encrypted peer-to-peer voice calls, custom media proxy, and virtualized chat lists.",
      problem: "Standard browser-based audio streams struggle with packet latency and memory consumption when rendering thousands of chat messages.",
      solution: "Built a custom Node.js WebRTC-to-UDP media proxy with AES-256-CTR packet encryption, Diffie-Hellman key exchanges, and react-window message virtualization.",
      tags: ["Next.js", "Node.js", "WebRTC", "Socket.IO", "Zustand", "Framer Motion", "Capacitor"],
      metrics: [
        "Sub-100ms voice packet latency via custom UDP proxy",
        "AES-256-CTR packet payload encryption with Diffie-Hellman key exchange",
        "Virtualized infinite scroll list rendering 10,000+ messages at 60 FPS",
        "Cross-platform Android packaging via Capacitor"
      ],
      features: [
        "Node.js WebRTC-to-UDP proxy for low-latency peer-to-peer audio transmission",
        "On-the-fly AES-256-CTR packet payload encryption and key rotation",
        "react-window list virtualization for zero memory leaks during infinite scroll",
        "Zustand state store synchronizing WebSockets and active WebRTC calls"
      ],
      codeSnippet: {
        filename: "server/webrtc-proxy/udp-crypto.service.ts",
        language: "typescript",
        code: `import crypto from 'crypto';

export class UDPPayloadCrypto {
  static encryptPacket(buffer: Buffer, secretKey: Buffer): Buffer {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    // Prepend 16-byte IV to encrypted UDP packet payload
    return Buffer.concat([iv, encrypted]);
  }
}`
      },
      githubUrl: "https://github.com/Moxirbek236/portfolio",
      liveUrl: "https://github.com/Moxirbek236/portfolio"
    },
    {
      id: "mk-academy",
      title: "MK Academy",
      subtitle: "Gamified CEFR English Learning Engine (PWA & Mobile)",
      period: "2025.08 – 2025.11",
      role: "Frontend Engineer & PWA Architect",
      description: "Multi-role English learning platform featuring spaced repetition vocabulary algorithms, offline-first service worker caching, and gamified progress streaks.",
      problem: "Language learners experience high drop-off rates due to repetitive study formats and progress loss during offline mobile usage.",
      solution: "Engineered a PWA utilizing Leitner spaced-repetition intervals, Service Worker background synchronization, and XP achievement mechanics.",
      tags: ["Next.js", "React", "NestJS", "Prisma", "Tailwind CSS", "Service Workers", "Capacitor"],
      metrics: [
        "Leitner spaced repetition memory algorithm optimizing card retention",
        "Offline-first PWA caching via Axios service worker interceptors",
        "XP progression, daily login streak counters, and achievement badges",
        "Multi-role web, PWA, Android, and iOS builds"
      ],
      features: [
        "Spaced repetition engine calculating optimal card review intervals",
        "Axios service worker interceptors queuing offline mutation requests",
        "Gamified XP, streaks, levels, and unlockable achievement badges",
        "Capacitor mobile pipeline generating production native Android packages"
      ],
      codeSnippet: {
        filename: "src/lib/spaced-repetition/leitner.engine.ts",
        language: "typescript",
        code: `export function calculateNextReview(boxLevel: number, isCorrect: boolean): { nextBox: number; daysInterval: number } {
  if (!isCorrect) return { nextBox: 1, daysInterval: 1 };
  const nextBox = Math.min(boxLevel + 1, 5);
  const intervals = [1, 3, 7, 14, 30]; // Days between reviews
  return { nextBox, daysInterval: intervals[nextBox - 1] };
}`
      },
      githubUrl: "https://github.com/Moxirbek236/portfolio",
      liveUrl: "https://github.com/Moxirbek236/portfolio"
    },
    {
      id: "instagram-bot",
      title: "Instagram Media Delivery Bot",
      subtitle: "High-Throughput Telegram Scraper Automation Engine",
      period: "2025.06 – 2025.08",
      role: "Backend & Automation Engineer",
      description: "High-throughput Telegram bot engineered for reliable media extraction and delivery using proxy pool rotation, Redis concurrency queues, and CDN direct streaming.",
      problem: "Frequent IP rate limits, scraper bans, and heavy disk I/O memory overhead when processing high-definition media downloads.",
      solution: "Constructed an anti-blocking architecture featuring a rotating proxy pool, Redis concurrency queue with randomized jitter delays, and CDN direct stream piping.",
      tags: ["Node.js", "Telegraf", "Redis", "SQLite", "Proxy Pool", "Node Streams"],
      metrics: [
        "Anti-blocking session cycle management across rotating proxy pool",
        "Redis concurrency queue with randomized delay jitter to bypass rate limits",
        "CDN-direct Node.js stream piping (Zero disk buffer overhead)",
        "SQLite & Redis fast-path caching for sub-50ms media re-delivery"
      ],
      features: [
        "Proxy pool rotation preventing scraper IP address blocks",
        "Redis concurrency queues handling burst requests with randomized delays",
        "Direct memory stream piping from CDN source to Telegram API",
        "Automatic audio extraction fallback when video downloads are restricted"
      ],
      codeSnippet: {
        filename: "src/queue/proxy-jitter.queue.ts",
        language: "typescript",
        code: `export async function getRotatedProxyWithJitter(proxyPool: string[]): Promise<{ proxy: string; delayMs: number }> {
  const proxy = proxyPool[Math.floor(Math.random() * proxyPool.length)];
  // Add 100ms - 400ms randomized jitter delay to bypass bot rate limit heuristics
  const delayMs = Math.floor(100 + Math.random() * 300);
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return { proxy, delayMs };
}`
      },
      githubUrl: "https://github.com/Moxirbek236/portfolio",
      liveUrl: "https://github.com/Moxirbek236/portfolio"
    }
  ] as Product[],

  deepDives: [
    {
      id: "webrtc-udp-proxy-note",
      title: "Building a Sub-100ms WebRTC UDP Media Proxy with AES-256 Encryption in Node.js",
      subtitle: "How I engineered low-latency peer-to-peer voice transmission for Ross Messenger.",
      date: "Feb 2026",
      readTime: "5 min read",
      tags: ["WebRTC", "Node.js", "UDP", "AES-256", "Telecom"],
      summary: "Browser WebRTC implementations can suffer from relay delays when direct P2P connections are NAT-restricted. Here is how I constructed a Node.js UDP media proxy with on-the-fly AES-256 packet payload encryption.",
      content: [
        "1. The Challenge: STUN/TURN servers add unacceptable latency for voice calls in Central Asia due to remote relay locations.",
        "2. The Solution: A lightweight Node.js UDP socket proxy that performs Diffie-Hellman key exchange during call setup.",
        "3. Encryption Pipeline: Every incoming audio packet buffer is encrypted using AES-256-CTR with a 16-byte initialization vector prepended to the UDP datagram.",
        "4. Outcome: Achieved stable sub-100ms voice packet transmission while preserving end-to-end privacy."
      ]
    },
    {
      id: "multi-tenant-nestjs-prisma-note",
      title: "Implementing Schema-Level Multi-Tenancy & Dynamic RBAC in NestJS & Prisma",
      subtitle: "Architectural patterns from building Educoin's educational CRM.",
      date: "Apr 2026",
      readTime: "4 min read",
      tags: ["NestJS", "Prisma", "PostgreSQL", "Multi-Tenancy", "RBAC"],
      summary: "Multi-tenant SaaS applications must prevent cross-tenant data leaks. Bypassing row-level security through tenant header middleware and Prisma client extensions.",
      content: [
        "1. Context isolation: Extracting `X-Tenant-ID` header at the NestJS HTTP middleware level.",
        "2. Prisma middleware: Intercepting every SQL query to automatically scope `where: { tenantId }` conditions.",
        "3. RBAC Guards: Decorating controllers with `@Roles(Role.ADMIN, Role.TEACHER)` for dynamic permission checks.",
        "4. Observability: Adding OpenTelemetry spans to trace query duration across tenant boundaries."
      ]
    }
  ] as DeepDiveArticle[],

  skillCapabilities: [
    {
      category: "Backend & Architecture",
      skills: [
        { name: "TypeScript", depth: "Production" },
        { name: "Node.js", depth: "Production" },
        { name: "NestJS", depth: "Production" },
        { name: "Express.js", depth: "Production" },
        { name: "REST APIs & OpenAPI", depth: "Production" },
        { name: "OpenTelemetry", depth: "Comfortable" }
      ]
    },
    {
      category: "Real-Time & Telecom",
      skills: [
        { name: "WebRTC & UDP", depth: "Production" },
        { name: "Socket.IO", depth: "Production" },
        { name: "Telegraf / Telegram Bot API", depth: "Production" },
        { name: "AES-256 Crypto", depth: "Comfortable" }
      ]
    },
    {
      category: "Frontend & Mobile",
      skills: [
        { name: "Next.js App Router", depth: "Production" },
        { name: "React", depth: "Production" },
        { name: "Tailwind CSS", depth: "Production" },
        { name: "Zustand", depth: "Production" },
        { name: "PWA & Service Workers", depth: "Production" },
        { name: "Capacitor Mobile", depth: "Comfortable" }
      ]
    },
    {
      category: "Databases & Infrastructure",
      skills: [
        { name: "PostgreSQL", depth: "Production" },
        { name: "Prisma ORM", depth: "Production" },
        { name: "Redis & Queue Systems", depth: "Production" },
        { name: "SQLite", depth: "Production" },
        { name: "Docker & Containerization", depth: "Production" },
        { name: "GitHub Actions / GitLab CI/CD", depth: "Comfortable" }
      ]
    }
  ],

  experience: [
    {
      company: "Najot Ta'lim",
      role: "Assistant Teacher (Bootcamp Foundation)",
      period: "Feb 2026 – Apr 2026 (2 mos)",
      location: "Tashkent, Uzbekistan",
      details: [
        "Mentored 50+ students in computer science fundamentals, algorithms, data structures, C, and Python.",
        "Conducted daily code review sessions, live debugging workshops, and software engineering practice tests.",
        "Guided student projects through Git workflows, clean code principles, and problem-solving methodologies."
      ]
    }
  ],

  education: [
    { course: "Full-Stack Development Course", school: "Najot Ta'lim", date: "Jun 2025" },
    { course: "Backend Development", school: "Ravnat Ziyo", date: "Jul 2024" },
    { course: "Backend Development", school: "CoddyCamp", date: "Oct 2024" }
  ]
};
