import DashboardLeftPanel from "@/components/Dashboard/DashboardLeftPanel/DashboardLeftPanel";
import DashboardContent from "@/components/Dashboard/DashboardContent/DashboardContent";
import DashboardRightPanel from "@/components/Dashboard/DashboardRightPanel/DashboardRightPanel";

import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.leftPanel}>
        <DashboardLeftPanel />
      </aside>
      <main className={styles.centerPanel}>
        <DashboardContent />
      </main>
      <aside className={styles.rightPanel}>
        <DashboardRightPanel />
      </aside>
    </div>
  );
}
