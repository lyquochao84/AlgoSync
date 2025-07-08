export interface SearchModalProps {
  onClose: () => void;
}

export type SearchUser = {
  id: string;
  name: string;
  avatarUrl: string;
  bio?: string;
  team?: string;
};