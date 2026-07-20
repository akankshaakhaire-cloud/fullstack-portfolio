import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { AuthUser } from "../types/auth";
import {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
} from "../utils/token";

type AuthContextType = {
  token: string | null;
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setAuthToken] = useState<string | null>(getToken());

  const [user, setAuthUser] = useState<AuthUser | null>(getUser());

  const login = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);

    setAuthToken(newToken);
    setAuthUser(newUser);
  };

  const logout = () => {
    removeToken();
    removeUser();

    setAuthToken(null);
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
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