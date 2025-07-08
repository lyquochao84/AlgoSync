import React, { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./DashboardLevel.module.css";

import { DashboardLevelProps } from "@/types/Dashboard/DashboardLeftPanel/DashboardLevel/DashboardLevel";

import { teamColors } from "@/utils/team/teamColors/teamColors";
import { teamLogos } from "@/utils/team/teamLogos/teamLogos";

const DashboardLevel: React.FC<DashboardLevelProps> = ({
  userInfo,
}): JSX.Element => {
  // Loading state
  if (!userInfo) {
    return <div className={styles.spinner}></div>;
  }

  const { team, level, xp } = userInfo;

  // Get color and logo based on team key
  const teamColor = teamColors[team?.toLocaleLowerCase() || ""];
  const teamLogo = teamLogos[team?.toLocaleLowerCase() || ""];

  return (
    <div className={styles.level_card}>
      <div className={styles.house_header}>
        <Image
          src={teamLogo}
          alt={`${team} logo`}
          className={styles.house_icon}
        />
        <h3
          className={styles.house_name}
          style={{ WebkitTextStroke: `1px ${teamColor}` }}
        >
          {team ? team.charAt(0).toUpperCase() + team.slice(1) : "Unknown"}
        </h3>
      </div>

      <p className={styles.level_name}>
        <strong style={{ color: teamColor }}>Level: </strong>
        <span style={{ WebkitTextStroke: `1px ${teamColor}` }}>{level}</span>
      </p>

      <div className={styles.progress_bar_wrapper}>
        <div className={styles.progress_bar_row}>
          <div className={styles.progress_bar_background}>
            <div
              className={styles.progress_bar_fill}
              style={{ width: `${level}%`, backgroundColor: teamColor }}
            ></div>
          </div>
          <span
            className={styles.progress_percentage}
            style={{ color: teamColor }}
          >
            {xp}%
          </span>
        </div>
      </div>

      <Link
        href="/dashboard"
        className={styles.view_team_button}
        style={{ border: `1px solid ${teamColor}` }}
      >
        <p>View Team</p>
      </Link>
    </div>
  );
};

export default DashboardLevel;
