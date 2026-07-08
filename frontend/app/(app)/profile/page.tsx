import ProfileContainer from "@/features/profile/components/ProfileContainer";

export const metadata = {
  title: "الملف الشخصي",
  description:
    "اعرض معلومات حسابك، وقم بتحديث بياناتك الشخصية، وإدارة إعدادات حسابك بسهولة.",
};

export default function ProfilePage() {
  return (
    <main>
      <ProfileContainer />
    </main>
  );
}
