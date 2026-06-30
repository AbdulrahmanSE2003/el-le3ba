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
