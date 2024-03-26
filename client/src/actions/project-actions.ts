const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is not defined");
}

const getProjectsFromUser = async (userId: string) => {
  try {
    const res = await fetch(`${apiUrl}/projects?userId=${userId}&include=all`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? `=> ${err.message}` : "=> Internal error");
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
