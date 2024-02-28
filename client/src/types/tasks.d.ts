/* eslint-disable @typescript-eslint/no-explicit-any */
interface TaskTagsProps {
  title: string;
  backgroundColor: string;
  textColor: string;
}

interface NewTaskModalProps {
  showNewTaskModal: boolean;
  setShowNewTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewTaskTogglesProps extends NewTaskModalProps {}
