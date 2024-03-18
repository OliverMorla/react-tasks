interface AuthContextProps {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
    role: "User" | "Admin";
  };
}

interface ThemeContextProps {
  currentTheme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

interface TaskContextProps {}
