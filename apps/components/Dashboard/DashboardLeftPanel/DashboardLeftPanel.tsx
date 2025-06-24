import React, { JSX } from "react";
import Image from "next/image";

import Logo from "@/public/Fox.png";

import styles from "./DashboardLeftPanel.module.css";

const DashboardLeftPanel: React.FC = (): JSX.Element => {
  return (
    <div className={styles.profile_container}>
      <div className={styles.avatar_wrapper}>
        <Image src={Logo} alt="User Avatar" className={styles.avatar} />
        <h2 className={styles.name}>Kevin</h2>
        <p className={styles.handle}>@Webtoria</p>
        <div className={styles.follow_stats}>
          <span>
            <p>Followers</p>
          </span>
          <span>
            <p>Followings</p>
          </span>
        </div>
        <button className={styles.profile_button}>My Profile</button>
      </div>
    </div>
  );
};

export default DashboardLeftPanel;
