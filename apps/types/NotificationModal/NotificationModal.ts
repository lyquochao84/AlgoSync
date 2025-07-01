import { JSX } from "react";

export interface NotificationModalProps {
  onClose: () => void;
}

export type NotificationTab = "All" | "Personal" | "House" | "System";

export type NotificationItem = {
  type: "user" | "stats" | "house" | "system";
  text: string;
  time: string;
  icon: JSX.Element;
  user?: { name: string; avatar: string };
  house?: { name?: string; avatar: string };
  system?: { name: string; avatar: string };
  color?: string;
  status: string;
};
