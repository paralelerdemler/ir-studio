import CommandList from "../components/CommandList";
import ProjectSelector from "../components/ProjectSelector";
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
  } = useCommands(selectedProjectId);

  return (
    <div className="app">
      <div className="card">
        <h1>Command Library</h1>

        <ProjectSelector
          projects={projects}
          selectedProjectId={selectedProjectId}
          onChange={setSelectedProjectId}
        />

        {!selectedProject && (
          <p className="error">Please create or select a project first.</p>
        )}

        {selectedProject && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Commands;