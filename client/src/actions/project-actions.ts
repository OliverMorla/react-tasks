const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is not defined");
}

interface ProjectInputProps {
  title: string;
  description: string;
  privacy: "Public" | "Private";
  connections: UserProps[];
  createdBy: string;
  priority: "High" | "Medium" | "Low" | "NotSet";
  dueDate: Date;
  createdAt: Date;
}

interface ProjectUpdateInputProps {
  title?: string;
  description?: string;
  privacy?: "Public" | "Private";
  connections?: UserProps[];
  createdBy?: string;
  priority?: "High" | "Medium" | "Low" | "NotSet";
  dueDate?: Date;
  createdAt?: Date;
}

const getProjectsFromUser = async (userId: string) => {
  try {
    const res = await fetch(`${apiUrl}/projects?userId=${userId}&include=all`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(
      err instanceof Error ? `=> ${err.message}` : "=> Internal error"
    );
  }
};

const getSharedProjectsFromUser = async (userId: string) => {
  try {
    const res = await fetch(`${apiUrl}/projects?shared=${userId}`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(
      err instanceof Error ? `=> ${err.message}` : "=> Internal error"
    );
  }
};

const getAllPublicProjects = async (pageNumber: number) => {
  try {
    const res = await fetch(
      `${apiUrl}/projects?privacy=Public&page=${pageNumber}`
    );
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(
      err instanceof Error ? `=> ${err.message}` : "=> Internal error"
    );
    return err;
  }
};

const handleCreateProject = async (input: ProjectInputProps) => {
  try {
    const res = await fetch(`${apiUrl}/project`, {
      method: "POST",
      body: JSON.stringify(input),
    });

    const response = await res.json();

    return response;
  } catch (err) {
    console.error(
      err instanceof Error ? `=> ${err.message}` : "=> Internal error"
    );
    return err;
  }
};

const handleDeleteProject = async (projectId: string) => {
  try {
    const res = await fetch(`${apiUrl}/project/${projectId}`, {
      method: "DELETE",
    });

    const response = await res.json();

    return response;
  } catch (err) {
    console.error(
      err instanceof Error ? `=> ${err.message}` : "=> Internal error"
    );

    return err;
  }
};

const handleUpdateProject = async (input: ProjectUpdateInputProps) => {
  try {
    const res = await fetch(`${apiUrl}/project/:id`, {
      method: "PUT",
      body: JSON.stringify(input),
    });

    const response = await res.json();

    return response;
  } catch (err) {
    console.error(
      err instanceof Error ? `=> ${err.message}` : "=> Internal error"
    );

    return err;
  }
};

export {
  getProjectsFromUser,
  getSharedProjectsFromUser,
  handleCreateProject,
  getAllPublicProjects,
  handleDeleteProject,
  handleUpdateProject,
};
