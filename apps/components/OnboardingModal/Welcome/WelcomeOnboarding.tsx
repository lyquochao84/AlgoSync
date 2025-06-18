// WelcomeOnboarding.tsx
"use client";
import React from "react";
import styles from "./WelcomeOnboarding.module.css";

const WelcomeOnboarding: React.FC = () => {
  return (
    <section id="welcome" className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to <br />SyncVerse</h1>
        <p className={styles.subtitle}>Choose your path, define your legacy</p>
      </div>
    </section>
  );
};

export default WelcomeOnboarding;