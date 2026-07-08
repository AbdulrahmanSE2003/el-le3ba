import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <div
      className={`hover:bg-muted p-2 rounded-full transition-colors duration-300 cursor-pointer group`}
    >
      <Bell
        className={`text-muted-foreground/90 size-4.5 group-hover:text-muted-foreground`}
      />
    </div>
  );
};

export default Notification;
