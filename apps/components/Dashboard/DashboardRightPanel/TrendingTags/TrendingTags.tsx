import React, { JSX } from "react";

import styles from "./TrendingTags.module.css";

const trendingTags = ["#MachineLearning", "#Frontend"];

const TrendingTags: React.FC = (): JSX.Element => {
  return (
    <section className={styles.card}>
      <h3>Trending Tags</h3>
      <ul className={styles.tagList}>
        {trendingTags.map((tag) => (
          <li key={tag} className={styles.tagItem}>
            <span>{tag}</span>
            <button className={styles.followBtn}>Follow</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingTags;
