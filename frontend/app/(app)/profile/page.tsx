import PageSkeleton from "@/features/profile/components/PageSkeleton";
import ProfileContainer from "@/features/profile/components/ProfileContainer";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "الملف الشخصي",
  description:
    "اعرض معلومات حسابك، وقم بتحديث بياناتك الشخصية، وإدارة إعدادات حسابك بسهولة.",
};

export default function ProfilePage() {
  return (
    <section className={`max-sm:px-4 max-sm:pt-6`}>
      <Suspense fallback={<PageSkeleton />}>
        <ProfileContainer />
      </Suspense>
    </section>
  );
}
