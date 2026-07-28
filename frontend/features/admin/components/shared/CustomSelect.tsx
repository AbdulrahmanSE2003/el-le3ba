import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  placeholder: string;
  items: {
    label: string;
    value: string;
  }[];
}

export default function CustomSelect({ items, placeholder }: Props) {
  return (
    <Select>
      <SelectTrigger className="bg-background  dark:text-white cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem
            className="cursor-pointer"
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
