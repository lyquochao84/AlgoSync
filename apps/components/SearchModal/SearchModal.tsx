"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./SearchModal.module.css";

import { SearchModalProps, SearchUser } from "@/types/SearchModal/SearchModal";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { MdOutlineRecentActors } from "react-icons/md";
import { RiCodeView } from "react-icons/ri";

import { teamColors } from "@/utils/team/teamColors/teamColors";

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // "ESC" key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Search function
  useEffect(() => {
    const controller = new AbortController();

    // Display the result
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setFilteredResults([]);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_USER_API
          }/user/search?query=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Search failed");

        const data = await res.json();
        setFilteredResults(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Search error:", err.message);
        } else {
          console.error("Unknown error during search:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query]);

  // Limit to top 5 results
  const displayedResults = filteredResults.slice(0, 5);

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
          placeholder="Search developers..."
          className={styles.search_modal_input}
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className={styles.search_results}>
          {query.trim() === "" ? (
            <>
              <div className={styles.recented_searches_wrapper}>
                <h3 className={styles.recent_searches_title}>
                  Recent Searches
                </h3>
                <MdOutlineRecentActors
                  className={styles.recent_searches_icon}
                />
              </div>
              <div className={styles.recent_empty_wrapper}>
                <RiCodeView className={styles.recent_empty_icon} />
                <p className={styles.recent_empty_text}>No recent searches</p>
              </div>
            </>
          ) : loading ? (
            <div className={styles.loading_text}>Loading...</div>
          ) : filteredResults.length > 0 ? (
            <>
              {displayedResults.map((dev) => {
                const borderColor = dev.team
                  ? teamColors[dev.team.toLowerCase()] || "#000"
                  : "#000";
                return (
                  <Link
                    href={`/dashboard`}
                    key={dev.id}
                    className={styles.search_results_profile_link}
                  >
                    <div className={styles.result_card} style={{ border: `1px solid ${borderColor}` }}>
                      <Image
                        src={dev.avatarUrl}
                        alt={dev.name}
                        width={48}
                        height={48}
                        quality={100}
                        className={styles.result_avatar}
                        // style={{ border: `2px solid ${borderColor}` }}
                      />
                      <div className={styles.result_info}>
                        <div className={styles.result_info_header}>
                          <h3>{dev.name}</h3>
                          <span className={styles.vertical_separator}></span>
                          <p
                            className={styles.result_team}
                            style={{ color: `${borderColor}` }}
                          >
                            {dev.team}
                          </p>
                        </div>
                        <p className={styles.result_bio}>{dev.bio}</p>
                      </div>
                      <button className={styles.follow_button}>Follow</button>
                    </div>
                  </Link>
                );
              })}

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
