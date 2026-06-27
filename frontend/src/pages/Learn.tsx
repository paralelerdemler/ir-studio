import LearnPanel from "../components/LearnPanel";
import { useCommands } from "../hooks/useCommands";
import { useLearning } from "../hooks/useLearning";

function Learn() {
  const { refreshCommands } = useCommands();
  const learning = useLearning(refreshCommands);

  return (
    <div className="app">
      <div className="card">
        <h1>Learn Wizard</h1>

        <p className="subtitle">
          Define a climate state, then capture the matching IR command.
        </p>

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

        {learning.learningError && (
          <p className="error">{learning.learningError}</p>
        )}
      </div>
    </div>
  );
}

export default Learn;