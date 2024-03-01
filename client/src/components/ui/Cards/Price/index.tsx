import {
  faCheckCircle,
  faDollarSign,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
interface props {
  pros: string[];
  cons: string[];
}

const PriceCard = ({
  title,
  subText,
  price,
  oldPrice,
  description,
}: {
  title: string;
  subText: string;
  price: number;
  oldPrice: number;
  description: props;
}) => {
  return (
    <motion.div
      className="max-w-[425px] max-h-[600px] h-full w-full flex flex-col gap-4 p-4 rounded-lg bg-white shadow-lg text-[var(--color-text-darker)]"
      style={{
        boxShadow: "0 0 5px 0 rgba(0,0,0,0.1)",
      }}
    >
      <div className="flex flex-col">
        <h1 className="font-bold text-6xl tracking-tighter">{title}</h1>
        <p className="opacity-60 text-sm">{subText}</p>
      </div>
      <div className="font-bold flex items-center">
        <FontAwesomeIcon icon={faDollarSign} width={25} height={25} />
        <span className="text-6xl">{price}</span>
      </div>
      <button
        aria-label="Get Started"
        className="bg-[var(--color-text-darker)] text-white py-4"
      >
        Get Started
      </button>
      <div className="flex flex-col">
        {description.pros.map((item, index) => (
          <div
            key={index}
            className="text-green-500 py-4 border-t-[var(--color-text-lightest)] border-t-[1px]"
          >
            <FontAwesomeIcon icon={faCheckCircle} width={25} height={25} />
            {item}
          </div>
        ))}
        {description?.cons?.map((item, index) => (
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
