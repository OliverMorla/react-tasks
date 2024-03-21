const LoadingAnimation = ({ dimensions, ...props }: LoadingAnimationProps) => {
  return (
    <img
      {...props}
      src="/assets/spinners/loading-3.svg"
      alt="loading-animation"
      width={dimensions?.width || 50}
      height={dimensions?.width || 50}
    />
  );
};

export default LoadingAnimation;
