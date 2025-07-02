"use client";

import React, { JSX, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./DashboardNav.module.css";
import Logo from "@/public/dashboard_logo.png";

import { IoNotificationsOutline } from "react-icons/io5";
import { LuTextSearch } from "react-icons/lu";
import { FaRegNewspaper } from "react-icons/fa";
import { PiCards } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import { TbCategory } from "react-icons/tb";

import SearchModal from "@/components/SearchModal/SearchModal";
import { useDashboardTab } from "@/context/Dashboard/DashboardTabContext";
import NotificationModal from "@/components/NotificationModal/NotificationModal";
import CategoryModal from "@/components/CategoryModal/CategoryModal";
import SettingsModal from "@/components/SettingsModal/SettingsModal";

const DashboardNav: React.FC = (): JSX.Element => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const { activeTab, setActiveTab } = useDashboardTab();

  // Search Modal
  const openSearchModal = () => setIsSearchOpen(true);
  const closeSearchModal = () => setIsSearchOpen(false);

  // Notification Modal
  const openNotificationModal = () => setIsNotificationOpen(true);
  const closeNotificationModal = () => setIsNotificationOpen(false);

  // Category Modal
  const openCategoryModal = () => setIsCategoryOpen(true);
  const closeCategoryModal = () => setIsCategoryOpen(false);

  // Settings Modal
  const openSettingsModal = () => setIsSettingsOpen(true);
  const closeSettingsModal = () => setIsSettingsOpen(false);

  return (
    <>
      <nav className={styles.dashboard_navigation_wrapper}>
        <div className={styles.dashboard_navigation_bar}>
          {/* LEFT */}
          <div className={styles.dashboard_navigation_left_part}>
            <div className={styles.coffee_logo_wrapper}>
              <Link href="/dashboard">
                <Image
                  src={Logo}
                  alt="logo"
                  className={styles.dashboard_navigation_logo}
                />
              </Link>
            </div>
            <div className={styles.search_wrapper}>
              <LuTextSearch className={styles.search_icon} />
              <input
                type="text"
                placeholder="Search..."
                className={styles.dashboard_search_input}
                onFocus={openSearchModal}
              />
            </div>
          </div>

          {/* CENTER */}
          <div className={styles.dashboard_navigation_mid_part}>
            <button
              className={`${styles.tab_button} ${
                activeTab === "blogs" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("blogs")}
            >
              <FaRegNewspaper className={styles.tab_button_icon} />
              Blogs
            </button>
            <span className={styles.veritcal_separate}>|</span>
            <button
              className={`${styles.tab_button} ${
                activeTab === "posts" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <PiCards className={styles.tab_button_icon} />
              Posts
            </button>
          </div>

          {/* RIGHT */}
          <div className={styles.dashboard_navigation_right_part}>
            <button className={styles.notification_button} onClick={openNotificationModal}>
              <IoNotificationsOutline className={styles.icon} />
            </button>
            <button className={styles.category_button} onClick={openCategoryModal}>
              <TbCategory className={styles.icon} />
            </button>
            <button className={styles.more_button} onClick={openSettingsModal}>
              <IoIosMore className={styles.icon} />
            </button>
          </div>
        </div>
      </nav>
      {isSearchOpen && <SearchModal onClose={closeSearchModal} />}
      {isNotificationOpen && <NotificationModal onClose={closeNotificationModal} />}
      {isCategoryOpen && <CategoryModal onClose={closeCategoryModal} />}
      {isSettingsOpen && <SettingsModal onClose={closeSettingsModal}/>}
    </>
  );
};

export default DashboardNav;
