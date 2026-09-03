"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BaseModal } from "@/features/admin/components/shared/BaseModal";
import { bulkInsertQuestionsAction } from "@/features/admin/actions/questions";
import { type CreateQuestionInput } from "@/features/admin/types/question";

import { UploadCloud } from "lucide-react";

const EXAMPLE = `[
  {
    "question": "أي كوكب يُعرف باسم الكوكب الأحمر؟",
    "type": "mcq",
    "options": ["الأرض", "المريخ", "المشتري", "زحل"],
    "correctAnswer": "المريخ",
    "category": "science",
    "duration": 15
  },
  {
    "question": "ما هو الجذر التربيعي للعدد 64؟",
    "type": "numberExact",
    "correctAnswer": "8",
    "category": "math",
    "duration": 15
  }
]`;

export function BulkInsertQuestionsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rawJson, setRawJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    setRawJson("");
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);

    // JSON.parse is just turning the pasted text into an object so it can be
    // sent as the request body - not a content check. If it throws, there's
    // nothing to send at all (the textarea isn't valid JSON syntax), so this
    // stays; everything about whether the *questions* are valid is left to
    // the backend's response.
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawJson);
    } catch {
      setError("النص المدخل ليس JSON صحيح. تأكد من الصيغة.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await bulkInsertQuestionsAction(
        parsed as CreateQuestionInput[],
      );

      if (response.success) {
        toast.success(response.message || "تم استيراد الأسئلة بنجاح!");
        handleClose();
        router.refresh();
      } else {
        toast.error(response.error || "فشل استيراد الأسئلة");
      }
    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء استيراد الأسئلة، يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <UploadCloud className="w-4 h-4" /> استيراد أسئلة (Bulk)
      </Button>

      <BaseModal
        isOpen={isOpen}
        onClose={handleClose}
        title="استيراد مجموعة أسئلة"
        description="الصق مصفوفة JSON بنفس صيغة المثال أدناه، وسيتم إضافة كل الأسئلة دفعة واحدة."
      >
        <div className="space-y-3">
          <Textarea
            value={rawJson}
            onChange={(e) => setRawJson(e.target.value)}
            placeholder={EXAMPLE}
            rows={10}
            dir="ltr"
            className="font-mono text-xs"
          />

          {error && (
            <p className="text-xs text-destructive font-medium">{error}</p>
          )}

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            كل سؤال يجب أن يحتوي على: question, type ("mcq" أو "numberExact"),
            category, duration, correctAnswer، بالإضافة إلى options في حالة mcq.
          </p>

          <div className="flex justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !rawJson.trim()}
            >
              {isLoading ? "جاري الاستيراد..." : "استيراد الأسئلة"}
            </Button>
          </div>
        </div>
      </BaseModal>
    </>
  );
}
