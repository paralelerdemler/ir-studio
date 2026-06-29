import CommandList from "../components/CommandList";
import { useCommands } from "../hooks/useCommands";
import { useProjects } from "../hooks/useProjects";

function Commands() {
  const {
    projects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId,
  } = useProjects();

  const {
    commands,
    isLoadingCommands,
    commandsError,
    refreshCommands,
    sendCommand,
    deleteCommand,
  } = useCommands(selectedProject?.id);

  return (
    <div className="app">
      <div className="card">
        <h1>Command Library</h1>

        <div className="project-switcher">
          <div>
            <span className="subtitle">Current Project</span>
            <strong>
              {selectedProject ? selectedProject.name : "No project selected"}
            </strong>
          </div>

          <select
            value={selectedProjectId ?? ""}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {isLoadingCommands && (
          <p className="subtitle">Loading commands...</p>
        )}

        <CommandList
          commands={commands}
          onSend={sendCommand}
          onDelete={deleteCommand}
        />

        {commandsError && <p className="error">{commandsError}</p>}

        <button className="secondary" onClick={refreshCommands}>
          Refresh Commands
        </button>
      </div>
    </div>
  );
}

export default Commands;