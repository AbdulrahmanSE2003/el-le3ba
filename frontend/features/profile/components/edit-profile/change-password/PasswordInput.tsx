import { PasswordInputs, ShowPass } from "../../../types";

import ToggleBtn from "../ToggleBtn";

interface Props {
  label: string;
  value: PasswordInputs;
  onChange: (value: string, field: keyof PasswordInputs) => void;
  show: ShowPass;
  onToggle: (field: keyof ShowPass) => void;
  disabled: boolean;
  placeholder: string;
  id: keyof PasswordInputs;
}

export default function PasswordInput(input: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-muted-foreground font-medium">
        {input.label}
      </label>

      <div className="relative">
        <input
          type={input.show[input.id] ? "text" : "password"}
          value={input.value[input.id]}
          onChange={(e) => input.onChange(e.target.value, input.id)}
          placeholder={input.placeholder}
          disabled={input.disabled}
          className="w-full py-2 px-3 border focus:border-primary rounded-lg transition-all duration-300"
        />

        <ToggleBtn show={input.show} onToggle={input.onToggle} id={input.id} />
      </div>
    </div>
  );
}
