import Button from "@/components/shared/ui/Button";
import useAuth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useState } from "react";

const Register = () => {
  const { signUp } = useAuth();

  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const [registerInput, setRegisterInput] = useState<SignUpInputProps>({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));

    if (registerInput.firstName || registerInput.lastName) {
      setRegisterInput((prevInput) => ({
        ...prevInput,
        name: prevInput?.firstName + " " + prevInput?.lastName,
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      registerInput.email === "" ||
      registerInput.name === "" ||
      registerInput.password === "" ||
      registerInput.passwordConfirm === ""
    ) {
      setError("All fields are required");

      return;
    }

    if (registerInput.password === registerInput.passwordConfirm) {
      const response = await signUp(registerInput);
      if (!response?.ok) {
        setError(response?.message);
        return;
      }

      setError(undefined);

      setRegisterInput({
        firstName: "",
        lastName: "",
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });

      setMessage(response.message);

      return;
    }
  };

  console.log({
    registerInput,
    error,
    message,
  });

  return (
    <section className="flex flex-col justify-center items-center">
      <form className="flex flex-col gap-4 w-full">
        {error && !message && (
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
        {message && !error && (
          <motion.p
            className="p-2 bg-green-400 font-bold text-white rounded-lg text-center"
            key={message}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            {message}
          </motion.p>
        )}
        <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:w-full gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={registerInput.firstName}
            onChange={handleInputChange}
            className="w-full py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
          />
          <input
            type="text"
            name="lastName"
            value={registerInput.lastName}
            placeholder="Enter your last name"
            onChange={handleInputChange}
            className="w-full py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
          />
        </div>
        <input
          type="text"
          name="email"
          value={registerInput.email}
          placeholder="Enter your email"
          onChange={handleInputChange}
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={registerInput.password}
          onChange={handleInputChange}
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm your password"
          value={registerInput.passwordConfirm}
          onChange={handleInputChange}
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <Button
          type="submit"
          variant="transparent"
          className="p-4 w-full"
          onClick={handleSubmit}
        >
          Create the account
        </Button>
      </form>
    </section>
  );
};

export default Register;
