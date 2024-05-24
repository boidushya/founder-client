import React from "react";

export const VIEW_MODES = ["grid", "list", "icon"] as const;

export type TViewMode = (typeof VIEW_MODES)[number];

export interface IViewModeContext {
  activeViewMode: TViewMode;
  setActiveViewMode: React.Dispatch<React.SetStateAction<TViewMode>>;
}

export const ViewModeContext = React.createContext<IViewModeContext | null>(
  null
);

export const ViewModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeViewMode, setActiveViewMode] = React.useState<TViewMode>("grid");

  return (
    <ViewModeContext.Provider
      value={{
        activeViewMode,
        setActiveViewMode,
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
};
