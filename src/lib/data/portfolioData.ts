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
  architectureDiagram: {
    nodes: { label: string; type: "client" | "api" | "db" | "cache" | "realtime" | "queue" }[];
    flow: string;
  };
  githubUrl?: string;
  liveUrl?: string;
}

export interface Highlight {
  id: string;
  title: string;
  productRef: string;
  tag: string;
  summary: string;
  details: string[];
  tech: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: string; icon?: string; badge?: string }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  course: string;
  location: string;
  period: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Moxirbek Solijonov",
    role: "Full-Stack Engineer",
    locationPill: "Full-Stack Engineer • Tashkent, Uzbekistan",
    availability: "Open to Software Engineering Roles",
    location: "Tashkent, Uzbekistan",
    phone: "+998 99 145 96 86",
    email: "moxirbekmoxirbek29@gmail.com",
    telegram: "https://t.me/solijonov_m",
    telegramHandle: "@solijonov_m",
    github: "https://github.com/Moxirbek-Solijonov",
    linkedin: "https://linkedin.com/in/moxirbek",
    headline: "I build production-grade web applications, real-time systems, and developer-focused products from architecture to deployment.",
    storyBio: "From teaching programming fundamentals at Najot Ta'lim to building multi-tenant educational platforms, real-time communication systems, and automation products, my focus is turning complex ideas into reliable software.",
    philosophyTitle: "I enjoy solving problems that go beyond CRUD applications.",
    philosophyPoints: [
      {
        title: "Multi-Tenant Architecture",
        desc: "Designing isolated database schemas, RBAC policies, and modular tenancy for multi-center SaaS products."
      },
      {
        title: "Real-Time Communication",
        desc: "Building WebRTC media proxies, AES-256 encrypted voice channels, and Socket.IO real-time state synchronization."
      },
      {
        title: "Educational Engineering",
        desc: "Engineering spaced-repetition engines, offline-first PWA caching, and gamified achievement systems."
      },
      {
        title: "High-Throughput Automation",
        desc: "Developing anti-blocking Telegram scrapers with rotating proxy pools, Redis queues, and streaming pipelines."
      }
    ]
  },

  products: [
    {
      id: "educoin",
      title: "Educoin",
      subtitle: "Multi-Tenant Educational CRM & LMS Platform",
      period: "2026.04 – Present",
      role: "Lead Backend & Systems Architect",
      description: "Architected and developed a multi-tenant educational CRM and LMS backend supporting role-based access control across multiple educational centers, payment tracking, and automated student engagement.",
      problem: "Educational centers struggled with manual attendance, isolated center data, fragmented payment verification, and low student retention due to lack of automated engagement.",
      solution: "Engineered a unified multi-tenant NestJS backend with tenant-isolated database models, automated attendance tracking, gamified coin rewards marketplace, and Telegram bot integration for real-time notifications.",
      tags: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker", "GitLab CI/CD", "OpenTelemetry", "Telegram Bot"],
      metrics: [
        "Multi-Tenant RBAC across isolated educational centers",
        "Redis-backed OTP verification & JWT auth pipeline",
        "OpenTelemetry distributed tracing for DB queries",
        "Automated Telegram Bot for real-time notifications"
      ],
      features: [
        "Tenant-isolated schema design with modular role-based access control (RBAC)",
        "Attendance tracking, automated class scheduling, and payment accounting workflows",
        "Gamified student reward system with coin economy and integrated reward marketplace",
        "Redis-backed OTP authentication and secure JWT refresh token rotation",
        "Docker containerization with automated GitLab CI/CD deployment pipelines",
        "OpenTelemetry integration for database query optimization and system observability"
      ],
      architectureDiagram: {
        nodes: [
          { label: "Client Apps / Web Admin", type: "client" },
          { label: "NestJS API Gateway", type: "api" },
          { label: "Redis (OTP & Session Cache)", type: "cache" },
          { label: "PostgreSQL (Multi-Tenant DB)", type: "db" },
          { label: "Telegram Notification Bot", type: "queue" },
          { label: "OpenTelemetry Tracer", type: "realtime" }
        ],
        flow: "Client App ──► NestJS API Gateway ──► Redis OTP/Cache ──► PostgreSQL (Prisma ORM) ──► Telegram Bot"
      },
      githubUrl: "https://github.com/Moxirbek-Solijonov",
      liveUrl: "#"
    },
    {
      id: "ross-messenger",
      title: "Ross Messenger",
      subtitle: "Telegram-Inspired WebRTC Messaging & VoIP Platform",
      period: "2025.11 – 2026.02",
      role: "Full-Stack Engineer & DevOps",
      description: "Cross-platform messaging and VoIP communication application featuring end-to-end encrypted peer-to-peer voice calls, virtualized chat list rendering, and custom media proxy infrastructure.",
      problem: "Standard browser-based messaging apps struggle with high-latency audio transmission, memory memory leaks when rendering thousands of messages, and insecure peer-to-peer media paths.",
      solution: "Developed a custom Node.js WebRTC-to-UDP media proxy with Diffie-Hellman key exchanges, AES-256-CTR packet encryption, and virtualized infinity list rendering using react-window.",
      tags: ["Next.js", "Node.js", "WebRTC", "TypeScript", "Zustand", "Framer Motion", "Capacitor", "react-window"],
      metrics: [
        "Sub-100ms WebRTC voice call latency via custom UDP proxy",
        "AES-256-CTR media encryption with Diffie-Hellman exchange",
        "Virtualized rendering of 10,000+ chat messages at 60 FPS",
        "Cross-platform Android packaging via Capacitor"
      ],
      features: [
        "Custom Node.js WebRTC-to-UDP media proxy for low-latency peer-to-peer voice calls",
        "On-the-fly AES-256-CTR encryption and secure Diffie-Hellman key exchange protocols",
        "Virtualized chat lists using react-window for smooth, memory-efficient infinite scroll",
        "Zustand lightweight state management for real-time socket connections and active call state",
        "Cross-platform mobile wrapper via Capacitor for native Android performance",
        "Framer Motion interactive micro-animations for sleek Linear/Telegram aesthetics"
      ],
      architectureDiagram: {
        nodes: [
          { label: "User A (Next.js PWA / Android)", type: "client" },
          { label: "Signaling Server (Socket.IO)", type: "realtime" },
          { label: "Node.js WebRTC-to-UDP Proxy", type: "api" },
          { label: "AES-256-CTR Crypto Pipeline", type: "db" },
          { label: "User B (Peer Recipient)", type: "client" }
        ],
        flow: "User A ──► Socket.IO Signaling ──► Node.js WebRTC UDP Proxy (AES-256-CTR) ──► User B"
      },
      githubUrl: "https://github.com/Moxirbek-Solijonov",
      liveUrl: "#"
    },
    {
      id: "mk-academy",
      title: "MK Academy",
      subtitle: "Gamified CEFR English Learning Platform (Web, PWA, Mobile)",
      period: "2025.08 – 2025.11",
      role: "Frontend Engineer & PWA Architect",
      description: "Multi-role cross-platform CEFR English learning ecosystem featuring spaced repetition vocabulary algorithms, achievement gamification, and offline-first service worker architecture.",
      problem: "Language learners suffer from high drop-off rates due to boring static content and lose progress when studying in low-connectivity mobile environments.",
      solution: "Engineered a gamified PWA with spaced repetition memory cards, offline-first Axios interceptors, service worker caching, and XP/level achievement mechanics.",
      tags: ["Next.js", "React", "TypeScript", "NestJS", "Prisma", "Tailwind CSS", "PWA", "Service Workers", "Capacitor"],
      metrics: [
        "Offline-first PWA caching with Axios service worker interceptors",
        "Spaced-repetition memory engine for vocabulary retention",
        "Gamified XP, streaks, levels, and badge achievement system",
        "Multi-role web, PWA, Android & iOS deployments"
      ],
      features: [
        "Spaced repetition algorithm designed to optimize vocabulary retention and learning intervals",
        "Gamified XP progression system, daily login streaks, levels, and unlockable badges",
        "Offline-first architecture utilizing custom Axios caching and Service Worker background sync",
        "Multi-role user capabilities for students, instructors, and curriculum administrators",
        "Capacitor mobile build pipeline generating production native Android/iOS packages",
        "Automated CI/CD deployment workflow leveraging GitHub Actions"
      ],
      architectureDiagram: {
        nodes: [
          { label: "Student App (PWA / Mobile)", type: "client" },
          { label: "Axios Offline Cache & Service Worker", type: "cache" },
          { label: "NestJS Learning API", type: "api" },
          { label: "Spaced Repetition Algorithm", type: "queue" },
          { label: "PostgreSQL Database", type: "db" }
        ],
        flow: "Student PWA ──► Service Worker / Axios Cache ──► NestJS API ──► Spaced Repetition Engine"
      },
      githubUrl: "https://github.com/Moxirbek-Solijonov",
      liveUrl: "#"
    },
    {
      id: "instagram-bot",
      title: "Instagram Media Delivery Bot",
      subtitle: "High-Performance Anti-Blocking Telegram Automation System",
      period: "2025.06 – 2025.08",
      role: "Backend & Automation Engineer",
      description: "High-throughput Telegram bot engineered for reliable media extraction and delivery using proxy pool rotation, concurrency-limited queue management, and CDN direct streaming.",
      problem: "Frequent IP rate limits, scraper bans, and heavy memory overhead when downloading and serving high-definition video/audio content via Telegram.",
      solution: "Constructed an anti-blocking architecture featuring a rotating proxy pool, session management, Redis concurrency queues with randomized delay jitters, and CDN streaming pipelines.",
      tags: ["Node.js", "NestJS", "Telegraf", "Redis", "SQLite", "Proxy Pool", "Queue Systems", "Docker"],
      metrics: [
        "Anti-blocking session rotation across proxy pool",
        "Redis concurrency-limited queue with randomized jitter delays",
        "CDN-direct Node.js streaming pipeline (Zero disk bloat)",
        "Automatic audio extraction fallback engine"
      ],
      features: [
        "Anti-blocking scraper architecture utilizing rotating proxy pools and active session rotation",
        "Concurrency-limited Redis job queue with randomized delay jitters to bypass anti-bot heuristics",
        "Node.js memory-efficient stream piping directly from source CDN to Telegram API without disk storage",
        "SQLite and Redis multi-layer caching for instant re-delivery of previously fetched media",
        "Automatic fallback mechanism extracting audio tracks when video downloads are restricted",
        "Telegraf bot framework integration with administrative status monitors and error analytics"
      ],
      architectureDiagram: {
        nodes: [
          { label: "Telegram User Command", type: "client" },
          { label: "Telegraf Bot Router", type: "api" },
          { label: "Redis Concurrency Queue", type: "queue" },
          { label: "Rotating Proxy Pool", type: "realtime" },
          { label: "Node.js Stream Pipeline (CDN Direct)", type: "db" }
        ],
        flow: "Telegram Client ──► Telegraf Bot ──► Redis Queue ──► Proxy Pool ──► CDN Stream Pipeline"
      },
      githubUrl: "https://github.com/Moxirbek-Solijonov",
      liveUrl: "#"
    }
  ] as Product[],

  engineeringHighlights: [
    {
      id: "multi-tenant-rbac",
      title: "Multi-Tenant RBAC & Tenant Isolation",
      productRef: "Educoin",
      tag: "Backend Architecture",
      summary: "Engineered scalable multi-tenancy for educational institutions with isolated database access, role-based authorization, and OpenTelemetry query observability.",
      details: [
        "Implemented schema-level tenant isolation preventing cross-center data leakage.",
        "Built dynamic RBAC authorization decorators in NestJS for granular permission control.",
        "Integrated OpenTelemetry distributed tracing to diagnose and eliminate slow SQL queries.",
        "Containerized whole stack with Docker Compose and automated deployments via GitLab CI/CD."
      ],
      tech: ["NestJS", "PostgreSQL", "Prisma", "Redis", "OpenTelemetry"]
    },
    {
      id: "webrtc-udp-proxy",
      title: "Custom WebRTC-to-UDP Encrypted Media Proxy",
      productRef: "Ross Messenger",
      tag: "Real-Time & Telecom",
      summary: "Designed a lightweight Node.js media proxy server delivering sub-100ms peer-to-peer encrypted voice transmission.",
      details: [
        "Implemented Diffie-Hellman key exchange for zero-trust caller authentication.",
        "Engineered on-the-fly AES-256-CTR payload encryption for low latency UDP packets.",
        "Optimized client message rendering using react-window to maintain 60 FPS under 10,000+ items.",
        "Packaged mobile version into native Android APK using Capacitor and Zustand state management."
      ],
      tech: ["WebRTC", "Node.js", "Socket.IO", "Crypto", "Capacitor"]
    },
    {
      id: "proxy-pool-automation",
      title: "Anti-Blocking Scraper & Proxy Rotation Pool",
      productRef: "Instagram Media Delivery Bot",
      tag: "Automation & Infrastructure",
      summary: "Constructed a resilient media extraction automation service capable of processing continuous requests without IP rate-limit bans.",
      details: [
        "Configured dynamic proxy pool rotation and session cycle management.",
        "Built Redis concurrency-limited queues with randomized jitter timings to avoid bot detection.",
        "Implemented zero-file-write stream piping to transmit media direct from CDN to user.",
        "Added SQLite fast-path cache to instantly return popular media requests in under 50ms."
      ],
      tech: ["Telegraf", "Redis", "SQLite", "Proxy Pool", "Node Streams"]
    },
    {
      id: "pwa-spaced-repetition",
      title: "Offline-First Spaced Repetition Gamification Engine",
      productRef: "MK Academy",
      tag: "Frontend & UX Engineering",
      summary: "Created a cross-platform learning application that works seamlessly offline with automated background sync and gamified progress rewards.",
      details: [
        "Developed custom Leitner/SuperMemo spaced repetition algorithm for vocabulary cards.",
        "Built Axios service worker interceptors to queue mutation requests during offline periods.",
        "Designed XP progression system, daily streak tracking, and achievement badges.",
        "Shipped unified codebase across Web, PWA, Android, and iOS targets."
      ],
      tech: ["Next.js", "TypeScript", "Service Workers", "Zustand", "Tailwind"]
    }
  ] as Highlight[],

  skillCategories: [
    {
      title: "Backend & Systems Architecture",
      description: "Scalable APIs, database modeling, authentication, and microservices.",
      skills: [
        { name: "TypeScript", level: "Advanced", badge: "Primary" },
        { name: "Node.js", level: "Advanced" },
        { name: "NestJS", level: "Advanced", badge: "Core Stack" },
        { name: "Express.js", level: "Proficient" },
        { name: "REST APIs & Swagger", level: "Advanced" },
        { name: "OpenTelemetry", level: "Intermediate" }
      ]
    },
    {
      title: "Real-Time & Communications",
      description: "WebRTC audio/video pipelines, WebSockets, and automation bots.",
      skills: [
        { name: "WebRTC & UDP", level: "Intermediate", badge: "Telecom" },
        { name: "Socket.IO", level: "Advanced" },
        { name: "Telegram Bot API / Telegraf", level: "Advanced", badge: "Automation" },
        { name: "AES-256 Crypto Systems", level: "Intermediate" }
      ]
    },
    {
      title: "Frontend Engineering",
      description: "Modern, responsive, performant user interfaces and PWAs.",
      skills: [
        { name: "React", level: "Advanced" },
        { name: "Next.js App Router", level: "Advanced", badge: "Core Stack" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "Zustand", level: "Advanced" },
        { name: "Framer Motion", level: "Advanced" },
        { name: "PWA & Service Workers", level: "Proficient" }
      ]
    },
    {
      title: "Databases, Caching & Infra",
      description: "Relational/NoSQL databases, in-memory caching, containerization, CI/CD.",
      skills: [
        { name: "PostgreSQL", level: "Advanced", badge: "Primary DB" },
        { name: "Prisma ORM", level: "Advanced" },
        { name: "Redis & Queues", level: "Advanced", badge: "Caching & Queues" },
        { name: "SQLite", level: "Proficient" },
        { name: "Docker", level: "Proficient" },
        { name: "GitHub Actions / GitLab CI/CD", level: "Proficient" }
      ]
    }
  ] as SkillCategory[],

  experience: [
    {
      company: "Najot Ta'lim",
      role: "Assistant Teacher (Bootcamp Foundation)",
      period: "2026.02 – 2026.04",
      location: "Tashkent, Uzbekistan",
      responsibilities: [
        "Guided students in learning core programming fundamentals, data structures, and algorithms using C and Python.",
        "Mentored learners through hands-on coding assignments, live debugging sessions, and software engineering best practices.",
        "Collaborated with senior instructors to evaluate student progress and prepare them for specialized full-stack engineering tracks."
      ],
      highlights: [
        "Mentored 50+ students through fundamental computer science concepts",
        "Conducted code reviews and daily debugging workshops",
        "Reinforced clean code, algorithmic thinking, and problem solving"
      ]
    }
  ] as ExperienceItem[],

  education: [
    {
      institution: "Najot Ta’lim",
      course: "Full-Stack Development Course",
      location: "Tashkent, Uzbekistan",
      period: "Jun 2025"
    },
    {
      institution: "Ravnat Ziyo",
      course: "Backend Development",
      location: "Tashkent, Uzbekistan",
      period: "Jul 2024"
    },
    {
      institution: "CoddyCamp",
      course: "Backend Development",
      location: "Tashkent, Uzbekistan",
      period: "Oct 2024"
    }
  ] as EducationItem[],

  targetRoles: {
    headline: "What I'm Looking For",
    summary: "I am looking for Full-Stack or Backend Engineering opportunities where I can take ownership of complex systems, design scalable architectures, and build reliable software products.",
    opportunities: [
      "Full-Stack Engineering (TypeScript / React / Next.js / NestJS)",
      "Backend Systems & API Architecture (Node.js / NestJS / PostgreSQL / Redis)",
      "Multi-Tenant SaaS & Educational Technology Platforms",
      "Real-Time Applications & Telecom (WebRTC / WebSockets / Queues)",
      "Developer Tools & Automation Systems"
    ],
    values: [
      "End-to-End Product Ownership from Database Schema to Frontend Polish",
      "Strong Type-Safety & Maintenance Best Practices",
      "High Performance, Low Latency, & Observability Mindset"
    ]
  }
};
