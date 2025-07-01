"use client";

import { createContext, useContext, useState } from "react";

type Tab = "posts" | "blogs";

type DashboardTabContextType = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  refreshKey: number;
};

const DashboardTabContext = createContext<DashboardTabContextType | undefined>(
  undefined
);

export function DashboardTabProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTabState] = useState<Tab>("posts");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const setActiveTab = (tab: Tab) => {
    setActiveTabState(tab);
    setRefreshKey((prev) => prev + 1); // Each switch triggers refresh
  };
  
  return (
    <DashboardTabContext.Provider
      value={{ activeTab, setActiveTab, refreshKey }}
    >
      {children}
    </DashboardTabContext.Provider>
  );
}

export function useDashboardTab() {
  const context = useContext(DashboardTabContext);
  if (!context) {
    throw new Error(
      "useDashboardTab must be used within a DashboardTabProvider"
    );
  }

  return context;
}
