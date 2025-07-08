"use client";

import React from "react";
import { PostTextProps } from "@/types/Dashboard/DashboardPostMode/DashboardPostContent/DashboardPostContent";
import styles from "./PostText.module.css";

const PostText: React.FC<PostTextProps> = ({ text, expanded, onExpand }) => {
  const shouldTruncate = text.length > 200;

  const displayText = expanded || !shouldTruncate
    ? text
    : text.slice(0, 200) + "...";

  return (
    <div className={styles.text}>
      {displayText}
      {shouldTruncate && !expanded && (
        <span
          className={styles.seeMore}
          onClick={onExpand}
        >
          More
        </span>
      )}
    </div>
  );
};

export default PostText;
