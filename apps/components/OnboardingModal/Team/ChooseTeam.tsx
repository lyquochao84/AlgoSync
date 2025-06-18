"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./ChooseTeam.module.css";
import { teamData } from "./teamData";
import { TeamName } from "./ChoosTeam.types";

const ChooseTeam: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamName | null>(null);

  const handleSelectTeam = (teamName: string) => {
    setSelectedTeam(teamName as TeamName);
  };

  const closeModal = () => setSelectedTeam(null);

  return (
    <section id="team" className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Choose your house</h1>
        <div className={styles.houses_wrapper}>
          {Object.entries(teamData).map(([key, team]) => (
            <div
              key={key}
              className={styles.house_item}
              onClick={() => handleSelectTeam(team.name)}
              style={{ borderBlockColor: team.color }}
            >
              <Image
                className={styles.house_item_logo}
                src={team.logo}
                alt={team.name}
              />
              <p
                className={styles.house_item_text}
                style={{ color: team.color }}
              >
                {team.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedTeam && (
  <div className={styles.modal_overlay} onClick={closeModal}>
    <div
      className={styles.modal_content}
      onClick={(e) => e.stopPropagation()}
      style={{ borderBlockColor: teamData[selectedTeam].color }}
    >
      <Image
        src={teamData[selectedTeam].logo}
        alt={selectedTeam}
        className={styles.modal_logo}
      />
      <div className={styles.modal_info_wrapper}>
        <h2
          className={styles.modal_info_title}
          style={{ color: teamData[selectedTeam].color }}
        >
          {teamData[selectedTeam].name}
        </h2>
        <div className={styles.modal_info_content}>
          <div className={styles.house_modal_info}>
            <strong style={{ color: teamData[selectedTeam].color }}>Developer's Type:</strong>
            <p className={styles.house_modal_developer_type}>{teamData[selectedTeam].types}</p>
          </div>
          <div className={styles.house_modal_info}>
            <strong style={{ color: teamData[selectedTeam].color }}>Personality:</strong>
            <ul>
              {teamData[selectedTeam].personality
                .split(/[.;]\s*/)
                .filter(Boolean)
                .map((sentence, index) => (
                  <li key={index}>{sentence.trim()}</li>
              ))}
            </ul>
          </div>
          <div className={styles.house_modal_info}>
            <strong style={{ color: teamData[selectedTeam].color }}>Good Fit:</strong>
            <ul>
              {teamData[selectedTeam].user_types
                .split(/[.;]\s*/)
                .filter(Boolean)
                .map((sentence, index) => (
                  <li key={index}>{sentence.trim()}</li>
              ))}
            </ul>
          </div>
          <button className={styles.house_modal_choose_button}>
            Choose
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default ChooseTeam;
