import { Metadata } from "next";

import PageHeader from "@/features/admin/components/PageHeader";
import { GeneralSettingsCard } from "@/features/admin/components/settings/GeneralSettingsCard";
import { QuizDefaultsCard } from "@/features/admin/components/settings/QuizDefaultsCard";
import { SecurityCard } from "@/features/admin/components/settings/SecurityCard";
import { AdminManagementCard } from "@/features/admin/components/settings/AdminManagementCard";
import { getCurrentUser } from "@/shared/api/helpers";
import {
  AdminAccount,
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
  admins: AdminAccount[];
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
    admins: [
      {
        _id: "admin-1",
        name: "عبدالرحمن سعد",
        email: "abdelrahman.saad@example.com",
        avatar: null,
        role: "superAdmin",
        addedAt: "2025-01-10T00:00:00.000Z",
      },
      {
        _id: "admin-2",
        name: "رامز خالد",
        email: "ramez.hkaled@gmail.com",
        avatar: null,
        role: "admin",
        addedAt: "2025-03-22T00:00:00.000Z",
      },
      {
        _id: "admin-3",
        name: "عبدالرحمن ابوزيد",
        email: "abdelrahman.abo_zaid@gmail.com",
        avatar: null,
        role: "admin",
        addedAt: "2025-06-02T00:00:00.000Z",
      },
    ],
  };
}

export default async function SettingsPage() {
  const [settings, userRes] = await Promise.all([
    getSettingsData(),
    getCurrentUser(),
  ]);

  const currentAdminId = userRes.success ? userRes.data.userData._id : "";

  return (
    <div className="p-3 space-y-6 dir-rtl text-right font-body max-w-4xl">
      <PageHeader
        title="الإعدادات"
        description="تحكم في إعدادات المنصة العامة، قواعد المسابقة الافتراضية، والأمان."
      />

      <div className="space-y-5">
        <GeneralSettingsCard initialValues={settings.general} />
        <QuizDefaultsCard initialValues={settings.quizDefaults} />
        <SecurityCard initialValues={settings.security} />
        <AdminManagementCard
          initialAdmins={settings.admins}
          currentAdminId={currentAdminId}
        />
      </div>
    </div>
  );
}
