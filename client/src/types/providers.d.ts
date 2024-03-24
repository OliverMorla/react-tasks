interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserProps | undefined;
  signIn: (input: SignInInputProps) => Promise<AuthResponseProps | undefined>;
  signUp: (input: SignUpInputProps) => Promise<AuthResponseProps | undefined>;
  signOut: () => Promise<AuthResponseProps | undefined>;
  checkSession?: () => Promise<AuthResponseProps | undefined>;
}

interface ThemeContextProps {
  currentTheme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

interface TaskContextProps {}

interface AuthResponseProps {
  data?: UserProps;
  ok: boolean;
  message: string;
  errors?: [];
}
