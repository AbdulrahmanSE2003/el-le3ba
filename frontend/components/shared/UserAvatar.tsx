import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface UserAvatarProps {
  fallback: string;
  src: string;
  showBadge?: boolean;
  size?: "default" | "sm" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
}

export default function UserAvatar({
  src,
  fallback,
  showBadge = true,
  size = "3xl",
  className,
}: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      <AvatarImage src={src} className={className} />
      <AvatarFallback className="text-3xl object-cover" delayMs={1000}>
        {fallback}
      </AvatarFallback>
      {showBadge && <AvatarBadge className="bg-green-600 dark:bg-green-800" />}
    </Avatar>
  );
}
