import Motion from "@/components/shared/Motion";
import { fadeInDown } from "../../../components/shared/animations";

import MainTitle from "../../../components/sidebar/Logo";

interface HeaderProps {
  header: string;
  text: string;
}

export default function Header({ header, text }: HeaderProps) {
  return (
    <Motion
      as="div"
      variants={fadeInDown}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-2 text-center"
    >
      <MainTitle />

      <h2 className="font-bold text-2xl dark:text-foreground mt-2">{header}</h2>
      <p className="text-base">{text}</p>
    </Motion>
  );
}
