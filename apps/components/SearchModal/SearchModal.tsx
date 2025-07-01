"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./SearchModal.module.css";

import { SearchModalProps } from "@/types/SearchModal/SearchModal";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { MdOutlineRecentActors } from "react-icons/md";

const mockResults = [
  {
    id: 1,
    name: "John Smith",
    team: "Weboria",
    avatar: "https://i.pravatar.cc/100?img=3",
    bio: "Building cool apps with Node.js & React.",
  },
  {
    id: 2,
    name: "Sarah Lee",
    team: "Weboria",
    avatar: "https://i.pravatar.cc/100?img=4",
    bio: "Loves CSS art and smooth UI animations.",
  },
  {
    id: 3,
    name: "Kevin Tran",
    team: "Neurona",
    avatar: "https://i.pravatar.cc/100?img=12",
    bio: "SQL wizard. Always optimizing queries.",
  },
  {
    id: 4,
    name: "Kevin Ly",
    team: "Cloudforge",
    avatar: "https://i.pravatar.cc/100?img=19",
  },
  {
    id: 5,
    name: "Vy Vo",
    team: "Visionix",
    avatar: "https://i.pravatar.cc/100?img=20",
    bio: "SQL wizard. Always optimizing queries.",
  },
  {
    id: 6,
    name: "Alice Nguyen",
    team: "Visionix",
    avatar: "https://i.pravatar.cc/100?img=25",
    bio: "Frontend fanatic.",
  },
];

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(mockResults);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const results = mockResults.filter(
      (dev) =>
        dev.name.toLowerCase().includes(query.toLowerCase()) ||
        dev.team.toLowerCase().includes(query.toLowerCase()) ||
        (dev.bio && dev.bio.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredResults(results);
  }, [query]);

  // Only show 5 max in modal
  const displayedResults =
    query.trim() === "" ? mockResults : filteredResults.slice(0, 5);

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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className={styles.search_results}>
          {query.trim() === "" ? (
            <>
              <div className={styles.recented_searches_wrapper}>
                <h3 className={styles.recent_searches_title}>Recent Searches</h3>
                <MdOutlineRecentActors className={styles.recent_searches_icon} />
              </div>
              {mockResults.map((dev) => (
                <Link
                  href="/dashboard"
                  key={dev.id}
                  className={styles.search_results_profile_link}
                >
                  <div className={styles.result_card}>
                    <Image
                      src={dev.avatar}
                      alt={dev.name}
                      width={48}
                      height={48}
                      className={styles.result_avatar}
                    />
                    <div className={styles.result_info}>
                      <div className={styles.result_info_header}>
                        <h3>{dev.name}</h3>
                        <span className={styles.vertical_separator}></span>
                        <p className={styles.result_team}>{dev.team}</p>
                      </div>
                      <p className={styles.result_bio}>{dev.bio}</p>
                    </div>
                    <button className={styles.follow_button}>Follow</button>
                  </div>
                </Link>
              ))}
            </>
          ) : filteredResults.length > 0 ? (
            <>
              {displayedResults.map((dev) => (
                <Link
                  href="/dashboard"
                  key={dev.id}
                  className={styles.search_results_profile_link}
                >
                  <div className={styles.result_card}>
                    <Image
                      src={dev.avatar}
                      alt={dev.name}
                      width={48}
                      height={48}
                      className={styles.result_avatar}
                    />
                    <div className={styles.result_info}>
                      <div className={styles.result_info_header}>
                        <h3>{dev.name}</h3>
                        <span className={styles.vertical_separator}></span>
                        <p className={styles.result_team}>{dev.team}</p>
                      </div>
                      <p className={styles.result_bio}>{dev.bio}</p>
                    </div>
                    <button className={styles.follow_button}>Follow</button>
                  </div>
                </Link>
              ))}

              {filteredResults.length > 5 && (
                <Link
                  href={`/search?query=${encodeURIComponent(query)}`}
                  className={styles.see_more_button}
                >
                  More Results
                </Link>
              )}
            </>
          ) : (
            <div className={styles.no_results}>
              <p>No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
