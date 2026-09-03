import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";

interface Props {
  text: string;
  onClick?: () => void;
  pending: boolean;
  variant: "outline" | "destructive";
  type?: "button" | "submit" | "reset";
}

export default function CloseBtn({
  text,
  onClick,
  pending,
  variant,
  type,
}: Props) {
  return (
    <Button
      type={type}
      variant={variant}
      size="sm"
      onClick={onClick}
      disabled={pending}
    >
      {pending && text === "حذف الإشعار" && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      {text}
    </Button>
  );
}
