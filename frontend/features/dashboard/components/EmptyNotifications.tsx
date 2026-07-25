import { Bell } from "lucide-react";

const EmptyNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
      <div className="p-4 bg-muted rounded-full">
        <Bell className="size-8 text-muted-foreground/60" />
      </div>
      <p className="font-display font-semibold text-sm text-foreground">
        لا توجد إشعارات جديدة
      </p>
      <p className="text-xs text-muted-foreground max-w-50">
        سنقوم بإشعارك عندما يتوفر أي جديد.
      </p>
    </div>
  );
};

export default EmptyNotifications;
