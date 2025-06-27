import React, { JSX } from "react";

import styles from "./DashboardLeftFooter.module.css";
import Link from "next/link";

const DashboardLeftFooter: React.FC = (): JSX.Element => {
  return (
    <div className={styles.dashboard_left_footer}>
      <div className={styles.dashboard_left_terms_privacy}>
        <Link href="/dashboard" className={styles.dashboard_left_link}>
          Terms
        </Link>
        <Link href="/dashboard" className={styles.dashboard_left_link}>
          Privacy
        </Link>
      </div>
      <p>AlgoSync © 2025</p>
    </div>
  );
};

export default DashboardLeftFooter;
