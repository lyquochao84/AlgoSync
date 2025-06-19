"use client";
import React from "react";

import styles from "./WelcomeOnboarding.module.css";

import Particles from "@/Reactbits/Particles/Particles";

const WelcomeOnboarding: React.FC = () => {
  return (
    <>
      <section id="welcome" className={styles.section}>
        <Particles
          particleColors={["#6D6969", "#6D6969"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div className={styles.content}>
          <h1 className={styles.title}>
            Welcome to <br />
            SyncVerse
          </h1>
          <p className={styles.subtitle}>
            Choose your path, define your legacy
          </p>
        </div>
      </section>
    </>
  );
};

export default WelcomeOnboarding;
