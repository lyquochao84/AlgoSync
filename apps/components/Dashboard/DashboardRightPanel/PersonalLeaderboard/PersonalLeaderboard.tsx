import React, { JSX } from "react";
import styles from "./PersonalLeaderboard.module.css";
import Link from "next/link";

const houses = [
  { name: "Visionix", color: "#d94e4e" },
  { name: "Neurona", color: "#a36bff" },
  { name: "Firelock", color: "#5ec9f0" },
];

const people = [
  { name: "John", image: "https://i.pravatar.cc/100?img=12", house: "Visionix" },
  { name: "Jonathan1111111", image: "https://i.pravatar.cc/100?img=2", house: "Neurona" },
  { name: "Beth", image: "https://i.pravatar.cc/100?img=8", house: "Firelock" },
];

const PersonalLeaderboard: React.FC = (): JSX.Element => {
  return (
    <Link href="/dashboard" className={styles.personal_leaderboard_link}>
      <section className={styles.card}>
        <h3>Top Players</h3>
        <ul className={styles.personalList}>
          {people.map((person) => {
            const house = houses.find((h) => h.name === person.house);
            const color = house ? house.color : "#000";

            return (
              <li key={person.name} className={styles.personalItem}>
                <div className={styles.personalItem_header}>
                  <img
                    className={styles.personal_leaderboard_image}
                    src={person.image}
                    alt={`${person.name} avatar`}
                    style={{ borderColor: color }}
                  />
                  <span
                    className={styles.personal_leaderboard_name}
                    style={{ color }}
                  >
                    {person.name}
                  </span>
                </div>
                <span
                  className={styles.point_text}
                  style={{ color }}
                >
                  100 pts
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </Link>
  );
};

export default PersonalLeaderboard;
