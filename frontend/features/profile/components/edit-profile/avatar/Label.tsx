import { Button } from "@/components/ui/button";

import { Camera } from "lucide-react";

export default function Label(props: React.ComponentProps<typeof Button>) {
  return (
    <Button size="sm" className="gap-2" {...props}>
      <Camera className="w-4 h-4" />
      تغيير الصورة
    </Button>
  );
}
