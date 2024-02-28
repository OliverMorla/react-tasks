import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils/cn";

const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  fontAwesomeIconUrl,
  iconSettings,
  ...buttonProps
}) => {
  return (
    <>
      <button
        {...buttonProps}
        className={cn(
          `border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out hover:border-[--color-primary] hover:scale-105`,
          buttonProps.className
        )}
      >
        <FontAwesomeIcon
          icon={fontAwesomeIconUrl}
          width={iconSettings?.width}
          height={iconSettings?.height}
        />
        {children && children}
      </button>
    </>
  );
};

export default ToggleButton;
