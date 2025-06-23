"use client";

import { usePathname } from "next/navigation";

import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayoutOnboarding = pathname.startsWith("/onboarding");

  return (
    <div className="page-wrapper">
      {!hideLayoutOnboarding && <Navigation />}

      {!hideLayoutOnboarding ? (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="content-wrapper">{children}</div>
        </>
      ) : (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </>
      )}

      {!hideLayoutOnboarding && <Footer />}
    </div>
  );
}
