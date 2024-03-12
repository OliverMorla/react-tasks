import Button from "@/components/shared/ui/Button";
import { faEllipsis, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";

const DashboardNewTaskToggles = ({
  setShowNewTaskModal,
}: NewTaskTogglesProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        fontAwesomeIconUrl={faGear}
        className="min-w-[35px] min-h-[35px]"
      />
      <Button
        fontAwesomeIconUrl={faEllipsis}
        className="min-w-[35px] min-h-[35px]"
      />
      <Button
        fontAwesomeIconUrl={faPlus}
        title="New Task"
        className="bg-[--color-primary] text-white px-6 py-2 rounded-md flex items-center justify-center"
        onClick={() => setShowNewTaskModal(true)}
      />
    </div>
  );
};

export default DashboardNewTaskToggles;
