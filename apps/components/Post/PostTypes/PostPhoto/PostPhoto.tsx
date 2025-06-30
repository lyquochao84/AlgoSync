"use client";

import React, { useState } from "react";
import { PostPhotoProps } from "@/types/DashboardPostContent/DashboardPostContent";
import styles from "./PostPhoto.module.css";
import Image from "next/image";

const PostPhoto: React.FC<PostPhotoProps> = ({ photos }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % photos.length);
  const prev = () => setIndex((index - 1 + photos.length) % photos.length);

  return (
    <div className={styles.container}>
      <Image
        src={photos[index]}
        className={styles.image}
        fill
        sizes="100vw"
        alt="Post"
      />
      {photos.length > 1 && (
        <div className={styles.controls}>
          <button onClick={prev}>‹</button>
          <button onClick={next}>›</button>
        </div>
      )}
    </div>
  );
};

export default PostPhoto;
