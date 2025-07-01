"use client";

import React, { useState, useEffect } from "react";
import { DashboardPostContentProps, Post } from "@/types/DashboardPostContent/DashboardPostContent";

import styles from "./DashboardPostContent.module.css";
import DashboardPostItem from "./DashboardPostItem/DashboardPostItem";

const DashboardPostContent: React.FC<DashboardPostContentProps> = ({ posts, refreshKey }) => {
  const [latestPosts, setLatestPosts] = useState(posts);

  // useEffect(() => {
  //   async function fetchPosts() {
  //     const newPosts = await fetchPostsFromServer();
  //     setLatestPosts(newPosts);
  //   }

  //   fetchPosts();
  // }, [refreshKey]);

  return (
    <div className={styles.postFeed}>
      {posts.map(post => (
        <DashboardPostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default DashboardPostContent;

// Simulated fetch
async function fetchPostsFromServer(): Promise<Post[]> {
  return Promise.resolve([
    {
      id: "post-99",
      user: {
        avatar: "https://i.pravatar.cc/100?img=12",
        username: "NewUser",
      },
      time: "just now",
      type: "text",
      text: "This is new fetched post!"
    }
  ]);
}
