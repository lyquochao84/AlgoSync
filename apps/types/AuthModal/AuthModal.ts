export interface AuthModalProps {
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export interface LogInFormProps {
  onForgotPassword: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface RegisterFormProps {
  onRegistered?: () => void;
  registerEmail: string;
  registerPassword: string;
  setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
  setRegisterPassword: React.Dispatch<React.SetStateAction<string>>;
}
