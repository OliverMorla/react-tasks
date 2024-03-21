const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is not defined");
}

const getUsers = async (pageNumber: number) => {
  try {
    const res = await fetch(`${apiUrl}/users`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? `=>${err.message}` : "Internal error");
  }
};

export { getUsers };
