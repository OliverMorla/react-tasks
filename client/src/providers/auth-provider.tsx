/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { useLocation } from "react-router";

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!import.meta.env.VITE_API_URL) {
    console.error("=> Failed to read .env for AuthProvider");
  }

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  // const location = useLocation();

  const checkSession = async () => {
    try {
      const res = await axios.get<AuthResponseProps>(`${apiUrl}/auth/session`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setUser(res.data.data);
      setIsAuthenticated(true);

      return res.data;
    } catch (err) {
      setIsAuthenticated(false);
      setUser(undefined); 
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
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

      setUser(res.data.data);
      setIsAuthenticated(true);

      await checkSession();

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
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
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
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

      setUser(undefined);
      setIsAuthenticated(false);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  };

  useEffect(() => {
    checkSession()
  }, []);

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
