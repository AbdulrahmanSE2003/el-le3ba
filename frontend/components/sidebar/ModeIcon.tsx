import { ReactNode } from "react";
import Motion from "../shared/Motion";

interface Props {
  icon: ReactNode;
}

export default function ModeIcon({ icon }: Props) {
  return (
    <Motion
      as="span"
      initial={{ rotate: -90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      type="spring"
    >
      {icon}
    </Motion>
  );
}
