import React, { JSX } from "react";

import styles from "./DashboardResources.module.css";
import Link from "next/link";

import { RiArticleLine } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { SiAwsorganizations } from "react-icons/si";
import { FaRegBuilding } from "react-icons/fa";
import { LuHandshake } from "react-icons/lu";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaPeopleArrows } from "react-icons/fa";

const DashboardResources: React.FC = (): JSX.Element => {
  return (
    <div className={styles.dashboard_resources_wrapper}>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <RiArticleLine className={styles.dashboard_resources_icon} />
          <span>Top Blogs</span>
        </Link>
      </div>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <MdOndemandVideo className={styles.dashboard_resources_icon} />
          <span>Top Videos</span>
        </Link>
      </div>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <AiOutlineTeam className={styles.dashboard_resources_icon} />
          <span>Explore Teams</span>
        </Link>
      </div>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <SiAwsorganizations className={styles.dashboard_resources_icon} />
          <span>Organizations</span>
        </Link>
      </div>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <FaRegBuilding className={styles.dashboard_resources_icon} />
          <span>Companies</span>
        </Link>
      </div>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <LuHandshake className={styles.dashboard_resources_icon} />
          <span>Projects</span>
        </Link>
      </div>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <FaPeopleArrows className={styles.dashboard_resources_icon} />
          <span>Co-Founder</span>
        </Link>
      </div>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <IoBookmarksOutline className={styles.dashboard_resources_icon} />
          <span>Saved</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardResources;
