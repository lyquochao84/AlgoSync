import styles from "./page.module.css";
import Image from "next/image";
import HeroLogo from "@/public/Hero_Image.png";

export default function Home() {
  return (
    <>
      <div className={styles.hero}>
        <Image src={HeroLogo} alt="AlgoSync Hero Image" className={styles.hero_image}/>
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
        <button>Start Reading</button>
      </div>
    </>
  );
}
