import { useState } from "react";
import { useProjects } from "../hooks/useProjects";

function Projects() {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    loading,
    error,
    addProject,
  } = useProjects();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  async function handleCreate() {
    if (!name || !brand || !model) return;

    await addProject({
      name,
      brand,
      model,
      device_type: "air_conditioner",
      protocol: "broadlink",
    });

    setName("");
    setBrand("");
    setModel("");
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Projects</h1>

        <p className="subtitle">
          Manage your infrared device projects.
        </p>

        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <button onClick={handleCreate}>New Project</button>

        <hr />

        {loading && <p>Loading...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && projects.length === 0 && (
          <p>No projects yet.</p>
        )}

        {projects.map((project) => (
          <div className="device" key={project.id}>
            <strong>{project.name}</strong>

            <span>
              {project.brand} • {project.model}
            </span>

            <small>{project.device_type}</small>

            <button
              className="secondary"
              onClick={() => setSelectedProjectId(project.id)}
            >
              {selectedProjectId === project.id
                ? "Current Project"
                : "Open"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;