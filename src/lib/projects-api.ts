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

const API_BASE = "/api/projects";

export async function fetchProjects(): Promise<StoredProject[]> {
  try {
    const res = await fetch(API_BASE, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.projects || [];
  } catch {
    return [];
  }
}

export async function fetchProject(id: string): Promise<StoredProject | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.project || null;
  } catch {
    return null;
  }
}

export async function createProject(project: Omit<StoredProject, "id" | "createdAt" | "updatedAt"> & { id?: string }): Promise<StoredProject | null> {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.project || null;
  } catch {
    return null;
  }
}

export async function updateProject(id: string, updates: Partial<StoredProject>): Promise<StoredProject | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.project || null;
  } catch {
    return null;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    return res.ok;
  } catch {
    return false;
  }
}