import { useState } from "react";
import Button from "@/components/shared/ui/Button";

const DashboardNewTaskToggles = ({
  setShowNewTaskModal,
}: NewTaskTogglesProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  console.log({
    showMenu,
    setShowMenu,
  });

  return (
    <div className="flex items-center gap-2">
      <Button
        presetIcon="settings"
        variant="transparent"
        className="min-w-[35px] min-h-[35px]"
        onClick={() => console.log("clicked")}
      />
      <Button
        presetIcon="menu"
        variant="transparent"
        className="min-w-[35px] min-h-[35px]"
        onClick={() => console.log("clicked")}
      />
      <Button
        presetIcon="plus"
        title="New Task"
        className="bg-[--color-primary] text-white px-6 py-2 rounded-md flex items-center justify-center"
        onClick={() => setShowNewTaskModal(true)}
      >
        New Task
      </Button>
    </div>
  );
};

export default DashboardNewTaskToggles;
