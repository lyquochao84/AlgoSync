import styles from "./DashboardContent.module.css";
import { FaImage, FaVideo, FaPoll, FaRegClock } from "react-icons/fa";

export default function DashboardContent() {
  return (
    <div className={styles.contentWrapper}>
      {/* POST INPUT BOX */}
      <div className={styles.postBox}>
        <img
          src="/avatar.png" // replace with user's avatar
          alt="User Avatar"
          className={styles.avatar}
        />
        <input
          type="text"
          placeholder="Post something ..."
          className={styles.input}
        />
      </div>

      {/* POST TYPE BUTTONS */}
      <div className={styles.postOptions}>
        <button className={`${styles.optionButton} ${styles.active}`}>
          <FaImage /> Photo
        </button>
        <button className={styles.optionButton}>
          <FaVideo /> Video
        </button>
        <button className={styles.optionButton}>
          <FaPoll /> Poll
        </button>
        <button className={styles.optionButton}>
          <FaRegClock /> Schedule
        </button>
      </div>
    </div>
  );
}
