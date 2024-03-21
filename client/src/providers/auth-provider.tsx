import { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextProps | null>(null);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  if (!import.meta.env.VITE_API_URL) {
    console.error("=> Failed to read .env for provider");
  }

  const apiUrl = import.meta.env.VITE_API_URL;

  const checkSession = async () => {};

  const signIn = async (input: BodyInit) => {

    console.log(input)
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        body: input,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      console.log(data)

      if (data.ok) {
        setIsAuthenticated(true);
        setUser(data);
      }
    } catch (err) {
      console.log(err instanceof Error ? `=>${err.message}` : null);
    }
  };
  const signUp = async () => {};
  const signOut = async () => {};

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
