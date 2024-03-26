import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/ui/Button";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const { signIn } = useAuth();

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState<SignInInputProps>({
    email: "",
    password: "",
    rememberMe,
  });

  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loginInput.email === "" || loginInput.password === "") {
      setError("All fields are required");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberMe", String(rememberMe));
      localStorage.setItem("email", loginInput.email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
    }

    const response = await signIn(loginInput);

    if (!response?.ok) {
      setError(response?.message);
      return;
    }

    setLoginInput({
      email: "",
      password: "",
    });

    setError(undefined);

    return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = () => {
    setLoginInput((prevState) => ({
      ...prevState,
      rememberMe: !rememberMe,
    }));

    setRememberMe(!rememberMe);
  };

  console.log({
    input: loginInput,
    error,
    rememberMe,
  });

  return (
    <form className="flex flex-col w-full gap-4">
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
        className="w-full py-4 px-2 border-b-[1px] border-b-[--color-text-lighter]"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleInputChange}
        className="w-full py-4 px-2 border-b-[1px] border-b-[--color-text-lighter]"
      />
      <Button
        type="button"
        variant="transparent"
        className="p-4"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <div className="flex items-center justify-center gap-2 opacity-60">
        <input
          type="checkbox"
          name="rememberPassword"
          onChange={handleCheckboxChange}
          checked={rememberMe}
          className="cursor-pointer"
        />
        <label htmlFor="rememberPassword">Remember Credentials</label>
      </div>
    </form>
  );
};

export default Login;
