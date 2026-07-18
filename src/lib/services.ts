export type Domain = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  statement: string;
  services: string[];
  /** primary accent (hex) used by the WebGL core + UI */
  color: string;
  /** secondary accent for gradients */
  color2: string;
};

/**
 * All 38 capabilities of INVINCIBLE PROS, grouped into six cinematic
 * "domains". These are presented as chapters of an interactive film —
 * never as a grid of icons.
 */
export const DOMAINS: Domain[] = [
  {
    id: "build",
    index: "01",
    title: "BUILD",
    kicker: "Software & Product Engineering",
    statement:
      "We architect the systems the modern business runs on — from the first line of code to a platform serving millions.",
    services: [
      "Web Development",
      "Mobile App Development",
      "Enterprise Software",
      "SaaS Platforms",
      "CRM",
      "ERP",
      "API Development",
      "Database Engineering",
      "Custom Software",
    ],
    color: "#4d6bff",
    color2: "#38e1ff",
  },
  {
    id: "intelligence",
    index: "02",
    title: "INTELLIGENCE",
    kicker: "AI, Data & Automation",
    statement:
      "We turn data into decisions and repetition into autonomy — intelligence engineered into the core of your operation.",
    services: [
      "AI Integration",
      "Machine Learning",
      "Automation",
      "Data Visualization",
      "Dashboard Engineering",
      "Digital Transformation",
    ],
    color: "#7c5cff",
    color2: "#c084fc",
  },
  {
    id: "design",
    index: "03",
    title: "DESIGN",
    kicker: "Brand & Creative Direction",
    statement:
      "Interfaces that feel inevitable and brands that refuse to be forgotten — crafted frame by frame.",
    services: [
      "UI/UX Design",
      "Brand Identity",
      "Graphic Design",
      "Motion Graphics",
      "Video Production",
    ],
    color: "#fb7185",
    color2: "#fda4af",
  },
  {
    id: "infrastructure",
    index: "04",
    title: "INFRASTRUCTURE",
    kicker: "Cloud, Security & DevOps",
    statement:
      "The invisible backbone — resilient, defended and always on. We build the ground your future stands on.",
    services: [
      "IT Infrastructure",
      "Cloud Solutions",
      "Cyber Security",
      "Anti Debugging",
      "DevOps",
      "Networking",
    ],
    color: "#2dd4bf",
    color2: "#5eead4",
  },
  {
    id: "hardware",
    index: "05",
    title: "HARDWARE",
    kicker: "Physical Systems & Security",
    statement:
      "Where software meets the physical world — engineered machines and sensing systems that never blink.",
    services: [
      "Hardware Solutions",
      "Workstations",
      "CCTV",
      "Attendance Systems",
    ],
    color: "#f59e0b",
    color2: "#fcd34d",
  },
  {
    id: "experience",
    index: "06",
    title: "EXPERIENCE",
    kicker: "Events & Live Media",
    statement:
      "Moments engineered at scale — light, sound, sky and stream, orchestrated into unforgettable experiences.",
    services: [
      "Event Management",
      "LED Walls",
      "Walkie Talkie Rental",
      "Drone Coverage",
      "Photography",
      "Videography",
      "Live Streaming",
    ],
    color: "#ef4444",
    color2: "#fb923c",
  },
];

export const TOTAL_SERVICES = DOMAINS.reduce(
  (n, d) => n + d.services.length,
  0,
);
