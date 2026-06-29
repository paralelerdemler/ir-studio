type Props = {
  mode: string;
  temperature: number;
  fan: number;
  verticalSwing: boolean;
  clean: boolean;

  onModeChange: (value: string) => void;
  onTemperatureChange: (value: number) => void;
  onFanChange: (value: number) => void;
  onVerticalSwingChange: (value: boolean) => void;
  onCleanChange: (value: boolean) => void;
};

const modes = ["cool", "heat", "dry", "fan", "auto"];

function getModeIcon(mode: string) {
  if (mode === "cool") return "❄";
  if (mode === "heat") return "🔥";
  if (mode === "dry") return "💧";
  if (mode === "fan") return "✤";
  return "⚙";
}

function getModeLabel(mode: string) {
  return mode.toUpperCase();
}

function ClimateRemote({
  mode,
  temperature,
  fan,
  verticalSwing,
  clean,
  onModeChange,
  onTemperatureChange,
  onFanChange,
  onVerticalSwingChange,
  onCleanChange,
}: Props) {
  function nextMode() {
    const index = modes.indexOf(mode);
    onModeChange(modes[(index + 1) % modes.length]);
  }

  function decreaseFan() {
    onFanChange(fan <= 1 ? 6 : fan - 1);
  }

  function increaseFan() {
    onFanChange(fan >= 6 ? 1 : fan + 1);
  }

  return (
    <div className="climate-remote-premium">
      <div className="remote-lcd">
        <div className="lcd-glass" />

        <div className="lcd-mode-pill">
          <span>{getModeLabel(mode)}</span>
          <strong>{getModeIcon(mode)}</strong>
        </div>

        <div className="lcd-temperature">
          <span>{temperature}</span>
          <small>°C</small>
        </div>

        <div className="lcd-footer">
          <div className="lcd-footer-item">
            <span className="lcd-icon">✤</span>
            <span>FAN</span>
            <strong>{fan}</strong>

            <div className="fan-bars">
              {Array.from({ length: 6 }).map((_, index) => (
                <i
                  key={index}
                  className={index < fan ? "active" : ""}
                />
              ))}
            </div>
          </div>

          <div className="lcd-footer-item">
            <span className="lcd-icon">↕</span>
            <span>SWING</span>
            <strong>{verticalSwing ? "ON" : "OFF"}</strong>
          </div>

          <div className="lcd-footer-item">
            <span className="lcd-icon">✧</span>
            <span>CLEAN</span>
            <strong>{clean ? "ON" : "OFF"}</strong>
          </div>
        </div>
      </div>

      <button className="remote-mode-button" onClick={nextMode}>
        MODE
      </button>

      <div className="remote-control-pad">
        <button
          className="pad-button pad-up"
          onClick={() => onTemperatureChange(Math.min(30, temperature + 1))}
          aria-label="Increase temperature"
        >
          ˄
        </button>

        <button
          className="pad-button pad-left"
          onClick={decreaseFan}
          aria-label="Decrease fan"
        >
          ‹
        </button>

        <button
          className="pad-power"
          type="button"
          aria-label="Power"
        >
          <span className="power-icon">⏻</span>
          <small>ON / OFF</small>
        </button>

        <button
          className="pad-button pad-right"
          onClick={increaseFan}
          aria-label="Increase fan"
        >
          ›
        </button>

        <button
          className="pad-button pad-down"
          onClick={() => onTemperatureChange(Math.max(16, temperature - 1))}
          aria-label="Decrease temperature"
        >
          ˅
        </button>
      </div>

      <div className="remote-bottom-actions">
        <button
          className={verticalSwing ? "remote-pill active-control" : "remote-pill"}
          onClick={() => onVerticalSwingChange(!verticalSwing)}
        >
          <span>SWING</span>
          <strong>↕</strong>
        </button>

        <button
          className={clean ? "remote-pill active-control" : "remote-pill"}
          onClick={() => onCleanChange(!clean)}
        >
          <span>CLEAN</span>
          <strong>✧</strong>
        </button>
      </div>
    </div>
  );
}

export default ClimateRemote;