"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/ace-input";
import { Textarea } from "@/components/ui/ace-textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { fetchProject as apiFetchProject, createProject, updateProject, type StoredProject } from "@/lib/projects-api";
import { SkillSelector } from "@/components/ui/skill-selector";

type SkillCategory = "frontend" | "backend";

interface ProjectFormData {
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  videoPreview: string;
  screenshots: string;
  skills: {
    frontend: string[];
    backend: string[];
  };
  github: string;
  live: string;
  featured: boolean;
}

const initialFormData: ProjectFormData = {
  title: "",
  category: "",
  description: "",
  shortDescription: "",
  thumbnail: "",
  videoPreview: "",
  screenshots: "",
  skills: { frontend: [], backend: [] },
  github: "",
  live: "",
  featured: false,
};

export default function ProjectForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const isEditing = Boolean(id && id !== "new");

  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing) {
      fetchProject();
    }
  }, [id, isEditing]);

  const fetchProject = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const p = await apiFetchProject(id);
      if (p) {
        setFormData({
          title: p.title,
          category: p.category,
          description: p.description,
          shortDescription: p.shortDescription,
          thumbnail: p.thumbnail,
          videoPreview: p.videoPreview || "",
          screenshots: p.screenshots.join(", "),
          skills: p.skills,
          github: p.github || "",
          live: p.live || "",
          featured: p.featured || false,
        });
      }
    } catch {
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ProjectFormData, value: string | boolean | { frontend: string[]; backend: string[] }) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (category: SkillCategory, skills: string[]) => {
    setFormData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [category]: skills },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload: Partial<StoredProject> = {
        ...formData,
        screenshots: formData.screenshots.split(",").map((s) => s.trim()).filter(Boolean),
      };

      let result: StoredProject | null = null;
      if (isEditing && id) {
        result = await updateProject(id, payload);
      } else {
        result = await createProject(payload as Omit<StoredProject, "id" | "createdAt" | "updatedAt">);
      }

      if (result) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Failed to save project");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="p-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">{isEditing ? "Edit Project" : "New Project"}</h1>
          <p className="text-gray-400 mt-1">{isEditing ? "Update your project details" : "Create a new portfolio project"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Required fields for the project listing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Project title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  placeholder="e.g., AI Engineering Assistant"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => handleChange("shortDescription", e.target.value)}
                placeholder="Brief description for cards and previews (1-2 sentences)"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Detailed description shown on project detail page (supports markdown)"
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle>Media & Links</CardTitle>
            <CardDescription>Thumbnail, video preview, and external links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail Image URL *</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => handleChange("thumbnail", e.target.value)}
                  placeholder="/assets/projects-screenshots/project/landing.png"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoPreview">Video Preview URL</Label>
                <Input
                  id="videoPreview"
                  value={formData.videoPreview}
                  onChange={(e) => handleChange("videoPreview", e.target.value)}
                  placeholder="/assets/projects-screenshots/project/preview.mp4"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="screenshots">Screenshot URLs (comma-separated)</Label>
              <Input
                id="screenshots"
                value={formData.screenshots}
                onChange={(e) => handleChange("screenshots", e.target.value)}
                placeholder="landing.png, dashboard.png, editor.png"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => handleChange("github", e.target.value)}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="live">Live Demo URL</Label>
                <Input
                  id="live"
                  value={formData.live}
                  onChange={(e) => handleChange("live", e.target.value)}
                  placeholder="https://your-project.vercel.app"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Select skills for frontend and backend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SkillSelector
              value={formData.skills.frontend}
              onChange={(skills) => handleSkillChange("frontend", skills)}
              category="frontend"
              placeholder="Search frontend skills..."
              label="Frontend Skills"
            />
            <SkillSelector
              value={formData.skills.backend}
              onChange={(skills) => handleSkillChange("backend", skills)}
              category="backend"
              placeholder="Search backend skills..."
              label="Backend Skills"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="featured" className="cursor-pointer text-white">
                Featured Project
              </Label>
              <span className="text-sm text-gray-500 ml-2">Show prominently on homepage</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-800">
          <Link href="/admin">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
