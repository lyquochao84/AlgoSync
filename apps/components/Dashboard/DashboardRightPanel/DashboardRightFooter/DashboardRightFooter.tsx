import React, { JSX } from "react";
import Link from "next/link";

import styles from "./DashboardRightFooter.module.css";

import { FaLinkedin, FaDiscord, FaYoutube } from "react-icons/fa";

const DashboardRightFooter: React.FC = (): JSX.Element => {
  return (
    <div className={styles.footer_inner}>
      <button className={styles.footer_button}>
        <Link
          className={styles.footer_link}
          href="https://www.linkedin.com/company/algosync/"
          legacyBehavior
        >
          <a target="_blank" rel="noopener noreferrer">
            <FaLinkedin className={styles.linkedIn_icon} />
          </a>
        </Link>
      </button>
      <button className={styles.footer_button}>
        <Link
          className={styles.footer_link}
          href="https://discord.gg/K7XU5gcCpC"
          legacyBehavior
        >
          <a target="_blank" rel="noopener noreferrer">
            <FaDiscord className={styles.discord_icon} />
          </a>
        </Link>
      </button>
      <button className={styles.footer_button}>
        <Link
          className={styles.footer_link}
          href="https://www.youtube.com/channel/UCu8fu0eflwCyityw2wBeoXQ/about"
          legacyBehavior
        >
          <a target="_blank" rel="noopener noreferrer">
            <FaYoutube className={styles.youtube_icon} />
          </a>
        </Link>
      </button>
    </div>
  );
};

export default DashboardRightFooter;
