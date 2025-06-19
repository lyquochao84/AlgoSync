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
  const hideLayout = pathname.startsWith("/onboarding");

  return (
    <div className="page-wrapper">
      {!hideLayout && <Navigation />}

      {!hideLayout ? (
        <div className="content-wrapper">{children}</div>
      ) : (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </>
      )}

      {!hideLayout && <Footer />}
    </div>
  );
}
