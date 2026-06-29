import { useState } from "react";
import { learnCommand as learnCommandApi } from "../services/api";

type LearnCommandPayload = {
  project_id?: string;

  brand: string;
  model: string;
  name: string;

  state: {
    power: boolean;
    mode: string;
    temperature: number;
    fan: number;
    vertical_swing: boolean;
    clean: boolean;
  };
};

export function useLearning(
  onLearned: () => Promise<void>,
  selectedProjectId: string | null,
) {
  const [isLearning, setIsLearning] = useState(false);

  const [learningSuccess, setLearningSuccess] = useState(false);
  const [learnedCommandId, setLearnedCommandId] = useState<string | null>(null);

  const [showLearnForm, setShowLearnForm] = useState(false);
  const [learningError, setLearningError] = useState<string | null>(null);

  const [commandName, setCommandName] = useState("Power On 22C Fan2");
  const [brand, setBrand] = useState("Arçelik");
  const [model, setModel] = useState("Unknown");
  const [mode, setMode] = useState("cool");
  const [temperature, setTemperature] = useState(22);
  const [fan, setFan] = useState(2);
  const [verticalSwing, setVerticalSwing] = useState(false);
  const [clean, setClean] = useState(false);

  async function learnCommand() {
    setIsLearning(true);
    setLearningSuccess(false);
    setLearningError(null);

    const payload: LearnCommandPayload = {
      project_id: selectedProjectId ?? undefined,

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
    };

    try {
      const result = await learnCommandApi(payload);

      setLearnedCommandId(result.command.id);
      setLearningSuccess(true);

      setShowLearnForm(false);

      await onLearned();
    } catch (err) {
      setLearningError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLearning(false);
    }
  }

  function resetLearning() {
    setLearningSuccess(false);
    setLearnedCommandId(null);
  }

  return {
    isLearning,

    learningSuccess,
    learnedCommandId,

    resetLearning,

    showLearnForm,
    setShowLearnForm,

    learningError,

    commandName,
    setCommandName,

    brand,
    setBrand,

    model,
    setModel,

    mode,
    setMode,

    temperature,
    setTemperature,

    fan,
    setFan,

    verticalSwing,
    setVerticalSwing,

    clean,
    setClean,

    learnCommand,
  };
}