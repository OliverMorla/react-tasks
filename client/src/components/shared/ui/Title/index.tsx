const Title = () => {
  return (
    <div className="flex items-center justify-center flex-wrap max-w-[500px] min-h-[65px] w-full border-b-[--color-text-lightest] border-b-[1px] font-bold p-2 text-6xl max-sm:text-4xl">
      <div className="flex items-center flex-wrap">
        <img
          className="max-sm:w-14 max-sm:h-14 max-sm:mx-auto"
          src="/assets/logo/r-key.png"
          width={85}
          height={85}
          alt="r-key-logo"
        />
        <span className="max-sm:text-center">
          <span className="text-blue-700">R</span>
          eact
        </span>
      </div>
      <span>Tasks</span>
    </div>
  );
};

export default Title;
