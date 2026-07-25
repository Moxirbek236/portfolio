export interface ArchitectureNode {
  id: string;
  label: string;
  role: string;
  type: "client" | "api" | "db" | "cache" | "proxy" | "queue" | "media";
}

export interface ArchitectureFlow {
  source: string;
  target: string;
  label: string;
  protocol: string;
}

export interface ArchitectureDiagram {
  title: string;
  nodes: ArchitectureNode[];
  flows: ArchitectureFlow[];
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  description: string;
  problem: string;
  solution: string;
  retrospective?: string;
  tags: string[];
  metrics: string[];
  features: string[];
  imageUrl: string;
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
  githubUrl: string;
  isPrivate?: boolean;
  liveUrl?: string;
  architectureDiagram?: ArchitectureDiagram;
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
    locationPill: "Full-Stack Engineer • Tashkent, Uzbekistan (UTC+5)",
    nowStatus: "Currently engineering multi-tenant SaaS & WebRTC media proxies. Available for Remote & Global Software Engineering roles.",
    availability: "Available for Software Engineering Roles (Remote / Relocation)",
    location: "Tashkent, Uzbekistan",
    phone: "+998 99 145 96 86",
    email: "moxirbekmoxirbek29@gmail.com",
    telegram: "https://t.me/Rakhimberdiyev_1970",
    telegramHandle: "@Rakhimberdiyev_1970",
    github: "https://github.com/Moxirbek236",
    linkedin: "https://linkedin.com/in/moxirbek-solijonov",
    resumeUrl: "/Moxirbek-Solijonov-CV.pdf",
    avatarUrl: "/aang-avatar.jpg",
    headline: "I build resilient multi-tenant SaaS backends, WebRTC VoIP proxies, and high-throughput real-time automation engines.",
    storyBio: "I am a Full-Stack Engineer based in Tashkent, Uzbekistan with a deep focus on backend reliability, real-time protocols, and database schema design. As an Assistant Teacher & Mentor at Najot Ta'lim, I instructed 50+ students across 2 intensive CS foundation cohorts in algorithms, C, Python, and software design patterns. My work bridges complex backend systems with crisp, responsive frontend applications.",
  },

  products: [
    {
      id: "educoin",
      title: "Educoin",
      subtitle: "Multi-Tenant Educational CRM & LMS Backend Architecture",
      period: "Jan 2026 — Present",
      role: "Lead Backend Architect",
      description: "Multi-tenant CRM and LMS platform engineered for tenant isolation across educational centers, featuring automated student attendance tracking, coin economy marketplace, and Redis OTP verification.",
      problem: "Educational centers running on shared databases faced critical risks of cross-tenant data leaks across student payment records and grading rosters.",
      solution: "Engineered strict schema-isolated multi-tenancy in NestJS utilizing custom Prisma header middleware, dynamic role-based guards (RBAC), Redis sliding-window OTP auth, and OpenTelemetry SQL query tracing.",
      retrospective: "Trade-off: Middleware-level query tenant scoping adds ~1.2ms header processing latency but guarantees schema isolation across tenant boundaries without full database split complexity.",
      tags: ["NestJS", "TypeScript", "PostgreSQL", "Prisma ORM", "Redis", "Docker", "OpenTelemetry"],
      metrics: [
        "Schema-level multi-tenant isolation guaranteed via Prisma query middleware",
        "Redis-backed OTP verification with a 15-minute sliding TTL expiration window",
        "OpenTelemetry query tracing identifying database connection pool bottlenecks",
        "Automated Telegram Bot notification dispatch for real-time attendance alerts"
      ],
      features: [
        "Multi-tenant database schema architecture using Prisma tenant middleware",
        "Role-based access control (RBAC) with NestJS custom guards & decorators",
        "Gamified student rewards system with coin economy & reward marketplace",
        "Docker containerization with GitLab CI/CD automated deployment pipeline"
      ],
      imageUrl: "/educoin-ui.jpg",
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
    req['tenantId'] = tenantId;
    next();
  }
}`
      },
      isPrivate: true,
      githubUrl: "https://github.com/Moxirbek236/educoin-backend",
      architectureDiagram: {
        title: "Educoin Multi-Tenant Request Isolation Flow",
        nodes: [
          { id: "client", label: "Client App", role: "SPA / Mobile", type: "client" },
          { id: "mw", label: "Tenant MW", role: "X-Tenant-ID Header", type: "proxy" },
          { id: "nestjs", label: "NestJS API", role: "RBAC & Controllers", type: "api" },
          { id: "redis", label: "Redis Cache", role: "OTP & Session Store", type: "cache" },
          { id: "prisma", label: "Prisma ORM", role: "Scoped SQL Query", type: "db" }
        ],
        flows: [
          { source: "client", target: "mw", label: "HTTP Header", protocol: "HTTPS" },
          { source: "mw", target: "nestjs", label: "Tenant Context", protocol: "Express" },
          { source: "nestjs", target: "redis", label: "Validate OTP", protocol: "RESP" },
          { source: "nestjs", target: "prisma", label: "Scoped WHERE tenantId", protocol: "SQL" }
        ]
      }
    },
    {
      id: "ross-messenger",
      title: "Ross Messenger",
      subtitle: "Telegram-Inspired WebRTC Voice & Real-Time Messaging Engine",
      period: "Nov 2025 — Feb 2026",
      role: "Full-Stack & Telecom Engineer",
      description: "Cross-platform messaging and VoIP application featuring end-to-end encrypted peer-to-peer voice calls, a custom Node.js media proxy, and virtualized high-frequency chat rendering.",
      problem: "Standard browser WebRTC streams encountered packet relay latency and DOM memory bloat during infinite message scroll.",
      solution: "Built a lightweight Node.js WebRTC-to-UDP media proxy with on-the-fly AES-256-CTR packet encryption, Diffie-Hellman key exchanges, and react-window list virtualization to sustain smooth 60 FPS scrolling.",
      retrospective: "By virtualizing the DOM tree with react-window, message buffer heap size dropped by 64% while maintaining 60 FPS under continuous payload incoming streams.",
      tags: ["Next.js", "Node.js", "WebRTC", "Socket.IO", "Zustand", "Framer Motion", "Capacitor"],
      metrics: [
        "Sub-100ms voice packet transmission via custom Node.js UDP media proxy",
        "AES-256-CTR payload encryption with Diffie-Hellman dynamic key exchange",
        "Virtualized message list rendering 10,000+ items smoothly at 60 FPS",
        "Cross-platform Android packaging via Capacitor mobile build pipeline"
      ],
      features: [
        "Node.js WebRTC-to-UDP proxy for low-latency peer-to-peer audio transmission",
        "On-the-fly AES-256-CTR packet payload encryption and key rotation",
        "react-window list virtualization eliminating DOM bloat during infinite scroll",
        "Zustand state store synchronizing WebSockets and active WebRTC call states"
      ],
      imageUrl: "/ross-ui.jpg",
      codeSnippet: {
        filename: "server/webrtc-proxy/udp-crypto.service.ts",
        language: "typescript",
        code: `import crypto from 'crypto';

