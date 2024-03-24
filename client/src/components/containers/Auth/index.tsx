import { useState } from "react";
import Title from "@/components/shared/ui/Title";
import Button from "@/components/shared/ui/Button";
import Login from "@/components/ui/Auth/Login";
import Register from "@/components/ui/Auth/Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleInputChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <section className="flex flex-col justify-center max-w-[500px] gap-4 w-full mx-auto p-4">
      <Title />
      {isLogin ? (
        <>
          <Login />
          <div className="flex items-center justify-center gap-2 opacity-60">
            <input
              type="checkbox"
              name="rememberPassword"
              onChange={handleInputChange}
              checked={isChecked}
              className="cursor-pointer"
            />
            <label htmlFor="rememberPassword">Remember Credentials</label>
          </div>
        </>
      ) : (
        <Register />
      )}
      <Button
        onClick={() => setIsLogin(!isLogin)}
        className="p-4"
        variant="transparent"
      >
        Click here to {isLogin ? "Register" : "Login"}
      </Button>
    </section>
  );
};

export default Auth;
