import { createContext } from "react";
import { userSession } from "@/entities";

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {
    isAuthenticated: true,
    user: userSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
