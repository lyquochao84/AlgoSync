"use client";

import React from "react";
import { PostFooterProps } from "@/types/DashboardPostContent/DashboardPostContent";
import styles from "./PostFooter.module.css";
import { SlEnergy } from "react-icons/sl";
import { FaRegComments, FaShareFromSquare } from "react-icons/fa6";
import { AiOutlineCloudSync } from "react-icons/ai";

const PostFooter: React.FC<PostFooterProps> = ({ postId }) => {
  // Placeholder counts (replace with real props or context later)
  const boostCount = 12;
  const replyCount = 8;
  const repostCount = 4;
  const shareCount = 3;

  return (
    <div className={styles.footer}>
      <button className={`${styles.action} ${styles.boost}`}>
        <SlEnergy className={`${styles.icon} ${styles.boost_icon}`} />
        <span className={styles.count}>{boostCount}</span>
        <p>Boost</p>
      </button>
      <button className={`${styles.action} ${styles.reply}`}>
        <FaRegComments className={`${styles.icon} ${styles.reply_icon}`} />
        <span className={styles.count}>{replyCount}</span>
        <p>Reply</p>
      </button>
    </div>
  );
};

export default PostFooter;
