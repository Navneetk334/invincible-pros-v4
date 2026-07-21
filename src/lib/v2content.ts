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
    tech: [
      "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js",
      "Angular", "Tailwind CSS", "Node.js", "Express.js", "NestJS", "Laravel",
      "PHP", "Python", "Django", "FastAPI", ".NET", "Flutter", "React Native",
      "Kotlin", "Swift", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase",
      "Supabase", "GraphQL", "JWT", "Docker", "Git", "GitHub",
    ],
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
    tech: [
      "Python", "FastAPI", "Node.js", "OpenAI", "Anthropic Claude",
      "Google Gemini", "DeepSeek", "ElevenLabs", "Nvidia", "PostgreSQL",
      "MongoDB", "Redis", "Power BI", "Tableau", "Looker Studio", "Grafana",
      "Metabase", "Docker",
    ],
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
    tech: [
      "React", "Next.js", "Vue.js", "Tailwind CSS", "HTML5", "CSS3",
      "JavaScript", "TypeScript", "Framer Motion", "GSAP", "WordPress",
    ],
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
    tech: [
      "AWS", "Microsoft Azure", "Google Cloud", "Cloudflare", "DigitalOcean",
      "Docker", "Kubernetes", "Nginx", "Apache", "Linux", "Ubuntu", "Git",
      "GitHub", "Vercel", "Netlify", "Railway", "Render", "PostgreSQL", "Redis",
    ],
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
    tech: [
      "Intel", "AMD", "Nvidia", "Dell", "HPE", "Lenovo", "Asus", "MSI",
      "Gigabyte", "ASRock", "Corsair", "Cooler Master", "Deepcool", "Seagate",
      "Western Digital", "Micron", "Crucial", "Synology", "Linux", "Python",
    ],
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
    tech: [
      "React", "Next.js", "Node.js", "AWS", "Cloudflare", "Nvidia", "Linux",
      "GitHub",
    ],
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



/* ------------------------------------------------------------------ */
/*  Individual service pages — one per capability, grouped by category */
/* ------------------------------------------------------------------ */

export type ServiceDetail = {
  /** url slug within its category, e.g. "web-development" */
  slug: string;
  /** display name, matches the name in DOMAINS[].services */
  name: string;
  /** parent category (domain id) */
  category: string;
  /** SEO/AI-readable overview paragraph */
  overview: string;
  /** "what you get" highlights */
  points: string[];
};

