"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./ace-input";
import { Check, X, ChevronDown, Search } from "lucide-react";
import { SKILLS, getSkillsByCategory, Skill } from "@/data/skills";

interface SkillSelectorProps {
  value: string[];
  onChange: (skills: string[]) => void;
  category?: "frontend" | "backend" | "tools" | "other" | "all";
  placeholder?: string;
  label?: string;
}

const CATEGORY_ORDER = ["frontend", "backend", "tools", "other"] as const;

export function SkillSelector({
  value,
  onChange,
  category = "all",
  placeholder = "Search skills...",
  label,
}: SkillSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter skills based on category and search
  const filteredSkills = useMemo(() => {
    let skills = category === "all" ? Object.values(SKILLS) : getSkillsByCategory(category);
    
    if (search) {
      const lowerSearch = search.toLowerCase();
      skills = skills.filter(
        (s) =>
          s.label.toLowerCase().includes(lowerSearch) ||
          s.name.toLowerCase().includes(lowerSearch)
      );
    }
    
    // Sort: selected first, then by category order, then alphabetically
    return skills.sort((a, b) => {
      const aSelected = value.includes(a.id);
      const bSelected = value.includes(b.id);
      if (aSelected !== bSelected) return aSelected ? -1 : 1;
      
      const aCatIdx = CATEGORY_ORDER.indexOf(a.category);
      const bCatIdx = CATEGORY_ORDER.indexOf(b.category);
      if (aCatIdx !== bCatIdx) return aCatIdx - bCatIdx;
      
      return a.label.localeCompare(b.label);
    });
  }, [category, search, value]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearch("");
        }
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSkill = (skillId: string) => {
    const newValue = value.includes(skillId)
      ? value.filter((id) => id !== skillId)
      : [...value, skillId];
    onChange(newValue);
  };

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools & DevOps",
      other: "Other",
    };
    return labels[cat] || cat;
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      )}
      <div
        ref={dropdownRef}
        className="relative"
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <div
          className={cn(
            "flex flex-wrap items-center gap-1.5 min-h-[42px] px-3 py-2",
            "bg-gray-800 border border-gray-700 rounded-lg",
            "text-white placeholder:text-gray-500",
            "hover:border-gray-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
            "transition-colors cursor-text"
          )}
        >
          {/* Selected skills as pills */}
          {value.map((skillId) => {
            const skill = Object.values(SKILLS).find((s) => s.id === skillId);
            if (!skill) return null;
            return (
              <span
                key={skillId}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full"
                style={{ backgroundColor: `${skill.color}20`, borderColor: `${skill.color}40`, color: skill.color }}
              >
                <span className="flex items-center" style={{ width: 14, height: 14 }}>
                  {skill.icon}
                </span>
                {skill.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSkill(skillId);
                  }}
                  className="ml-1 p-0.5 hover:bg-black/20 rounded"
                  aria-label={`Remove ${skill.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          
          {/* Search input */}
          <input
            ref={inputRef}
            type="text"
            placeholder={value.length > 0 ? "" : placeholder}
            value={search}
            onChange={(e) => {
              e.stopPropagation();
              setSearch(e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsOpen(false);
                setSearch("");
                inputRef.current?.blur();
              }
            }}
            className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-white placeholder:text-gray-500"
            autoComplete="off"
          />
          
          {/* Chevron */}
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full max-h-96 overflow-auto",
              "bg-gray-900 border border-gray-700 rounded-lg shadow-lg"
            )}
          >
            {/* Search bar in dropdown */}
            <div className="p-2 border-b border-gray-700 sticky top-0 bg-gray-900">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    e.stopPropagation();
                    setSearch(e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Filter skills..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Skills list grouped by category */}
            <div className="py-2 max-h-[400px] overflow-auto">
              {CATEGORY_ORDER.map((cat) => {
                const catSkills = filteredSkills.filter((s) => s.category === cat);
                if (catSkills.length === 0) return null;
                
                return (
                  <div key={cat} className="px-2 py-1">
                    <h4 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {getCategoryLabel(cat)}
                    </h4>
                    <div className="space-y-1">
                      {catSkills.map((skill) => {
                        const isSelected = value.includes(skill.id);
                        return (
                          <button
                            key={skill.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSkill(skill.id);
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                              isSelected
                                ? "bg-blue-500/20 text-blue-300"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            )}
                          >
                            <span
                              className={cn(
                                "flex items-center justify-center w-5 h-5 shrink-0",
                                isSelected && "text-blue-400"
                              )}
                              style={{ color: isSelected ? undefined : skill.color }}
                            >
                              {isSelected ? <Check className="w-4 h-4" /> : skill.icon}
                            </span>
                            <span className="text-sm font-medium truncate">{skill.label}</span>
                            {isSelected && (
                              <span className="ml-auto text-xs text-blue-400">Added</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              {filteredSkills.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  No skills found matching "{search}"
                </div>
              )}
            </div>

            {/* Selected count footer */}
            {value.length > 0 && (
              <div className="border-t border-gray-700 px-3 py-2 text-xs text-gray-400">
                {value.length} skill{value.length !== 1 ? "s" : ""} selected
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
