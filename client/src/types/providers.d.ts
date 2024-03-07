interface AuthContextProps {
  isAuthenticated: boolean;
}

interface ThemeContextProps {
  currentTheme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

interface TaskContextProps {}
