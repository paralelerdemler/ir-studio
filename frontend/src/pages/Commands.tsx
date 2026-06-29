import CommandList from "../components/CommandList";
import { useCommands } from "../hooks/useCommands";
import { useProjects } from "../hooks/useProjects";

function Commands() {
  const { selectedProject } = useProjects();

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

        {!selectedProject && (
          <p className="error">Please create or select a project first.</p>
        )}

        {selectedProject && (
          <>
            <p className="subtitle">
              Current Project: {selectedProject.name}
            </p>

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