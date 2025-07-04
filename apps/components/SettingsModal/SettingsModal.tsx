"use client";

import React, { FormEvent, JSX, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./SettingsModal.module.css";
import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { SettingsModalProps } from "@/types/SettingsModal/SettingsModal";
import { FaCamera } from "react-icons/fa";

// Import Avatar Cropper Modal
const AvatarCropperModal = dynamic(
  () => import("../AvatarModal/AvatarCropperModal"),
  {
    ssr: false,
  }
);

// Maximum bio length
const MAX_BIO_LENGTH = 100;

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
}): JSX.Element => {
  const [bio, setBio] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [xUrl, setXUrl] = useState<string>("");
  const [errorsURL, setErrorsURL] = useState({
    portfolio: false,
    github: false,
    linkedin: false,
    xUrl: false,
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
  const [isAvatarSaved, setIsAvatarSaved] = useState<boolean>(false);

  // Check if the URL is valid
  const isValidPortfolio = (url: string) => /^https:\/\/.+/.test(url);
  const isValidGitHub = (url: string) =>
    /^https:\/\/github\.com\/[^/]+\/?$/.test(url);
  const isValidLinkedIn = (url: string) =>
    /^https:\/\/www\.linkedin\.com\/in\/[^/]+\/?$/.test(url);
  const isValidX = (url: string) => /^https:\/\/(x\.com)\/[^/]+\/?$/.test(url);

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

  // Handle Save Form (1st version)
  const handleSaveForm = (e: FormEvent) => {
    e.preventDefault();

    const portfolioValid = portfolio ? isValidPortfolio(portfolio) : true;
    const githubValid = github ? isValidGitHub(github) : true;
    const linkedinValid = linkedin ? isValidLinkedIn(linkedin) : true;
    const xValid = xUrl ? isValidX(xUrl) : true;

    // Update individual field errors
    setErrorsURL({
      portfolio: !portfolioValid,
      github: !githubValid,
      linkedin: !linkedinValid,
      xUrl: !xValid,
    });

    const allValid = portfolioValid && githubValid && linkedinValid && xValid;

    if (allValid) {
      // Save logic
      toast.success("Changes saved!", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        },
      });
    }
  };

  return (
    <div className={styles.settings_modal_overlay}>
      <div
        className={styles.settings_modal_content}>
        <div className={styles.settings_modal_header}>
          <div className={styles.settings_header_title_wrapper}>
            <IoSettingsOutline className={styles.settings_header_icon} />
            <h2 className={styles.settings_title}>Settings</h2>
          </div>
          <button className={styles.settings_modal_close} onClick={onClose}>
            <IoMdCloseCircleOutline />
          </button>
        </div>
        <div className={styles.settings_content}>
          <nav className={styles.sidebar}>
            <div className={`${styles.tab} ${styles.active}`}>Info</div>
            <div className={styles.logout} onClick={onClose}>
              Sync Out
            </div>
          </nav>
          <div className={styles.tab_content}>
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
                  <p className={styles.error_message}>
                    Please enter a valid X URL
                  </p>
                )}
              </label>
              <label>
                Location
                <input type="text" placeholder="City" />
              </label>
              <button type="submit" className={styles.save}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
