"use client";
import { useState } from "react";
import styles from "./WorldHistory.module.css";

const WorldHistory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="history" className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>History</h1>
        <button
          className={styles.toggleButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Stop" : "Listen"}
        </button>
      </div>
    </section>
  );
};

export default WorldHistory;
