import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils/cn";
import { presetIcons } from "@/entities";

const Button: React.FC<ButtonProps> = ({
  name,
  pathUrl,
  fontAwesomeIconUrl,
  variant = "clear",
  children,
  presetIcon,
  iconDimensions,
  ...props
}) => {
  const variants = {
    clear: "",
    transparent:
      "border-[--color-text-lightest] border-[1px] p-1 rounded-lg transition-all ease-in-out hover:border-[--color-primary] hover:scale-105",
    color:
      "bg-[--color-primary] text-[var(--color-text-lightest)] p-1 rounded-lg transition-all ease-in-out hover:bg-[--color-primary-dark] hover:scale-105",
  };

  return (
    <>
      {pathUrl ? (
        <Link to={pathUrl} aria-label={name}>
          <button
            {...props}
            className={cn(variants[variant], props.className)}
            aria-label={name || "button"}
          >
            {fontAwesomeIconUrl && (
              <FontAwesomeIcon
                icon={fontAwesomeIconUrl}
                width={iconDimensions?.width || 25}
                height={iconDimensions?.height || 25}
              />
            )}
            {presetIcon && (
              <FontAwesomeIcon
                icon={presetIcons[presetIcon]}
                width={iconDimensions?.width || 25}
                height={iconDimensions?.height || 25}
              />
            )}
            {children && children}
          </button>
        </Link>
      ) : (
        <button
          {...props}
          className={cn(variants[variant], props.className)}
          aria-label={name || "button"}
        >
          {fontAwesomeIconUrl && (
            <FontAwesomeIcon
              icon={fontAwesomeIconUrl}
              width={iconDimensions?.width || 25}
              height={iconDimensions?.height || 25}
            />
          )}
          {presetIcon && (
            <FontAwesomeIcon
              icon={presetIcons[presetIcon]}
              width={iconDimensions?.width || 25}
              height={iconDimensions?.height || 25}
            />
          )}
          {children && children}
        </button>
      )}
    </>
  );
};

export default Button;
