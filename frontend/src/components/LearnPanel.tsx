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
  return (
    <div className="learn-panel">
      <h2>Learn New Command</h2>

      <label>
        Brand
        <input
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
          disabled={isLearning}
        />
      </label>

      <label>
        Model
        <input
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={isLearning}
        />
      </label>

      <label>
        Command Name
        <input
          value={commandName}
          onChange={(e) => onCommandNameChange(e.target.value)}
          disabled={isLearning}
        />
      </label>

      <label>
        Mode
        <select
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
          disabled={isLearning}
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
          disabled={isLearning}
        />
      </label>

      <label>
        Fan
        <select
          value={fan}
          onChange={(e) => onFanChange(Number(e.target.value))}
          disabled={isLearning}
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
          disabled={isLearning}
        />
        Vertical Swing
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={clean}
          onChange={(e) => onCleanChange(e.target.checked)}
          disabled={isLearning}
        />
        Clean
      </label>

      <p className="hint">
        Press Learn, then point the remote at the Broadlink and send the IR
        command once.
      </p>

      <button onClick={onLearn} disabled={isLearning}>
        {isLearning ? "Waiting for IR Signal..." : "Learn Command"}
      </button>
    </div>
  );
}

export default LearnPanel;