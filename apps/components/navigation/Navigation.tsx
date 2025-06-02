"use client";

import Image from "next/image";
import logo from "@/public/Logo.jpg";
import { JSX } from "react";
import styles from "./Navigation.module.css";
import Link from "next/link";

const Navigation: React.FC = (): JSX.Element => {
  return (
    <nav className={styles.navigation_bar}>
      <Link href='/'>
        <Image
          alt="Logo"
          src={logo}
          className={styles.navigation_logo}
        />
      </Link>
      <div className={styles.navigation_components}>
        <Link href='/' className={styles.navigation_components_part}>Behind AlgoSync</Link>
        <Link href='/' className={styles.navigation_components_part}>Sync In</Link>
        <Link href='/' className={styles.navigation_journey_button}>
          <button>Get Started</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
