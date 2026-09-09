"use client";

import { startTransition, useState } from "react";

// import { type CreateQuestionInput as QuestionFormValues } from "@/features/admin/types/question";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { questionCategories } from "@/features/admin/components/questions/constants/constants";
import { Plus, Trash2 } from "lucide-react";
import { CreateQuestionInput } from "@/features/admin/types/question";

const typeOptions = [
  { value: "mcq", label: "اختيار من متعدد" },
  { value: "numberExact", label: "رقم صحيح" },
];

// Constants file includes an "all" option used only for filtering - not a
// valid value to save on a question, so it's excluded here.
const categoryOptions = questionCategories.filter((c) => c.value !== "all");

const emptyValues: CreateQuestionInput = {
  question: "",
  type: "mcq",
  category: "",
  duration: 15,
  options: ["", ""],
  correctAnswer: "",
};

type QuestionFormProps =
  | {
      mode: "create";
      initialValues?: undefined;
      onSubmit: (data: CreateQuestionInput) => void;
      isLoading?: boolean;
    }
  | {
      mode: "update";
      initialValues: CreateQuestionInput;
      onSubmit: (data: CreateQuestionInput) => void;
      isLoading?: boolean;
    };

export function QuestionForm({
  mode,
  initialValues,
  onSubmit,
  isLoading,
}: QuestionFormProps) {
  const [values, setValues] = useState<CreateQuestionInput>(initialValues ?? emptyValues);

  const options = values.options ?? [];

  function updateType(type: CreateQuestionInput["type"]) {
    // Reset dependent fields when the type changes so we never submit
    // stale options/correctAnswer combos.
    setValues((prev) => ({
      ...prev,
      type,
      options:
        type === "numberExact"
          ? []
          : prev.options?.length
            ? prev.options
            : ["", ""],
      correctAnswer: "",
    }));
  }

  function updateOption(index: number, value: string) {
    setValues((prev) => ({
      ...prev,
      options: options.map((opt, i) => (i === index ? value : opt)),
    }));
  }

  function addOption() {
    setValues((prev) => ({ ...prev, options: [...options, ""] }));
  }

  function removeOption(index: number) {
    setValues((prev) => ({
      ...prev,
      options: options.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No client-side validation - whatever's in the form gets submitted
    // as-is, and the backend is the only thing that decides if it's valid.
    // onSubmit ultimately dispatches a useActionState action (see Add/Edit
    // modals), which React requires to be called inside a transition -
    // otherwise isPending never flips correctly.
    startTransition(() => {
      onSubmit(values);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Question text */}
      <div className="space-y-2">
        <Label htmlFor="question">نص السؤال</Label>
        <Textarea
          id="question"
          rows={3}
          placeholder="اكتب نص السؤال هنا..."
          value={values.question}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, question: e.target.value }))
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Type */}
        <div className="space-y-2">
          <Label>نوع السؤال</Label>
          <Select value={values.type} onValueChange={updateType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر النوع" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>الفئة</Label>
          <Select
            value={values.category}
            onValueChange={(category) =>
              setValues((prev) => ({ ...prev, category }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label htmlFor="duration">مدة السؤال (بالثواني)</Label>
        <Input
          id="duration"
          type="number"
          placeholder="15"
          value={values.duration ?? ""}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, duration: e.target.valueAsNumber }))
          }
        />
      </div>

      {/* Options + correct answer (mcq only) */}
      {values.type === "mcq" && (
        <div className="space-y-2">
          <Label>الخيارات</Label>

          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder={`الخيار ${index + 1}`}
                value={opt}
                onChange={(e) => updateOption(index, e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeOption(index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={addOption}
          >
            <Plus className="w-4 h-4" /> إضافة خيار
          </Button>

          <div className="space-y-2">
            <Label>الإجابة الصحيحة</Label>
            <Select
              value={values.correctAnswer}
              onValueChange={(correctAnswer) =>
                setValues((prev) => ({ ...prev, correctAnswer }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الإجابة الصحيحة" />
              </SelectTrigger>
              <SelectContent>
                {options
                  .filter((opt) => opt.trim().length > 0)
                  .map((opt, i) => (
                    <SelectItem key={i} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Correct answer (numberExact only) */}
      {values.type === "numberExact" && (
        <div className="space-y-2">
          <Label htmlFor="correctAnswer">الإجابة الصحيحة (رقم)</Label>
          <Input
            id="correctAnswer"
            type="text"
            inputMode="numeric"
            placeholder="مثال: 8"
            value={values.correctAnswer}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, correctAnswer: e.target.value }))
            }
          />
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading
          ? "جاري الحفظ..."
          : mode === "create"
            ? "إضافة السؤال"
            : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
