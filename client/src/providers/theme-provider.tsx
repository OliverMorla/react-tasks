/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext<any>({
  currentTheme: "",
  setTheme: () => {},
});

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return console.log("=> Failed to read ThemeContext");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const contextValue = useMemo(
    () => ({
      currentTheme: theme,
      setTheme,
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
