import CommandList from "../components/CommandList";
import DeviceList from "../components/DeviceList";
import LearnPanel from "../components/LearnPanel";
import { useCommands } from "../hooks/useCommands";
import { useDevices } from "../hooks/useDevices";
import { useLearning } from "../hooks/useLearning";

function Dashboard() {
  const {
    devices,
    isLoadingDevices,
    devicesError,
    refreshDevices,
  } = useDevices();

  const {
    commands,
    isLoadingCommands,
    commandsError,
    refreshCommands,
    sendCommand,
    deleteCommand,
  } = useCommands();

  const learning = useLearning(refreshCommands);

  const isLoading = isLoadingDevices || isLoadingCommands;
  const isConnected = devices.length > 0;
  const error = devicesError || commandsError || learning.learningError;

  async function refreshAll() {
    await Promise.all([
      refreshDevices(),
      refreshCommands(),
    ]);
  }

  return (
    <div className="app">
      <div className="card">
        <h1>IR Studio</h1>

        <p className="subtitle">
          Learn, analyze and export infrared commands.
        </p>

        <div className="status">
          <span className={`dot ${isConnected ? "connected" : ""}`}></span>
          {isLoading
            ? "Connecting..."
            : isConnected
              ? "Backend connected"
              : "Backend not connected"}
        </div>

        <div className="stats">
          <div>
            <strong>{devices.length}</strong>
            <span>Device</span>
          </div>

          <div>
            <strong>{commands.length}</strong>
            <span>Learned</span>
          </div>
        </div>

        <DeviceList devices={devices} />

        {learning.showLearnForm && (
          <LearnPanel
            brand={learning.brand}
            model={learning.model}
            commandName={learning.commandName}
            mode={learning.mode}
            temperature={learning.temperature}
            fan={learning.fan}
            verticalSwing={learning.verticalSwing}
            clean={learning.clean}
            isLearning={learning.isLearning}
            onBrandChange={learning.setBrand}
            onModelChange={learning.setModel}
            onCommandNameChange={learning.setCommandName}
            onModeChange={learning.setMode}
            onTemperatureChange={learning.setTemperature}
            onFanChange={learning.setFan}
            onVerticalSwingChange={learning.setVerticalSwing}
            onCleanChange={learning.setClean}
            onLearn={learning.learnCommand}
          />
        )}

        <CommandList
          commands={commands}
          onSend={sendCommand}
          onDelete={deleteCommand}
        />

        {error && <p className="error">{error}</p>}

        {!learning.showLearnForm && (
          <button onClick={() => learning.setShowLearnForm(true)}>
            Learn New Command
          </button>
        )}

        <button className="secondary" onClick={refreshAll} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;