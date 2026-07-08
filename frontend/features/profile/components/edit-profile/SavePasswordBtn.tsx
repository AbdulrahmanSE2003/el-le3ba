import Motion from "@/components/shared/Motion";

import { Loader2 } from "lucide-react";

interface Props {
  isPending: boolean;
}

export default function SavePasswordBtn({ isPending }: Props) {
  return (
    <Motion
      as="button"
      type="submit"
      whileTap={{ scale: 0.97 }}
      className="flex-1 h-9 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 flex items-center justify-center gap-2 cursor-pointer duration-200 disabled:opacity-50"
    >
      {isPending ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          <span>جاري التحديث...</span>
        </>
      ) : (
        <span>تغيير كلمة السر</span>
      )}
    </Motion>
  );
}
