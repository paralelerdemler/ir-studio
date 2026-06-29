import ClimateRemote from "./ClimateRemote";

type Props = {
  brand: string;
  model: string;
  commandName: string;
  mode: string;
  temperature: number;
  fan: number;
  verticalSwing: boolean;
  clean: boolean;
  isLearning: boolean;

  onBrandChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onCommandNameChange: (value: string) => void;
  onModeChange: (value: string) => void;
  onTemperatureChange: (value: number) => void;
  onFanChange: (value: number) => void;
  onVerticalSwingChange: (value: boolean) => void;
  onCleanChange: (value: boolean) => void;

  onLearn: () => void;
};

function LearnPanel({
  brand,
  model,
  commandName,
  mode,
  temperature,
  fan,
  verticalSwing,
  clean,
  isLearning,
  onBrandChange,
  onModelChange,
  onCommandNameChange,
  onModeChange,
  onTemperatureChange,
  onFanChange,
  onVerticalSwingChange,
  onCleanChange,
  onLearn,
}: Props) {
  if (isLearning) {
    return (
      <div className="learn-panel">
        <h2>📡 Listening for IR Signal</h2>

        <p className="hint">
          Point your remote at the Broadlink device and press the target button.
        </p>

        <div className="learning-radar">📡</div>

        <p className="hint center">Waiting for infrared signal...</p>
      </div>
    );
  }

  return (
    <div className="learn-panel">
      <h2>Capture IR Command</h2>

      <ClimateRemote
        mode={mode}
        temperature={temperature}
        fan={fan}
        verticalSwing={verticalSwing}
        clean={clean}
        onModeChange={onModeChange}
        onTemperatureChange={onTemperatureChange}
        onFanChange={onFanChange}
        onVerticalSwingChange={onVerticalSwingChange}
        onCleanChange={onCleanChange}
      />

      <label>
        Brand
        <input value={brand} onChange={(e) => onBrandChange(e.target.value)} />
      </label>

      <label>
        Model
        <input value={model} onChange={(e) => onModelChange(e.target.value)} />
      </label>

      <label>
        Command Name
        <input
          value={commandName}
          onChange={(e) => onCommandNameChange(e.target.value)}
        />
      </label>

      <p className="hint">
        Configure the remote state, then capture the matching IR command.
      </p>

      <button onClick={onLearn}>📡 Start Learning</button>
    </div>
  );
}

export default LearnPanel;