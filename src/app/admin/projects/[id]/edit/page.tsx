import EditProjectClient from "./edit-client";

export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function EditProjectPage() {
  return <EditProjectClient />;
}