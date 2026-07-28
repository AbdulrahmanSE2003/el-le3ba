export type QuestionType = "mcq" | "true_false" | "short_answer";
export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionStatus = "active" | "archived";

export interface AdminQuestion {
  _id: string;
  text: string;
  type: QuestionType;
  choices: string[] | null;
  correctAnswer: string;
  category: string;
  difficulty: QuestionDifficulty;
  season: string | null;
  usageCount: number;
  status: QuestionStatus;
  createdAt: string;
}
