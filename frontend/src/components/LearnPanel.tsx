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

        <div
          style={{
            fontSize: 72,
            textAlign: "center",
            margin: "32px 0",
          }}
        >
          📡
        </div>

        <div
          style={{
            width: "100%",
            height: 8,
            borderRadius: 999,
            background: "#1e293b",
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: "45%",
              height: "100%",
              background: "#3b82f6",
              animation: "pulse 1.2s infinite",
            }}
          />
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          Waiting for infrared signal...
        </p>
      </div>
    );
  }

  return (
    <div className="learn-panel">
      <h2>Capture IR Command</h2>

      <label>
        Brand
        <input
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
        />
      </label>

      <label>
        Model
        <input
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
        />
      </label>

      <label>
        Command Name
        <input
          value={commandName}
          onChange={(e) => onCommandNameChange(e.target.value)}
        />
      </label>

      <label>
        Mode
        <select
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
        >
          <option value="cool">Cool</option>
          <option value="heat">Heat</option>
          <option value="dry">Dry</option>
          <option value="fan">Fan</option>
          <option value="auto">Auto</option>
        </select>
      </label>

      <label>
        Temperature
        <input
          type="number"
          min={16}
          max={30}
          value={temperature}
          onChange={(e) => onTemperatureChange(Number(e.target.value))}
        />
      </label>

      <label>
        Fan
        <select
          value={fan}
          onChange={(e) => onFanChange(Number(e.target.value))}
        >
          <option value={1}>Fan 1</option>
          <option value={2}>Fan 2</option>
          <option value={3}>Fan 3</option>
          <option value={4}>Fan 4</option>
          <option value={5}>Fan 5</option>
          <option value={6}>Cycle</option>
        </select>
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={verticalSwing}
          onChange={(e) => onVerticalSwingChange(e.target.checked)}
        />
        Vertical Swing
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={clean}
          onChange={(e) => onCleanChange(e.target.checked)}
        />
        Clean
      </label>

      <p className="hint">
        Configure the desired device state, then start learning.
      </p>

      <button onClick={onLearn}>
        📡 Start Learning
      </button>
    </div>
  );
}

export default LearnPanel;