import mongoose from "mongoose";

export interface IQuestion extends Document {
  question: string;
  type: "mcq" | "a/b" | "oddOneOut" | "numberExact" | "speed";
  options?: string[];
  correctAnswer: string;
  category?: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["mcq", "a/b", "oddOneOut", "numberExact", "speed"],
      required: true,
    },

    options: { type: [String], default: undefined },

    correctAnswer: {
      type: String,
      required: true,
    },

    category: String,

    duration: { type: Number, required: true, max: 20, min: 7 },
  },
  { timestamps: true },
);

questionSchema.index({ category: 1 });

const Question = mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
