import Button from "@/components/shared/ui/Button";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { signIn, isAuthenticated } = useAuth();

  const [loginInput, setLoginInput] = useState<SignInInputProps>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };


  console.log({
    handleSubmit,
    handleInputChange,
    isAuthenticated,
    loginInput,
  });

  return (
    <form className="flex flex-col gap-4 max-w-[500px] w-full">
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
        onClick={() => signIn(JSON.stringify(loginInput))}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
