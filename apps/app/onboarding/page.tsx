import WelcomeOnboarding from "@/components/OnboardingModal/Welcome/WelcomeOnboarding";
import WorldHistory from "@/components/OnboardingModal/WorldHistory/WorldHistory";
import ChooseTeam from "@/components/OnboardingModal/Team/ChooseTeam";
import ChooseName from "@/components/OnboardingModal/Name/ChooseName";

export default function Onboarding() {
  return (
    <>
      <WelcomeOnboarding />
      <WorldHistory />
      <ChooseTeam />
      <ChooseName />
    </>
  );
}
