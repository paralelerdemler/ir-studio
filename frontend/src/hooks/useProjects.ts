import { useEffect, useState } from "react";
import { createProject, getProjects } from "../services/api";

export function useProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refreshProjects() {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      setProjects(data);

      if (!selectedProjectId && data.length > 0) {
        setSelectedProjectId(data[0].id);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function addProject(project: {
    name: string;
    brand: string;
    model: string;
    device_type: string;
    protocol: string;
  }) {
    const created = await createProject(project);

    await refreshProjects();

    setSelectedProjectId(created.id);
  }

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) ?? null;

  useEffect(() => {
    refreshProjects();
  }, []);

  return {
    projects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId,
    loading,
    error,
    refreshProjects,
    addProject,
  };
}