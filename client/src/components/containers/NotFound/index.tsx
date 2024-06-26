import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import AnimatedDiv from "@/components/helpers/AnimatedDiv";

const NotFound = () => {
  return (
    <AnimatedDiv className="flex flex-col text-6xl items-center p-4">
      <div className="flex items-center max-md:text-center">
        <h1 className="font-bold">404 Error</h1>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          width={100}
          height={100}
        />
      </div>
      <p className="opacity-80 text-4xl max-md:text-center">
        Page Still Under Construction
      </p>
      <p className="text-sm">
        <Link to="/">Go back to home</Link>
      </p>
    </AnimatedDiv>
  );
};

export default NotFound;
