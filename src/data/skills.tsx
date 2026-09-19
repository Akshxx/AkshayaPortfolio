import type { ReactNode } from "react";
import AceTernityLogo from "@/components/logos/aceternity";
import {
  SiThreedotjs,
  SiGit,
  SiGithub,
  SiNpm,
  SiPnpm,
  SiAmazonaws,
  SiGooglecloud,
  SiLinux,
  SiNginx,
  SiKubernetes,
  SiPytorch,
  SiGitlab,
  SiApachekafka,
  SiRabbitmq,
  SiSwift,
} from "react-icons/si";

export interface Skill {
  id: string;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: ReactNode;
  category: "frontend" | "backend" | "tools" | "other";
}

// Keep the enum for backward compatibility with animated-background.tsx
export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  PYTORCH = "pytorch",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  REDIS = "redis",
  GIT = "git",
  GITHUB = "github",
  JAVA = "java",
  NPM = "npm",
  FIREBASE = "firebase",
  FASTAPI = "fastapi",
  PYTHON = "python",
  DOCKER = "docker",
  SWIFTUI = "swiftui",
  AWS = "aws",
  DEVOPS = "devops",
  TENSORFLOW = "tensorflow",
}

// Local SVG icon renderer (same as template's MaskIcon)
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

// Text-only skill icon components
const YjsIcon = () => (<span className="text-xs font-bold"><strong>Y</strong>js</span>);
const PartyKitIcon = () => (<span className="text-base">🎈</span>);
const HocuspocusIcon = () => (<span className="text-xs font-bold">Hp</span>);
const MCPIcon = () => (<span className="text-xs font-bold">MCP</span>);
const ZustandIcon = () => (<span className="text-xs font-bold">Zu</span>);
const ExpoIcon = () => (<span className="text-xs font-bold">Expo</span>);
const NextIntlIcon = () => (<span className="text-xs font-bold">i18n</span>);
const CeleryIcon = () => (<span className="text-xs font-bold">Celery</span>);
const RESTIcon = () => (<span className="text-xs font-bold">REST</span>);
const WsIcon = () => (<span className="text-xs font-bold">WS</span>);
const CiCdIcon = () => (<span className="text-xs font-bold">CI/CD</span>);
const TestIcon = () => (<span className="text-xs font-bold">Test</span>);

// Helper to create brand skill with local SVG
const brand = (id: string, label: string, shortDescription: string, color: string, file: string, category: Skill["category"] = "tools"): Skill => ({
  id,
  name: id,
  label,
  shortDescription,
  color,
  icon: <MaskIcon src={`/assets/logos/${file}`} title={label} />,
  category,
});

// Helper for react-icon skills
const reactSkill = (id: string, label: string, shortDescription: string, color: string, IconComponent: React.ComponentType<{ className?: string }>, category: Skill["category"] = "tools"): Skill => ({
  id,
  name: id,
  label,
  shortDescription,
  color,
  icon: <IconComponent className="w-full h-full" />,
  category,
});

// Helper for text-only skills
const textSkill = (id: string, label: string, shortDescription: string, color: string, IconComponent: React.ComponentType<{}>, category: Skill["category"] = "tools"): Skill => ({
  id,
  name: id,
  label,
  shortDescription,
  color,
  icon: <IconComponent />,
  category,
});

