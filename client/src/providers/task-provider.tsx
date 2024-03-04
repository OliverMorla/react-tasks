import { Provider } from "react-redux";
import { store } from "@/redux/store";

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default TaskProvider;
