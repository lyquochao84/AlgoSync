"use client";

import React, { FormEvent, JSX, useState } from "react";
import toast from "react-hot-toast";

import styles from "./SettingsModal.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import {
  SettingsModalProps,
  TabKey,
} from "@/types/SettingsModal/SettingsModal";
import InfoTab from "./InfoTab/InfoTab";
import ThemeTab from "./ThemeTab/ThemeTab";
import TopFollowingsTab from "./TopFollowingsTab/TopFollowingsTab";

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
  const [activeTab, setActiveTab] = useState<TabKey>("info");

  // Check if the URL is valid
  const isValidPortfolio = (url: string) => /^https:\/\/.+/.test(url);
  const isValidGitHub = (url: string) =>
    /^https:\/\/github\.com\/[^/]+\/?$/.test(url);
  const isValidLinkedIn = (url: string) =>
    /^https:\/\/www\.linkedin\.com\/in\/[^/]+\/?$/.test(url);
  const isValidX = (url: string) => /^https:\/\/(x\.com)\/[^/]+\/?$/.test(url);

  // Handle Save Form (beta version)
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
      <div className={styles.settings_modal_content}>
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
            <div
              className={`${styles.tab} ${
                activeTab === "info" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("info")}
            >
              Info
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "theme" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("theme")}
            >
              Theme
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "top-followings" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("top-followings")}
            >
              Top Followers
            </div>
            <div className={styles.logout} onClick={onClose}>
              Sync Out
            </div>
          </nav>
          <div className={styles.tab_content}>
            {/* Info Tab */}
            {activeTab === "info" && (
              <InfoTab
                bio={bio}
                setBio={setBio}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
                github={github}
                setGithub={setGithub}
                linkedin={linkedin}
                setLinkedin={setLinkedin}
                xUrl={xUrl}
                setXUrl={setXUrl}
                errorsURL={errorsURL}
                setErrorsURL={setErrorsURL}
                handleSaveForm={handleSaveForm}
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
                isCropperOpen={isCropperOpen}
                setIsCropperOpen={setIsCropperOpen}
                croppedAvatar={croppedAvatar}
                setCroppedAvatar={setCroppedAvatar}
                isAvatarSaved={isAvatarSaved}
                setIsAvatarSaved={setIsAvatarSaved}
              />
            )}
            {/* Theme Tab */}
            {activeTab === "theme" && <ThemeTab />}
            {/* Top Followers Tab */}
            {activeTab === "top-followings" && <TopFollowingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
