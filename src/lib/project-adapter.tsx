"use client";

import { useEffect, useState } from "react";
import { StoredProject as ApiProject } from "@/lib/projects-store";
import { Skill as ProjectsSkill } from "@/data/projects";
import { findSkill, SKILLS } from "@/data/skills";

function normalizeSkillName(name: string): string {
  return name.toLowerCase().replace(/[.\s]+/g, "");
}

// Convert unified skill to projects.tsx Skill format
function convertUnifiedSkill(skill: typeof SKILLS[string]): ProjectsSkill {
  return {
    title: skill.label,
    bg: "black",
    fg: "white",
    icon: skill.icon,
  };
}

export function convertApiProject(apiProject: ApiProject) {
  const convertSkills = (skills: string[]): ProjectsSkill[] => {
    return skills.map((skillName) => {
      const unifiedSkill = findSkill(skillName);
      if (unifiedSkill) {
        return convertUnifiedSkill(unifiedSkill);
      }
      // Fallback for unknown skills
      return {
        title: skillName,
        bg: "black",
        fg: "white",
        icon: <span className="text-xs font-medium">{skillName}</span>,
      };
    });
  };

  return {
    id: apiProject.id,
    category: apiProject.category,
    title: apiProject.title,
    src: apiProject.thumbnail,
    screenshots: apiProject.screenshots,
    skills: {
      frontend: convertSkills(apiProject.skills.frontend || []),
      backend: convertSkills(apiProject.skills.backend || []),
    },
    content: apiProject.description, // Store description for rendering
    github: apiProject.github,
    live: apiProject.live,
  };
}

export async function fetchProjects(): Promise<ApiProject[]> {
  try {
    const res = await fetch("/api/projects", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.projects || [];
  } catch {
    return [];
  }
}
