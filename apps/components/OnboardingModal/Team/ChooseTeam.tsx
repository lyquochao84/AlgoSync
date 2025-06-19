"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import styles from "./ChooseTeam.module.css";
import { FaCheck } from "react-icons/fa";

import { teamData } from "./teamData";
import { TeamName } from "@/types/OnboardingModal/ChooseTeam/ChooseTeam";
import { ChooseTeamProps } from "@/types/OnboardingModal/ChooseTeam/ChooseTeam";

const ChooseTeam: React.FC<ChooseTeamProps> = ({
  selectedTeam,
  setSelectedTeam,
}) => {
  const [openModalTeam, setOpenModalTeam] = useState<TeamName | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Click to open the modal
  const handleSelectTeam = (teamName: string) => {
    setOpenModalTeam(teamName as TeamName);
  };

  // Clicked to choose the team
  const confirmTeam = () => {
    if (openModalTeam) {
      setSelectedTeam(openModalTeam);
      setOpenModalTeam(null);
    }
  };

  // User can click outside the modal to exit the modal
  const closeModal = () => {
    if (!openModalTeam) return;
    setIsClosing(true);
    setTimeout(() => {
      setOpenModalTeam(null);
      setIsClosing(false);
    }, 300); // match fade-out duration
  };

  // User press "ESC" key to exit the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (openModalTeam) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModalTeam]);

  // Auto-close modal if section is not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        if (!isVisible && openModalTeam) {
          closeModal();
        }
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [openModalTeam]);

  return (
    <section id="team" ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Choose your house</h1>
        <p className={styles.subtitle}>
          <strong>Note:</strong> Choosing a house is required—read each one to
          find your best fit
        </p>
        <div className={styles.houses_wrapper}>
          {Object.entries(teamData).map(([key, team]) => (
            <div
              key={key}
              className={`${styles.house_item} ${
                selectedTeam === team.name ? styles.selected : ""
              }`}
              onClick={() => handleSelectTeam(team.name)}
              style={{
                borderBlockColor: team.color,
                position: "relative", // needed for absolute icon
              }}
            >
              {/* Check icon */}
              {selectedTeam === team.name && (
                <div className={styles.check_icon}>
                  <FaCheck />
                </div>
              )}

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

      {openModalTeam && (
        <div className={`${styles.modal_overlay} ${isClosing ? styles.fade_out : ""}`} onClick={closeModal}>
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
            style={{ borderBlockColor: teamData[openModalTeam].color }}
          >
            <Image
              src={teamData[openModalTeam].logo}
              alt={openModalTeam}
              className={styles.modal_logo}
            />
            <div className={styles.modal_info_wrapper}>
              <h2
                className={styles.modal_info_title}
                style={{ color: teamData[openModalTeam].color }}
              >
                {teamData[openModalTeam].name}
              </h2>
              <div className={styles.modal_info_content}>
                <div className={styles.house_modal_info}>
                  <strong style={{ color: teamData[openModalTeam].color }}>
                    Developer's Type:
                  </strong>
                  <p className={styles.house_modal_developer_type}>
                    {teamData[openModalTeam].types}
                  </p>
                </div>
                <div className={styles.house_modal_info}>
                  <strong style={{ color: teamData[openModalTeam].color }}>
                    Personality:
                  </strong>
                  <ul>
                    {teamData[openModalTeam].personality
                      .split(/[.;]\s*/)
                      .filter(Boolean)
                      .map((sentence, index) => (
                        <li key={index}>{sentence.trim()}</li>
                      ))}
                  </ul>
                </div>
                <div className={styles.house_modal_info}>
                  <strong style={{ color: teamData[openModalTeam].color }}>
                    Good Fit:
                  </strong>
                  <ul>
                    {teamData[openModalTeam].user_types
                      .split(/[.;]\s*/)
                      .filter(Boolean)
                      .map((sentence, index) => (
                        <li key={index}>{sentence.trim()}</li>
                      ))}
                  </ul>
                </div>
                <button
                  className={styles.house_modal_choose_button}
                  onClick={confirmTeam}
                  style={
                    {
                      borderColor: teamData[openModalTeam].color,
                      ["--hover-color" as any]: teamData[openModalTeam].color,
                    } as React.CSSProperties
                  }
                >
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
