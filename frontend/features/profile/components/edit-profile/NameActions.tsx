import Motion from "@/components/shared/Motion";

import NameActionBtn from "./NameActionBtn";

import { Check, X, Loader2 } from "lucide-react";

interface Props {
  handleSave: () => void;
  handleCancel: () => void;
  isPending: boolean;
}

export default function NameActions({
  handleSave,
  handleCancel,
  isPending,
}: Props) {
  return (
    <Motion
      key="actions"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      className="flex items-center gap-1.5"
    >
      <NameActionBtn
        onClick={handleSave}
        isPending={isPending}
        className="bg-brand-success/15 border-brand-success/25 text-brand-success hover:bg-brand-success/25"
      >
        {isPending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Check size={14} />
        )}
      </NameActionBtn>

      <NameActionBtn
        onClick={handleCancel}
        isPending={isPending}
        className="bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20"
      >
        <X size={14} />
      </NameActionBtn>
    </Motion>
  );
}
