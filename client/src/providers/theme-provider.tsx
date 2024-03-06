import { createContext, useMemo, useState } from "react";

export const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: "light",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

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

export default ThemeProvider;
