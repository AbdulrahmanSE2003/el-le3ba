import { apiServer } from "@/lib/apiServer";
import { redirect } from "next/navigation";
import NoTeam from "@/components/shared/NoTeam";

export default async function TeamIndexPage() {
  let teamId: string | null = null;
  new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const res = await apiServer<any>("get", "/teams/my-team");
    teamId = res?.data?.team?.team?._id || null;
  } catch (error) {
    // If not in a team or not authenticated, handle gracefully
    console.log("Error checking user team on index page", error);
  }

  if (teamId) {
    redirect(`/team/${teamId}`);
  }

  return (
    <section className="h-full">
      <div className="container mx-auto w-full p-4">
        <NoTeam />
      </div>
    </section>
  );
}
