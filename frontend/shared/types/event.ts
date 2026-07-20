export interface Event {
  _id: string;
  title: string;
  createdBy: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "running" | "finished";
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
}
