import React, { JSX } from "react";

import styles from "./DashboardFriendsList.module.css";
// import Image from "next/image";

const friends = [
  { name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
  { name: "John", avatar: "https://i.pravatar.cc/100?img=2" },
  { name: "Johnathan Yang", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Sarah", avatar: "https://i.pravatar.cc/100?img=4" },
  { name: "Juliet", avatar: "https://i.pravatar.cc/100?img=5" },
  { name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Beth", avatar: "https://i.pravatar.cc/100?img=9" },
  { name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
];

const DashboardFriendsList: React.FC = (): JSX.Element => {
  return (
    <div className={styles.friendListRow}>
      {friends.map((friend, index) => (
        <div key={index} className={styles.friendAvatarWrapper}>
          <img src={friend.avatar} className={styles.friendAvatar} alt={ `${friend.name}` } />
          <p className={styles.friendName}>
            {friend.name.includes(" ")
              ? `${friend.name.split(" ")[0]}...`
              : friend.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardFriendsList;
