const Title = () => {
  return (
    <div className="flex items-center w-[500px] min-h-[65px] justify-center border-b-[--color-text-lightest] border-b-[1px] font-bold text-6xl pb-4 max-sm:text-4xl">
      <div className="flex items-center">
        <img
          className="text-xl text-blue-700"
          src="/assets/logo/r-key.png"
          width={85}
          height={85}
        />
        <span>
          <span className="text-blue-700">R</span>
          eact
        </span>
      </div>
      <span>Tasks</span>
    </div>
  );
};

export default Title;
