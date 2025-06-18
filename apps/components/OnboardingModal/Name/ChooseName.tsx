import React from "react";
import styles from "./ChooseName.module.css";

const ChooseName: React.FC = () => {
  return (
    <section id="team" className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Choose your house</h1>
      </div>
    </section>
  );
};

export default ChooseName;
