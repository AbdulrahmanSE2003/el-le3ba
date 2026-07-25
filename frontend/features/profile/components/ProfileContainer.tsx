import ProfileStats from "./profile-stats/ProfileStats";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./edit-profile/EditProfile";
import Settings from "./settings/Settings";
import LastGames from "./last-games/LastGames";
import AccountActions from "./account-actions/AccountActions";

import { getCurrentUser } from "@/shared/api/helpers";
import Error from "@/app/error";

export default async function ProfileContainer() {
  const userRes = await getCurrentUser();
  if (!userRes.success) return <Error />;

  const userData = userRes.data.userData;
  // NOTE: Here is the role of user
  console.log(userData.myTeamRole);

  return (
    <div className="flex flex-col gap-5">
      <ProfileInfo user={userData} />

      <ProfileStats user={userData} />

      {/* <Achievements /> */}

      <LastGames user={userData} />

      <EditProfile user={userData} />

      <Settings />

      <AccountActions />
    </div>
  );
}
