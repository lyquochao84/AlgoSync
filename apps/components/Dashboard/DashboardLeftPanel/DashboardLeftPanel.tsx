"use client";

import React, { JSX, useState, useEffect } from "react";

import styles from "./DashboardLeftPanel.module.css";

import DashboardProfile from "./DashboardProfile/DashboardProfile";
import DashboardLevel from "./DashboardLevel/DashboardLevel";
import DashboardResources from "./DashboardResources/DashboardResources";
import DashboardLeftFooter from "./DashboardLeftFooter/DashboardLeftFooter";

import { UserInfo } from "@/types/Dashboard/DashboardLeftPanel/DashboardInfos";

const DashboardLeftPanel: React.FC = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  
  // Fetch User Info
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

  return (
      <div className={styles.left_container}>
        <div className={styles.profile_section_wrapper}>
          <DashboardProfile userInfo={userInfo} />
        </div>
        <DashboardLevel userInfo={userInfo} />
        <hr className={styles.horizontal_divider} />
        <DashboardResources />
        <hr className={styles.horizontal_divider} />
        <DashboardLeftFooter />
      </div>
  );
};

export default DashboardLeftPanel;
