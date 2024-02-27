import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Button = ({
  title,
  fontAwesomeIconUrl,
  pathUrl,
  action,
  className,
}: ButtonProps) => {
  return (
    <>
      {pathUrl ? (
        <Link to={pathUrl}>
          <button onClick={action} className={className}>
            {fontAwesomeIconUrl && (
              <FontAwesomeIcon
                icon={fontAwesomeIconUrl}
                width={25}
                height={25}
              />
            )}
            {title && title}
          </button>
        </Link>
      ) : (
        <button onClick={action} className={className}>
          {fontAwesomeIconUrl && (
            <FontAwesomeIcon icon={fontAwesomeIconUrl} width={25} height={25} />
          )}
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
