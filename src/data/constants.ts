// thoda zada ts ho gya idhar
// Re-exports from unified skills system for backward compatibility

import UnifiedSkills, { Skill as UnifiedSkill, getSkillsByCategory } from "./skills";

// Keep the enum for backward compatibility with Experience type
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

// Legacy skill type with string icon URL (for experience section)
export type LegacySkill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string; // CDN URL
};

// New unified Skill type (with ReactNode icon instead of string)
export type Skill = UnifiedSkill;

// Convert unified skills to old format for backward compatibility (with CDN URLs)
const convertSkill = (skill?: UnifiedSkill): LegacySkill => {
  if (!skill) {
    return {
      id: 0,
      name: "",
      label: "",
      shortDescription: "",
      color: "#888888",
      icon: "",
    };
  }

  // Map of skill IDs to CDN icon URLs (from original constants.ts)
  const iconUrls: Record<string, string> = {
    js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    ts: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    postgres: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    github: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    npm: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    swiftui: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    devops: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  };

  return {
    id: Number(skill.id) || 0,
    name: skill.name,
    label: skill.label,
    shortDescription: skill.shortDescription,
    color: skill.color,
    icon: iconUrls[skill.id] || "",
  };
};

// Build SKILLS object compatible with old code
export const SKILLS: Record<SkillNames, LegacySkill> = {
  [SkillNames.JS]: convertSkill(UnifiedSkills.js),
  [SkillNames.TS]: convertSkill(UnifiedSkills.ts),
  [SkillNames.HTML]: convertSkill(UnifiedSkills.html),
  [SkillNames.CSS]: convertSkill(UnifiedSkills.css),
  [SkillNames.REACT]: convertSkill(UnifiedSkills.react),
  [SkillNames.PYTORCH]: convertSkill(UnifiedSkills.pytorch),
  [SkillNames.NEXTJS]: convertSkill(UnifiedSkills.nextjs),
  [SkillNames.TAILWIND]: convertSkill(UnifiedSkills.tailwind),
  [SkillNames.NODEJS]: convertSkill(UnifiedSkills.nodejs),
  [SkillNames.EXPRESS]: convertSkill(UnifiedSkills.express),
  [SkillNames.POSTGRES]: convertSkill(UnifiedSkills.postgres),
  [SkillNames.REDIS]: convertSkill(UnifiedSkills.redis),
  [SkillNames.GIT]: convertSkill(UnifiedSkills.git),
  [SkillNames.GITHUB]: convertSkill(UnifiedSkills.github),
  [SkillNames.JAVA]: convertSkill(UnifiedSkills.java),
  [SkillNames.NPM]: convertSkill(UnifiedSkills.npm),
  [SkillNames.FIREBASE]: convertSkill(UnifiedSkills.firebase),
  [SkillNames.FASTAPI]: convertSkill(UnifiedSkills.fastapi),
  [SkillNames.PYTHON]: convertSkill(UnifiedSkills.python),
  [SkillNames.DOCKER]: convertSkill(UnifiedSkills.docker),
  [SkillNames.SWIFTUI]: convertSkill(UnifiedSkills.swiftui),
  [SkillNames.AWS]: convertSkill(UnifiedSkills.aws),
  [SkillNames.DEVOPS]: convertSkill(UnifiedSkills.devops),
  [SkillNames.TENSORFLOW]: convertSkill(UnifiedSkills.tensorflow),
};

// Export unified skills for new code (re-export as named export)
export const ALL_SKILLS = UnifiedSkills;
export { getSkillsByCategory } from "./skills";

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "2026",
    endDate: "Present",
    title: "President",
    company: "Qwiklabs Developer Club, SRMIST",
    description: [
      "Drive the strategic vision for the club, leading the core team to organize major campus-wide hackathons and tech initiatives.",
      "Spearhead technical workshops and developer programs for 500+ students.",
      "Foster campus tech culture through competitive programming, hackathons, and industry collaborations.",
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.NEXTJS,
      SkillNames.TS,
      SkillNames.PYTHON,
      SkillNames.JAVA,
      SkillNames.AWS,
      SkillNames.DEVOPS,
      SkillNames.FIREBASE,
    ],
  },
  {
    id: 2,
    startDate: "2026",
    endDate: "2026",
    title: "Full-stack Developer",
    company: "NeevAI / SuperCloud (NeevCloud Pvt. Ltd.)",
    description: [
      "Engineered the FastAPI, Celery, and PostgreSQL backend for Srijan — an AI engineering assistant.",
      "Co-authored the system design RFC for managing agent lifecycles, live progress streaming, and resource cleanup.",
      "Integrated NeevCloud SDK for scalable cloud infrastructure and GPU resource management.",
      "Built async job queues processing AI workloads with real-time WebSocket updates.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.FASTAPI,
      SkillNames.TENSORFLOW,
      SkillNames.PYTORCH,
      SkillNames.POSTGRES,
      SkillNames.REDIS,
      SkillNames.DOCKER,
      SkillNames.AWS,
    ],
  },
  {
    id: 3,
    startDate: "2025",
    endDate: "2025",
    title: "Full-stack Web Developer",
    company: "EazyByts.com",
    description: [
      "Collaborated with senior developers to build robust web applications during first professional internship.",
      "Gained hands-on experience in team collaboration, code reviews, and industry workflows.",
      "Worked on full-stack features spanning frontend interfaces and backend APIs.",
      "Contributed to production deployments and learned scalable system design patterns.",
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.NODEJS,
      SkillNames.EXPRESS,
      SkillNames.POSTGRES,
      SkillNames.REDIS,
      SkillNames.TAILWIND,
      SkillNames.GIT,
      SkillNames.DOCKER,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
