import React from "react";
import Image from "next/image";
import { PostHeaderProps } from "@/types/Dashboard/DashboardPostMode/DashboardPostContent/DashboardPostContent";

import { IoTimeOutline } from "react-icons/io5";
import { CiSquareMore } from "react-icons/ci";

import styles from "./PostHeader.module.css";

const PostHeader: React.FC<PostHeaderProps> = ({ user, time }) => {
  return (
    <div className={styles.header}>
     <div className={styles.avatar_info}>
        <div className={styles.avatar}>
          <Image
            src={user.avatar}
            alt={user.username}
            fill
            sizes="40px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.info}>
          <span className={styles.username}>{user.username}</span>
          <div className={styles.info_time}>
            <IoTimeOutline className={styles.time_icon} />
            <span className={styles.time}>{time}</span>
          </div>
        </div>
     </div>
      <CiSquareMore className={styles.post_more_icon}/>
    </div>
  );
};

export default PostHeader;
