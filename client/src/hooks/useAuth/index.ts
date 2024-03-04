import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("=> Failed to read AuthContext");
  }
  return context;
};

export default useAuth;