export class UDPPayloadCrypto {
  static encryptPacket(buffer: Buffer, secretKey: Buffer): Buffer {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return Buffer.concat([iv, encrypted]);
  }
}`
      },
      isPrivate: true,
      githubUrl: "https://github.com/Moxirbek236/ross-messenger",
      architectureDiagram: {
        title: "Ross Messenger Low-Latency WebRTC & Media Proxy Flow",
        nodes: [
          { id: "peerA", label: "Peer A", role: "WebRTC Audio", type: "client" },
          { id: "socket", label: "Socket.IO", role: "Signaling Server", type: "api" },
          { id: "proxy", label: "UDP Proxy", role: "AES-256-CTR Relay", type: "proxy" },
          { id: "peerB", label: "Peer B", role: "Decrypted Stream", type: "client" }
        ],
        flows: [
          { source: "peerA", target: "socket", label: "SDP Handshake", protocol: "WSS" },
          { source: "peerA", target: "proxy", label: "UDP Voice Packets", protocol: "UDP/RTP" },
          { source: "proxy", target: "peerB", label: "Encrypted Datagram", protocol: "UDP" }
        ]
      }
    },
    {
      id: "mk-academy",
      title: "MK Academy",
      subtitle: "Gamified CEFR English Learning Engine (Offline-First PWA)",
      period: "Aug 2025 — Nov 2025",
      role: "Frontend Architect & PWA Specialist",
      description: "Multi-role English learning platform featuring Leitner spaced-repetition algorithms, offline-first service worker sync, and gamified student progress mechanics.",
      problem: "Language learners experienced high drop-off rates due to static study formats and progress loss when offline on mobile devices.",
      solution: "Engineered an offline-first Progressive Web App utilizing Leitner spaced-repetition memory intervals, Service Worker queue background sync, and XP achievement streaks.",
      retrospective: "Implementing background sync via Service Worker mutation queues allowed learners to complete lessons on weak network connections without data loss.",
      tags: ["Next.js", "React", "NestJS", "Prisma", "Tailwind CSS", "Service Workers", "Capacitor"],
      metrics: [
        "Leitner spaced repetition memory algorithm optimizing card retention interval",
        "Offline-first PWA caching via Axios service worker mutation queue",
        "XP progression, daily login streak counters, and achievement badges",
        "Multi-role Web, PWA, Android, and iOS application builds"
      ],
      features: [
        "Spaced repetition engine calculating optimal card review intervals",
        "Axios service worker interceptors queuing offline mutation requests",
        "Gamified XP, streaks, levels, and unlockable achievement badges",
        "Capacitor mobile pipeline generating production native Android packages"
      ],
      imageUrl: "/mk-ui.jpg",
      codeSnippet: {
        filename: "src/lib/spaced-repetition/leitner.engine.ts",
        language: "typescript",
        code: `export function calculateNextReview(boxLevel: number, isCorrect: boolean): { nextBox: number; daysInterval: number } {
  if (!isCorrect) return { nextBox: 1, daysInterval: 1 };
  const nextBox = Math.min(boxLevel + 1, 5);
  const intervals = [1, 3, 7, 14, 30];
  return { nextBox, daysInterval: intervals[nextBox - 1] };
}`
      },
      isPrivate: true,
      githubUrl: "https://github.com/Moxirbek236/mk-academy-pwa",
      architectureDiagram: {
        title: "MK Academy Spaced Repetition & Offline Sync Pipeline",
        nodes: [
          { id: "pwa", label: "PWA UI", role: "Leitner UI", type: "client" },
          { id: "sw", label: "Service Worker", role: "Cache & Sync Queue", type: "proxy" },
          { id: "api", label: "NestJS API", role: "Sync & Progress DB", type: "api" },
          { id: "db", label: "PostgreSQL", role: "User Stats & XP", type: "db" }
        ],
        flows: [
          { source: "pwa", target: "sw", label: "Card Review Action", protocol: "Local" },
          { source: "sw", target: "api", label: "Background Queue Sync", protocol: "Fetch" },
          { source: "api", target: "db", label: "Update Leitner Box & XP", protocol: "SQL" }
        ]
      }
    },
    {
      id: "instagram-bot",
      title: "Instagram Media Delivery Bot",
      subtitle: "High-Throughput Telegram Automation Scraper Engine",
      period: "Jun 2025 — Aug 2025",
      role: "Backend & Automation Engineer",
      description: "High-throughput Telegram bot engineered for reliable media extraction using proxy pool rotation, Redis concurrency queues, and CDN direct stream piping.",
      problem: "Scraper IP rate limits, account blocks, and high memory overhead when buffering HD video files directly to server disk.",
      solution: "Constructed an anti-blocking pipeline featuring a rotating proxy pool, Redis concurrency queue with randomized jitter delays, and direct memory stream piping.",
      retrospective: "Zero-disk memory stream piping bypassed local disk I/O bottlenecks completely, allowing concurrent media downloads with < 15MB RAM per worker node.",
      tags: ["Node.js", "Telegraf", "Redis", "SQLite", "Proxy Pool", "Node Streams"],
      metrics: [
        "Anti-blocking session cycle management across rotating proxy pool",
        "Redis concurrency queue with randomized delay jitter to bypass rate limits",
        "CDN-direct Node.js stream piping eliminating server disk I/O overhead",
        "SQLite & Redis fast-path caching for sub-50ms media re-delivery"
      ],
      features: [
        "Proxy pool rotation preventing scraper IP address blocks",
        "Redis concurrency queues handling burst requests with randomized delays",
        "Direct memory stream piping from CDN source to Telegram API",
        "Automatic audio extraction fallback when video downloads are restricted"
      ],
      imageUrl: "/instabot-ui.jpg",
      codeSnippet: {
        filename: "src/queue/proxy-jitter.queue.ts",
        language: "typescript",
        code: `export async function getRotatedProxyWithJitter(proxyPool: string[]): Promise<{ proxy: string; delayMs: number }> {
  const proxy = proxyPool[Math.floor(Math.random() * proxyPool.length)];
  const delayMs = Math.floor(100 + Math.random() * 300);
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return { proxy, delayMs };
}`
      },
      isPrivate: true,
      githubUrl: "https://github.com/Moxirbek236/telegram-media-bot",
      architectureDiagram: {
        title: "High-Throughput Media Delivery Stream Pipeline",
        nodes: [
          { id: "telegram", label: "Telegram User", role: "Media Request", type: "client" },
          { id: "proxy", label: "Proxy Pool", role: "IP Rotation", type: "proxy" },
          { id: "bot", label: "Telegraf Engine", role: "Jitter Queue", type: "api" },
          { id: "redis", label: "Redis", role: "Fast-Path Cache", type: "cache" },
          { id: "cdn", label: "CDN Stream", role: "Direct Memory Pipe", type: "media" }
        ],
        flows: [
          { source: "telegram", target: "bot", label: "Bot Command", protocol: "WSS" },
          { source: "bot", target: "proxy", label: "Scrape Request", protocol: "HTTPS" },
          { source: "bot", target: "redis", label: "Check Cache", protocol: "RESP" },
          { source: "cdn", target: "telegram", label: "Pipe Pass-Through", protocol: "Stream" }
        ]
      }
    }
  ] as Product[],

  deepDives: [
    {
      id: "webrtc-udp-proxy-note",
      title: "Building a Low-Latency WebRTC UDP Media Proxy with AES-256 Encryption in Node.js",
      subtitle: "How I engineered peer-to-peer voice transmission for Ross Messenger.",
      date: "Feb 2026",
      readTime: "5 min read",
      tags: ["WebRTC", "Node.js", "UDP", "AES-256", "Telecom"],
      summary: "Browser WebRTC implementations can suffer from relay delays when direct P2P connections are NAT-restricted. Here is how I constructed a Node.js UDP media proxy with on-the-fly AES-256 packet payload encryption.",
      content: [
        "1. The Challenge: Remote TURN server relays introduce unacceptable latency for real-time voice calls across regional networks.",
        "2. The Solution: A lightweight Node.js UDP socket proxy that handles Diffie-Hellman key exchanges during call setup.",
        "3. Encryption Pipeline: Every incoming audio packet buffer is encrypted using AES-256-CTR with a 16-byte initialization vector prepended to the UDP datagram.",
        "4. Outcome: Achieved sub-100ms voice packet transmission while preserving end-to-end payload privacy."
      ]
    },
    {
      id: "multi-tenant-nestjs-prisma-note",
      title: "Implementing Schema-Level Multi-Tenancy & Dynamic RBAC in NestJS & Prisma",
      subtitle: "Architectural patterns from building Educoin's educational CRM.",
      date: "Apr 2026",
      readTime: "4 min read",
      tags: ["NestJS", "Prisma", "PostgreSQL", "Multi-Tenancy", "RBAC"],
      summary: "Multi-tenant SaaS applications must strictly prevent cross-tenant data leaks. Bypassing manual scoping errors through header middleware and Prisma query client extensions.",
      content: [
        "1. Context isolation: Extracting X-Tenant-ID header at the NestJS HTTP middleware level.",
        "2. Prisma middleware: Intercepting every SQL query to automatically scope WHERE: { tenantId } conditions.",
        "3. RBAC Guards: Decorating controllers with @Roles(Role.ADMIN, Role.TEACHER) for dynamic permission checks.",
        "4. Observability: Adding OpenTelemetry spans to trace query duration across tenant boundaries."
      ]
    }
  ] as DeepDiveArticle[],

  skillCapabilities: [
    {
      category: "Backend & Systems Architecture",
      skills: [
        { name: "TypeScript / Node.js", depth: "Production" },
        { name: "NestJS & Express.js", depth: "Production" },
        { name: "REST APIs & OpenAPI", depth: "Production" },
        { name: "Multi-Tenancy & RBAC", depth: "Production" },
        { name: "OpenTelemetry & Tracing", depth: "Comfortable" }
      ]
    },
    {
      category: "Real-Time & Telecom Protocols",
      skills: [
        { name: "WebRTC & UDP Sockets", depth: "Production" },
        { name: "Socket.IO & WebSockets", depth: "Production" },
        { name: "Telegram Bot API / Telegraf", depth: "Production" },
        { name: "AES-256 Payload Encryption", depth: "Comfortable" }
      ]
    },
    {
      category: "Frontend & Mobile Applications",
      skills: [
        { name: "Next.js (App Router)", depth: "Production" },
        { name: "React & TypeScript", depth: "Production" },
        { name: "Tailwind CSS & Vanilla CSS", depth: "Production" },
        { name: "Zustand State Engine", depth: "Production" },
        { name: "PWA & Service Workers", depth: "Production" },
        { name: "Capacitor Mobile Packaging", depth: "Comfortable" }
      ]
    },
    {
      category: "Databases & Infrastructure",
      skills: [
        { name: "PostgreSQL & Prisma ORM", depth: "Production" },
        { name: "Redis Caching & Queue Systems", depth: "Production" },
        { name: "SQLite & Embedded DBs", depth: "Production" },
        { name: "Docker & Containerization", depth: "Production" },
        { name: "GitLab CI/CD & GitHub Actions", depth: "Comfortable" }
      ]
    }
  ],

  experience: [
    {
      company: "Najot Ta'lim",
      role: "Assistant Teacher & CS Mentor (Bootcamp Foundation)",
      period: "Feb 2026 — Apr 2026",
      location: "Tashkent, Uzbekistan",
      details: [
        "Mentored 50+ students in computer science fundamentals, algorithms, data structures, C, and Python across 2 foundation cohorts.",
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
