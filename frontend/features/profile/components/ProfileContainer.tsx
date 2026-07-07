import Achievements from "./achievements/Achievements";
import ProfileStats from "./profile-stats/ProfileStats";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./edit-profile/EditProfile";
import Settings from "./settings/Settings";
import Logout from "./Logout";
import LastGames from "./last-games/LastGames";
import { fetchUserData } from "../api";

export default async function ProfileContainer() {
  const { userData } = await fetchUserData();

  return (
    <section className="flex flex-col gap-5">
      <ProfileInfo user={userData} />

      <ProfileStats user={userData} />

      <Achievements />

      <LastGames user={userData} />

      <EditProfile user={userData} />

      <Settings />

      <Logout />
    </section>
  );
}
