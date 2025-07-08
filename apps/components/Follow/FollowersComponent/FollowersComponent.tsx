"use client";

import React, { JSX, useState, useEffect } from "react";
import Image from "next/image";

import styles from "./FollowerComponent.module.css";

import { UserInfo } from "@/types/Dashboard/DashboardLeftPanel/DashboardInfos";

const FollowersComponent: React.FC = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_USER_API}/user/infos`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUserInfo(data);
      } 
      catch (err) {
        console.error("Failed to fetch user info:", err);
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) return <div className={styles.spinner}></div>;

  const { followersCount, followersList } = userInfo;

  const filteredFollowers = followersList.filter((follower) =>
    follower.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.followers_wrapper}>
      <div className={styles.followers_input_wrapper}>
        <input
          type="text"
          placeholder="Search followers..."
          className={styles.follower_search_input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.followers_count_wrapper}>
        <strong className={styles.followers_count}>{followersCount}</strong>{" "}
        Followers
      </div>

      {filteredFollowers.length === 0 ? (
        <p className={styles.no_result_text}>No followers found</p>
      ) : (
        <div className={styles.followers_grid}>
          {filteredFollowers.map((follower) => (
            <div key={follower.id} className={styles.follower_card}>
              <div className={styles.avatar_wrapper}>
                <Image
                  src={follower.avatarUrl ?? ""}
                  alt={follower.name}
                  width={50}
                  height={50}
                  className={styles.avatar}
                />
              </div>
              <p className={styles.name}>{follower.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowersComponent;
