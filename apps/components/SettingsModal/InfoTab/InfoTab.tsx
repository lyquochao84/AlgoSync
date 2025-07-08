"use client";

import React from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

import styles from "./InfoTab.module.css";
import { FaCamera } from "react-icons/fa";

import { InfoTabProps } from "@/types/SettingsModal/InfoTab/InfoTab";

// Import Avatar Cropper Modal
const AvatarCropperModal = dynamic(
  () => import("../../AvatarModal/AvatarCropperModal"),
  {
    ssr: false,
  }
);

// Max bio characters
const MAX_BIO_LENGTH = 50;

const InfoTab: React.FC<InfoTabProps> = ({
  bio,
  setBio,
  portfolio,
  setPortfolio,
  github,
  setGithub,
  linkedin,
  setLinkedin,
  xUrl,
  setXUrl,
  errorsURL,
  setErrorsURL,
  handleSaveForm,
  imageSrc,
  setImageSrc,
  isCropperOpen,
  setIsCropperOpen,
  croppedAvatar,
  setCroppedAvatar,
  isAvatarSaved,
  setIsAvatarSaved,
}) => {
  // Upload Avatar
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
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
    <form className={styles.form} onSubmit={handleSaveForm}>
      <div className={styles.avatar_placeholder}>
        {/* Change Avatar */}
        <label
          className={`${styles.avatar_circle} ${
            isAvatarSaved ? styles.saved : ""
          }`}
        >
          <FaCamera className={styles.camera_icon} />
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className={styles.file_input}
          />
        </label>
        {isCropperOpen && imageSrc && (
          <AvatarCropperModal
            imageSrc={imageSrc}
            onClose={() => setIsCropperOpen(false)}
            onSave={handleSaveCroppedImage}
          />
        )}
        {/* Change Name */}
        <label className={styles.name_label}>
          Name
          <input
            type="text"
            placeholder="Your name"
            className={styles.name_input}
          />
        </label>
      </div>
      {/* Bio */}
      <label>
        Short Bio
        <textarea
          placeholder="A short bio"
          value={bio}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= MAX_BIO_LENGTH) {
              setBio(value);
            }
          }}
          className={styles.bio_textarea}
        />
        <div className={styles.char_count}>
          {bio.length} / {MAX_BIO_LENGTH}
        </div>
      </label>
      <label>
        Portfolio URL
        <input
          type="text"
          placeholder="https://..."
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
          className={errorsURL.portfolio ? styles.input_error : ""}
        />
        {errorsURL.portfolio && (
          <p className={styles.error_message}>
            Please enter a valid Portfolio URL
          </p>
        )}
      </label>

      <label>
        GitHub URL
        <input
          type="text"
          placeholder="https://github.com/..."
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className={errorsURL.github ? styles.input_error : ""}
        />
        {errorsURL.github && (
          <p className={styles.error_message}>
            Please enter a valid GitHub URL
          </p>
        )}
      </label>

      <label>
        LinkedIn URL
        <input
          type="text"
          placeholder="https://www.linkedin.com/in/..."
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className={errorsURL.linkedin ? styles.input_error : ""}
        />
        {errorsURL.linkedin && (
          <p className={styles.error_message}>
            Please enter a valid LinkedIn URL
          </p>
        )}
      </label>

      <label>
        X URL
        <input
          type="text"
          placeholder="https://x.com/..."
          value={xUrl}
          onChange={(e) => setXUrl(e.target.value)}
          className={errorsURL.xUrl ? styles.input_error : ""}
        />
        {errorsURL.xUrl && (
          <p className={styles.error_message}>Please enter a valid X URL</p>
        )}
      </label>
      <label>
        Location
        <input type="text" placeholder="City, Country" />
      </label>
      <button type="submit" className={styles.save}>
        Save Changes
      </button>
    </form>
  );
};

export default InfoTab;
