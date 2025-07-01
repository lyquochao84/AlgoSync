import React, { JSX } from "react";
import styles from "./DashboardLevel.module.css";

import HouseIcon from "@/public/Dashboard_Logo/web.png";

import Image from "next/image";
import Link from "next/link";

const DashboardLevel: React.FC = (): JSX.Element => {
  return (
    <div className={styles.level_card}>
      <div className={styles.house_header}>
        <Image src={HouseIcon} alt="House Icon" className={styles.house_icon} />
        <h3 className={styles.house_name}>Webtoria</h3>
      </div>

      <p className={styles.level_name}>
        <strong>Level: </strong>Chunin
      </p>

      <div className={styles.progress_bar_wrapper}>
        <div className={styles.progress_bar_row}>
          <div className={styles.progress_bar_background}>
            <div
              className={styles.progress_bar_fill}
              style={{ width: "1%" }}
            ></div>
          </div>
          <span className={styles.progress_percentage}>1%</span>
        </div>
      </div>

      <Link href="/dashboard" className={styles.view_team_button}>
        <p>View Team</p>
      </Link>
    </div>
  );
};

export default DashboardLevel;
