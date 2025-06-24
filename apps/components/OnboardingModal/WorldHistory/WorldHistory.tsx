"use client";

import styles from "./WorldHistory.module.css";

const WorldHistory: React.FC = () => {
  return (
    <section id="history" className={styles.section}>
      <div className={styles.content}>
        <p className={styles.subtitle}>
          No matter who you are or where you started, here in{" "}
          <strong>AlgoSync</strong> <br />
          You'll become someone new <br /> A developer, a builder, a dreamer and
          a challenger <br />
          <span>Your journey begins now</span>
        </p>
      </div>
    </section>
  );
};

export default WorldHistory;
