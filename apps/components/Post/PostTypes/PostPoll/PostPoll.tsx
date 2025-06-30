"use client";

import React from "react";
import { PostPollProps } from "@/types/DashboardPostContent/DashboardPostContent";
import styles from "./PostPoll.module.css";

const PostPoll: React.FC<PostPollProps> = ({ poll }) => {
  return (
    <div className={styles.poll}>
      <p className={styles.question}>{poll.question}</p>
      {poll.options.map((opt, idx) => {
        const percentage = (opt.votes / poll.totalVotes) * 100;
        return (
          <div key={idx} className={styles.option}>
            <span className={styles.optionLabel}>{opt.option}</span>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{ width: `${percentage}%` }} />
            </div>
            <span className={styles.percentage}>{Math.round(percentage)}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default PostPoll;
