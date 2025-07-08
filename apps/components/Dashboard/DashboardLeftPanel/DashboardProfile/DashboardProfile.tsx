import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./DashboardProfile.module.css";

import DefaultBanner from "../../../../public/AlgoSync_Background.png";
import { DashboardProfileProps } from "@/types/Dashboard/DashboardLeftPanel/DashboardProfile/DashboardProfile";

const DashboardProfile: React.FC<DashboardProfileProps> = ({
  userInfo,
}): JSX.Element => {
  // Loading state
  if (!userInfo) {
    return <div className={styles.spinner}></div>;
  }

  const {
    name,
    avatarUrl,
    bannerUrl,
    bio,
  } = userInfo;

  return (
    <div className={styles.profile_card}>
      <div
        className={styles.cover}
        style={{ backgroundImage: `url(${bannerUrl || DefaultBanner.src})` }}
      ></div>

      <div className={styles.avatar_and_stats}>
        <Image
          src={avatarUrl || ""}
          alt="Avatar"
          className={styles.avatar}
          width={96}
          height={96}
          quality={100}
        />
      </div>

      <h2 className={styles.name}>{name}</h2>
      <p className={styles.bio}>{bio?.slice(0, 80) || ""}</p>
      <div className={styles.stats}>
        <Link href="/followers" className={styles.stats_link}>
          <p>Followers</p>
        </Link>
        <Link href="/following" className={styles.stats_link}>
          <p>Followings</p>
        </Link>
      </div>
      <Link href="/profile">
        <button className={styles.profile_button}>My Profile</button>
      </Link>
    </div>
  );
};

export default DashboardProfile;
