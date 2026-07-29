import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ChangePasswordForm from "./ChangePasswordForm";
import DetailsCard from "./DetailsCard";

const ProfileOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Change Password Form */}
      <ChangePasswordForm />

      {/* Details Card */}
      <Suspense fallback={<Skeleton className={`h-104 w-full`} />}>
        <DetailsCard />
      </Suspense>
    </div>
  );
};

export default ProfileOverview;
