"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Navigation.module.css";
import logo from "@/public/Logo.jpg";

import AuthModal from "@/components/AuthModal/AuthModal";
import { AuthMode } from "@/types/Navigation/Navigation";

const Navigation: React.FC = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  
  const openModal = (mode: AuthMode): void => {
    setAuthMode(mode);
    setShowModal(true);
  };

  const closeModal = (): void => { 
    setShowModal(false);
  }

  return (
    <>
      <nav className={styles.navigation_wrapper}>
        <div className={styles.navigation_bar}>
          <Link href="/">
            <Image alt="Logo" src={logo} className={styles.navigation_logo} />
          </Link>
          <div className={styles.navigation_components}>
            <Link href="/" className={styles.navigation_components_part}>
              Behind AlgoSync
            </Link>
            <div
              className={styles.navigation_components_part}
              onClick={() => openModal("login")}
            >
              Sync In
            </div>
            <div className={styles.navigation_journey_button}>
              <button onClick={() => openModal("signup")}>Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Display the Auth Modal */}
      {showModal && <AuthModal onClose={closeModal} defaultMode={authMode} />}
    </>
  );
};

export default Navigation;
