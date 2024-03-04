import ToggleButton from "@/components/shared/ui/ToggleButton";

const Register = () => {
  // const handleSubmit = () => {};
  // const handleInputChange = () => {};
  return (
    <section className="flex flex-col justify-center items-center">
      <form className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
          />
        </div>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter] outline-[var(--color-primary)]"
        />
        <ToggleButton
          type="submit"
          className="p-4 border-[--color-text-lighter]"
          onClick={() => {}}
        >
          Create the account
        </ToggleButton>
      </form>
    </section>
  );
};

export default Register;
