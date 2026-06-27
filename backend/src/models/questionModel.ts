import mongoose from "mongoose";

interface IQuestion extends Document {
  question: string;
  type: "mcq" | "a/b" | "oddOneOut" | "numberExact";
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
      enum: ["mcq", "a/b", "oddOneOut", "numberExact"],
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
