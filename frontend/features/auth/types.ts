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

export type AuthResponse = {
  success?: boolean;
  error?: string;
  userData?: object;
  redirectPath?: string;
  message?: string;
};

