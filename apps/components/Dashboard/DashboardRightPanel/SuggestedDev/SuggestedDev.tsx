import React, { JSX } from "react";

import styles from "./SuggestedDev.module.css";
import Link from "next/link";
import Image from "next/image";

const people = [
  {
    name: "Johnathann",
    image: "https://i.pravatar.cc/100?img=7",
    bio: "Front-End Developer specializing in React and UI design",
  },
  {
    name: "Obama",
    image: "https://i.pravatar.cc/100?img=9",
    bio: "Full-Stack Engineer and Former President (joking)",
  },
  {
    name: "Beth",
    image: "https://i.pravatar.cc/100?img=18",
    bio: "Back-End Developer passionate about APIs and Databases",
  },
];

const SuggestedDev: React.FC = (): JSX.Element => {
  return (
    <section className={styles.card}>
      <div className={styles.suggestedDev_header}>
        <h3 className={styles.title}>Suggested Dev</h3>
        <Link href="/suggested-dev" className={styles.suggestedDev_link}>
          More
        </Link>
      </div>
      <ul className={styles.list}>
        {people.map((person) => (
          <li key={person.name} className={styles.item}>
            <Image
              src={person.image}
              alt={person.name}
              className={styles.avatar}
              width={51.2}
              height={51.2}
            />

            <div className={styles.info}>
              <span className={styles.name}>{person.name}</span>
              <span className={styles.bio}>{person.bio}</span>
            </div>

            <button className={styles.followButton}>Follow</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SuggestedDev;
