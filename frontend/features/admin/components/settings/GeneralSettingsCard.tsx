"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { showError, showSuccess } from "@/components/shared/notifications";
import { updateGeneralSettings } from "@/features/admin/actions/settings";
import { GeneralSettings } from "@/features/admin/types/settings";

import { SettingsSectionCard } from "./SettingsSectionCard";
import { SettingsField } from "./SettingsField";

export function GeneralSettingsCard({
  initialValues,
}: {
  initialValues: GeneralSettings;
}) {
  const [values, setValues] = useState(initialValues);
  const [isPending, setIsPending] = useState(false);

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  function updateField<K extends keyof GeneralSettings>(
    field: K,
    value: GeneralSettings[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsPending(true);
    const result = await updateGeneralSettings(values);

    if (result.success) {
      showSuccess(result.message || "تم الحفظ");
    } else {
      showError(result.error || "حصل مشكلة أثناء الحفظ");
    }
    setIsPending(false);
  }

  return (
    <SettingsSectionCard
      title="الإعدادات العامة"
      description="اسم المنصة، الشعار، وبيانات التواصل الأساسية."
      icon={Building2}
      onSave={handleSave}
      isPending={isPending}
      isDirty={isDirty}
    >
      <SettingsField label="اسم المنصة">
        <Input
          value={values.platformName}
          onChange={(e) => updateField("platformName", e.target.value)}
          placeholder="اللعبة"
          className="text-right bg-background"
        />
      </SettingsField>

      <SettingsField label="البريد الإلكتروني للدعم">
        <Input
          type="email"
          value={values.supportEmail}
          onChange={(e) => updateField("supportEmail", e.target.value)}
          placeholder="support@example.com"
          className="text-right bg-background"
          dir="ltr"
        />
      </SettingsField>

      <SettingsField
        label="رابط شعار المنصة"
        hint="حاليًا رابط مباشر للصورة، رفع الملفات هيتضاف لاحقًا."
        fullWidth
      >
        <Input
          value={values.logoUrl ?? ""}
          onChange={(e) => updateField("logoUrl", e.target.value || null)}
          placeholder="https://example.com/logo.png"
          className="text-right bg-background"
          dir="ltr"
        />
      </SettingsField>

      <SettingsField label="وصف مختصر عن المنصة" fullWidth>
        <textarea
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="مسابقة تفاعلية بين فرق الطلاب..."
          className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm text-right shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </SettingsField>
    </SettingsSectionCard>
  );
}
