const TaskTagCard = ({ title, textColor, backgroundColor }: TaskTagsProps) => {
  return (
    <div
      className={`p-1 rounded-md flex items-center justify-center ${textColor} ${backgroundColor}`}
    >
      {title}
    </div>
  );
};

export default TaskTagCard;
