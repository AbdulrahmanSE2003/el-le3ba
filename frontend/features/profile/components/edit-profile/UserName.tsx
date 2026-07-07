import Motion from "@/components/shared/Motion";

interface Props {
  value: string;
}

export default function UserName({ value }: Props) {
  return (
    <Motion
      as="p"
      key="value"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="text-sm font-semibold text-foreground truncate"
    >
      {value}
    </Motion>
  );
}
