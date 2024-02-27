import { faEllipsis, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchTasks from "@/components/ui/Board/SearchTasks";
import AssignedUsers from "@/components/ui/Board/AssignedUser";
import Button from "@/components/ui/Button";

const App = () => {
  return (
    <main className="flex w-full h-full flex-col ">
      <div className="flex gap-2 flex-col border-b-[--color-text-lightest] border-b-[1px] p-8">
        <div className="flex justify-between">
          <div className="flex text-xs gap-4">
            <p className="opacity-60">Projects</p>
            <span>{">"}</span>
            <p className="opacity-60">International</p>
            <span>{">"}</span>
            <p className="font-bold">Product Web</p>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              fontAwesomeIconUrl={faGear}
              className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
            />
            <Button
              fontAwesomeIconUrl={faEllipsis}
              className="border-[--color-text-lightest] border-[1px] p-1 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
            />
            <Button
              fontAwesomeIconUrl={faPlus}
              title="New Task"
              className="bg-[--color-primary] text-white px-6 py-2 rounded-md flex items-center justify-center"
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-4xl">My Tasks</h1>
        </div>
        <AssignedUsers />
      </div>
      <SearchTasks />
      <div className="bg-[--color-text-lightest] h-full w-full"></div>
    </main>
  );
};

export default App;
