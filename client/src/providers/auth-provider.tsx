/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

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
      const res = await axios.get<AuthResponseProps>(`${apiUrl}/auth/session`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (!res.data.ok) {
        throw new Error(res.data.message);
      }

      setUser(res.data.data);
      setIsAuthenticated(true);
      return res.data;
    } catch (err) {
      console.error(err instanceof Error ? `=> ${err.message}` : null);
    }
  };

  const signIn = async (input: SignInInputProps) => {
    try {
      const res = await axios.post<AuthResponseProps>(
        `${apiUrl}/auth/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res)
      setUser(res.data.data);
      setIsAuthenticated(true);

      return res.data;
    } catch (err) {
      console.error(err instanceof Error ? `=> ${err.message}` : null);
    }
  };

  const signUp = async (input: SignUpInputProps) => {
    try {
      const res = await axios.post<AuthResponseProps>(
        `${apiUrl}/auth/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.error(err instanceof Error ? `=> ${err.message}` : null);
    }
  };

  const signOut = async () => {
    try {
      const res = await axios.get<AuthResponseProps>(`${apiUrl}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (!res.data.ok) {
        throw new Error(res.data.message);
      }
      setUser(undefined);
      setIsAuthenticated(false);
      return res.data;
    } catch (err) {
      console.error(err instanceof Error ? `=> ${err.message}` : null);
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
