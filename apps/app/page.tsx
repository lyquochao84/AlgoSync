"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./page.module.css";

import HeroLogo from "@/public/Hero_Image.png";
import AuthModal from "@/components/AuthModal/AuthModal";

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

  // Display the register/sync-in modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  return (
    <>
      <div className={styles.hero}>
        <Image
          src={HeroLogo}
          alt="AlgoSync Hero Image"
          className={styles.hero_image}
        />
        <div className={styles.hero_description}>
          <div className={styles.hero_title}>
            Built by Developers <br /> for <span>Developers</span>
          </div>
          <div className={styles.hero_subtitle}>
            Discover coding insights, share your knowledge, and connect with
            like-minded builders
          </div>
        </div>
      </div>
      <div className={styles.hero_button}>
        <button onClick={openModal}>Join Now</button>
      </div>
      {showModal && <AuthModal onClose={closeModal} />}
    </>
  );
}
