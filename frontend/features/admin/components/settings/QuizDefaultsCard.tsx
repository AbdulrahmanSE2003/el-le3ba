"use client";

import { useState } from "react";
import { Gamepad2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { showError, showSuccess } from "@/components/shared/notifications";
import { updateQuizDefaults } from "@/features/admin/actions/settings";
import { QuizDefaultsSettings } from "@/features/admin/types/settings";

import { SettingsSectionCard } from "./SettingsSectionCard";
import { SettingsField } from "./SettingsField";
import { SettingsSwitchRow } from "./SettingsSwitchRow";

export function QuizDefaultsCard({
  initialValues,
}: {
  initialValues: QuizDefaultsSettings;
}) {
  const [values, setValues] = useState(initialValues);
  const [isPending, setIsPending] = useState(false);

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  function updateField<K extends keyof QuizDefaultsSettings>(
    field: K,
    value: QuizDefaultsSettings[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsPending(true);
    const result = await updateQuizDefaults(values);

    if (result.success) {
      showSuccess(result.message || "تم الحفظ");
    } else {
      showError(result.error || "حصل مشكلة أثناء الحفظ");
    }
    setIsPending(false);
  }

  return (
    <SettingsSectionCard
      title="إعدادات المسابقة الافتراضية"
      description="القيم اللي بتتطبق على أي موسم جديد، وتقدر تتعدل لكل موسم لوحده."
      icon={Gamepad2}
      onSave={handleSave}
      isPending={isPending}
      isDirty={isDirty}
    >
      <SettingsField label="عدد المحاولات لكل فريق">
        <Input
          type="number"
          min={1}
          value={values.defaultMaxAttempts}
          onChange={(e) =>
            updateField("defaultMaxAttempts", Number(e.target.value))
          }
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsField label="عدد الأسئلة في المباراة الواحدة">
        <Input
          type="number"
          min={1}
          value={values.questionsPerSession}
          onChange={(e) =>
            updateField("questionsPerSession", Number(e.target.value))
          }
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsField label="الوقت المسموح لكل سؤال (ثانية)">
        <Input
          type="number"
          min={5}
          value={values.secondsPerQuestion}
          onChange={(e) =>
            updateField("secondsPerQuestion", Number(e.target.value))
          }
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsField label="نقاط الإجابة الصحيحة">
        <Input
          type="number"
          min={1}
          value={values.pointsPerCorrectAnswer}
          onChange={(e) =>
            updateField("pointsPerCorrectAnswer", Number(e.target.value))
          }
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsSwitchRow
        label="مكافأة التتابع (Streak Bonus)"
        description="إضافة نقاط إضافية عند تحقيق إجابات صحيحة متتالية."
        checked={values.streakBonusEnabled}
        onCheckedChange={(checked) =>
          updateField("streakBonusEnabled", checked)
        }
      />

      {values.streakBonusEnabled && (
        <SettingsField label="نقاط مكافأة كل تتابع" fullWidth>
          <Input
            type="number"
            min={1}
            value={values.streakBonusPoints}
            onChange={(e) =>
              updateField("streakBonusPoints", Number(e.target.value))
            }
            className="text-right bg-background sm:max-w-[220px]"
          />
        </SettingsField>
      )}
    </SettingsSectionCard>
  );
}
