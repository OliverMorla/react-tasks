const apiUrl = import.meta.env.VITE_MOCK_API_URL;

if (!apiUrl) {
  throw new Error("VITE_MOCK_API_URL is not defined");
}

const getProjectsFromUser = async (userId: number) => {
  try {
    const res = await fetch(`${apiUrl}/projects?userId=${userId}`);
    return res.json();
  } catch (err) {
    console.error(err instanceof Error ? `=>${err.message}` : "Internal error");
  }
};

const getAllPublicProjects = async () => {};

const handleCreateProject = async () => {};

const handleDeleteProject = async () => {};

const handleUpdateProject = async () => {};

export {
  getProjectsFromUser,
  handleCreateProject,
  getAllPublicProjects,
  handleDeleteProject,
  handleUpdateProject,
};
