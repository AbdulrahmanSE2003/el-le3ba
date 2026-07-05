import Achievements from "./achievements/Achievements";
import ProfileStats from "./profile-stats/ProfileStats";
import ProfileInfo from "./ProfileInfo";
import Settings from "./settings/Settings";
import Logout from "./Logout";
import LastGames from "./last-games/LastGames";

export default function ProfileContainer() {
  return (
    <section className="flex flex-col gap-5">
      <ProfileInfo />

      <ProfileStats />

      <Achievements />

      <LastGames />

      <Settings />

      <Logout />
    </section>
  );
}
