"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { PostVideoProps } from "@/types/DashboardPostContent/DashboardPostContent";

import styles from "./PostVideo.module.css";

const PostVideo: React.FC<PostVideoProps> = ({ video }) => {
  return (
    <Link href={video.link} target="_blank" className={styles.videoLink}>
      <Image
        src={video.thumbnail}
        alt="Video Thumbnail"
        width={140}
        height={80}
        className={styles.thumbnail}
      />
      <div className={styles.details}>
        <div className={styles.title}>{video.title}</div>
        <div className={styles.source}>{video.source}</div>
      </div>
    </Link>
  );
};

export default PostVideo;
