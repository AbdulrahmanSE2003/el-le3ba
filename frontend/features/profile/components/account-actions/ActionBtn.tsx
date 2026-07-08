import Motion from "@/components/shared/Motion";
import { LucideIcon } from "lucide-react";

interface Props {
  fade: any;
  handleAction?: () => void;
  text: string;
  icon: LucideIcon;
  className: string;
}

export default function ActionBtn({
  fade,
  handleAction,
  text,
  icon: Icon,
  className,
}: Props) {
  return (
    <Motion
      as="button"
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.9 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5 }}
      onClick={handleAction}
      className={`flex py-4 justify-center rounded-lg font-medium transition-colors cursor-pointer ${className}`}
    >
      <span>{text}</span>
      <Icon />
    </Motion>
  );
}
