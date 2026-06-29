import { useState } from "react";

import LearnPanel from "../components/LearnPanel";
import { useCommands } from "../hooks/useCommands";
import { useLearning } from "../hooks/useLearning";
import { useProjects } from "../hooks/useProjects";
import { sendCommand, verifyCommand } from "../services/api";

function Learn() {
  const { refreshCommands } = useCommands();
  const { selectedProjectId } = useProjects();

  const learning = useLearning(refreshCommands, selectedProjectId);

  const [isTesting, setIsTesting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  async function handleTest() {
    if (!learning.learnedCommandId) return;

    try {
      setIsTesting(true);
      await sendCommand(learning.learnedCommandId);
    } finally {
      setIsTesting(false);
    }
  }

  async function handleVerified() {
    if (!learning.learnedCommandId) return;

    try {
      setIsVerifying(true);

      await verifyCommand(learning.learnedCommandId, true);
      await refreshCommands();

      setVerified(true);
    } finally {
      setIsVerifying(false);
    }
  }

  function handleLearnAgain() {
    setVerified(false);
    learning.resetLearning();
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Learn Wizard</h1>

        {!learning.learningSuccess ? (
          <>
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
          </>
        ) : (
          <div className="learn-panel">
            {!verified ? (
              <>
                <h2>✅ Command Captured</h2>

                <p className="hint">
                  Test the command before confirming it.
                </p>

                <button onClick={handleTest} disabled={isTesting}>
                  {isTesting ? "Sending..." : "🧪 Test Command"}
                </button>

                <button
                  className="secondary"
                  onClick={handleVerified}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Saving..." : "👍 It Worked"}
                </button>

                <button
                  className="secondary danger"
                  onClick={handleLearnAgain}
                >
                  🔁 Learn Again
                </button>
              </>
            ) : (
              <>
                <h2>🎉 Command Verified</h2>

                <p className="hint">
                  The command was tested and saved as verified.
                </p>

                <button onClick={handleLearnAgain}>
                  Learn Next Command
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Learn;