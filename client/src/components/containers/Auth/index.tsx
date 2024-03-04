import Title from "@/components/shared/ui/Title";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ToggleButton from "@/components/shared/ui/ToggleButton";

const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <section className="flex-grow flex flex-col justify-center items-center gap-4 w-full p-4">
      <Title />
      {isLogin ? (
        <>
          <Login />
          <div className="flex items-center gap-2 opacity-60">
            <input
              type="checkbox"
              name="rememberPassword"
              className="cursor-pointer"
            />
            <label htmlFor="rememberPassword">Remember Credentials</label>
          </div>
        </>
      ) : (
        <Register />
      )}
      <ToggleButton
        onClick={() => setIsLogin(!isLogin)}
        className="p-4 border-[--color-text-lighter]"
      >
        Click here to {isLogin ? "Register" : "Login"}
      </ToggleButton>
    </section>
  );
};

export default Auth;
