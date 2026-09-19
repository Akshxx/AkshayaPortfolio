import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
// Spline has no thesvg entry — keep the Three.js mark as its stand-in.
import { SiThreedotjs } from "react-icons/si";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
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

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const PROJECT_SKILLS = {
  python: brand("Python", "python-mono.svg"),
  java: brand("Java", "java-mono.svg"),
  go: brand("Go", "go-mono.svg"),
  cpp: brand("C++", "cpp-mono.svg"),
  c: brand("C", "c-mono.svg"),
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  fastapi: brand("FastAPI", "fastapi-mono.svg"),
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  // Not in the thesvg registry — keep the existing custom logo.
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: brand("Firebase", "firebase-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  // Not in the thesvg registry — keep the Three.js stand-in.
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  // React Native reuses the React mark.
  reactNative: brand("React Native", "react-mono.svg"),
  betterAuth: brand("Better Auth", "better-auth-mono.svg"),
  // Not in the thesvg registry — keep the text marks.
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Zu</span>,
  },
  partykit: {
    title: "PartyKit",
    bg: "black",
    fg: "white",
    icon: <span className="text-base">🎈</span>,
  },
  hocuspocus: {
    title: "Hocuspocus",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Hp</span>,
  },
  // React Flow ships under the xyflow brand.
  reactFlow: brand("React Flow", "xyflow-mono.svg"),
  codemirror: brand("CodeMirror", "codemirror-mono.svg"),
  // "Satori / sharp" — uses the sharp mark.
  satori: brand("Satori / sharp", "sharp-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  // Vercel AI SDK uses the Vercel mark.
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  mistral: brand("Mistral AI", "mistral-ai-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  nextIntl: {
    title: "next-intl",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">i18n</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  expo: {
    title: "Expo",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Expo</span>,
  },
  mcp: {
    title: "MCP",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MCP</span>,
  },
  celery: {
    title: "Celery",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Celery</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "srijan",
    category: "AI Engineering Assistant",
    title: "Srijan",
    src: "/assets/projects-screenshots/srijan/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.celery,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.go,
      ],
    },
    live: "#",
    github: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An AI engineering assistant for managing agent lifecycles, live progress streaming, and resource cleanup — built on NeevCloud infrastructure.
          </TypographyP>
          <TypographyP className="font-mono ">
            Srijan is a production-grade AI engineering platform that helps developers build, deploy, and manage AI agents at scale. Architected as a distributed system with FastAPI (Python) for the API layer, Celery for async task processing, and PostgreSQL for persistence. The system design RFC was co-authored to define agent lifecycle management, real-time progress streaming via WebSockets, and automated resource cleanup for GPU/CPU workloads.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Agent Lifecycle Management</TypographyH3>
          <p className="font-mono mb-2">
            A comprehensive agent orchestration system that handles spawning, monitoring, scaling, and termination of AI agents. Each agent runs in an isolated environment with resource quotas (GPU memory, CPU, RAM) enforced at the container level. The lifecycle manager tracks agent health, auto-restarts on failure, and provides graceful degradation when resources are constrained.
          </p>

          <TypographyH3 className="my-4 mt-8">Live Progress Streaming</TypographyH3>
          <p className="font-mono mb-2">
            Real-time WebSocket-based progress streaming from async Celery workers to the frontend. Agents emit structured progress events (token generation, tool calls, reasoning steps) that are broadcast to connected clients with sub-second latency. The frontend renders streaming updates with optimistic UI and automatic reconnection handling.
          </p>

          <TypographyH3 className="my-4 mt-8">NeevCloud SDK Integration</TypographyH3>
          <p className="font-mono mb-2">
            Deep integration with NeevCloud's infrastructure SDK for dynamic GPU provisioning, spot instance management, and cost optimization. The system automatically selects optimal instance types based on workload characteristics (inference vs training), implements preemptible instance fallback strategies, and provides detailed cost attribution per agent run.
          </p>
        </div>
      );
    },
  },
  {
    id: "eazybyts",
    category: "Full-stack Web Applications",
    title: "EazyByts.com",
    src: "/assets/projects-screenshots/eazybyts/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "#",
    github: "#",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Professional internship experience building scalable web applications with modern full-stack technologies.
          </TypographyP>
          <TypographyP className="font-mono ">
            During my first professional internship at EazyByts.com, I collaborated with senior developers to build and maintain production web applications. This experience provided hands-on exposure to industry-standard workflows including code reviews, CI/CD pipelines, agile methodologies, and scalable system design. Worked across the full stack — from responsive React frontends with Tailwind CSS to Node.js/Express REST APIs backed by PostgreSQL and MongoDB.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Full-Stack Feature Development</TypographyH3>
          <p className="font-mono mb-2">
            Contributed to end-to-end feature development: designing database schemas, implementing RESTful APIs with Express, building responsive React components, and integrating third-party services. Followed TypeScript strict mode for type safety across the stack. Implemented authentication, authorization, and data validation layers.
          </p>

          <TypographyH3 className="my-4 mt-8">Team Collaboration & Workflows</TypographyH3>
          <p className="font-mono mb-2">
            Participated in daily standups, sprint planning, and retrospectives. Used Git with feature branching strategy, pull requests with mandatory reviews, and automated testing in CI/CD. Learned to write maintainable, documented code and communicate technical decisions effectively with both technical and non-technical stakeholders.
          </p>

          <TypographyH3 className="my-4 mt-8">Production Deployment & Monitoring</TypographyH3>
          <p className="font-mono mb-2">
            Assisted with Docker-based deployments to cloud infrastructure. Configured Nginx reverse proxies, SSL termination, and environment-specific configurations. Set up logging, monitoring, and alerting for production services. Gained experience with database migrations, backup strategies, and zero-downtime deployments.
          </p>
        </div>
      );
    },
  },
];
export default projects;
