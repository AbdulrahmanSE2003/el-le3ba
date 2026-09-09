import { Metadata } from "next";

import PageHeader from "@/features/admin/components/shared/PageHeader";
import { GeneralSettingsCard } from "@/features/admin/components/settings/GeneralSettingsCard";
import { QuizDefaultsCard } from "@/features/admin/components/settings/QuizDefaultsCard";
import { SecurityCard } from "@/features/admin/components/settings/SecurityCard";
import {
  GeneralSettings,
  QuizDefaultsSettings,
  SecuritySettings,
} from "@/features/admin/types/settings";

export const metadata: Metadata = {
  title: "الإعدادات | الإدارة",
  description: "الإعدادات العامة، قواعد المسابقة الافتراضية، والأمان.",
};

/**
 * TODO(backend): GET /admin/settings
 * Response: { general: GeneralSettings, quizDefaults: QuizDefaultsSettings,
 *             security: SecuritySettings, admins: AdminAccount[] }
 * See the shared wireframe doc for the exact field contract and the
 * per-section PATCH/POST/DELETE endpoints used by the save actions.
 */
async function getSettingsData(): Promise<{
  general: GeneralSettings;
  quizDefaults: QuizDefaultsSettings;
  security: SecuritySettings;
}> {
  return {
    general: {
      platformName: "اللعبة",
      logoUrl: null,
      supportEmail: "support@el-le3ba.com",
      description: "مسابقة تفاعلية بين فرق الطلاب في جامعة BETU.",
    },
    quizDefaults: {
      defaultMaxAttempts: 3,
      questionsPerSession: 15,
      secondsPerQuestion: 20,
      pointsPerCorrectAnswer: 100,
      streakBonusEnabled: true,
      streakBonusPoints: 25,
    },
    security: {
      sessionExpiryDays: 7,
      maxLoginAttempts: 5,
      lockoutDurationMinutes: 15,
      defaultBanDurationDays: 7,
      maintenanceMode: false,
    },
  };
}

export default async function SettingsPage() {
  const [settings] = await Promise.all([getSettingsData()]);

  return (
    <div className="p-3 space-y-6 dir-rtl text-right font-body">
      <PageHeader
        title="الإعدادات"
        description="تحكم في إعدادات المنصة العامة، قواعد المسابقة الافتراضية، والأمان."
      />

      <div className="space-y-5">
        <GeneralSettingsCard initialValues={settings.general} />
        <QuizDefaultsCard initialValues={settings.quizDefaults} />
        <SecurityCard initialValues={settings.security} />
      </div>
    </div>
  );
}
