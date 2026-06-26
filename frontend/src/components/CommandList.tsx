type CommandState = {
  power: boolean;
  mode: string;
  temperature?: number;
  fan?: number;
  vertical_swing?: boolean;
  clean?: boolean;
};

type Command = {
  id: string;
  name: string;
  brand?: string;
  model?: string;
  state?: CommandState;
  code: string;
  length: number;
  created_at: number;
};

type Props = {
  commands: Command[];
  onSend: (id: string) => void;
  onDelete: (id: string) => void;
};

function CommandList({ commands, onSend, onDelete }: Props) {
  if (commands.length === 0) {
    return (
      <div className="device">
        <strong>No commands learned yet</strong>
        <span>Learn your first IR command to get started.</span>
      </div>
    );
  }

  return (
    <div className="device-list">
      <h2>Commands</h2>

      {commands.map((command) => (
        <div className="device" key={command.id}>
          <strong>{command.name}</strong>

          <span>
            {command.brand ?? "Unknown"} • {command.model ?? "Unknown"}
          </span>

          {command.state && (
            <small>
              {command.state.mode.toUpperCase()}
              {command.state.temperature
                ? ` • ${command.state.temperature}°C`
                : ""}
              {command.state.fan ? ` • Fan ${command.state.fan}` : ""}
              {command.state.vertical_swing ? " • Swing" : ""}
              {command.state.clean ? " • Clean" : ""}
            </small>
          )}

          <small>{command.length} bytes</small>

          <button className="secondary" onClick={() => onSend(command.id)}>
            Send
          </button>

          <button
            className="secondary danger"
            onClick={() => onDelete(command.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommandList;