/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { motion, scroll } from "framer-motion";

import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ProjectUserCard from "@/components/ui/Cards/Project/UserCard";

import Button from "@/components/shared/ui/Button";
import { getUsers } from "@/actions/users-actions";
import LoadingAnimation from "@/components/ui/Loading";

const NewProjectModal = ({
  showNewProjectModal,
  setShowNewProjectModal,
}: NewProjectModalProps) => {
  // this ref is used to get the scroll container element
  const scrollRef = useRef<HTMLDivElement>(null);

  // this state is used to store the page number for the available users
  const [pageNumber, setPageNumber] = useState(1);

  // this state is used to store the users data that are available for the project
  const [users, setUsers] = useState<UserProps[]>([]);

  // this state is used to store the input data for the new project
  const [input, setInput] = useState<NewProjectModalInputProps>({
    title: "",
    type: "public",
    connections: [],
    createdBy: "",
    createdAt: new Date().toLocaleString(),
  });

  // this useAuth hook is used to get the user data and check if the user is authenticated
  const { isAuthenticated, user } = useAuth();

  // this useQuery is used to fetch the available users for the project
  const { isPending, data, error, isLoading } = useQuery<UserProps[]>({
    queryKey: ["users"],
    queryFn: () => getUsers(pageNumber),
    refetchInterval: 1000,
  });

  // this function is used to handle the input changes on the form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // this useEffect is used to add the users to the users array when the users are fetched
  useEffect(() => {
    if (data) {
      setUsers((prevData) => [...prevData, ...data]);
    }
  }, [data]);

  // this useEffect is used to observe the scroll event on the scroll container and fetch the next page of users
  // useEffect(() => {
  //   const scrollContainer = document.getElementById("scroll-container");
  //   if (!scrollContainer) return;

  //   const handleScroll = () => {
  //     const isAtEnd =
  //       scrollContainer.scrollWidth - scrollContainer.scrollLeft ===
  //       scrollContainer.clientWidth;

  //     if (isAtEnd) {
  //       setPageNumber((prevPage) => prevPage + 1);
  //     }
  //   };

  //   scrollContainer.addEventListener("scroll", handleScroll);

  //   return () => scrollContainer.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect(() => {
  //   scroll(
  //     (progress) => {
  //       console.log(progress);
  //     },
  //     {
  //       source: document.getElementById("scroll-container") as HTMLElement,
  //       axis: "x",
  //     }
  //   );
  // }, []);

  // this function is used to handle the connections that are added to the project and remove them from the available users
  // const handleInputConnections = (user: any) => {
  //   if (users.includes(user)) {
  //     setusers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  //   }
  // };

  // if the user is not authenticated and there is no user data, return null
  if (!isAuthenticated && !user) {
    return null;
  }

  // testing purposes only
  console.log({
    isAuthenticated,
    isLoading,
    isPending,
    data,
    error,
    pageNumber,
    setPageNumber,
    input,
    users,
    scroll,
  });

  return (
    <motion.div
      className="bg-[--color-text-darker] max-w-[500px] flex-1 flex flex-col p-4 gap-4 rounded-lg z-20 text-white items-center"
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 100,
      }}
    >
      <div className="flex justify-center items-center w-full">
        <h1 className="font-bold text-2xl ml-auto">New Project</h1>
        <Button
          presetIcon="closeCircle"
          className="ml-auto"
          onClick={() => setShowNewProjectModal(!showNewProjectModal)}
        />
      </div>
      <form className="flex flex-col items-start gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="type">Type*</label>
          <select
            name="users"
            onChange={handleInputChange}
            className="text-white bg-transparent border-[--color-text-lightest] border-[1px] p-2 rounded-lg"
          >
            <option value="public" className="text-black">
              Public
            </option>
            <option value="private" className="text-black">
              Private
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="connections">Connections*</label>
          <div className="bg-transparent border-[1px] p-4 rounded-lg overflow-hidden">
            {isLoading && !error && (
              <LoadingAnimation className="ml-auto mr-auto" />
            )}

            <div
              className="max-w-[500px] flex gap-4 overflow-x-scroll"
              id="scroll-container"
              ref={scrollRef}
            >
              {users && (
                <div className="flex gap-4">
                  {users.map((user: any, index: number) => (
                    <ProjectUserCard
                      key={index}
                      name={user.name}
                      photoUrl={user.photoUrl}
                      onClick={() => {
                        setInput((prev) => ({
                          ...prev,
                          connections: [...prev.connections, user],
                        }));
                        // handleInputConnections(user);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {error && <p>{error?.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="projectName">Created By*</label>
          <input
            type="text"
            name="createdBy"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
            value={user.name}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="projectName">Created At*</label>
          <input
            type="text"
            name="createdAt"
            className="bg-transparent border-[--color-text-lightest] border-[1px] outline-[--color-primary] p-2 rounded-lg"
            value={new Date().toLocaleString()}
            readOnly
          />
        </div>

        <Button type="submit" className="self-center" variant="transparent">
          Create Project
        </Button>
      </form>
    </motion.div>
  );
};

export default NewProjectModal;
