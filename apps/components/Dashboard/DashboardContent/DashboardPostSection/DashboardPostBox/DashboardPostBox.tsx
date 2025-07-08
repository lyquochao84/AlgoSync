"use client";

import React, { JSX, useState } from "react";
import Image from "next/image";

import { FaImage, FaVideo } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa6";

import styles from "./DashboardPostBox.module.css";
import Avatar from "@/public/Fox.png";

import PostModal from "./PostModal/PostModal";
import { DashboardPostBoxProps } from "@/types/Dashboard/DashboardPostMode/DashboardPostBox/DashboardPostBox";

const DashboardPostBox: React.FC<DashboardPostBoxProps> = ({
  userInfo,
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Loading state
  if (!userInfo) {
    return <div className={styles.spinner}></div>;
  }

  const { name, avatarUrl } = userInfo;

  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.postBox}>
          <Image
            src={avatarUrl || ""}
            alt={`${name} avatar`}
            className={styles.avatar}
            width={48}
            height={48}
            quality={100}
          />

          <div className={styles.separator} />

          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="What's up dev?"
              className={styles.input}
              onFocus={() => setIsModalOpen(true)}
              readOnly
            />
          </div>
        </div>

        {/* Post Type Buttons */}
        <div className={styles.postOptions}>
          <button className={`${styles.optionButton} ${styles.active}`}>
            <FaImage /> Photo
          </button>
          <button className={styles.optionButton}>
            <FaVideo /> Video
          </button>
          <button className={styles.optionButton}>
            <FaLaptopCode /> Code
          </button>
        </div>
      </div>

      {isModalOpen && <PostModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default DashboardPostBox;
