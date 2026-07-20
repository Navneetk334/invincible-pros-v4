import { DOMAINS, type Domain } from "@/lib/services";

/* ------------------------------------------------------------------ */
/*  V2 CONTENT — descriptions, service-page data, and marketing copy   */
/*  Extends the existing DOMAINS without modifying the current site.   */
/* ------------------------------------------------------------------ */

export type FAQ = { q: string; a: string };

export type CategoryContent = {
  slug: string;
  /** one-line description shown in the services list */
  blurb: string;
  /** SEO/AI-readable overview paragraph for the service page */
  overview: string;
  benefits: string[];
  features: string[];
  tech: string[];
  industries: string[];
  faqs: FAQ[];
  /** per-service one-liners (keyed by service name) */
  serviceBlurbs: Record<string, string>;
};

export const CATEGORY: Record<string, CategoryContent> = {
  build: {
    slug: "build",
    blurb:
      "Custom software, web & mobile apps, SaaS platforms, APIs and databases engineered to scale.",
    overview:
      "INVINCIBLE PROS. is a software development company that designs, builds and scales web applications, mobile apps, SaaS platforms, CRM and ERP systems, APIs and databases. We turn product ideas into reliable, high-performing software your business can grow on.",
    benefits: [
      "Ship faster with a senior, product-minded engineering team",
      "Architected to scale from first user to millions",
      "Clean, documented, maintainable codebases you own",
      "Security and performance built in from day one",
    ],
    features: [
      "Web application development",
      "iOS, Android & cross-platform mobile apps",
      "SaaS platform architecture",
      "CRM & ERP systems",
      "API design & integration",
      "Database engineering & optimization",
      "Custom software & digital transformation",
    ],
    tech: ["React", "Next.js", "Node.js", "Flutter", "Laravel", "PostgreSQL", "GraphQL", "Redis"],
    industries: ["Enterprise", "Startups", "Finance", "Healthcare", "Retail"],
    faqs: [
      {
        q: "Do you build both web and mobile apps?",
        a: "Yes. We build responsive web applications and native or cross-platform mobile apps (iOS & Android), often sharing one backend and API layer.",
      },
      {
        q: "Can you work with our existing codebase?",
        a: "Absolutely. We audit, refactor, extend and modernize existing systems as readily as we build new ones from scratch.",
      },
      {
        q: "Do we own the code?",
        a: "Always. You receive full ownership of the source code, infrastructure and documentation.",
      },
    ],
    serviceBlurbs: {
      "Web Development": "Fast, accessible web apps built on modern frameworks.",
      "Mobile App Development": "Native and cross-platform apps for iOS and Android.",
      "Enterprise Software": "Robust internal systems that run your operation.",
      "SaaS Platforms": "Multi-tenant products architected to scale.",
      CRM: "Customer platforms tailored to how you actually sell.",
      ERP: "Unified operations, finance and supply-chain systems.",
      "API Development": "Secure, well-documented APIs and integrations.",
      "Database Engineering": "Data models tuned for speed and reliability.",
      "Custom Software": "Bespoke systems built around your exact workflow.",
    },
  },
  intelligence: {
    slug: "intelligence",
    blurb:
      "AI integration, machine learning, automation and dashboards that turn data into decisions.",
    overview:
      "We build AI and data solutions — from LLM and OpenAI integrations to custom machine learning models, workflow automation, data visualization and dashboard engineering. We help enterprises turn raw data into decisions and repetitive work into autonomous systems.",
    benefits: [
      "Practical AI tied to real business outcomes, not hype",
      "Automate repetitive workflows and cut operating cost",
      "Decision-ready dashboards from messy data sources",
      "Models that keep improving with your data",
    ],
    features: [
      "AI & LLM integration (OpenAI, RAG, agents)",
      "Custom machine learning models",
      "Process & workflow automation",
      "Data visualization",
      "Dashboard engineering",
      "Digital transformation strategy",
    ],
    tech: ["Python", "OpenAI", "TensorFlow", "Node.js", "PostgreSQL", "Redis"],
    industries: ["Finance", "Healthcare", "Manufacturing", "Retail", "Enterprise"],
    faqs: [
      {
        q: "Can you integrate AI into our existing product?",
        a: "Yes — we add AI features (chat, search, recommendations, automation) to existing apps, or build standalone AI systems end to end.",
      },
      {
        q: "Is our data kept private?",
        a: "We design for data privacy and can deploy models in your own cloud or on-prem so sensitive data never leaves your control.",
      },
    ],
    serviceBlurbs: {
      "AI Integration": "Add intelligent features to your products.",
      "Machine Learning": "Custom models trained on your data.",
      Automation: "Replace repetitive work with reliable pipelines.",
      "Data Visualization": "Make complex data instantly legible.",
      "Dashboard Engineering": "Live, decision-ready operational views.",
      "Digital Transformation": "Modernize how your whole business runs.",
    },
  },
  design: {
    slug: "design",
    blurb:
      "UI/UX, brand identity, motion and video production that make products feel inevitable.",
    overview:
      "Our design studio delivers UI/UX design, brand identity, graphic design, motion graphics and video production. We craft interfaces and brands that are beautiful, usable and unmistakably yours.",
    benefits: [
      "Interfaces that convert and delight",
      "A brand system that scales across every touchpoint",
      "Design and engineering under one roof",
      "Motion and video that elevate the product story",
    ],
    features: [
      "UI/UX design & design systems",
      "Brand identity",
      "Graphic design",
      "Motion graphics",
      "Video production",
    ],
    tech: ["Figma", "Framer", "After Effects", "React", "GSAP"],
    industries: ["Startups", "Enterprise", "Retail", "Travel", "Education"],
    faqs: [
      {
        q: "Do you only design, or also build?",
        a: "Both. Because our designers and engineers work together, what we design is exactly what gets shipped — pixel for pixel.",
      },
    ],
    serviceBlurbs: {
      "UI/UX Design": "Interfaces engineered around real user behaviour.",
      "Brand Identity": "Distinctive systems that scale everywhere.",
      "Graphic Design": "Crafted visuals for every surface.",
      "Motion Graphics": "Motion that gives your product life.",
      "Video Production": "Cinematic story, start to finish.",
    },
  },
  infrastructure: {
    slug: "infrastructure",
    blurb:
      "Cloud, DevOps, networking, cyber security and anti-debugging — the resilient backbone.",
    overview:
      "We engineer IT infrastructure, cloud solutions, DevOps pipelines, networking, cyber security and anti-debugging protections. The invisible backbone that keeps your systems fast, defended and always on.",
    benefits: [
      "Resilient, auto-scaling cloud architecture",
      "Faster, safer releases with modern DevOps",
      "Hardened security and threat protection",
      "Lower cloud spend through optimization",
    ],
    features: [
      "IT infrastructure",
      "Cloud solutions (AWS & multi-cloud)",
      "Cyber security",
      "Anti-debugging & code protection",
      "DevOps & CI/CD",
      "Networking",
    ],
    tech: ["AWS", "Docker", "Linux", "Node.js", "PostgreSQL", "Redis"],
    industries: ["Enterprise", "Finance", "Government", "Healthcare"],
    faqs: [
      {
        q: "Can you migrate us to the cloud with zero downtime?",
        a: "Yes — we plan phased, zero-downtime migrations with rollback safety and full observability.",
      },
      {
        q: "Do you handle security audits?",
        a: "We perform security reviews, hardening, and set up monitoring, and can work alongside your compliance requirements.",
      },
    ],
    serviceBlurbs: {
      "IT Infrastructure": "The dependable foundation your systems run on.",
      "Cloud Solutions": "Scalable, cost-efficient cloud architecture.",
      "Cyber Security": "Defence engineered into every layer.",
      "Anti Debugging": "Protect your code and intellectual property.",
      DevOps: "Ship faster with automated, observable pipelines.",
      Networking: "Reliable, secure connectivity at any scale.",
    },
  },
  hardware: {
    slug: "hardware",
    blurb:
      "Hardware, workstations, CCTV, biometric and attendance systems where software meets the physical world.",
    overview:
      "We deliver hardware solutions, high-performance workstations, CCTV, biometric systems and attendance systems — bridging software and the physical world with sensing and security infrastructure that never blinks.",
    benefits: [
      "Integrated hardware + software from one partner",
      "Reliable physical security and access control",
      "Purpose-built workstations for demanding workloads",
      "Systems that plug into your existing software",
    ],
    features: [
      "Hardware solutions",
      "Workstations",
      "CCTV & surveillance",
      "Attendance systems",
    ],
    tech: ["Linux", "Python", "Node.js", "PostgreSQL"],
    industries: ["Government", "Manufacturing", "Education", "Enterprise", "Retail"],
    faqs: [
      {
        q: "Can hardware integrate with our software?",
        a: "Yes — we connect CCTV and attendance systems to your dashboards, HR and access-control software.",
      },
    ],
    serviceBlurbs: {
      "Hardware Solutions": "Engineered machines for real-world demands.",
      Workstations: "High-performance builds for heavy workloads.",
      CCTV: "Surveillance that integrates with your systems.",
      "Attendance Systems": "Automated, tamper-proof attendance.",
    },
  },
  experience: {
    slug: "experience",
    blurb:
      "Events, LED walls, drone coverage, photography, videography and live streaming at scale.",
    overview:
      "We engineer live experiences — event management, LED walls, walkie-talkie rental, drone coverage, photography, videography and live streaming. Light, sound, sky and stream, orchestrated into unforgettable moments.",
    benefits: [
      "One team for production, media and streaming",
      "Broadcast-quality capture and live delivery",
      "Reliable on-site technical operations",
      "Content ready for every channel afterward",
    ],
    features: [
      "Event management",
      "LED walls",
      "Walkie-talkie rental",
      "Drone coverage",
      "Photography & videography",
      "Live streaming",
    ],
    tech: ["OBS", "React", "Node.js", "AWS"],
    industries: ["Enterprise", "Government", "Education", "Travel", "Retail"],
    faqs: [
      {
        q: "Can you handle a large multi-day event end to end?",
        a: "Yes — from planning and on-site crew to LED walls, multi-camera capture and multi-platform live streaming.",
      },
    ],
    serviceBlurbs: {
      "Event Management": "Moments engineered down to the second.",
      "LED Walls": "Big, brilliant visuals for any stage.",
      "Walkie Talkie Rental": "Reliable comms for live operations.",
      "Drone Coverage": "Cinematic aerial capture.",
      Photography: "Crafted stills that tell the story.",
      Videography: "Multi-camera production, done right.",
      "Live Streaming": "Broadcast-grade streams to any platform.",
    },
  },
};

