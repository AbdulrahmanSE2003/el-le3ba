import { memo } from "react";

interface EventInfoProps {
  attemptsLeft: number;
  eventTitle: string;
}

const EventInfo = memo(function EventInfo({
  attemptsLeft,
  eventTitle,
}: EventInfoProps) {
  return (
    <div className="w-full flex items-center justify-end gap-3">
      <div className="bg-accent/30 border border-accent rounded-full px-3 py-1 text-xs text-amber-500 dark:text-amber-300">
        {attemptsLeft} محاولات متبقية
      </div>
      <div className="text-foreground text-sm">{eventTitle}</div>
    </div>
  );
});

export default EventInfo;
