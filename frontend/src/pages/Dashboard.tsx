import { useEffect, useState } from "react";
import CommandList from "../components/CommandList";
import DeviceList from "../components/DeviceList";
import LearnPanel from "../components/LearnPanel";
import {
  deleteCommand as deleteCommandApi,
  discover,
  getCommands,
  learnCommand as learnCommandApi,
  sendCommand as sendCommandApi,
} from "../services/api";
import type { Command } from "../types/command";
import type { Device } from "../types/device";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLearning, setIsLearning] = useState(false);
  const [showLearnForm, setShowLearnForm] = useState(false);

  const [devices, setDevices] = useState<Device[]>([]);
  const [commands, setCommands] = useState<Command[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [commandName, setCommandName] = useState("Power On 22C Fan2");
  const [brand, setBrand] = useState("Arçelik");
  const [model, setModel] = useState("Unknown");
  const [mode, setMode] = useState("cool");
  const [temperature, setTemperature] = useState(22);
  const [fan, setFan] = useState(2);
  const [verticalSwing, setVerticalSwing] = useState(false);
  const [clean, setClean] = useState(false);

  const isConnected = devices.length > 0;

  async function refresh() {
    setIsLoading(true);
    setError(null);

    try {
      const [devicesData, commandsData] = await Promise.all([
        discover(),
        getCommands(),
      ]);

      setDevices(devicesData);
      setCommands(commandsData);
    } catch (err) {
      setDevices([]);
      setCommands([]);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  async function learnCommand() {
    setIsLearning(true);
    setError(null);

    try {
      await learnCommandApi({
        brand,
        model,
        name: commandName,
        state: {
          power: true,
          mode,
          temperature,
          fan,
          vertical_swing: verticalSwing,
          clean,
        },
      });

      setShowLearnForm(false);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLearning(false);
    }
  }

  async function sendCommand(id: string) {
    setError(null);

    try {
      await sendCommandApi(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  async function deleteCommand(id: string) {
    setError(null);

    try {
      await deleteCommandApi(id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

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

        {showLearnForm && (
          <LearnPanel
            brand={brand}
            model={model}
            commandName={commandName}
            mode={mode}
            temperature={temperature}
            fan={fan}
            verticalSwing={verticalSwing}
            clean={clean}
            isLearning={isLearning}
            onBrandChange={setBrand}
            onModelChange={setModel}
            onCommandNameChange={setCommandName}
            onModeChange={setMode}
            onTemperatureChange={setTemperature}
            onFanChange={setFan}
            onVerticalSwingChange={setVerticalSwing}
            onCleanChange={setClean}
            onLearn={learnCommand}
          />
        )}

        <CommandList
          commands={commands}
          onSend={sendCommand}
          onDelete={deleteCommand}
        />

        {error && <p className="error">{error}</p>}

        {!showLearnForm && (
          <button onClick={() => setShowLearnForm(true)}>
            Learn New Command
          </button>
        )}

        <button className="secondary" onClick={refresh} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;