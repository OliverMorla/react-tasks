import { ThemeContext } from "@/providers/theme-provider";
import { useContext } from "react";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.error("=> Failed to read ThemeContext");
  }
  return context;
};

export default useTheme;
