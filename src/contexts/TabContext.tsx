import React from "react";

export const TAB_ORDER = ["projects", "work", "music", "contact"] as const;

export type TTab = (typeof TAB_ORDER)[number];

export type TDirection = "forward" | "backward";

export interface ITabContext {
  activeTab: TTab;
  setActiveTab: React.Dispatch<React.SetStateAction<TTab>>;
  direction: TDirection;
  setDirection: React.Dispatch<React.SetStateAction<TDirection>>;
}

export const TabContext = React.createContext<ITabContext | null>(null);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  // Get the active tab from the URL
  const url = new URL(window.location.href);
  const tab = url.searchParams.get("tab") as TTab;
  const [activeTab, setActiveTab] = React.useState<TTab>(tab || "projects");
  const [direction, setDirection] = React.useState<TDirection>("forward");

  React.useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    window.history.pushState({}, "", url.toString());
  }, [activeTab]);

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, direction, setDirection }}
    >
      {children}
    </TabContext.Provider>
  );
};
