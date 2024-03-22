import Button from "@/components/shared/ui/Button";
import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useState } from "react";

const Login = () => {
  const { signIn } = useAuth();

  const [loginInput, setLoginInput] = useState<SignInInputProps>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await signIn(loginInput);
    if (!response?.ok) {
      setError(response?.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="flex flex-col gap-4 max-w-[500px] w-full">
      {error && (
        <motion.p
          className="p-2 bg-red-400 font-bold text-white rounded-lg text-center"
          key={error}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          {error}
        </motion.p>
      )}
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        onChange={handleInputChange}
        className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter]"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleInputChange}
        className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter]"
      />
      <Button
        type="button"
        variant="transparent"
        className="p-4"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
