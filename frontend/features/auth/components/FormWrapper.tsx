import Motion from "@/components/shared/Motion";
import { ReactNode } from "react";

interface FormWrapperProps {
  children: ReactNode;
  action: (formData: FormData) => void | Promise<void>;
}

export default function FormWrapper({ children, action }: FormWrapperProps) {
  return (
    <Motion
      as="form"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
      initial="hidden"
      animate="visible"
      action={action}
      className="flex flex-col gap-4"
    >
      {children}
    </Motion>
  );
}
