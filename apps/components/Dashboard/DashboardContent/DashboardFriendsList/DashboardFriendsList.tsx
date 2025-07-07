import React, { JSX } from "react";
import Image from "next/image";

import styles from "./DashboardFriendsList.module.css";
// import Image from "next/image";

const friends = [
  { id: "1", name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "2", name: "John", avatar: "https://i.pravatar.cc/100?img=2" },
  {
    id: "3",
    name: "Johnathan Yang",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  { id: "4", name: "Sarah", avatar: "https://i.pravatar.cc/100?img=4" },
  { id: "5", name: "Juliet", avatar: "https://i.pravatar.cc/100?img=5" },
  { id: "6", name: "Beth", avatar: "https://i.pravatar.cc/100?img=8" },
  { id: "7", name: "Cait", avatar: "https://i.pravatar.cc/100?img=10" },
  { id: "8", name: "Vlad", avatar: "https://i.pravatar.cc/100?img=20" },
  { id: "9", name: "Jun", avatar: "https://i.pravatar.cc/100?img=30" },
  { id: "10", name: "BT", avatar: "https://i.pravatar.cc/100?img=40" },
];

const DashboardFriendsList: React.FC = (): JSX.Element => {
  return (
    <div className={styles.friendListRow}>
      {friends.map((friend, index) => (
        <div key={index} className={styles.friendAvatarWrapper}>
          <Image
            src={friend.avatar}
            alt={friend.name}
            width={56}
            height={56}
            className={styles.friendAvatar}
          />
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
