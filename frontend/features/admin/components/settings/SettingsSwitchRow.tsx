import { Switch } from "@/components/ui/switch";

interface Props {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function SettingsSwitchRow({
  label,
  description,
  checked,
  onCheckedChange,
}: Props) {
  return (
    <div className="sm:col-span-2 flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/20 p-3.5">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
