import React, { JSX } from "react";

import styles from "./NewsLetter.module.css";

import NewsletterLogo from "@/public/Dashboard Newsletter.png";
import Image from "next/image";

const NewsLetter: React.FC = (): JSX.Element => {
  return (
    <section className={styles.card}>
      <h3 className={styles.title}>Don't Miss the Best Reads of the Week</h3>
      <p className={styles.description}>
        Every Thursday, AlgoSync will send you a curated roundup of the week's
        best developer posts
      </p>
      <Image
        className={styles.illustration}
        src={NewsletterLogo}
        alt="AlgoSync"
      />
      <form className={styles.form}>
        <input
          type="email"
          className={styles.input}
          placeholder="Your email address"
          required
        />
        <button type="submit" className={styles.button}>
          Subscribe ☕
        </button>
      </form>
    </section>
  );
};

export default NewsLetter;
