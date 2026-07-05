export interface ActionState {
  success?: boolean;
  message?: string;
  error?: string;
  redirectPath?: string;
  userData?: {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  };
}
