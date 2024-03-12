import Button from "@/components/shared/ui/Button";

const Login = () => {
  const handleSubmit = () => {};
  const handleInputChange = () => {};

  console.log({
    handleSubmit,
    handleInputChange,
  });

  return (
    <form className="flex flex-col gap-4 max-w-[500px] w-full">
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter]"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className="flex-grow py-4 px-2 border-b-[1px] border-b-[--color-text-lighter]"
      />
      <Button
        type="submit"
        variant="transparent"
        className="p-4"
        onClick={() => {}}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
