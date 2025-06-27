import React, { JSX } from "react";

import styles from "./DashboardResources.module.css";
import Link from "next/link";

import { RiArticleLine } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { LuHandshake } from "react-icons/lu";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import { LiaBusinessTimeSolid } from "react-icons/lia";

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
          <span>Popular Videos</span>
        </Link>
      </div>
      <div className={styles.dashboard_resources_item}>
        <Link href="/dashboard" className={styles.dashboard_resources_link}>
          <FaRegNewspaper className={styles.dashboard_resources_icon} />
          <span>Tech News</span>
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
          <LiaBusinessTimeSolid className={styles.dashboard_resources_icon} />
          <span>Job Boards</span>
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
          <IoBookmarksOutline className={styles.dashboard_resources_icon} />
          <span>Saved</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardResources;
