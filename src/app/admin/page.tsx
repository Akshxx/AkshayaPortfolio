"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ExternalLink, Eye } from "lucide-react";
import { format } from "date-fns";
import { fetchProjects, deleteProject, type StoredProject } from "@/lib/projects-api";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const success = await deleteProject(id);
    if (success) {
      setProjects(projects.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Projects</h1>
            <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
          </div>
        </div>
        <div className="rounded-xl bg-gray-900/80 border border-gray-800 overflow-hidden">
          <table className="w-full">
            <tbody>
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Loading projects...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="rounded-xl bg-gray-900/80 border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Updated</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No projects yet. Click "Add Project" to create your first project.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {project.thumbnail && (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                        />
                      )}
                      <div>
                        <p className="font-medium text-white">{project.title}</p>
                        <p className="text-sm text-gray-400 truncate max-w-xs">{project.shortDescription}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.featured
                        ? "bg-green-600/20 text-green-400 border border-green-600/30"
                        : "bg-gray-600/20 text-gray-400 border border-gray-600/30"
                    }`}>
                      {project.featured ? "Featured" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {format(new Date(project.updatedAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white transition-colors" title="View Live">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/projects/${project.id}/edit`} className="p-2 text-gray-400 hover:text-blue-400 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <Link href={`/projects/${project.id}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-green-400 transition-colors" title="Preview">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}