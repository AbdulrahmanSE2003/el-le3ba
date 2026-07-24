import NoTeamActions from "./NoTeamActions";
import NoTeamIcon from "./NoTeamIcon";

export default function NoTeam() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)]  items-center justify-center">
      <div className="p-8 text-center shadow-lg border border-border rounded-lg">
        <NoTeamIcon />

        <h2 className="text-2xl font-bold tracking-tight">
          لسا معندكش فريق 🙁
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          انضم لفريق عشان تشارك في الإيفنت الحالي.
        </p>

        <NoTeamActions />
      </div>
    </section>
  );
}
