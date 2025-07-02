import React from "react";
import styles from "./DashboardRightPanel.module.css";

import TechNews from "./TechNews/TechNews";
import SuggestedDev from "./SuggestedDev/SuggestedDev";
import NewsLetter from "./NewsLetter/NewsLetter";
import DashboardRightFooter from "./DashboardRightFooter/DashboardRightFooter";

const DashboardRightPanel: React.FC = () => {
  return (
    <div className={styles.rightPanel_wrapper}>
        <TechNews />
        <SuggestedDev />
        <hr className={styles.horizontal_divider} />
        <NewsLetter />
        <hr className={styles.horizontal_divider} />
        <DashboardRightFooter />
    </div>
  );
};

export default DashboardRightPanel;
