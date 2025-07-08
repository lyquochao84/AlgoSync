"use client";

import React, { JSX, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./DashboardBlogBox.module.css";

import Avatar from "@/public/Fox.png";
import { DashboardBlogBoxProps } from "@/types/Dashboard/DashboardBlogMode/DashboardBlogBox/DashboardBlogBox";

const DashboardBlogBox: React.FC<DashboardBlogBoxProps> = ({
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
        <div className={styles.blogBox}>
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
            <Link href="/dashboard">
              <input
                type="text"
                placeholder="Share your knowledge... 📝"
                className={styles.input}
                onFocus={() => setIsModalOpen(true)}
                readOnly
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBlogBox;
