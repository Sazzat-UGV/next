"use client"
import { childrenProps } from "@/types";
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

type LoginContextType = {
  login: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: childrenProps) => {
  const [login, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ login, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useTitle must be used within a LoginProvider");
  }
  return context;
};
