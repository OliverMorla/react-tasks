import Button from "@/components/shared/ui/Button";
import ToggleButton from "@/components/shared/ui/ToggleButton";
import { faEllipsis, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";

const BoardNewTaskToggles = ({ setShowNewTaskModal }: NewTaskTogglesProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        fontAwesomeIconUrl={faGear}
        className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
      />
      <ToggleButton
        fontAwesomeIconUrl={faEllipsis}
        iconSettings={{
          height: 25,
          width: 25,
        }}
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

export default BoardNewTaskToggles;
