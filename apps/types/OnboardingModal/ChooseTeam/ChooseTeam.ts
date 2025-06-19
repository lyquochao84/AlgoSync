export type TeamName =
  | "Weboria"
  | "Neurona"
  | "Mobilis"
  | "Firelock"
  | "Cloudforge"
  | "Numerion"
  | "Visionix"
  | "Coinverge";

export interface ChooseTeamProps {
  selectedTeam: TeamName | null;
  setSelectedTeam: (team: TeamName) => void;
}