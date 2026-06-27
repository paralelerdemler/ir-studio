import CommandList from "../components/CommandList";
import { useCommands } from "../hooks/useCommands";

function Commands() {
  const {
    commands,
    isLoadingCommands,
    commandsError,
    refreshCommands,
    sendCommand,
    deleteCommand,
  } = useCommands();

  return (
    <div className="app">
      <div className="card">
        <h1>Command Library</h1>

        <p className="subtitle">
          Browse, test and manage learned infrared commands.
        </p>

        {isLoadingCommands && <p className="subtitle">Loading commands...</p>}

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