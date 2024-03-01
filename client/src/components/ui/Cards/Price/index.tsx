const PriceCard = ({
  title,
  price,
  oldPrice,
  description,
}: {
  title: string;
  price: number;
  oldPrice: number;
  description: string;
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{price}</p>
      <p>{oldPrice}</p>
      <p>{description}</p>
    </div>
  );
};

export default PriceCard;
