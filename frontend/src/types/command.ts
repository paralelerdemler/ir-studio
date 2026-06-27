import type { IRState } from "./irState";

export type Command = {
  id: string;
  brand?: string;
  model?: string;
  name: string;
  state?: IRState;
  code: string;
  length: number;
  created_at: number;
};