export function categoryBySlug(slug: string): { domain: Domain; content: CategoryContent } | null {
  const entry = Object.entries(CATEGORY).find(([, c]) => c.slug === slug);
  if (!entry) return null;
  const [id, content] = entry;
  const domain = DOMAINS.find((d) => d.id === id);
  if (!domain) return null;
  return { domain, content };
}

export function contentFor(id: string): CategoryContent {
  return CATEGORY[id];
}

/* ---- Shared marketing content ---- */

export const PROCESS = [
  { n: "01", title: "Discovery", body: "We learn your goals, users and constraints, then define what success looks like." },
  { n: "02", title: "Strategy", body: "We shape architecture, scope and a delivery plan built to scale." },
  { n: "03", title: "Design", body: "We design interfaces and systems that are usable, on-brand and precise." },
  { n: "04", title: "Development", body: "We engineer in tested, reviewable increments with full transparency." },
  { n: "05", title: "Deployment & Support", body: "We launch, monitor and keep improving — a long-term partner, not a vendor." },
];

export const TECH_STACK = [
  "React", "Next.js", "Flutter", "Node.js", "Laravel", "Python", "PostgreSQL",
  "Firebase", "Docker", "Linux", "AWS", "OpenAI", "TensorFlow", "GraphQL", "Redis",
];

