const apiUrl = import.meta.env.VITE_MOCK_API_URL;

if (!apiUrl) {
  throw new Error("VITE_MOCK_API_URL is not defined");
}

const getTasksFromProject = async (projectId: number) => {
  try {
    const res = await fetch(`${apiUrl}/projects/${projectId}?_embed=tasks`);
    return res.json();
  } catch (err) {
    console.error(err instanceof Error ? `=>${err.message}` : "Internal error");
  }
};

export { getTasksFromProject };
