"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TitleContextType = {
  title: string;
  subtitle: string;
  setTitle: (value: string) => void;
  setSubtitle: (value: string) => void;
};

const TitleContext = createContext<TitleContextType | null>(null);

export const TitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("Dashboard Overview");
  const [subtitle, setSubtitle] = useState(
    "You can see all of your apps statistics from here"
  );

  return (
    <TitleContext.Provider value={{ title, subtitle, setTitle, setSubtitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("useTitle must be used within a TitleProvider");
  }
  return context;
};
