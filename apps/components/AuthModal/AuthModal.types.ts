export interface AuthModalProps {
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export interface LogInFormProps {
  onForgotPassword: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}