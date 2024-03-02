interface PriceCardProps {
  title: string;
  tagline: string;
  price: number;
  features: {
    pros?: string[];
    cons?: string[];
  };
  discountedPrice?: number;
  transitionDelay: number;
}
