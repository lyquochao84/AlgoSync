export interface UserInfoProps {
  username: string;
  setUsername: (val: string) => void;
  headline: string;
  setHeadline: (val: string) => void;
  setCroppedAvatar: (val: string | null) => void;
  onSubmit: () => void;
}