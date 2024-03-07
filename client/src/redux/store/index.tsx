import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "@/redux/slices/task-slice"
import projectSlice from "@/redux/slices/project-slice"

export const store = configureStore({
  reducer: {
    taskReducer: taskSlice,
    projectReducer: projectSlice,
  },
});
