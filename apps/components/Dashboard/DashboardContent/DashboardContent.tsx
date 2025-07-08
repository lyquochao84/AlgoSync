"use client";

import React, { JSX, useState, useEffect } from "react";

import styles from "./DashboardContent.module.css";

import DashboardFriendsList from "./DashboardFriendsList/DashboardFriendsList";
import DashboardPostBox from "./DashboardPostSection/DashboardPostBox/DashboardPostBox";
import DashboardBlogBox from "./DashboardBlogsSection/DashboardBlogBox/DashboardBlogBox";
import DashboardPostContent from "./DashboardPostSection/DashboardPostContent/DashboardPostContent";

import { Post } from "@/types/Dashboard/DashboardPostMode/DashboardPostContent/DashboardPostContent";
import { useDashboardTab } from "@/context/Dashboard/DashboardTabContext";
import { UserInfo } from "@/types/Dashboard/DashboardLeftPanel/DashboardInfos";

export const examplePosts: Post[] = [
  {
    id: "post-1",
    user: {
      avatar: "https://i.pravatar.cc/100?img=12",
      username: "Hao",
    },
    time: "2h ago",
    type: "text",
    text: "📸FUR Tatu aka Ronaldo cập nhật bức ảnh này lên X cá nhân vào đêm qua (29/6) trước khi lên đường về nước: 'Tôi bắt gặp một fan GEN ở sảnh khách sạn. Anh chàng này thổ lộ chính tôi đã truyền cảm hứng (LMHT) và rằng cũng chẳng có điện thoại di động để lưu lại khoảnh khắc này. Gã này nói tên mình là `Canhão`. Nickname cái kiểu gì mà kỳ vậy ta?!' 🚀",
  },
  {
    id: "post-2",
    user: {
      avatar: "https://i.pravatar.cc/100?img=2",
      username: "John",
    },
    time: "1h ago",
    type: "photo",
    text: "My setup after some cable management 🔧Hey friends! Here's a super in-depth tutorial on React Server Components that changed how I think about rendering in Next.js. Highly recommend! qwerqwerqw erqw eqwer",
    photos: [
      "https://codeguppy.com/site/images/codeguppy.jpg",
      "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/sites/default/files/images/2015/09/blogs/economist-explains/code2.png",
    ],
  },
  {
    id: "post-3",
    user: {
      avatar: "https://i.pravatar.cc/100?img=4",
      username: "Sarah",
    },
    time: "45m ago",
    type: "video",
    text: "This is my newest video! Please check it out! Insider spent three days at the Marine Corps Recruit Depot in Parris Island, South Carolina, with a class of students during week six of their nine-week training to see what it takes to become a drill instructor.",
    video: {
      thumbnail:
        "https://cdn.prod.website-files.com/61eff6b3236cf9057b6c1fac/636dce409ef3ba3788596d57_3oDhfXeB.png",
      title: "Understanding React Server Components",
      source: "YouTube",
      link: "https://www.youtube.com/watch?v=kgrZj_HB2YE&t=13s&ab_channel=AlgoSync",
    },
  },
  {
    id: "post-5",
    user: {
      avatar: "https://i.pravatar.cc/100?img=8",
      username: "Beth",
    },
    time: "15m ago",
    type: "code",
    text: "Here's a simple debounce function in JavaScript:",
    code: `function debounce(fn, delay) {
  let timeoutId;
  constnmqwoienjrqoijerioqjerioqjwejriqioejrqiowejrioqwnerjoikqnerjiqntejqn
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}`,
  },
];

const DashboardContent: React.FC = (): JSX.Element => {
  const { activeTab, refreshKey } = useDashboardTab();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Fetch avatar for post & blog box
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
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className={styles.dashboard}>
      <DashboardFriendsList />
      <div className={styles.dashboard_main_content}>
        {activeTab === "posts" && (
          <>
            <DashboardPostBox userInfo={userInfo} />
            <DashboardPostContent
              posts={examplePosts}
              refreshKey={refreshKey}
            />
          </>
        )}
        {activeTab === "blogs" && (
          <div className={styles.dashboard_blogs_content}>
            <DashboardBlogBox userInfo={userInfo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
