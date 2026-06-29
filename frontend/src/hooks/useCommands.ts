import { useCallback, useEffect, useState } from "react";

import {
  deleteCommand as deleteCommandApi,
  getCommands,
  sendCommand as sendCommandApi,
} from "../services/api";

import type { Command } from "../types/command";

export function useCommands(projectId?: string | null) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoadingCommands, setIsLoadingCommands] = useState(false);
  const [commandsError, setCommandsError] = useState<string | null>(null);

  const refreshCommands = useCallback(async () => {
    setIsLoadingCommands(true);
    setCommandsError(null);

    try {
      const data = await getCommands(projectId);
      setCommands(data);
    } catch (err) {
      setCommands([]);
      setCommandsError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoadingCommands(false);
    }
  }, [projectId]);

  useEffect(() => {
    refreshCommands();
  }, [refreshCommands]);

  const sendCommand = useCallback(async (id: string) => {
    await sendCommandApi(id);
  }, []);

  const deleteCommand = useCallback(
    async (id: string) => {
      await deleteCommandApi(id);
      await refreshCommands();
    },
    [refreshCommands]
  );

  return {
    commands,
    isLoadingCommands,
    commandsError,
    refreshCommands,
    sendCommand,
    deleteCommand,
  };
}