// src/context/ToggleContext.tsx
import React, { createContext, useContext } from "react";
import type { ApiResponse } from "@/hooks/useApi";

type Toggle = {
  id: number;
  nama: string;
  isOn: boolean;
};

type ToggleContextType = {
  toggleAcara?: Toggle[];
  status: "idle" | "error" | "loading" | "success";
};

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export const ToggleProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ToggleContextType;
}) => {
  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

export const useToggle = () => {
  const ctx = useContext(ToggleContext);
  if (!ctx) throw new Error("useToggle must be used within a ToggleProvider");
  return ctx;
};
