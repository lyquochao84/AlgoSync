import React, { JSX } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./DashboardNav.module.css";
import Logo from "@/public/dashboard_logo.png";

import { IoNotificationsOutline } from "react-icons/io5";
import { LuTextSearch } from "react-icons/lu";
import { FaRegNewspaper } from "react-icons/fa";
import { PiCards } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import { TbMessage2Code, TbCategory } from "react-icons/tb";

const DashboardNav: React.FC = (): JSX.Element => {
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
              />
            </div>
          </div>

          {/* CENTER */}
          <div className={styles.dashboard_navigation_mid_part}>
            <button className={styles.tab_button}>
              <FaRegNewspaper className={styles.tab_button_icon} />
              Blogs
            </button>
            <span className={styles.veritcal_separate}>|</span>
            <button className={styles.tab_button}>
              <PiCards className={styles.tab_button_icon} />
              Posts
            </button>
          </div>

          {/* RIGHT */}
          <div className={styles.dashboard_navigation_right_part}>
            <button className={styles.notification_button}>
              <IoNotificationsOutline className={styles.icon} />
            </button>
            <button className={styles.category_button}>
              <TbCategory className={styles.icon} />
            </button>
            <button className={styles.category_button}>
              <TbMessage2Code className={styles.icon} />
            </button>
            <button className={styles.more_button}>
              <IoIosMore className={styles.icon} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNav;
