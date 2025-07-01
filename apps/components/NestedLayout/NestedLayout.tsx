"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

import DashboardNav from "../Dashboard/Layout/DashboardNav";
import { DashboardTabProvider } from "@/context/Dashboard/DashboardTabContext";

export default function NestedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isOnboarding = pathname.startsWith("/onboarding");
  const isDashboard = pathname.startsWith("/dashboard");

  // Onboarding Layout
  if (isOnboarding) {
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </>
    );
  }

  // Dashboard Layout
  if (isDashboard) {
    return (
      <DashboardTabProvider>
        <div className="dashboard-wrapper">
          <DashboardNav />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="dashboard-content-wrapper">{children}</div>
        </div>
      </DashboardTabProvider>
    );
  }

  // Default layout 
  return (
    <div className="page-wrapper">
      <Navigation />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="content-wrapper">{children}</div>
      <Footer />
    </div>
  );
}
