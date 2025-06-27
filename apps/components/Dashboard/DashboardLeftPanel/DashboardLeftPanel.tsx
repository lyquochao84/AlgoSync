import React, { JSX } from "react";

import styles from "./DashboardLeftPanel.module.css";

import DashboardProfile from "./DashboardProfile/DashboardProfile";
import DashboardLevel from "./DashboardLevel/DashboardLevel";
import DashboardResources from "./DashboardResources/DashboardResources";
import DashboardLeftFooter from "./DashboardLeftFooter/DashboardLeftFooter";

const DashboardLeftPanel: React.FC = (): JSX.Element => {
  return (
    <div className={styles.left_container}>
      <div className={styles.profile_section_wrapper}>
        <DashboardProfile />
      </div>
      <DashboardLevel />
      <hr className={styles.horizontal_divider} />
      <DashboardResources />
      <hr className={styles.horizontal_divider} />
      <DashboardLeftFooter />
    </div>
  );
};

export default DashboardLeftPanel;
