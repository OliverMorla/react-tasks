import { listOfPrices } from "@/entities";
import PriceCard from "@/components/ui/Cards/Price";
import AnimatedSection from "@/components/helpers/AnimatedSection";

const Upgrade = () => {
  return (
    <AnimatedSection className="p-4 flex flex-col items-center justify-center flex-grow gap-10">
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
    </AnimatedSection>
  );
};

export default Upgrade;
