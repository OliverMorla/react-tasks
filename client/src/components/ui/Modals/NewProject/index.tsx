/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { motion, scroll, useScroll, useMotionValueEvent } from "framer-motion";

import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ProjectModalUserCard from "@/components/ui/Cards/ProjectModalUserCard";

import Button from "@/components/shared/ui/Button";
import ToggleButton from "@/components/shared/ui/ToggleButton";
import { getAvailableUsers } from "@/actions/users-actions";

const NewProjectModal = ({
  showNewProjectModal,
  setShowNewProjectModal,
}: NewProjectModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [input, setInput] = useState({
    title: "",
    type: "public",
    connections: [],
    createdBy: "",
    createdAt: new Date().toLocaleString(),
  });

  const { isAuthenticated, user } = useAuth();
  const {
    isPending,
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["usersAvailable"],
    queryFn: () => getAvailableUsers(pageNumber),
    refetchInterval: 500,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (users?.data) {
      setUsersData((prevData) => [...prevData, ...users.data]);
    }
  }, [users?.data]);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const isAtEnd =
        scrollContainer.scrollWidth - scrollContainer.scrollLeft ===
        scrollContainer.clientWidth;

      if (isAtEnd) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {

  }, [input.connections])

  const handleInputConnections = (user: any) => {
    if(input.connections.includes(user)) {
      setInput((prev) => ({
        ...prev,
        connections: prev.connections.filter((conn) => conn !== user),
      }));
    }
  }

  if (!isAuthenticated && !user) {
    return null;
  }
  console.log({
    isAuthenticated,
    isLoading,
    isPending,
    users,
    error,
    pageNumber,
    setPageNumber,
    input,
    usersData,
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
          presetIcon="close"
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
              <img
                src="/assets/spinners/Loading-3.svg"
                alt=""
                width={50}
                height={50}
                className="ml-auto mr-auto"
              />
            )}

            <div
              className="max-w-[500px] flex gap-4 overflow-x-scroll"
              id="scroll-container"
              ref={scrollRef}
            >
              {usersData && (
                <div className="flex gap-4">
                  {usersData.map((user: any, index: number) => (
                    <ProjectModalUserCard
                      key={index}
                      name={user.name}
                      photoUrl={user.avatar}
                      onClick={() => {
                        setInput((prev) => ({
                          ...prev,
                          connections: [...prev.connections, user],
                        }));
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

        <ToggleButton type="submit" className="self-center">
          Create Project
        </ToggleButton>
      </form>
    </motion.div>
  );
};

export default NewProjectModal;
