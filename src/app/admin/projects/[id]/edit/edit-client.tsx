"use client";

import { useParams } from "next/navigation";
import ProjectForm from "@/app/admin/projects/new/page";

export default function EditProjectClient() {
  const params = useParams();
  const id = params.id as string;

  if (!id || id === "new") {
    return null;
  }

  return <ProjectForm />;
}