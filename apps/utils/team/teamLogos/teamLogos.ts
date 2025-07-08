import webLogo from "@/public/Dashboard_Logo/web.png";
import aiLogo from "@/public/Dashboard_Logo/ai.png";
import mobileLogo from "@/public/Dashboard_Logo/mobile.png";
import cyberLogo from "@/public/Dashboard_Logo/cyber.png";
import infraLogo from "@/public/Dashboard_Logo/cloud.png";
import dataLogo from "@/public/Dashboard_Logo/data.png";
import gameLogo from "@/public/Dashboard_Logo/game.png";
import fintechLogo from "@/public/Dashboard_Logo/fintech.png";

import { StaticImageData } from "next/image";

export const teamLogos: Record<string, StaticImageData> = {
  webtoria: webLogo,
  neurona: aiLogo,
  mobilis: mobileLogo,
  firelock: cyberLogo,
  cloudforge: infraLogo,
  numerion: dataLogo,
  visionix: gameLogo,
  coinverge: fintechLogo,
};