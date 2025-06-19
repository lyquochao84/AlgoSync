"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import WelcomeOnboarding from "./Welcome/WelcomeOnboarding";
import WorldHistory from "./WorldHistory/WorldHistory";
import ChooseTeam from "./Team/ChooseTeam";
import UserInfo from "./UserInfo/UserInfo";

import { TeamName } from "@/types/OnboardingModal/ChooseTeam/ChooseTeam";
import toast from "react-hot-toast";

const OnBoardingModal: React.FC = () => {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<TeamName | null>(null);
  const [username, setUsername] = useState("");
  const [headline, setHeadline] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedTeam || !username.trim() || !avatarUrl) {
      toast.error(
        `Please complete all required fields: \n Team | Name | Avatar`
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response: Response = await fetch("http://localhost:4000/auth/users/onboarding", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // user token after login
        },
        body: JSON.stringify({
          team: selectedTeam,
          name: username,
          headline,
          avatarUrl,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        router.push("/dashboard");
        toast.success(`${data.message}`);
      }
      else {
        toast.error(`${data.message}`);
      }
    } 
    catch (err) {
      setError("Failed to save your profile. Please try again.");
    } 
    finally {
      setLoading(false);
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
        avatarUrl={avatarUrl}
        setAvatarUrl={setAvatarUrl}
        onSubmit={handleSubmit}
        // loading={loading}
        // error={error}
      />
    </>
  );
};

export default OnBoardingModal;
