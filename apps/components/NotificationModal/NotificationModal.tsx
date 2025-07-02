// Redesigned NotificationModal.tsx with avatar, name, and icons
"use client";

import React, { JSX, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./NotificationModal.module.css";

import { IoNotificationsOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";
import { FaRegComments, FaUserTag, FaInfoCircle } from "react-icons/fa";
import { TfiStatsUp } from "react-icons/tfi";
import { RiUserFollowLine } from "react-icons/ri";
import { GiStairsGoal } from "react-icons/gi";
import { PiRankingDuotone } from "react-icons/pi";
import { IoIosStats } from "react-icons/io";
import { MdDataExploration } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { MdAccessibilityNew } from "react-icons/md";

import {
  NotificationModalProps,
  NotificationTab,
  NotificationItem,
} from "@/types/NotificationModal/NotificationModal";
import { TABS } from "./tabsData";

// Dummy Data
const dummyNotifications: Record<NotificationTab, NotificationItem[]> = {
  All: [
    {
      type: "user",
      text: "boosted your blog: 'Why Tailwind Rocks'",
      time: "5 min ago",
      user: { name: "Alice", avatar: "https://i.pravatar.cc/100?img=4" },
      icon: <SlEnergy />,
      color: "#f97316",
      status: "unread",
    },
    {
      type: "user",
      text: "replied your post: 'Why Dude?'",
      time: "5 min ago",
      user: { name: "Vy", avatar: "https://i.pravatar.cc/100?img=7" },
      icon: <FaRegComments />,
      color: "#3b82f6",
      status: "unread",
    },
    {
      type: "user",
      text: "followed you",
      time: "5 min ago",
      user: { name: "Kevin", avatar: "https://i.pravatar.cc/100?img=8" },
      icon: <RiUserFollowLine />,
      color: "#d7c0a3",
      status: "unread",
    },
    {
      type: "user",
      text: "mentioned you in a post: 'React Structure'",
      time: "5 min ago",
      user: { name: "K", avatar: "https://i.pravatar.cc/100?img=4" },
      icon: <FaUserTag />,
      color: "#3b82f6",
      status: "read",
    },
    {
      type: "stats",
      text: "leveled up to level 4",
      time: "45 min ago",
      user: { name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
      icon: <TfiStatsUp />,
      color: "#a8f590",
      status: "read",
    },
    {
      type: "stats",
      text: "completed a challenge: `Write 5 blogs in this week`",
      time: "1 min ago",
      user: { name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
      icon: <GiStairsGoal />,
      color: "#ed876b",
      status: "read",
    },
    {
      type: "stats",
      text: "reaches 20 XP",
      time: "1 min ago",
      user: { name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
      icon: <MdDataExploration />,
      color: "#64f5ee",
      status: "unread",
    },
    {
      type: "house",
      text: "joined Cloud House – welcome them!",
      time: "4 hours ago",
      house: { name: "linus_dev", avatar: "/Dashboard_Logo/cloud.png" },
      icon: <MdAccessibilityNew />,
      color: "#fff",
      status: "unread",
    },
    {
      type: "system",
      text: "New Features just launched",
      time: "1 sec ago",
      system: { name: "AlgoSync", avatar: "/dashboard_logo.png" },
      icon: <FaInfoCircle />,
      color: "#3b82f6",
      status: "unread",
    },
  ],
  Personal: [
    {
      type: "stats",
      text: "leveled up to level 4",
      time: "45 min ago",
      user: { name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
      icon: <TfiStatsUp />,
      color: "#a8f590",
      status: "read",
    },
    {
      type: "stats",
      text: "completed a challenge: `Write 5 blogs in this week`",
      time: "1 min ago",
      user: { name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
      icon: <GiStairsGoal />,
      color: "#ed876b",
      status: "read",
    },
    {
      type: "stats",
      text: "reaches 20 XP",
      time: "1 min ago",
      user: { name: "Hao", avatar: "https://i.pravatar.cc/100?img=12" },
      icon: <MdDataExploration />,
      color: "#64f5ee",
      status: "unread",
    },
  ],
  House: [
    {
      type: "house",
      text: "joined Cloud House – welcome them!",
      time: "4 hours ago",
      house: { name: "linus_dev", avatar: "/Dashboard_Logo/cloud.png" },
      icon: <MdAccessibilityNew />,
      color: "#fff",
      status: "unread",
    },
  ],
  System: [
    {
      type: "system",
      text: "New Features just launched",
      time: "1 sec ago",
      system: { name: "AlgoSync", avatar: "/dashboard_logo.png" },
      icon: <FaInfoCircle />,
      color: "#3b82f6",
      status: "unread",
    },
  ],
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
}): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<NotificationTab>("All");
  const [notifications, setNotifications] = useState(dummyNotifications);

  // "ESC"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Initialize the status
  useEffect(() => {
    setNotifications(dummyNotifications);
  }, []);

  // Mark as read whenever user clicked to notification card
  const handleMarkAsRead = (tab: NotificationTab, index: number) => {
    setNotifications((prev) => {
      const updated = { ...prev };
      updated[tab] = [...updated[tab]];
      updated[tab][index] = { ...updated[tab][index], status: "read" };
      return updated;
    });
  };

  // Mark all as read button
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => {
      const updated = { ...prev };
      for (const tab in updated) {
        updated[tab as NotificationTab] = updated[tab as NotificationTab].map(
          (n) => ({
            ...n,
            status: "read",
          })
        );
      }
      return updated;
    });
  };

  return (
    <div className={styles.notification_modal_overlay} onClick={onClose}>
      <div
        className={styles.notification_modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.notification_modal_header}>
          <div className={styles.notification_title_header}>
            <IoNotificationsOutline
              className={styles.notification_title_icon}
            />
            <h2>Notifications</h2>
          </div>
          <div
            className={styles.mark_reads_wrapper}
            onClick={handleMarkAllAsRead}
          >
            <p>Mark all as read</p>
          </div>
        </div>

        <div className={styles.notification_tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab_button} ${
                selectedTab === tab ? styles.active_tab : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.notification_list}>
          {notifications[selectedTab].map((notif, index) => {
            const source = notif.user || notif.house || notif.system;
            return (
              <Link
                key={index}
                href="/dashboard"
                className={styles.notification_item_link}
              >
                <div
                  key={index}
                  className={`${styles.notification_item} ${
                    styles[notif.status === "unread" ? "unread" : "read"]
                  }`}
                  onClick={() => handleMarkAsRead(selectedTab, index)}
                >
                  <Image
                    src={source?.avatar || "/default.png"}
                    alt={source?.name || ""}
                    width={40}
                    height={40}
                    className={styles.notif_avatar}
                  />
                  <div className={styles.notif_content_wrapper}>
                    <div className={styles.notif_content_title_wrapper}>
                      <p>
                        <strong className={styles.notif_name}>
                          {source?.name}
                        </strong>
                        <span className={styles.notif_text}>{notif.text}</span>
                      </p>
                      <span className={styles.notif_time}>{notif.time}</span>
                    </div>
                    <div
                      className={styles.notif_icon_wrapper}
                      style={{ color: notif.color }}
                    >
                      {notif.icon}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
