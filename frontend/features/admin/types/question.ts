// NOTE: previously this was "mcq" | "true_false" | "short_answer", which didn't
// match the real backend contract (mcq / numberExact) or constants/constants.ts.
// Fixed to reflect what the API actually accepts.
export type QuestionType = "mcq" | "numberExact";

export interface AdminQuestion {
  _id: string;
  question: string;
  type: QuestionType;
  options: string[] | null;
  correctAnswer: string;
  category: string;
  duration: number;
  createdAt: string;
}

// Shape sent to the backend for create / update / bulk-insert.
export interface CreateQuestionInput {
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  category: string;
  duration: number;
}

export type UpdateQuestionInput = CreateQuestionInput;

// Converts a question as returned by the API (AdminQuestion) into the shape
// the backend accepts for create / update (CreateQuestionInput).
export function toCreateQuestionInput(
  question: AdminQuestion,
): CreateQuestionInput {
  return {
    question: question.question,
    type: question.type,
    options: question.options ?? undefined,
    correctAnswer: question.correctAnswer,
    category: question.category,
    duration: question.duration,
  };
}

export type QuestionStats = {
  success: boolean;
  data: {
    status: boolean;
    stats: {
      totalQuestions: number;
      totalCategories: number;
      duration: {
        averageDuration: number;
      };
    };
  };
  message: string;
};

export type QuestionsRes = {
  success: boolean;
  data: {
    status: boolean;
    questions: {
      questions: AdminQuestion[];
      pagination: {
        totalResults: number;
        totalPages: number;
        page: number;
        limit: number;
      };
    };
  };
  message: string;
};

export type QuestionMetadata = {
  success: boolean;
  data: {
    status: boolean;
    meta: {
      categories: string[];
      types: string[];
    };
  };
};
