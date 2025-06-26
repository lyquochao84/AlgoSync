import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./DashboardProfile.module.css";

import Logo from "@/public/Fox.png";

const DashboardProfile: React.FC = (): JSX.Element => {
  const bio = "🌟 Hello, I'm a full-stack developer. Open to new projects 🌟";

  return (
    <div className={styles.profile_card}>
      <div className={styles.cover}></div>

      <div className={styles.avatar_and_stats}>
        <Image src={Logo} alt="Avatar" className={styles.avatar} />
      </div>

      <h2 className={styles.name}>Kevin Ly</h2>
      <p className={styles.bio}>{bio.slice(0, 80)}</p>
      <div className={styles.stats}>
        <Link href="/dashboard" className={styles.stats_link}>
          <p>Followers</p>
        </Link>
        <Link href="/dashboard" className={styles.stats_link}>
          <p>Followings</p>
        </Link>
      </div>
      <button className={styles.profile_button}>My Profile</button>
    </div>
  );
};

export default DashboardProfile;
