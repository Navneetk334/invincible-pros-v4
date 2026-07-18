/* One-off generator: matches the requested tech list against simple-icons
 * and writes an inlined data module (paths + brand colors) so the client
 * bundle stays tiny and has no runtime dependency on simple-icons. */
const fs = require("fs");
const path = require("path");
const si = require("simple-icons");

const icons = Object.values(si);
const byKey = new Map();
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
for (const ic of icons) {
  byKey.set(norm(ic.title), ic);
  byKey.set(norm(ic.slug), ic);
}

// Requested list (order = priority). alias -> explicit slug/title to look up.
const LIST = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js",
  "Nuxt.js", "Angular", "Tailwind CSS", "Bootstrap", "Material UI", "ShadCN UI",
  "Chakra UI", "Framer Motion", "GSAP", "Flutter", "Dart", "React Native",
  "Kotlin", "Java", "Swift", "SwiftUI", "Android", "iOS", "Node.js",
  "Express.js", "NestJS", "Laravel", "PHP", "Python", "Django", "FastAPI",
  ".NET", "Ruby on Rails", "PostgreSQL", "MySQL", "MariaDB", "SQLite",
  "MongoDB", "Firebase", "Firestore", "Redis", "Supabase", "SQL Server",
  "Oracle Database", "Cassandra", "REST API", "GraphQL", "gRPC", "WebSockets",
  "Webhooks", "OAuth 2.0", "JWT", "OpenAPI", "Swagger", "AWS",
  "Microsoft Azure", "Google Cloud", "Cloudflare", "DigitalOcean", "Vercel",
  "Netlify", "Railway", "Render", "Hostinger", "Docker", "Kubernetes",
  "Nginx", "Apache", "Linux", "Ubuntu", "Git", "GitHub", "OpenAI",
  "Anthropic Claude", "Google Gemini", "DeepSeek", "ElevenLabs", "Nvidia",
  "Power BI", "Tableau", "Looker Studio", "Grafana", "Metabase", "WordPress",
  "WooCommerce", "Shopify", "Razorpay", "Stripe", "PayPal", "Cashfree",
  "PhonePe", "RFID", "NFC", "Cisco", "Ubiquiti", "Fortinet", "Figma",
  "Adobe XD", "Photoshop", "Illustrator", "After Effects", "Premiere Pro",
  "Blender", "Canva", "Google Analytics", "Google Tag Manager",
  "Google Search Console", "Ahrefs", "SEMrush", "Lighthouse",
];

// Hardware / component brands to append after the core stack (Android already in LIST).
const HARDWARE = [
  "Intel", "AMD", "Dell", "HPE", "Lenovo", "Asus", "MSI", "Cooler Master",
  "Gigabyte", "ASRock", "Corsair", "Deepcool", "Seagate", "Western Digital",
  "Micron", "Crucial", "Synology",
];

// Explicit slug aliases for names that don't match title/slug directly.
const ALIAS = {
  "CSS3": "css",
  "Cassandra": "apachecassandra",
  "Cooler Master": "coolermaster",
  "JavaScript": "javascript",
  "Next.js": "nextdotjs",
  "Vue.js": "vuedotjs",
  "Nuxt.js": "nuxt",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  "Material UI": "mui",
  "Chakra UI": "chakraui",
  "ShadCN UI": "shadcnui",
  "Framer Motion": "framer",
  "GSAP": "greensock",
  "SwiftUI": "swift",
  ".NET": "dotnet",
  "Ruby on Rails": "rubyonrails",
  "SQL Server": "microsoftsqlserver",
  "Oracle Database": "oracle",
  "Google Cloud": "googlecloud",
  "Microsoft Azure": "microsoftazure",
  "AWS": "amazonwebservices",
  "Google Gemini": "googlegemini",
  "Anthropic Claude": "anthropic",
  "JWT": "jsonwebtokens",
  "OpenAPI": "openapiinitiative",
  "iOS": "apple",
  "Nvidia": "nvidia",
  "Power BI": "powerbi",
  "Looker Studio": "looker",
  "Adobe XD": "adobexd",
  "Photoshop": "adobephotoshop",
  "Illustrator": "adobeillustrator",
  "After Effects": "adobeaftereffects",
  "Premiere Pro": "adobepremierepro",
  "Google Analytics": "googleanalytics",
  "Google Tag Manager": "googletagmanager",
  "Google Search Console": "googlesearchconsole",
  "SEMrush": "semrush",
  "Ahrefs": "ahrefs",
  "React Native": "react",
  "Hostinger": "hostinger",
};

// Notable brands removed from simple-icons (trademark) — elegant monogram badges.
const FALLBACK = {
  "Java": { hex: "#F89820", mono: "Jv" },
  "SQL Server": { hex: "#CC2927", mono: "SQL" },
  "Oracle Database": { hex: "#F80000", mono: "Or" },
  "AWS": { hex: "#FF9900", mono: "aws" },
  "Microsoft Azure": { hex: "#0089D6", mono: "Az" },
  "OpenAI": { hex: "#10A37F", mono: "AI" },
  "Power BI": { hex: "#F2C811", mono: "BI" },
  "Tableau": { hex: "#E97627", mono: "Tb" },
  "Photoshop": { hex: "#31A8FF", mono: "Ps" },
  "Illustrator": { hex: "#FF9A00", mono: "Ai" },
  "After Effects": { hex: "#9999FF", mono: "Ae" },
  "Premiere Pro": { hex: "#EA77FF", mono: "Pr" },
  "Adobe XD": { hex: "#FF61F6", mono: "Xd" },
  "Canva": { hex: "#00C4CC", mono: "Cv" },
  "HPE": { hex: "#01A982", mono: "HPE" },
  "Gigabyte": { hex: "#E8460E", mono: "GB" },
  "ASRock": { hex: "#A9A9A9", mono: "AR" },
  "Western Digital": { hex: "#005CB9", mono: "WD" },
  "Micron": { hex: "#004C97", mono: "Mi" },
  "Crucial": { hex: "#0072CE", mono: "Cr" },
};

const missing = [];
function resolve(name) {
  let ic = null;
  if (ALIAS[name]) ic = byKey.get(norm(ALIAS[name]));
  if (!ic) ic = byKey.get(norm(name));
  if (ic) return { name, path: ic.path, hex: `#${ic.hex}` };
  if (FALLBACK[name]) return { name, mono: FALLBACK[name].mono, hex: FALLBACK[name].hex };
  missing.push(name);
  return null;
}

// Core stack: keep the strongest ~80 in the user's priority order.
const core = LIST.map(resolve).filter(Boolean).slice(0, 80);
// Append hardware brands, skipping any already present (e.g. Android).
const seen = new Set(core.map((x) => x.name));
const hardware = HARDWARE.map(resolve).filter((x) => x && !seen.has(x.name));
const final = [...core, ...hardware];

console.log(`INCLUDED ${final.length} (core ${core.length} + hardware ${hardware.length})`);
console.log(`SKIPPED (no logo): ${missing.join(", ")}`);

const out =
  `// AUTO-GENERATED by scripts/gen-tech.cjs — do not edit by hand.\n` +
  `export type TechLogo = { name: string; path?: string; mono?: string; hex: string };\n\n` +
  `export const TECH_LOGOS: TechLogo[] = ${JSON.stringify(final, null, 2)};\n`;

fs.writeFileSync(
  path.join(__dirname, "..", "src", "lib", "techlogos.ts"),
  out,
  "utf8",
);
console.log("wrote src/lib/techlogos.ts");
