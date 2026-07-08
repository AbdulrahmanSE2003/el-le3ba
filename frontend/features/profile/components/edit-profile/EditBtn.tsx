import Motion from "@/components/shared/Motion";

import { Pencil } from "lucide-react";

interface EditableFieldProps {
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditBtn({ setIsEditing }: EditableFieldProps) {
  return (
    <Motion
      key="edit"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      onClick={() => setIsEditing(true)}
      className="w-8 h-8 rounded-lg bg-secondary dark:bg-secondary/40 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 flex items-center justify-center cursor-pointer duration-200"
    >
      <Pencil size={14} />
    </Motion>
  );
}
