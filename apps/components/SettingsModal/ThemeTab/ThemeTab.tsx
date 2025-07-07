"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import styles from "./ThemeTab.module.css";
import { ThemeKey } from "@/types/SettingsModal/ThemeTab/ThemeTab";

const ThemeTab: React.FC = () => {
  const [theme, setTheme] = useState<ThemeKey>("dark");

  /**
   * It checks if the <html> element already has a `data-theme` attribute.
   * - If not, it sets the theme to "dark" and applies it to the DOM.
   * - If yes, it synchronizes the React state with the current DOM theme.
  */
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (!currentTheme) {
      // Default to dark mode if no theme is currently set
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
    } 
    else {
      // Sync state with the current theme
      setTheme(currentTheme === "dark" ? "dark" : "light");
    }
  }, []);

  // Switches the theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Save the theme
  const handleSave = () => {
    document.documentElement.setAttribute("data-theme", theme);
    toast.success(`Switched to ${theme} mode`, {
      duration: 3000,
      style: {
        background: "#333",
        color: "#fff",
        borderRadius: "8px",
      },
    });
  };

  return (
    <div className={styles.theme_tab}>
      <h3 className={styles.title}>Change Theme</h3>
      <div className={styles.theme_toggle_row}>
        <span className={styles.toggle_label}>Light Mode</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={theme === "light"}
            onChange={toggleTheme}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <button className={styles.save_button} onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default ThemeTab;
