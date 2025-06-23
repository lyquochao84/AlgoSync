export interface AvatarEditProps {
  imageSrc: string;
  onClose: () => void;
  onSave: (croppedImage: string) => void;
}