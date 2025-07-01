import webLogo from "@/public/Onboarding_Logo/web.png";
import aiLogo from "@/public/Onboarding_Logo/ai.png";
import mobileLogo from "@/public/Onboarding_Logo/mobile.png";
import cyberLogo from "@/public/Onboarding_Logo/cyber.png";
import infraLogo from "@/public/Onboarding_Logo/cloud.png";
import dataLogo from "@/public/Onboarding_Logo/data.png";
import gameLogo from "@/public/Onboarding_Logo/game.png";
import quantLogo from "@/public/Onboarding_Logo/fintech.png";
import { TeamName } from "@/types/OnboardingModal/ChooseTeam/ChooseTeam";

export const teamData: Record<TeamName, {
  name: TeamName;
  logo: any;
  color: string;
  types: string;
  personality: string;
  user_types: string;
}> = {
  Weboria: {
    name: "Weboria",
    logo: webLogo,
    color: "#d36a02",
    types: "Front-End, Back-End, Full-Stack Developers, etc.",
    personality: "Creative yet logical; Adaptable and perfectionist; Values both aesthetics and structure.",
    user_types: "You love building tangible products that both function well and look great. You enjoy solving problems from multiple perspectives—UX, logic, and architecture."
  },
  Neurona: {
    name: "Neurona",
    logo: aiLogo,
    color: "#7b6fae",
    types: " AI Engineers, Machine Learning Engineers, NLP Specialists, etc.",
    personality: "Deep thinker, curious, academically inclined; Skilled at pattern recognition; Passionate about teaching machines and building intelligence.",
    user_types: "You're fascinated by algorithms, modeling, and AI. You're the type to constantly ask “Why?” and “How can machines understand this?”"
  },
  Mobilis: {
    name: "Mobilis",
    logo: mobileLogo,
    color: "#b26a00",
    types: "iOS Developers, Android Engineers, Mobile App Developers, etc.",
    personality: "Agile, dynamic, optimization-driven; Cares deeply about user experience; A modern thinker who enjoys innovating in compact spaces.",
    user_types: "You love building mobile apps for real-world use—anytime, anywhere. You're flexible and always seeking to boost performance and speed."
  },
  Firelock: {
    name: "Firelock",
    logo: cyberLogo,
    color: "#0e7091",
    types: "Cybersecurity Engineers, Ethical Hackers, Security Analysts, etc.",
    personality: "Vigilant, discreet, and anticipates risks; Enjoys testing systems and pushing boundaries; Protective by nature.",
    user_types: "You believe safety comes first. You're constantly looking for vulnerabilities and strengthening systems and data defenses."
  },
  Cloudforge: {
    name: "Cloudforge",
    logo: infraLogo,
    color: "#434b41",
    types: "DevOps Engineers, Cloud Architects, Infrastructure Developers, etc.",
    personality: "Calm, reliable, and systematic; Prefers working behind the scenes with high responsibility; Process-driven and sustainability-focused.",
    user_types: "You're the silent force that keeps systems alive. You enjoy automation, CI/CD, infrastructure, and long-term reliability"
  },
  Numerion: {
    name: "Numerion",
    logo: dataLogo,
    color: "#afae94",
    types: "Data Scientists, Data Engineers, Data Analysts, etc.",
    personality: "Smart, stats-loving, and always asking “why”; Makes decisions based on evidence; Loves numbers, visualizations, and data-driven persuasion.",
    user_types: "You trust that “data doesn't lie.” You're always seeking insights, building models, and telling stories through data."
  },
  Visionix: {
    name: "Visionix",
    logo: gameLogo,
    color: "#c5352e",
    types: "Game Developers, Graphics Programmers, Computer Vision Engineers, etc.",
    personality: "Dreamy, creative, and a tech artist; Loves building immersive and unique experiences; Always thinking beyond the real world.",
    user_types: "You love games, virtual worlds, effects, and creative UX. You want users to not just use your product, but feel it"
  },
  Coinverge: {
    name: "Coinverge",
    logo: quantLogo,
    color: "#0d8347",
    types: "Quant Developers, Blockchain Engineers, Fintech Programmers, etc.",
    personality: "Sharp, decisive, numbers-driven, and emotionless when it comes to logic; Highly analytical and trend-aware.",
    user_types: "You think fast, love investing, and maximizing profit. You thrive on automation, market data, and real-time decision systems."
  },
};

