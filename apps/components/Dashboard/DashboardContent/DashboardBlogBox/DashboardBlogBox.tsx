"use client";

import React, { JSX, useState } from "react";
import Image from "next/image";

import styles from "./DashboardBlogBox.module.css";
import Avatar from "@/public/Fox.png";
import Link from "next/link";

const DashboardBlogBox: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.blogBox}>
          <Image src={Avatar} alt="User Avatar" className={styles.avatar} />

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
