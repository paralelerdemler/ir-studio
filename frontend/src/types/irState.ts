export type IRState = {
  power: boolean;
  mode: string;
  temperature?: number;
  fan?: number;
  vertical_swing?: boolean;
  horizontal_swing?: boolean;
  clean?: boolean;
  sleep?: boolean;
  eco?: boolean;
  display?: boolean;
};