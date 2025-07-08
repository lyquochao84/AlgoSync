import React from "react";
import styles from "./TechNews.module.css";
import Link from "next/link";
import Image from "next/image";

const news = [
  {
    title: "React 19 RC Released - What's New?",
    image: "https://graphqleditorcms.fra1.cdn.digitaloceanspaces.com/graphqleditorcms/blogpost/react19-1730851347059.webp",
    link: "https://react.dev/blog/2025/06/25/react-19-rc",
  },
  {
    title: "OpenAI Launches New AI Model for Devs",
    image: "https://static01.nyt.com/images/2024/10/02/business/00openai-deal-hfo/00openai-deal-hfo-articleLarge-v2.jpg?quality=75&auto=webp&disable=upscale",
    link: "https://openai.com/blog/new-ai-tools",
  },
  {
    title: "GitHub Copilot Now Supports More Languages",
    image: "https://aps.autodesk.com/sites/default/files/2024-10/Screenshot%202024-10-03%20at%2015.34.40.png",
    link: "https://github.blog/copilot-updates/",
  },
];

const TechNews: React.FC = () => {
  return (
    <section className={styles.card}>
      <div className={styles.news_header}>
        <h3 className={styles.card_title}>Latest Tech News</h3>
        <Link href="/news" className={styles.news_header_link}>
          More
        </Link>
      </div>
      <ul className={styles.news_list}>
        {news.map((item, index) => (
          <li key={index} className={styles.news_item}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.news_link}>
              <Image
                src={item.image}
                alt={item.title}
                className={styles.news_image}
                width={500}
                height={500}
              />
              <span className={styles.news_title}>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TechNews;
