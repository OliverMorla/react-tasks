interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserProps | undefined;
  signIn: (input: BodyInit | SignInInputProps) => Promise<AuthResponseProps | undefined>;
  signUp: (input: BodyInit | SignUpInputProps) => Promise<AuthResponseProps | undefined>;
  signOut: () => Promise<void>;
  checkSession?: () => Promise<void>;
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
}