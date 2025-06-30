"use client";

import React, { useState } from "react";
import { PostProps } from "@/types/DashboardPostContent/DashboardPostContent";

import styles from "./DashboardPostItem.module.css";

import PostHeader from "@/components/Post/PostLayout/PostHeader/PostHeader";
import PostFooter from "@/components/Post/PostLayout/PostFooter/PostFooter";
import PostText from "@/components/Post/PostTypes/PostText/PostText";
import PostPhoto from "@/components/Post/PostTypes/PostPhoto/PostPhoto";
import PostVideo from "@/components/Post/PostTypes/PostVideo/PostVideo";
import PostPoll from "@/components/Post/PostTypes/PostPoll/PostPoll";
import PostCode from "@/components/Post/PostTypes/PostCode/PostCode";

const DashboardPostItem: React.FC<PostProps> = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.postCard}>
      <PostHeader user={post.user} time={post.time} />

      {post.text && (
        <PostText
          text={post.text}
          expanded={expanded}
          onExpand={() => setExpanded(true)}
        />
      )}

      {post.type === "photo" && post.photos && (
        <PostPhoto photos={post.photos} />
      )}

      {post.type === "video" && post.video && (
        <PostVideo video={post.video} />
      )}

      {post.type === "poll" && post.poll && (
        <PostPoll poll={post.poll} />
      )}

      {post.type === "code" && post.code && (
        <PostCode code={post.code} />
      )}

      <PostFooter postId={post.id} />
    </div>
  );
};

export default DashboardPostItem;
