"use client";

import React, { useState } from "react";

import WelcomeOnboarding from "./Welcome/WelcomeOnboarding";
import WorldHistory from "./WorldHistory/WorldHistory";
import ChooseTeam from "./Team/ChooseTeam";
import UserInfo from "./UserInfo/UserInfo";

import { TeamName } from "@/types/OnboardingModal/ChooseTeam/ChooseTeam";

import toast from "react-hot-toast";

const OnBoardingModal: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamName | null>(null);
  const [username, setUsername] = useState("");
  const [headline, setHeadline] = useState("");
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedTeam || !username.trim() || !croppedAvatar) {
      toast.error(
        `Please complete all required fields: \n Team | Name | Avatar`,
        {
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        }
      );
      return;
    }

    try {
      const blob = await (await fetch(croppedAvatar)).blob();
      const filename = "avatar.png";
      const contentType = blob.type;

      const presignRes = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/upload/avatar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename,
            type: contentType,
          }),
        }
      );

      const { uploadUrl, publicUrl } = await presignRes.json();

      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: blob,
      });

      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/auth/users/onboarding`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            team: selectedTeam,
            name: username,
            bio: headline,
            avatarUrl: publicUrl,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(`${data.message}`, {
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        });
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 700);
      } else {
        toast.error(data?.error || "Failed to create your profile.", {
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to create your profile. Please try again.", {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
        },
      });
    }
  };

  return (
    <>
      <WelcomeOnboarding />
      <WorldHistory />
      <ChooseTeam
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      <UserInfo
        username={username}
        setUsername={setUsername}
        headline={headline}
        setHeadline={setHeadline}
        setCroppedAvatar={setCroppedAvatar}
        onSubmit={handleSubmit}
        // loading={loading}
        // error={error}
      />
    </>
  );
};

export default OnBoardingModal;
