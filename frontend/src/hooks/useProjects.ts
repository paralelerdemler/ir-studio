import { useEffect, useState } from "react";
import { createProject, getProjects } from "../services/api";

const SELECTED_PROJECT_KEY = "ir-studio:selected-project-id";
const SELECTED_PROJECT_EVENT = "ir-studio:selected-project-changed";

export function useProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectIdState] = useState<string | null>(
    () => localStorage.getItem(SELECTED_PROJECT_KEY)
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function setSelectedProjectId(projectId: string | null) {
    setSelectedProjectIdState(projectId);

    if (projectId) {
      localStorage.setItem(SELECTED_PROJECT_KEY, projectId);
    } else {
      localStorage.removeItem(SELECTED_PROJECT_KEY);
    }

    window.dispatchEvent(new Event(SELECTED_PROJECT_EVENT));
  }

  async function refreshProjects() {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();
      setProjects(data);

      const savedProjectId = localStorage.getItem(SELECTED_PROJECT_KEY);
      const savedProjectExists = data.some(
        (project: any) => project.id === savedProjectId
      );

      if (savedProjectId && savedProjectExists) {
        setSelectedProjectIdState(savedProjectId);
        return;
      }

      if (data.length > 0) {
        setSelectedProjectId(data[0].id);
      } else {
        setSelectedProjectId(null);
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

  useEffect(() => {
    refreshProjects();

    function syncSelectedProject() {
      setSelectedProjectIdState(localStorage.getItem(SELECTED_PROJECT_KEY));
    }

    window.addEventListener(SELECTED_PROJECT_EVENT, syncSelectedProject);

    return () => {
      window.removeEventListener(SELECTED_PROJECT_EVENT, syncSelectedProject);
    };
  }, []);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) ?? null;

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