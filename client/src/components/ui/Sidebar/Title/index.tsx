const SidebarTitle = () => {
  return (
    <div className="flex items-center w-full min-h-[65px] justify-center border-b-[--color-text-lightest] border-b-[1px] font-bold">
      <div className="flex items-center">
        <img
          className="text-xl text-blue-700"
          src="/assets/logo/r-key.png"
          width={25}
          height={25}
        />
        <span>React</span>
      </div>
      <span>Tasks</span>
    </div>
  );
};

export default SidebarTitle;
