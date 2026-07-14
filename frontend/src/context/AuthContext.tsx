import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { getToken, setToken, removeToken } from "../utils/token";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setAuthToken] = useState<string | null>(getToken());

  const login = (newToken: string) => {
    setToken(newToken);
    setAuthToken(newToken);
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};