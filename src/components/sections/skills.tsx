"use client";

import type { CSSProperties } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { SKILLS } from "@/data/skills";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { cn } from "@/lib/utils";

/**
 * Tech-stack section.
 *
 * On capable devices the skills live in the interactive 3D keyboard's keycaps,
 * so this is just a header and the section is tall (the keyboard scrubs through
 * it on scroll). When the 3D scene is disabled (low-end / reduced-motion), the
 * keyboard isn't there to convey the skills — so we render them as a real HTML
 * grid instead. Progressive enhancement: the content survives without WebGL.
 */
const SkillsSection = () => {
  const { disable3D, ready } = usePerfProfile();
  const showGrid = ready && disable3D;

  // Define the exact order of skills in 4 rows of 6
  const techStackRows = [
    // Row 1
    ["js", "ts", "html", "css", "react", "pytorch"],
    // Row 2
    ["nextjs", "tailwind", "nodejs", "express", "postgres", "redis"],
    // Row 3
    ["git", "github", "java", "npm", "firebase", "fastapi"],
    // Row 4
    ["python", "docker", "swiftui", "aws", "devops", "tensorflow"],
  ];

  const getSkill = (name: string) => SKILLS[name as keyof typeof SKILLS];

  if (showGrid) {
    return (
      <SectionWrapper
        id="skills"
        className="flex w-full min-h-screen flex-col justify-center py-24"
      >
        <SectionHeader
          id="skills"
          title="Tech Stack"
          desc="Tools I build with"
          className="static mb-14"
        />
        <div className="mx-auto max-w-5xl px-4">
          {techStackRows.map((row, rowIndex) => (
            <ul
              key={rowIndex}
              className="grid grid-cols-6 gap-3 mb-4"
            >
              {row.map((skillName) => {
                const skill = getSkill(skillName);
                if (!skill) return null;
                return (
                  <li
                    key={skill.name}
                    style={{ "--skill": skill.color } as CSSProperties}
                    className={cn(
                      "pointer-events-auto",
                      "group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-5",
                      "border border-border/60 bg-secondary/20 backdrop-blur-sm",
                      "transition-[transform,border-color,background-color,box-shadow] duration-300",
                      "hover:-translate-y-1 hover:border-[var(--skill)] hover:bg-secondary/40",
                      "hover:shadow-[0_10px_40px_-12px_var(--skill)]"
                    )}
                  >
                    {/* per-skill colored glow */}
                    <span
                      aria-hidden
                      style={{ background: "var(--skill)" }}
                      className="pointer-events-none absolute -top-6 h-16 w-16 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
                    />
                    {/* Skill icon - using ReactNode directly */}
                    <div
                      className="relative size-9 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 md:size-11"
                      style={{ color: "var(--skill)" }}
                    >
                      {skill.icon}
                    </div>
                    <span className="relative text-center text-xs font-medium text-foreground/80 transition-colors group-hover:text-foreground md:text-sm">
                      {skill.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="skills"
      className="w-full h-screen md:h-[150dvh] pointer-events-none"
    >
      <SectionHeader id="skills" title="Tech Stack" desc="(hint: press a key)" />
    </SectionWrapper>
  );
};

export default SkillsSection;
