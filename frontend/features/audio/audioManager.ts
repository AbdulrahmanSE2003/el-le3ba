import type { SoundConfig, SoundName } from "./types";

const sounds: Record<SoundName, SoundConfig> = {
  correct: {
    src: "/sounds/correct.mp3",
    volume: 0.7,
  },
  wrong: {
    src: "/sounds/wrong-answer.mp3",
    volume: 0.7,
  },
  streak: {
    src: "/sounds/streak.mp3",
    volume: 0.8,
  },
  win: {
    src: "/sounds/win.mp3",
    volume: 0.7,
  },
  countdown: {
    src: "/sounds/countdown.mp3",
    volume: 0.9,
  },
  timer: {
    src: "/sounds/timer.mp3",
    volume: 0.5,
    loop: true,
  },
};

class AudioManager {
  private players = new Map<SoundName, HTMLAudioElement>();

  private muted = false;

  preload() {
    Object.entries(sounds).forEach(([name, config]) => {
      if (this.players.has(name as SoundName)) return;

      const audio = new Audio(config.src);

      audio.preload = "auto";
      audio.volume = config.volume ?? 1;
      audio.loop = config.loop ?? false;

      this.players.set(name as SoundName, audio);
    });
  }

  play(name: SoundName) {
    if (this.muted) return;

    const audio = this.players.get(name);

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    void audio.play().catch(() => {});
  }

  stop(name: SoundName) {
    const audio = this.players.get(name);

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }

  stopAll() {
    this.players.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  setMuted(value: boolean) {
    this.muted = value;

    this.players.forEach((audio) => {
      audio.muted = value;
    });
  }

  get(name: SoundName) {
    return this.players.get(name);
  }
}

export const audio = new AudioManager();
