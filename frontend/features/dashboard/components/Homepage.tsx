import CurrentEvent from "@/features/dashboard/components/CurrentEvent";
import Notification from "@/features/dashboard/components/Notification";
import WelcomeMessage from "@/features/dashboard/components/WelcomeMessage";
import { apiServer } from "@/lib/apiServer";

interface UserRes {
  status: true;
  userData: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    gamesPlayed: number;
    totalScore: number;
    passwordResetExpires: string;
    avatar: string;
    passwordChangedAt: string;
    highestScore: number;
    bestStreak: number;
  };
}

const Homepage = async () => {
  const userRes = await apiServer<UserRes>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
  );

  const user = userRes?.data?.userData;

  const teamRes = await apiServer(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/teams/my-team`,
  );

  const team = teamRes?.data;

  return (
    <div className={`container mx-auto w-full space-y-6`}>
      {/* Notification & Welcome message */}
      <div className={`flex justify-between items-center`}>
        <Notification />
        <WelcomeMessage />
      </div>

      {/* Current Event */}
      <CurrentEvent />
    </div>
  );
};

export default Homepage;
