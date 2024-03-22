import { motion } from "framer-motion";
import Button from "@/components/shared/ui/Button";
import useAuth from "@/hooks/useAuth";

const SidebarUserOverlay = () => {
  const { signOut } = useAuth()
  return (
    <motion.div
      className="absolute bg-[var(--color-text-darker)] text-[var(--color-text-lightest)] left-0 bottom-0 rounded-lg min-w-[95px]"
      initial={{
        opacity: 0,
        x: 40,
        translateX: "70%",
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 40,
      }}
    >
      <ul className="flex flex-col items-center">
        <li className="p-2">
          <Button variant="clear" onClick={() => {}}>
            Dashboard
          </Button>
        </li>
        <li className="p-2">
          <Button variant="clear" type="button" onClick={() => signOut()}>
            Log Out
          </Button>
        </li>
      </ul>
    </motion.div>
  );
};

export default SidebarUserOverlay;
