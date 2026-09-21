import { query, initDatabase } from "./db";

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

function mapRow(row: any): StoredProject {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    description: row.description,
    shortDescription: row.shortDescription,
    thumbnail: row.thumbnail,
    videoPreview: row.videoPreview || "",
    screenshots: row.screenshots || [],
    skills: row.skills || { frontend: [], backend: [] },
    github: row.github || "",
    live: row.live || "",
    featured: row.featured || false,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function getProjects(): Promise<StoredProject[]> {
  try {
    const result = await query('SELECT * FROM projects ORDER BY "createdAt" DESC');
    return result.rows.map(mapRow);
  } catch {
    return [];
  }
}

export async function getProjectById(id: string): Promise<StoredProject | null> {
  try {
    const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0] ? mapRow(result.rows[0]) : null;
  } catch {
    return null;
  }
}

export async function createProject(project: Omit<StoredProject, "id" | "createdAt" | "updatedAt"> & { id?: string }): Promise<StoredProject> {
  const now = new Date().toISOString();
  const id = project.id || project.title.toLowerCase().replace(/\s+/g, "-");

  await query(
    `INSERT INTO projects (id, category, title, description, "shortDescription", thumbnail, "videoPreview", screenshots, skills, github, live, featured, "createdAt", "updatedAt")
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
    [
      id,
      project.category,
      project.title,
      project.description,
      project.shortDescription,
      project.thumbnail,
      project.videoPreview || "",
      project.screenshots || [],
      JSON.stringify(project.skills || { frontend: [], backend: [] }),
      project.github || "",
      project.live || "",
      project.featured || false,
      now,
      now,
    ]
  );

  return { ...project, id, createdAt: now, updatedAt: now };
}

export async function updateProject(id: string, updates: Partial<StoredProject>): Promise<StoredProject | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  const allowedFields = [
    "category", "title", "description", "shortDescription", "thumbnail",
    "videoPreview", "screenshots", "skills", "github", "live", "featured"
  ];

  for (const key of allowedFields) {
    if (key in updates) {
      fields.push(`"${key}" = $${paramIndex++}`);
      if (key === "skills") {
        values.push(JSON.stringify(updates[key]));
      } else if (key === "screenshots") {
        values.push(updates[key]);
      } else {
        values.push((updates as any)[key]);
      }
    }
  }

  if (fields.length === 0) return null;

  fields.push(`"updatedAt" = $${paramIndex++}`);
  values.push(new Date().toISOString());
  values.push(id);

  await query(`UPDATE projects SET ${fields.join(", ")} WHERE id = $${paramIndex}`, values);

  const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0] ? mapRow(result.rows[0]) : null;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const result = await query('DELETE FROM projects WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  } catch {
    return false;
  }
}

export { initDatabase };