export const SKILLS: Record<string, Skill> = {
  // Frontend
  js: brand("js", "JavaScript", "The language of the web", "#F7DF1E", "javascript-mono.svg", "frontend"),
  ts: brand("ts", "TypeScript", "Type-safe JavaScript", "#3178C6", "typescript-mono.svg", "frontend"),
  react: brand("react", "React", "Component-based UI library", "#61DAFB", "react-mono.svg", "frontend"),
  nextjs: brand("nextjs", "Next.js", "Full-stack React framework", "#000000", "nextdotjs-mono.svg", "frontend"),
  tailwind: brand("tailwind", "Tailwind CSS", "Utility-first CSS framework", "#06B6D4", "tailwind-css-mono.svg", "frontend"),
  vue: brand("vue", "Vue.js", "Progressive JavaScript framework", "#42B883", "vuedotjs-mono.svg", "frontend"),
  svelte: brand("svelte", "Svelte", "Cybernetically enhanced web apps", "#FF3E00", "svelte-mono.svg", "frontend"),
  html: brand("html", "HTML", "Semantic markup language", "#E34F26", "html5-mono.svg", "frontend"),
  css: brand("css", "CSS", "Styling the web", "#1572B6", "css3-mono.svg", "frontend"),
  motion: brand("motion", "Motion", "Animation library for React", "#0055FF", "motion.svg", "frontend"),
  gsap: brand("gsap", "GSAP", "Professional-grade animation", "#88CE02", "gsap-mono.svg", "frontend"),
  codemirror: brand("codemirror", "CodeMirror", "Versatile text editor", "#579DDD", "codemirror-mono.svg", "frontend"),
  reactFlow: brand("reactFlow", "React Flow", "Node-based editor", "#4FD1C5", "xyflow-mono.svg", "frontend"),
  shadcn: brand("shadcn", "shadcn/ui", "Beautifully designed components", "#000000", "shadcn-ui-mono.svg", "frontend"),
  chakra: brand("chakra", "Chakra UI", "Simple, modular component library", "#319795", "chakra-ui-mono.svg", "frontend"),
  aceternity: {
    id: "aceternity",
    name: "aceternity",
    label: "Aceternity",
    shortDescription: "Pre-built animated components",
    color: "#000000",
    icon: <AceTernityLogo />,
    category: "frontend",
  },
  expo: textSkill("expo", "Expo", "Universal React framework", "#000020", ExpoIcon, "frontend"),
  reactNative: brand("reactNative", "React Native", "Native mobile apps with React", "#61DAFB", "react-mono.svg", "frontend"),
  swiftui: brand("swiftui", "SwiftUI", "Native iOS UI framework", "#F05138", "swift-mono.svg", "frontend"),

  // Backend
  nodejs: brand("nodejs", "Node.js", "JavaScript runtime", "#339933", "nodedotjs-mono.svg", "backend"),
  express: brand("express", "Express", "Minimalist Node framework", "#000000", "express-mono.svg", "backend"),
  fastapi: brand("fastapi", "FastAPI", "Modern Python web framework", "#009688", "fastapi-mono.svg", "backend"),
  python: brand("python", "Python", "Versatile programming language", "#3776AB", "python-mono.svg", "backend"),
  go: brand("go", "Go", "Fast, concurrent language", "#00ADD8", "go-mono.svg", "backend"),
  java: brand("java", "Java", "Enterprise-grade language", "#ED8B00", "java-mono.svg", "backend"),
  rust: brand("rust", "Rust", "Safe, concurrent systems language", "#CE422B", "rust-mono.svg", "backend"),
  hono: brand("hono", "Hono", "Ultrafast web framework", "#E36002", "hono-mono.svg", "backend"),
  trpc: brand("trpc", "tRPC", "End-to-end typesafe APIs", "#2596BE", "trpc-mono.svg", "backend"),
  graphql: brand("graphql", "GraphQL", "Query language for APIs", "#E10098", "graphql-mono.svg", "backend"),
  rest: textSkill("rest", "REST API", "RESTful API design", "#FF6C37", RESTIcon, "backend"),
  websocket: textSkill("websocket", "WebSocket", "Real-time communication", "#010101", WsIcon, "backend"),
  c: brand("c", "C", "Systems programming", "#A8B9CC", "c-mono.svg", "backend"),
  cpp: brand("cpp", "C++", "High-performance systems", "#00599C", "cpp-mono.svg", "backend"),

  // Databases & ORMs
  postgres: brand("postgres", "PostgreSQL", "Advanced relational database", "#4169E1", "postgresql-mono.svg", "backend"),
  mysql: brand("mysql", "MySQL", "Popular relational database", "#4479A1", "mysql-mono.svg", "backend"),
  mongo: brand("mongo", "MongoDB", "Document database", "#47A248", "mongodb-mono.svg", "backend"),
  redis: brand("redis", "Redis", "In-memory data store", "#DC382D", "redis-mono.svg", "backend"),
  prisma: brand("prisma", "Prisma", "Next-generation ORM", "#2D3748", "prisma-mono.svg", "backend"),
  drizzle: brand("drizzle", "Drizzle ORM", "TypeScript ORM", "#C5F74F", "drizzle-mono.svg", "backend"),
  supabase: brand("supabase", "Supabase", "Firebase alternative", "#3ECF8E", "supabase-mono.svg", "backend"),
  firebase: brand("firebase", "Firebase", "Google's app platform", "#FFCA28", "firebase-mono.svg", "backend"),
  sanity: brand("sanity", "Sanity", "Real-time headless CMS", "#F03E2F", "sanity-mono.svg", "backend"),

  // Tools & DevOps
  docker: brand("docker", "Docker", "Containerization platform", "#2496ED", "docker-mono.svg", "tools"),
  git: reactSkill("git", "Git", "Version control system", "#F05032", SiGit, "tools"),
  github: reactSkill("github", "GitHub", "Code hosting platform", "#181717", SiGithub, "tools"),
  gitlab: reactSkill("gitlab", "GitLab", "DevOps platform", "#FC6D26", SiGitlab, "tools"),
  npm: reactSkill("npm", "NPM", "Package manager", "#CB3837", SiNpm, "tools"),
  pnpm: reactSkill("pnpm", "pnpm", "Fast, disk-efficient package manager", "#F69220", SiPnpm, "tools"),
  turborepo: brand("turborepo", "Turborepo", "High-performance build system", "#EF4444", "turborepo-mono.svg", "tools"),
  vercel: brand("vercel", "Vercel", "Frontend cloud platform", "#000000", "vercel-mono.svg", "tools"),
  cloudflare: brand("cloudflare", "Cloudflare", "Edge network platform", "#F38020", "cloudflare-mono.svg", "tools"),
  aws: reactSkill("aws", "AWS", "Cloud computing platform", "#FF9900", SiAmazonaws, "tools"),
  gcp: reactSkill("gcp", "Google Cloud", "Cloud platform", "#4285F4", SiGooglecloud, "tools"),
  linux: reactSkill("linux", "Linux", "Open-source OS", "#FCC624", SiLinux, "tools"),
  devops: reactSkill("devops", "DevOps", "CI/CD & Cloud Infrastructure", "#FCC624", SiLinux, "tools"),
  nginx: reactSkill("nginx", "Nginx", "Web server/reverse proxy", "#009639", SiNginx, "tools"),
  kubernetes: reactSkill("kubernetes", "Kubernetes", "Container orchestration", "#326CE5", SiKubernetes, "tools"),
  ci: textSkill("ci", "CI/CD", "Continuous integration/deployment", "#2088FF", CiCdIcon, "tools"),
  testing: textSkill("testing", "Testing", "Software testing", "#6C757D", TestIcon, "tools"),
  figma: brand("figma", "Figma", "Design & prototyping", "#F24E1E", "figma-mono.svg", "tools"),
  leetcode: brand("leetcode", "LeetCode", "Data structures & algorithms", "#FFA116", "leetcode-mono.svg", "tools"),

  // Real-time & Collaboration
  socketio: brand("socketio", "Socket.io", "Real-time engine", "#010101", "socketdotio-mono.svg", "backend"),
  yjs: textSkill("yjs", "Y.js", "CRDT for shared editing", "#000000", YjsIcon, "backend"),
  partykit: textSkill("partykit", "PartyKit", "Real-time on Cloudflare", "#FF6B35", PartyKitIcon, "backend"),
  hocuspocus: textSkill("hocuspocus", "Hocuspocus", "WebSocket server for Y.js", "#6366F1", HocuspocusIcon, "backend"),
  mcp: textSkill("mcp", "MCP", "Model Context Protocol", "#8B5CF6", MCPIcon, "backend"),

  // AI/ML
  tensorflow: brand("tensorflow", "TensorFlow", "ML platform", "#FF6F00", "tensorflow-mono.svg", "backend"),
  pytorch: reactSkill("pytorch", "PyTorch", "Deep learning framework", "#EE4C2C", SiPytorch, "backend"),
  aiSDK: brand("aiSDK", "Vercel AI SDK", "AI streaming for React", "#000000", "vercel-mono.svg", "backend"),
  anthropic: brand("anthropic", "Anthropic Claude", "AI assistant", "#D4A843", "anthropic-mono.svg", "backend"),
  mistral: brand("mistral", "Mistral AI", "Open-weight models", "#00D4AA", "mistral-ai-mono.svg", "backend"),
  openai: brand("openai", "OpenAI", "AI research & deployment", "#412991", "openai-mono.svg", "backend"),
  groq: brand("groq", "Groq", "Fast AI inference", "#F55036", "groq-mono.svg", "backend"),

  // Auth & Security
  betterAuth: brand("betterAuth", "Better Auth", "Framework-agnostic auth", "#3B82F6", "better-auth-mono.svg", "tools"),
  nextAuth: brand("nextAuth", "NextAuth.js", "Auth for Next.js", "#000000", "nextauth-mono.svg", "tools"),
  clerk: brand("clerk", "Clerk", "Complete user management", "#6C47FF", "clerk-mono.svg", "tools"),

  // Messaging & Queues
  redis2: brand("redis2", "Redis / BullMQ", "Queue & caching", "#DC382D", "redis-mono.svg", "backend"),
  celery: brand("celery", "Celery", "Distributed task queue", "#37814A", "celery-mono.svg", "backend"),
  kafka: reactSkill("kafka", "Apache Kafka", "Event streaming platform", "#231F20", SiApachekafka, "backend"),
  rabbitmq: reactSkill("rabbitmq", "RabbitMQ", "Message broker", "#FF6600", SiRabbitmq, "backend"),

  // Special / Design
  spline: {
    id: "spline",
    name: "spline",
    label: "Spline",
    shortDescription: "3D design tool for web",
    color: "#000000",
    icon: <SiThreedotjs />,
    category: "tools",
  },
  satori: brand("satori", "Satori / sharp", "HTML/CSS to SVG/PNG", "#000000", "sharp-mono.svg", "tools"),
  nextIntl: textSkill("nextIntl", "next-intl", "Internationalization for Next.js", "#000000", NextIntlIcon, "tools"),
  zustand: textSkill("zustand", "Zustand", "Minimal state management", "#000000", ZustandIcon, "tools"),
};

// Export as array for easy iteration
export const SKILLS_ARRAY = Object.values(SKILLS);

// Helper to get skill by ID
export function getSkillById(id: string): Skill | undefined {
  return SKILLS[id];
}

// Helper to get skills by category
export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return SKILLS_ARRAY.filter((s) => s.category === category);
}

// Helper to normalize skill names for matching
export function normalizeSkillName(name: string): string {
  return name.toLowerCase().replace(/[.\s]+/g, "");
}

// Helper to find skill by various name formats
export function findSkill(name: string): Skill | undefined {
  const normalized = normalizeSkillName(name);
  return SKILLS[normalized];
}

// Default export for backward compatibility
export default SKILLS;
