"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface AuthenticationContextType {
  isAuthenticated: boolean;
  handleLogout: () => void;
  handleLogin: () => void;
}

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthentication] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setAuthentication(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setAuthentication(false);
  };

  const value = {
    isAuthenticated,
    handleLogout,
    handleLogin,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error("useContext must be used inside the provider");
  }
  return context;
}
