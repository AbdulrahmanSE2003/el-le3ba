export interface Event {
  _id: string;
  title: string;
  createdBy: string;
  seasonId: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "running" | "finished";
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventWithSeason extends Event {
  season?: {
    _id: string;
    title: string;
  } | null;
}
