import { FormEvent } from "react";

export interface InfoTabProps {
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  portfolio: string;
  setPortfolio: React.Dispatch<React.SetStateAction<string>>;
  github: string;
  setGithub: React.Dispatch<React.SetStateAction<string>>;
  linkedin: string;
  setLinkedin: React.Dispatch<React.SetStateAction<string>>;
  xUrl: string;
  setXUrl: React.Dispatch<React.SetStateAction<string>>;
  errorsURL: {
    portfolio: boolean;
    github: boolean;
    linkedin: boolean;
    xUrl: boolean;
  };
  setErrorsURL: React.Dispatch<
    React.SetStateAction<{
      portfolio: boolean;
      github: boolean;
      linkedin: boolean;
      xUrl: boolean;
    }>
  >;
  handleSaveForm: (e: FormEvent) => void;
  croppedAvatar: string | null;
  setCroppedAvatar: React.Dispatch<React.SetStateAction<string | null>>;
  imageSrc: string | null;
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
  isCropperOpen: boolean;
  setIsCropperOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAvatarSaved: boolean;
  setIsAvatarSaved: React.Dispatch<React.SetStateAction<boolean>>;
}