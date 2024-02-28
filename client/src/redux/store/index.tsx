import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../slices/task-slice";

export const store = configureStore({
  reducer: {
    taskReducer: taskSlice,
  },
});
