import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SidebarUserOverlay from "@/components/ui/Overlays/SidebarUser";
import Button from "@/components/shared/ui/Button";
import useAuth from "@/hooks/useAuth";

const SidebarUserBar = () => {
  const { isAuthenticated, user } = useAuth();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  if (!isAuthenticated) return null;
  return (
    <div className="flex items-center justify-center gap-3 border-t-[--color-text-lightest] border-t-[1px] p-4">
      <img
        src="/assets/images/users/default.png"
        width={35}
        height={35}
        className="opacity-60"
        alt="user-photo"
      />
      <div className="flex flex-col text-xs max-sm:hidden">
        <h1 className="font-bold">{user.name}</h1>
        <p className="opacity-60">
          {user.email.length > 14
            ? user.email.slice(0, 14) + "..."
            : "user.email"}
        </p>
      </div>
      <div className="relative">
        <Button
          presetIcon="menu"
          variant="transparent"
          className={`min-w-[35px] min-h-[35px] ${
            isUserMenuOpen
              ? "bg-[var(--color-primary)] text-[var(--color-text-lightest)]"
              : "bg-transparent"
          }`}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        />
        <AnimatePresence>
          {isUserMenuOpen && <SidebarUserOverlay />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidebarUserBar;
