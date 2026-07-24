export default function Header({ sessionsLen }: { sessionsLen: number }) {
  return (
    <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
      🏟️ سجل المباريات
      <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
        {sessionsLen} مباراة
      </span>
    </h2>
  );
}
