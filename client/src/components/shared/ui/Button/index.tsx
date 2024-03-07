import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/utils/cn";

const Button: React.FC<ButtonProps> = ({
  name,
  fontAwesomeIconUrl,
  pathUrl,
  variant = "transparent",
  children,
  ...props
}) => {
  const variants = {
    transparent:
      "border-[--color-text-lightest] border-[1px] p-1 rounded-lg transition-all ease-in-out hover:border-[--color-primary] hover:scale-105",
    color:
      "bg-[--color-primary] text-white p-1 rounded-lg transition-all ease-in-out hover:bg-[--color-primary-dark] hover:scale-105",
  };
  return (
    <>
      {pathUrl ? (
        <Link to={pathUrl}>
          <button
            {...props}
            className={cn(variants[variant], props.className)}
            aria-label={name}
          >
            {fontAwesomeIconUrl && (
              <FontAwesomeIcon
                icon={fontAwesomeIconUrl}
                width={25}
                height={25}
              />
            )}
            {children && children}
          </button>
        </Link>
      ) : (
        <button
          {...props}
          className={cn(variants[variant], props.className)}
          aria-label={name}
        >
          {fontAwesomeIconUrl && (
            <FontAwesomeIcon icon={fontAwesomeIconUrl} width={25} height={25} />
          )}
          {children && children}
        </button>
      )}
    </>
  );
};

export default Button;
