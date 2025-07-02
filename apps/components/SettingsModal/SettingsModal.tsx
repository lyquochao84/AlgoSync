"use client";

import React, { JSX, useState } from "react";

import styles from "./SettingsModal.module.css";

import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { SettingsModalProps } from "@/types/SettingsModal/SettingsModal";

const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
}): JSX.Element => {
  const [activeTab, setActiveTab] = useState<"info" | "account">("info");

  return (
    <div className={styles.settings_modal_overlay} onClick={onClose}>
      <div
        className={styles.settings_modal_content}
        onClick={(e) => e.stopPropagation()}
      >
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
            <div className={styles.spacer} />
            <button className={styles.logout} onClick={onClose}>
              Log out
            </button>
          </nav>
          <div className={styles.tab_content}>
            <form className={styles.form}>
              <label>
                Avatar
                <input type="file" accept="image/*" />
              </label>
              <label>
                Name
                <input type="text" placeholder="Your name" />
              </label>
              <label>
                Short Bio
                <textarea placeholder="A short bio"></textarea>
              </label>
              <label>
                Banner
                <input type="file" accept="image/*" />
              </label>
              <label>
                Profile URL
                <input type="text" placeholder="https://..." />
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
