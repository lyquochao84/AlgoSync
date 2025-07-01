"use client";

import React, { JSX, useEffect, useState } from "react";
import Link from "next/link";

import styles from "./CategoryModal.module.css";

import { CategoryModalProps } from "@/types/CategoryModal/CategoryModal";
import { categoryMap } from "./categoryData";

import { FaList } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";


const CategoryModal: React.FC<CategoryModalProps> = ({
  onClose,
}): JSX.Element => {
  const [activeTab, setActiveTab] = useState<keyof typeof categoryMap>("Core Topics");
    
  // "ESC"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <div className={styles.modal_header_title_wrapper}>
            <FaList className={styles.modal_header_icon} />
            <h2 className={styles.modal_title}>Categories</h2>
          </div>
          <button className={styles.close_button} onClick={onClose}>
            <IoMdCloseCircleOutline />
          </button>
        </div>

        <div className={styles.category_modal_container}>
          <div className={styles.category_tabs}>
            {Object.keys(categoryMap).map((tab) => (
              <h3
                key={tab}
                className={`${styles.category_tab} ${
                  activeTab === tab ? styles.active_tab : ""
                }`}
                onClick={() => setActiveTab(tab as keyof typeof categoryMap)}
              >
                {tab}
              </h3>
            ))}
          </div>

          <div className={styles.vertical_divider} />

          <div className={styles.category_content}>
            {categoryMap[activeTab].map((cat) => (
              <Link href="/dashboard" key={cat} className={styles.category_item}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
