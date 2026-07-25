import { PasswordInputs, ShowPass } from "../../types";

import { EyeOff, Eye } from "lucide-react";

interface Props {
  show: ShowPass;
  onToggle: (field: keyof ShowPass) => void;
  id: keyof PasswordInputs;
}

export default function ToggleBtn({ show, onToggle, id }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer duration-200"
    >
      {show[id] ? <Eye size={16} /> : <EyeOff size={16} />}
    </button>
  );
}