export const INDUSTRIES = [
  "Healthcare", "Education", "Manufacturing", "Government", "Travel",
  "Finance", "Retail", "Enterprise", "Startups",
];

export const CASE_STUDIES = [
  {
    id: "atlas",
    client: "Atlas Logistics",
    title: "Real-time fleet intelligence platform",
    problem: "Dispatchers juggled six disconnected tools and reacted to problems hours too late.",
    solution: "A unified SaaS platform with live tracking, predictive ETAs and an automation engine.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    timeline: "16 weeks",
    outcome: "Fewer late deliveries, faster dispatch decisions and one system replacing six.",
    metric: "-38%",
    metricLabel: "late deliveries",
    color: "#4d6bff",
  },
  {
    id: "nova",
    client: "Nova Health",
    title: "AI triage & patient dashboard",
    problem: "Clinicians spent hours summarising records before every consultation.",
    solution: "An AI assistant that summarises records and a secure, real-time patient dashboard.",
    tech: ["Python", "OpenAI", "React", "PostgreSQL"],
    timeline: "20 weeks",
    outcome: "Consultations start faster and clinicians reclaim hours every week.",
    metric: "3.5h",
    metricLabel: "saved / clinician / week",
    color: "#2dd4bf",
  },
  {
    id: "vertex",
    client: "Vertex Retail",
    title: "Omnichannel commerce & CRM",
    problem: "Online and in-store data lived apart, so customers felt like strangers everywhere.",
    solution: "A headless commerce build with a custom CRM unifying every channel and touchpoint.",
    tech: ["Next.js", "GraphQL", "Redis", "AWS"],
    timeline: "24 weeks",
    outcome: "One customer view across channels and a measurable lift in repeat purchases.",
    metric: "+27%",
    metricLabel: "repeat revenue",
    color: "#fb7185",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They operate like an in-house engineering team, not an agency. The system they built scaled past every target we set.",
    name: "Sarah Merchant",
    role: "VP of Product",
    company: "Atlas Logistics",
  },
  {
    quote:
      "Rare to find a partner strong in both design and deep engineering. INVINCIBLE PROS. was both, and delivered ahead of schedule.",
    name: "Daniel Osei",
    role: "CTO",
    company: "Nova Health",
  },
];

export const WHY_US = [
  { title: "Engineering-first", body: "Senior engineers on every project — depth, not just delivery." },
  { title: "End-to-end execution", body: "Strategy, design, build and support under one roof." },
  { title: "One partner", body: "Software, AI, cloud, hardware and media — no juggling vendors." },
  { title: "Scalable systems", body: "Architected to grow from your first user to millions." },
  { title: "Enterprise quality", body: "Security, testing and documentation as standard." },
  { title: "Long-term support", body: "We stay on to monitor, iterate and improve." },
];

export const CONTACT = {
  email: "admin@invinciblepros.com",
  phone: "+91 8700025535",
  whatsapp: "https://wa.me/918700025535",
};
