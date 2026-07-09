import CurrentEvent from "@/features/dashboard/components/CurrentEvent";
import Notification from "@/features/dashboard/components/Notification";
import WelcomeMessage from "@/features/dashboard/components/WelcomeMessage";
import {
  AttemptsApiResponse,
  EventApiResponse,
  TeamApiResponse,
} from "@/features/match/components/LobbyWrapper";
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
  // const userRes = await apiServer<UserRes>(
  //   "get",
  //   `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
  // );

  // const user = userRes?.data?.userData;

  const eventRes = await apiServer<EventApiResponse>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/events/current`,
  );

  const event = eventRes?.data?.event;

  const teamRes = await apiServer<TeamApiResponse>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/teams/my-team`,
  );

  const team = teamRes?.data.team.team;
  const attemptsRes = await apiServer<AttemptsApiResponse>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/teams/${team._id}/attempts?eventId=${event._id}`,
  );
  const attempts = attemptsRes?.data?.attempts.attempts;

  return (
    <div className={`container mx-auto w-full space-y-6`}>
      {/* Notification & Welcome message */}
      <div className={`flex justify-between items-center`}>
        <Notification />
        <WelcomeMessage />
      </div>

      {/* Current Event */}
      <CurrentEvent event={event} attempts={attempts} />

      {/* Team Snapshot */}
      <div className={``}>ss</div>
    </div>
  );
};

export default Homepage;
