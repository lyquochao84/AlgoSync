import React, { JSX } from "react";

import styles from "./HouseLeaderboard.module.css";

const houses = [
  { name: "Visionix", color: "#d94e4e", icon: "🛡️" },
  { name: "Neurona", color: "#a36bff", icon: "🐙" },
  { name: "Firelock", color: "#5ec9f0", icon: "🦅" },
];

const HouseLeaderboard: React.FC = (): JSX.Element => {
  return (
    <section className={styles.card}>
      <h3>House</h3>
      <ul className={styles.houseList}>
        {houses.map((house) => (
          <li key={house.name} className={styles.houseItem}>
            <span className={styles.icon} style={{ color: house.color }}>
              {house.icon}
            </span>
            <span style={{ color: house.color }}>{house.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HouseLeaderboard;
