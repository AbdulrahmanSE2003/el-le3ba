import Motion from "@/components/shared/Motion";

import { Input } from "@/components/ui/input";

interface Props {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isPending: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function IsEditing({
  type,
  value,
  onChange,
  placeholder,
  isPending,
  onSave,
  onCancel,
}: Props) {
  return (
    <Motion
      as="div"
      key="input"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
    >
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isPending}
        className="h-8 text-sm"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
      />
    </Motion>
  );
}
