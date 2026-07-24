export type SoundName =
  | "correct"
  | "wrong"
  | "streak"
  | "win"
  | "countdown"
  | "timer";

export interface SoundConfig {
  src: string;
  volume?: number;
  loop?: boolean;
}
