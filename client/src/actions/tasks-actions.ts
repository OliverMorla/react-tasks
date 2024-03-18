const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is not defined");
}

const getTasksFromProject = async (projectId: string) => {
  try {
    const res = await fetch(`${apiUrl}/tasks/query?projectId=${projectId}`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? `=>${err.message}` : "Internal error");
  }
};

const getTasksByID = async (taskId: string) => {
  try {
    const res = await fetch(`${apiUrl}/tasks/query?id=${taskId}`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? `=>${err.message}` : "Internal error");
  }
};

export { getTasksFromProject, getTasksByID };
