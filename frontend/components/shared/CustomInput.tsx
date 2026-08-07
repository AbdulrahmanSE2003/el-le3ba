import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  required?: boolean;
}

export default function CustomInput({
  title,
  placeholder,
  type,
  name,
  value,
  required,
}: Props) {
  return (
    <div>
      <Label title={title} htmlFor={name} />
      <Input
        placeholder={placeholder}
        type={type}
        name={name}
        id={name}
        value={value}
        required={required}
      />
    </div>
  );
}
