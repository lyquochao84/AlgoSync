"use client";

import React from "react";
import Link from "next/link";

import styles from "./Footer.module.css";
import { FaLinkedin, FaDiscord, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner}>
        <div className={styles.footer_social_media}>
          <Link
            href="https://www.linkedin.com/company/algosync/"
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              <FaLinkedin className={styles.linkedIn_icon} />
            </a>
          </Link>
          <Link
            href="https://discord.gg/K7XU5gcCpC"
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              <FaDiscord className={styles.discord_icon} />
            </a>
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCu8fu0eflwCyityw2wBeoXQ/about"
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              <FaYoutube className={styles.youtube_icon} />
            </a>
          </Link>
        </div>
        <div className={styles.footer_agreements}>
          <Link
            href="/"
            className={`${styles.agreements_text} ${styles.terms_text}`}
          >
            Terms
          </Link>
          <Link href="/" className={styles.agreements_text}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
