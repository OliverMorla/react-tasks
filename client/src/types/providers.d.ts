interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserProps | undefined;
  signIn: (input: BodyInit | SignInInputProps) => Promise<void>;
  signUp: (input: BodyInit) => Promise<void>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

interface ThemeContextProps {
  currentTheme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

interface TaskContextProps {}
