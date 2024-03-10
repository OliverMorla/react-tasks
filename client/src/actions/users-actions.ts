const apiUrl = import.meta.env.VITE_MOCK_API_URL;

if (!apiUrl) {
  throw new Error("VITE_MOCK_API_URL is not defined");
}

const getAvailableUsers = async () => {
    return fetch(`${apiUrl}/users`).then((res) => res.json());
};

export { getAvailableUsers };
