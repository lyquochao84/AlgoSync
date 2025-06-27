import DashboardBlogBox from "./DashboardBlogBox/DashboardBlogBox";
import styles from "./DashboardContent.module.css";

import DashboardFriendsList from "./DashboardFriendsList/DashboardFriendsList";
import DashboardPostBox from "./DashboardPostBox/DashboardPostBox";

export default function DashboardContent() {
  return (
    <div className={styles.dashboard}>
      <DashboardFriendsList />
      <div className={styles.dashboard_main_content}>
        <DashboardPostBox />
        {/* <DashboardBlogBox /> */}
      </div>
    </div>
  );
}
