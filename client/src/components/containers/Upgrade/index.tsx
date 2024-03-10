/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { listOfPrices } from "@/entities";
import { pageLoadVariant } from "@/config/framer-variants";
import PriceCard from "@/components/ui/Cards/Price";

const Upgrade = () => {
  return (
    <motion.section
      className="flex items-center justify-center flex-grow gap-4 p-4 flex-col"
      variants={pageLoadVariant}
      initial={"hidden"}
      animate={"visible"}
    >
      <h1 className="text-6xl font-bold text-center text-[var(--color-primary)]">
        Choose the <u> plan </u> that's right for you
      </h1>
      <div className="flex gap-10 justify-center w-full max-lg:flex-col max-lg:items-center max-lg:mt-4">
        {listOfPrices.map((item, index) => (
          <PriceCard
            key={index}
            title={item.title}
            tagline={item.tagline}
            price={item.price}
            features={item.features}
            transitionDelay={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Upgrade;