const apiUrl = import.meta.env.VITE_MOCK_API_URL;

if (!apiUrl) {
  throw new Error("VITE_MOCK_API_URL is not defined");
}
const getProjectsFromUser = (userId: number) => {
  return fetch(`${apiUrl}/projects?userId=${userId}`).then((res) => res.json());
};

// const getProjectFromUser = (projectId: number) => {
//     return fetch(`${apiUrl}`)
// }

export { getProjectsFromUser };
