import fs from "fs";
import path from "path";

export interface StoredProject {
  id: string;
  category: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  videoPreview: string;
  screenshots: string[];
  skills: {
    frontend: string[];
    backend: string[];
  };
  github: string;
  live: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORE_PATH = path.join(process.cwd(), "src/data/projects-store.json");

export function getProjects(): StoredProject[] {
  try {
    const data = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(data).projects;
  } catch {
    return [];
  }
}

export function getProjectById(id: string): StoredProject | null {
  const projects = getProjects();
  return projects.find((p) => p.id === id) || null;
}

export function createProject(project: Omit<StoredProject, "id" | "createdAt" | "updatedAt"> & { id?: string }): StoredProject {
  const projects = getProjects();
  const now = new Date().toISOString();
  const newProject: StoredProject = {
    ...project,
    id: project.id || project.title.toLowerCase().replace(/\s+/g, "-"),
    createdAt: now,
    updatedAt: now,
  };
  projects.unshift(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, updates: Partial<StoredProject>): StoredProject | null {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
  projects[index] = updated;
  saveProjects(projects);
  return updated;
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  saveProjects(filtered);
  return true;
}

function saveProjects(projects: StoredProject[]): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify({ projects }, null, 2));
}