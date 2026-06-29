import { LucideIcon } from "lucide-react";

export interface ActionState {
  error: string;
  userData?: {
    name?: string;
    email?: string;
    rememberMe?: boolean;
    password?: string;
    confirmPassword?: string;
  };
}

export type RegisterBtn = {
  label: string;
  type: "text" | "email" | "password";
  name: "name" | "email" | "password" | "confirmPassword";
  placeholder: string;
  icon: LucideIcon;
};
