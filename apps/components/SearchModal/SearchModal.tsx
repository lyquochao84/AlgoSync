import React, { JSX, useEffect } from "react";

import styles from "./SearchModal.module.css";

import { SearchModalProps } from "@/types/SearchModal/SearchModal";
import { IoMdCloseCircleOutline } from "react-icons/io";

const SearchModal: React.FC<SearchModalProps> = ({ onClose }): JSX.Element => {
  // ESC key close handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.search_modal_overlay} onClick={onClose}>
      <div
        className={styles.search_modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.search_modal_header}>
          <h2>Find Developers</h2>
          <button className={styles.search_modal_close} onClick={onClose}>
            <IoMdCloseCircleOutline />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search developers, posts, etc..."
          className={styles.search_modal_input}
          autoFocus
        />
        <div className={styles.search_results}>
          <p>No results yet...</p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
