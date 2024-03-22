/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!import.meta.env.VITE_API_URL) {
    console.error("=> Failed to read .env for AuthProvider");
  }

  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  const checkSession = async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/session`, {
        credentials: "include",
      });

      const response = await res.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setUser(response.data);
      } else {
        setUser(undefined);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log(err instanceof Error ? `=> ${err.message}` : null);
    }
  };

  const signIn = async (
    input: BodyInit
  ): Promise<AuthResponseProps | undefined> => {
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const response = await res.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setUser(response.data);
      }

      return response;
    } catch (err) {
      console.log(err instanceof Error ? `=> ${err.message}` : null);
    }
  };
  const signUp = async (
    input: BodyInit
  ): Promise<AuthResponseProps | undefined> => {};
  const signOut = async () => {
    try {
      const res = await fetch(`${apiUrl}/auth/logout`, {
        credentials: "include",
      });

      const response = await res.json();

      if (response.ok) {
        setUser(undefined);
        setIsAuthenticated(false);
        return response;
      }
    } catch (err) {
      console.log(err instanceof Error ? `=> ${err.message}` : null);
    }
  };

  useEffect(() => {
    checkSession();
    console.log("=> Checking if user session exist...");
    console.log({ isAuthenticated, user });
  }, [location.pathname]);

  const value = {
    isAuthenticated,
    user: user,
    signIn,
    signUp,
    signOut,
    checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
