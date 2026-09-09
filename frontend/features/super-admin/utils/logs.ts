const DOMAIN_LABELS: Record<string, string> = {
  user: "المستخدمون",
  team: "الفرق",
  notification: "الإشعارات",
  question: "الأسئلة",
  season: "المواسم",
  event: "الأحداث",
  session: "الجلسات",
  admin: "المشرفون",
  super_admin: "سوبر أدمن",
};

export const DOMAIN_OPTIONS = Object.entries(DOMAIN_LABELS).map(
  ([value, label]) => ({ label, value }),
);

export const KIND_OPTIONS = [
  { label: "إنشاء", value: "created" },
  { label: "تعديل", value: "updated" },
  { label: "حذف", value: "delete" },
  { label: "تسجيل دخول", value: "login" },
  { label: "إنشاء حساب", value: "signup" },
  { label: "تعطيل", value: "deactivated" },
  { label: "كلمة المرور", value: "password" },
  { label: "انضمام", value: "joined" },
  { label: "مغادرة", value: "left" },
  { label: "نقل الكابتن", value: "transferred" },
  { label: "إزالة عضو", value: "removed" },
  { label: "بدء جلسة", value: "started" },
  { label: "إكمال جلسة", value: "completed" },
  { label: "إلغاء جلسة", value: "abandoned" },
  { label: "إرسال", value: "sent" },
];