import Button from "@/components/shared/ui/Button";
import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useState } from "react";

const Register = () => {
  const { signUp } = useAuth();

  const [error, setError] = useState<string | undefined>(undefined);
  const [registerInput, setRegisterInput] = useState<SignUpInputProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await signUp(registerInput);
    if (!response?.ok) {
      setError(response?.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <form className="flex flex-col gap-4">
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
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            onChange={handleInputChange}
            className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            onChange={handleInputChange}
            className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
          />
        </div>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={handleInputChange}
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleInputChange}
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm your password"
          onChange={handleInputChange}
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <Button
          type="submit"
          variant="transparent"
          className="p-4"
          onClick={handleSubmit}
        >
          Create the account
        </Button>
      </form>
    </section>
  );
};

export default Register;
