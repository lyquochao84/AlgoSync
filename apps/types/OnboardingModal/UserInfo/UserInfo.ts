export interface UserInfoProps {
  username: string;
  setUsername: (val: string) => void;
  headline: string;
  setHeadline: (val: string) => void;
  avatarUrl: string | null;
  setAvatarUrl: (val: string | null) => void;
  onSubmit: () => void;
}