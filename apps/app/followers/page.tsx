import FollowersComponent from "@/components/Follow/FollowersComponent/FollowersComponent";
import styles from "./page.module.css";

export default function Followers() {
  return (
    <div className={styles.followersPageLayout}>
      <FollowersComponent />
    </div>
  );
}
