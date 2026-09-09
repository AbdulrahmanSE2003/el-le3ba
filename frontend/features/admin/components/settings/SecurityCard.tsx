"use client";

import { useState } from "react";
import { ShieldAlert, TriangleAlert } from "lucide-react";

import { Input } from "@/components/ui/input";
import { showError, showSuccess } from "@/components/shared/notifications";
import { updateSecuritySettings } from "@/features/admin/actions/settings";
import { SecuritySettings } from "@/features/admin/types/settings";

import { SettingsSectionCard } from "./SettingsSectionCard";
import { SettingsField } from "./SettingsField";
import { SettingsSwitchRow } from "./SettingsSwitchRow";

export function SecurityCard({
  initialValues,
}: {
  initialValues: SecuritySettings;
}) {
  const [values, setValues] = useState(initialValues);
  const [isPending, setIsPending] = useState(false);

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  function updateField<K extends keyof SecuritySettings>(
    field: K,
    value: SecuritySettings[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsPending(true);
    const result = await updateSecuritySettings(values);

    if (result.success) {
      showSuccess(result.message || "تم الحفظ");
    } else {
      showError(result.error || "حصل مشكلة أثناء الحفظ");
    }
    setIsPending(false);
  }

  return (
    <SettingsSectionCard
      title="الأمان والوصول"
      description="مدة الجلسات، محاولات الدخول، ومدة الحظر الافتراضية."
      icon={ShieldAlert}
      onSave={handleSave}
      isPending={isPending}
      isDirty={isDirty}
    >
      <SettingsField label="مدة صلاحية الجلسة (يوم)">
        <Input
          type="number"
          min={1}
          value={values.sessionExpiryDays}
          onChange={(e) =>
            updateField("sessionExpiryDays", Number(e.target.value))
          }
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsField label="أقصى عدد محاولات دخول خاطئة">
        <Input
          type="number"
          min={1}
          value={values.maxLoginAttempts}
          onChange={(e) =>
            updateField("maxLoginAttempts", Number(e.target.value))
          }
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsField label="مدة القفل بعد تجاوز المحاولات (دقيقة)">
        <Input
          type="number"
          min={1}
          value={values.lockoutDurationMinutes}
          onChange={(e) =>
            updateField("lockoutDurationMinutes", Number(e.target.value))
          }
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsField label="مدة الحظر الافتراضية (يوم)">
        <Input
          type="number"
          min={1}
          value={values.defaultBanDurationDays}
          onChange={(e) =>
            updateField("defaultBanDurationDays", Number(e.target.value))
          }
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsSwitchRow
        label="وضع الصيانة"
        description="إيقاف دخول اللاعبين للمنصة مؤقتًا مع إبقاء لوحة الإدارة شغالة."
        checked={values.maintenanceMode}
        onCheckedChange={(checked) => updateField("maintenanceMode", checked)}
      />

      {values.maintenanceMode && (
        <div className="sm:col-span-2 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            تفعيل وضع الصيانة هيمنع كل اللاعبين من الدخول للمنصة فورًا بعد
            الحفظ. استخدمه بس وقت الحاجة الفعلية.
          </span>
        </div>
      )}
    </SettingsSectionCard>
  );
}
