const apiUrl = import.meta.env.VITE_MOCK_API_URL;

if (!apiUrl) {
  throw new Error("VITE_MOCK_API_URL is not defined");
}

const getAvailableUsers = async (pageNumber: number) => {
  try {
    const res = await fetch(`${apiUrl}/users?_page=${pageNumber}`);
    return res.json();
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export { getAvailableUsers };