export const SERVICES: ServiceDetail[] = [
  // BUILD
  {
    slug: "web-development",
    name: "Web Development",
    category: "build",
    overview:
      "We build fast, accessible and SEO-friendly web applications on modern frameworks. From marketing sites to complex, data-heavy platforms, your product is engineered to load quickly, rank well and scale cleanly.",
    points: [
      "Responsive, accessible interfaces",
      "Modern frameworks (React, Next.js)",
      "SEO and performance built in",
      "Secure, maintainable codebase you own",
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    category: "build",
    overview:
      "We design and ship native and cross-platform mobile apps for iOS and Android. One shared backend, one polished experience, and an app your users actually keep on their home screen.",
    points: [
      "iOS, Android & cross-platform",
      "Shared backend and API layer",
      "Offline-ready with push notifications",
      "App store submission support",
    ],
  },
  {
    slug: "enterprise-software",
    name: "Enterprise Software",
    category: "build",
    overview:
      "We build robust internal systems that run your operation — workflow, operations and admin tools tailored to how your business actually works, not how a template thinks it should.",
    points: [
      "Tailored to your workflows",
      "Role-based access and audit trails",
      "Integrates with existing systems",
      "Built to scale with your organisation",
    ],
  },
  {
    slug: "saas-platforms",
    name: "SaaS Platforms",
    category: "build",
    overview:
      "We architect multi-tenant SaaS products from the ground up — authentication, billing, dashboards and everything needed to launch and grow a subscription business.",
    points: [
      "Multi-tenant architecture",
      "Subscriptions and billing",
      "Secure auth and roles",
      "Usage analytics and dashboards",
    ],
  },
  {
    slug: "crm",
    name: "CRM",
    category: "build",
    overview:
      "We build customer platforms tailored to how you actually sell — pipelines, contacts and automation that fit your process instead of forcing you into someone else's.",
    points: [
      "Custom pipelines and stages",
      "Contact and deal management",
      "Email and workflow automation",
      "Reporting and forecasting",
    ],
  },
  {
    slug: "erp",
    name: "ERP",
    category: "build",
    overview:
      "We unify operations, finance and supply chain into one connected ERP system so your teams work from a single source of truth.",
    points: [
      "Finance and accounting modules",
      "Inventory and supply chain",
      "Operations and HR workflows",
      "Real-time reporting",
    ],
  },
  {
    slug: "api-development",
    name: "API Development",
    category: "build",
    overview:
      "We design secure, well-documented APIs and integrations that connect your systems and power your apps — built to be reliable, versioned and easy to consume.",
    points: [
      "REST and GraphQL APIs",
      "Third-party integrations",
      "Auth, rate limiting and docs",
      "Versioning and monitoring",
    ],
  },
  {
    slug: "database-engineering",
    name: "Database Engineering",
    category: "build",
    overview:
      "We design and tune data models for speed and reliability — from schema design and indexing to query optimization and scaling.",
    points: [
      "Schema and data modeling",
      "Query and index optimization",
      "Migrations and backups",
      "Scaling and replication",
    ],
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    category: "build",
    overview:
      "We build bespoke systems around your exact workflow when off-the-shelf tools don't fit. Engineered for your process, owned by you, and built to last.",
    points: [
      "Built around your process",
      "Full source ownership",
      "Scalable architecture",
      "Long-term maintainability",
    ],
  },

  // INTELLIGENCE
  {
    slug: "ai-integration",
    name: "AI Integration",
    category: "intelligence",
    overview:
      "We add intelligent features — chat, search, recommendations and copilots — to your products using LLMs and modern AI, tied to real business outcomes rather than hype.",
    points: [
      "LLM and OpenAI integration",
      "RAG and semantic search",
      "AI assistants and copilots",
      "Grounded, safe outputs",
    ],
  },
  {
    slug: "machine-learning",
    name: "Machine Learning",
    category: "intelligence",
    overview:
      "We build and deploy custom machine-learning models trained on your data for prediction, classification and insight — and keep them improving in production.",
    points: [
      "Custom model development",
      "Training on your data",
      "Deployment and monitoring",
      "Continuous improvement",
    ],
  },
  {
    slug: "automation",
    name: "Automation",
    category: "intelligence",
    overview:
      "We replace repetitive work with reliable pipelines and workflow automation that cut operating cost and human error.",
    points: [
      "Workflow and process automation",
      "Data pipelines and ETL",
      "Integrations across your tools",
      "Scheduled and event-driven jobs",
    ],
  },
  {
    slug: "data-visualization",
    name: "Data Visualization",
    category: "intelligence",
    overview:
      "We turn complex data into clear, interactive visuals that make insight instant — designed for decisions, not decoration.",
    points: [
      "Interactive charts and maps",
      "Clear, decision-ready design",
      "Real-time data sources",
      "Embeddable in your apps",
    ],
  },
  {
    slug: "dashboard-engineering",
    name: "Dashboard Engineering",
    category: "intelligence",
    overview:
      "We build live, decision-ready dashboards that unify your metrics into one operational view your whole team can trust.",
    points: [
      "Unified KPI dashboards",
      "Real-time data feeds",
      "Role-based views",
      "Alerts and thresholds",
    ],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    category: "intelligence",
    overview:
      "We modernise how your whole business runs — legacy systems, manual processes and disconnected tools brought into one modern, connected stack.",
    points: [
      "Legacy modernization",
      "Process digitization",
      "System integration",
      "Change enablement",
    ],
  },

  // DESIGN
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    category: "design",
    overview:
      "We design interfaces engineered around real user behaviour — usable, beautiful and built to convert. Because our designers and engineers work together, what we design is what ships.",
    points: [
      "User research and flows",
      "Wireframes and prototypes",
      "Design systems",
      "Accessibility-minded UI",
    ],
  },
  {
    slug: "brand-identity",
    name: "Brand Identity",
    category: "design",
    overview:
      "We craft distinctive brand systems that scale across every touchpoint — logo, type, colour and voice that make you unmistakable.",
    points: [
      "Logo and visual identity",
      "Type and colour systems",
      "Brand guidelines",
      "Scalable across every medium",
    ],
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    category: "design",
    overview:
      "We create crafted visuals for every surface — from social and ads to decks and print — all consistent with your brand.",
    points: [
      "Marketing and social creative",
      "Presentations and decks",
      "Print-ready assets",
      "On-brand templates",
    ],
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    category: "design",
    overview:
      "We give your product and brand life with motion — explainers, UI motion and animated content that hold attention.",
    points: [
      "Explainer and promo videos",
      "UI and product motion",
      "Animated logos",
      "Social motion content",
    ],
  },
  {
    slug: "video-production",
    name: "Video Production",
    category: "design",
    overview:
      "We produce cinematic video end to end — concept, shoot and post — that tells your story with craft.",
    points: [
      "Concept and scripting",
      "Filming and direction",
      "Editing and post-production",
      "Colour and sound",
    ],
  },

  // INFRASTRUCTURE
  {
    slug: "it-infrastructure",
    name: "IT Infrastructure",
    category: "infrastructure",
    overview:
      "We design and manage the dependable foundation your systems run on — servers, storage and the environments around them.",
    points: [
      "Architecture and provisioning",
      "Servers and storage",
      "Backups and disaster recovery",
      "Monitoring and support",
    ],
  },
  {
    slug: "cloud-solutions",
    name: "Cloud Solutions",
    category: "infrastructure",
    overview:
      "We build scalable, cost-efficient cloud architecture and migrate you with phased, zero-downtime plans and full observability.",
    points: [
      "AWS and multi-cloud",
      "Zero-downtime migration",
      "Auto-scaling architecture",
      "Cost optimization",
    ],
  },
  {
    slug: "cyber-security",
    name: "Cyber Security",
    category: "infrastructure",
    overview:
      "We engineer defence into every layer — audits, hardening, monitoring and threat protection that keep your systems and data safe.",
    points: [
      "Security audits and hardening",
      "Threat monitoring",
      "Access and identity controls",
      "Compliance support",
    ],
  },
  {
    slug: "anti-debugging",
    name: "Anti Debugging",
    category: "infrastructure",
    overview:
      "We protect your code and intellectual property with anti-debugging, obfuscation and tamper-resistance techniques.",
    points: [
      "Code obfuscation",
      "Anti-tamper protection",
      "Runtime integrity checks",
      "Intellectual-property protection",
    ],
  },
  {
    slug: "devops",
    name: "DevOps",
    category: "infrastructure",
    overview:
      "We ship faster and safer with automated, observable CI/CD pipelines and infrastructure as code.",
    points: [
      "CI/CD pipelines",
      "Infrastructure as code",
      "Containers and orchestration",
      "Observability and alerting",
    ],
  },
  {
    slug: "networking",
    name: "Networking",
    category: "infrastructure",
    overview:
      "We design reliable, secure connectivity at any scale — from office networks to distributed systems.",
    points: [
      "Network design and setup",
      "VPN and secure access",
      "Performance tuning",
      "Monitoring and support",
    ],
  },

  // HARDWARE
  {
    slug: "hardware-solutions",
    name: "Hardware Solutions",
    category: "hardware",
    overview:
      "We engineer machines and sensing systems for real-world demands, integrated cleanly with your software.",
    points: [
      "Custom hardware builds",
      "Sensor and device integration",
      "Software connectivity",
      "Reliability engineering",
    ],
  },
  {
    slug: "workstations",
    name: "Workstations",
    category: "hardware",
    overview:
      "We build high-performance workstations for demanding creative and engineering workloads.",
    points: [
      "Purpose-built configurations",
      "Performance-tuned components",
      "Reliability and cooling",
      "Deployment and support",
    ],
  },
  {
    slug: "cctv",
    name: "CCTV",
    category: "hardware",
    overview:
      "We deploy surveillance that integrates with your systems — cameras, storage and remote monitoring you can rely on.",
    points: [
      "Camera systems and storage",
      "Remote monitoring",
      "Integration with dashboards",
      "Maintenance and support",
    ],
  },
  {
    slug: "attendance-systems",
    name: "Attendance Systems",
    category: "hardware",
    overview:
      "We install automated, tamper-proof attendance systems connected to your HR and access-control software.",
    points: [
      "Biometric and RFID attendance",
      "HR and payroll integration",
      "Access control",
      "Reports and audit logs",
    ],
  },

  // EXPERIENCE
  {
    slug: "event-management",
    name: "Event Management",
    category: "experience",
    overview:
      "We engineer live events down to the second — planning, crew and on-site technical operations for moments that run flawlessly.",
    points: [
      "End-to-end planning",
      "On-site crew and operations",
      "Technical direction",
      "Vendor coordination",
    ],
  },
  {
    slug: "led-walls",
    name: "LED Walls",
    category: "experience",
    overview:
      "We supply and run big, brilliant LED walls for any stage or venue, indoor or outdoor.",
    points: [
      "Indoor and outdoor LED",
      "Setup and operation",
      "Content playback",
      "On-site technicians",
    ],
  },
  {
    slug: "walkie-talkie-rental",
    name: "Walkie Talkie Rental",
    category: "experience",
    overview:
      "We provide reliable comms for live operations — walkie-talkie rental with coverage planning and on-site support.",
    points: [
      "Fleet rental",
      "Coverage planning",
      "On-site support",
      "Flexible durations",
    ],
  },
  {
    slug: "drone-coverage",
    name: "Drone Coverage",
    category: "experience",
    overview:
      "We capture cinematic aerial footage with licensed drone operations for events and sites.",
    points: [
      "Aerial photography and video",
      "Licensed operators",
      "Cinematic movement",
      "Event and site coverage",
    ],
  },
  {
    slug: "photography",
    name: "Photography",
    category: "experience",
    overview:
      "We shoot crafted stills that tell your story — events, products and brand — delivered fast and polished.",
    points: [
      "Event and product photography",
      "Brand and lifestyle shoots",
      "Professional editing",
      "Fast delivery",
    ],
  },
  {
    slug: "videography",
    name: "Videography",
    category: "experience",
    overview:
      "We deliver multi-camera video production done right — capture and post for any occasion.",
    points: [
      "Multi-camera capture",
      "Event and corporate video",
      "Editing and post-production",
      "Broadcast-quality output",
    ],
  },
  {
    slug: "live-streaming",
    name: "Live Streaming",
    category: "experience",
    overview:
      "We deliver broadcast-grade streams to any platform — single or multi-camera, reliable and clean.",
    points: [
      "Multi-platform streaming",
      "Multi-camera switching",
      "Overlays and graphics",
      "Reliable encoding",
    ],
  },
];

export function servicesForCategory(categoryId: string): ServiceDetail[] {
  return SERVICES.filter((s) => s.category === categoryId);
}

export function serviceBySlug(
  categorySlug: string,
  serviceSlug: string,
): { domain: Domain; content: CategoryContent; service: ServiceDetail } | null {
  const cat = categoryBySlug(categorySlug);
  if (!cat) return null;
  const service = SERVICES.find(
    (s) => s.category === cat.domain.id && s.slug === serviceSlug,
  );
  if (!service) return null;
  return { domain: cat.domain, content: cat.content, service };
}
