import { useCallback, useEffect, useState } from "react";
import { discover } from "../services/api";
import type { Device } from "../types/device";

export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoadingDevices, setIsLoadingDevices] = useState(false);
  const [devicesError, setDevicesError] = useState<string | null>(null);

  const refreshDevices = useCallback(async () => {
    setIsLoadingDevices(true);
    setDevicesError(null);

    try {
      const devicesData = await discover();
      setDevices(devicesData);
    } catch (err) {
      setDevices([]);
      setDevicesError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoadingDevices(false);
    }
  }, []);

  useEffect(() => {
    refreshDevices();
  }, [refreshDevices]);

  return {
    devices,
    isLoadingDevices,
    devicesError,
    refreshDevices,
  };
}