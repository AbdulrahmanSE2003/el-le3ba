import { LucideIcon } from "lucide-react";

export interface ActionState {
  success?: boolean;
  message?: string;
  error?: string;
  userData?: {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  };
}

export type RegisterBtn = {
  label: string;
  type: "text" | "email" | "password";
  name: "name" | "email" | "password" | "passwordConfirm";
  placeholder: string;
  icon: LucideIcon;
};
