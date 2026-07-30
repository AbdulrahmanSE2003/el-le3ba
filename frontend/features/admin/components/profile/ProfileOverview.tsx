import { Suspense } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import DetailsCard from "./DetailsCard";
import DetailsCardSkeleton from "./DetailsCardSkeleton";

const ProfileOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Change Password Form */}
      <ChangePasswordForm />

      {/* Details Card */}
      <Suspense fallback={<DetailsCardSkeleton />}>
        <DetailsCard />
      </Suspense>
    </div>
  );
};

export default ProfileOverview;
