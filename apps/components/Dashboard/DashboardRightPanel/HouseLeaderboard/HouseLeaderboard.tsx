import React, { JSX } from "react";

import styles from "./HouseLeaderboard.module.css";
import Link from "next/link";
import Image from "next/image";

import VisionNixLogo from "@/public/Dashboard Logo/game.png";
import NeuronaLogo from "@/public/Dashboard Logo/ai.png";
import FirelockLogo from "@/public/Dashboard Logo/cyber.png";

const houses = [
  { name: "Visionix", color: "#d94e4e", image: VisionNixLogo },
  { name: "Neurona", color: "#a36bff", image: NeuronaLogo },
  { name: "Firelock", color: "#5ec9f0", image: FirelockLogo },
];

const HouseLeaderboard: React.FC = (): JSX.Element => {
  return (
    <Link href="/dashboard" className={styles.house_leaderboard_link}>
      <section className={styles.card}>
        <h3>House Leaderboard</h3>
        <ul className={styles.houseList}>
          {houses.map((house) => (
            <li key={house.name} className={styles.houseItem}>
              <div className={styles.houseItem_header}>
                <Image
                  className={styles.house_leaderboard_image}
                  src={house.image}
                  alt={`${house.name} logo`}
                  style={{ borderColor: house.color }}
                />
                <span
                  className={styles.house_leaderboard_name}
                  style={{ color: house.color }}
                >
                  {house.name}
                </span>
              </div>
              <span
                className={styles.point_text}
                style={{ color: house.color }}
              >
                100 pts
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Link>
  );
};

export default HouseLeaderboard;
