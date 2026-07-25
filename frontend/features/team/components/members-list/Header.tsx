export default function Header({ membersLen }: { membersLen: number }) {
  return (
    <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
      👥 أعضاء الفريق
      <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
        {membersLen}/5
      </span>
    </h2>
  );
}
