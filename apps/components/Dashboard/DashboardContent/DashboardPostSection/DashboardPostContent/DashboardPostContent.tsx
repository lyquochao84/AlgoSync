import React, { JSX } from "react";
import { DashboardPostContentProps } from "@/types/DashboardPostContent/DashboardPostContent";

import styles from "./DashboardPostContent.module.css";
import DashboardPostItem from "./DashboardPostItem/DashboardPostItem";

const DashboardPostContent: React.FC<DashboardPostContentProps> = ({ posts }): JSX.Element => {
  return (
    <div className={styles.postFeed}>
      {posts.map(post => (
        <DashboardPostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default DashboardPostContent;
