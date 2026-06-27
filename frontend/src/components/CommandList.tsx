import type { Command } from "../types/command";

type Props = {
  commands: Command[];
  onSend: (id: string) => void;
  onDelete: (id: string) => void;
};

function modeIcon(mode?: string) {
  switch (mode) {
    case "cool":
      return "❄️";

    case "heat":
      return "🔥";

    case "dry":
      return "💧";

    case "fan":
      return "🌀";

    case "auto":
      return "⚙️";

    default:
      return "📡";
  }
}

function modeTitle(mode?: string) {
  if (!mode) return "UNKNOWN";

  return mode.toUpperCase();
}

function CommandList({
  commands,
  onSend,
  onDelete,
}: Props) {
  if (commands.length === 0) {
    return (
      <div className="device-list">
        <h2>Command Library</h2>

        <div className="device">
          <strong>No commands yet</strong>

          <span>
            Learn your first infrared command to start building your library.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="device-list">
      <h2>Command Library</h2>

      {commands.map((command) => (
        <div className="device" key={command.id}>
          <strong>
            {modeIcon(command.state?.mode)}{" "}
            {modeTitle(command.state?.mode)}
          </strong>

          <span>
            {command.state?.temperature
              ? `${command.state.temperature}°C`
              : "--"}
          </span>

          <small>
            Fan {command.state?.fan ?? "-"}
          </small>

          <small>
            Brand: {command.brand ?? "Unknown"}
          </small>

          <small>
            Model: {command.model ?? "Unknown"}
          </small>

          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 12,
            }}
          >
            <button
              className="secondary"
              onClick={() => onSend(command.id)}
            >
              ▶ Send
            </button>

            <button
              className="secondary danger"
              onClick={() => onDelete(command.id)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommandList;