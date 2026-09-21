import "dotenv/config";
import fs from "fs";
import path from "path";
import { createProject, initDatabase } from "@/lib/projects-store";

async function main() {
  console.log("Initializing database...");
  await initDatabase();

  const storePath = path.join(process.cwd(), "src/data/projects-store.json");
  if (!fs.existsSync(storePath)) {
    console.log("No projects-store.json found, skipping seed.");
    return;
  }

  const data = JSON.parse(fs.readFileSync(storePath, "utf-8"));
  const projects = data.projects || [];

  console.log(`Seeding ${projects.length} projects...`);

  for (const project of projects) {
    await createProject(project);
    console.log(`  ✓ ${project.title}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});