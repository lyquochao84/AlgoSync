import React from "react";
import styles from "./DashboardRightPanel.module.css";

import HouseLeaderboard from "./HouseLeaderboard/HouseLeaderboard";
import TrendingTags from "./TrendingTags/TrendingTags";

const DashboardRightPanel: React.FC = () => {
  return (
    <div className={styles.rightPanel_wrapper}>
        <>
            <HouseLeaderboard />
        </>
        <TrendingTags />
    </div>
  );
};

export default DashboardRightPanel;
