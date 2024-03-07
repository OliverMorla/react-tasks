import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    // addProject: (state, action: PayloadAction<Thread>) => {
    //   const {
    //     text,
    //     image,
    //     user: { _id: userId, username, image: userImage },
    //   } = action.payload;
    //   state.projects.unshift({
    //     _id: "newProject",
    //     image: image,
    //     text: text,
    //     likes: [],
    //     replies: [],
    //     user: {
    //       _id: userId,
    //       image: userImage,
    //       username: username,
    //     },
    //     createdAt: new Date().toISOString(),
    //     childrenThreads: [],
    //     isReply: false,
    //     parentId: "newProject",
    //   });
    // },
    // deleteProject: (state, action: PayloadAction<{ projectId: string }>) => {
    //   state.projects = state.projects.filter(
    //     (project) => project._id !== action.payload.projectId
    //   );
    // },
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
