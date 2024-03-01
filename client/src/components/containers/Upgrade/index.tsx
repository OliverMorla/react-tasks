/* eslint-disable @typescript-eslint/no-explicit-any */
import PriceCard from "@/components/ui/Cards/Price";
import { pageLoadVariant } from "@/config/framer-variants";
import { listOfPrices } from "@/entities";
import { motion } from "framer-motion";
const Upgrade = () => {
  return (
    <motion.section
      className="flex items-center justify-evenly flex-grow flex-wrap gap-4"
      variants={pageLoadVariant as any}
      initial={"hidden"}
      animate={"visible"}
    >
      {listOfPrices.map((item, index) => (
        <PriceCard
          key={index}
          title={item.title}
          price={item.price}
          subText={item.subText}
          description={item.description}
        />
      ))}
    </motion.section>
  );
};

export default Upgrade;
