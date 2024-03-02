import { motion } from "framer-motion";
import {
  faCheckCircle,
  faXmarkCircle,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriceCard = ({
  title,
  tagline,
  price,
  // discountedPrice,
  features,
  transitionDelay,
}: PriceCardProps) => {
  return (
    <motion.div
      className="max-w-[425px] max-h-[600px] h-full w-full flex flex-col gap-4 p-4 rounded-lg bg-white shadow-lg text-[var(--color-text-darker)]"
      style={{
        boxShadow: "0 0 5px 0 rgba(0,0,0,0.1)",
      }}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: transitionDelay * 0.6,
          duration: 0.5,
        },
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      <div className="flex flex-col">
        <h1 className="font-bold text-6xl tracking-tighter">{title}</h1>
        <p className="opacity-60 text-sm">{tagline}</p>
      </div>
      <div className="font-bold flex items-center">
        <FontAwesomeIcon icon={faDollarSign} width={25} height={25} />
        <span className="text-6xl">{price}</span>
        <span className="text-sm opacity-60 self-end">/ month</span>
      </div>
      <button
        aria-label="Get Started"
        className="bg-[var(--color-text-darker)] text-white py-4 hover:bg-[var(--color-text-dark)] transition-all duration-300 ease-in-out rounded-lg w-full"
      >
        Get Started
      </button>
      <div className="flex flex-col">
        {features?.pros?.map((item, index) => (
          <div
            key={index}
            className="text-green-500 py-4 border-t-[var(--color-text-lightest)] border-t-[1px]"
          >
            <FontAwesomeIcon icon={faCheckCircle} width={25} height={25} />
            {item}
          </div>
        ))}
        {features?.cons?.map((item, index) => (
          <div
            key={index}
            className="text-red-500 py-4 border-t-[var(--color-text-lightest)] border-t-[1px]"
          >
            <FontAwesomeIcon icon={faXmarkCircle} width={25} height={25} />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PriceCard;
