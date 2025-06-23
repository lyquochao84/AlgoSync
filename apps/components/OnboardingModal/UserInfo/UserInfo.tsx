"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

import styles from "./UserInfo.module.css";

import { UserInfoProps } from "@/types/OnboardingModal/UserInfo/UserInfo";
import Squares from "@/Reactbits/Squares/Squares";

const AvatarCropperModal = dynamic(
  () => import("../../AvatarModal/AvatarCropperModal"),
  {
    ssr: false,
  }
);

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  setUsername,
  headline,
  setHeadline,
  setCroppedAvatar,
  onSubmit,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
  const [isAvatarSaved, setIsAvatarSaved] = useState<boolean>(false);

  // Upload Avatar
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    // Reset input value so same image can be selected again
    e.target.value = "";

    reader.onloadend = () => {
      setImageSrc(reader.result as string);
      setIsCropperOpen(true);
      setIsAvatarSaved(false);
    };
    reader.readAsDataURL(file);
  };

  // Save Edited Image
  const handleSaveCroppedImage = async (croppedBase64: string) => {
    setCroppedAvatar(croppedBase64);
    setIsAvatarSaved(true);
    setIsCropperOpen(false);
    toast.success("Your avatar has been uploaded!", {
      duration: 3000,
      style: {
        background: "#333",
        color: "#fff",
        borderRadius: "8px",
      },
    });
  };

  return (
    <>
      <section className={styles.section}>
        <Squares
          speed={0.3}
          squareSize={200}
          direction="diagonal"
          borderColor="#333"
          hoverFillColor="#333"
        />
        <div className={styles.content}>
          <h1 className={styles.title}>Complete Your Profile</h1>
          <p className={styles.subtitle}>You can always edit this later</p>

          <div className={styles.form_group}>
            <label>
              Display Character's Name <span>(required)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Kevin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label
              className={`${styles.upload_button} ${
                isAvatarSaved ? styles.saved : ""
              }`}
            >
              Upload Avatar <span>(required)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className={styles.file_input}
                required
              />
            </label>
            {isCropperOpen && imageSrc && (
              <AvatarCropperModal
                imageSrc={imageSrc}
                onClose={() => setIsCropperOpen(false)}
                onSave={handleSaveCroppedImage}
              />
            )}
          </div>
          <div className={styles.form_group}>
            <label>
              Short Headline <span>(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Short and sweet — who are you?"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <button className={styles.submit_button} onClick={onSubmit}>
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
