"use client";
import React from "react";
import styles from "./PostModal.module.css";
import { PostModalProps } from "@/types/PostModal/PostModal";
import { FaImage, FaVideo } from "react-icons/fa";
import { FaLaptopCode, FaFaceSmile } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";

const PostModal: React.FC<PostModalProps> = ({ setIsModalOpen }) => {
  return (
    <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>Create a Post</h3>
          <button
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
          >
            <IoMdCloseCircleOutline />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <div className={styles.textareaWrapper}>
            <textarea
              className={styles.modalTextarea}
              placeholder="Log your dev moment..."
              rows={6}
            />
            <button className={styles.emojiButton}>
              <FaFaceSmile />
            </button>
          </div>

          {/* Post Type Buttons */}
          <div className={styles.postOptions}>
            <button className={`${styles.optionButton} ${styles.active}`}>
              <FaImage /> Photo
            </button>
            <button className={styles.optionButton}>
              <FaVideo /> Video
            </button>
            <button className={styles.optionButton}>
              <FaLaptopCode /> Code
            </button>
          </div>

          {/* Post Button */}
          <div className={styles.modalActions}>
            <button className={styles.postButton}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
