import { Entity } from "@/enums/Entity";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Modal from "@/ui/components/Modal/Modal";
import { CreateProjectModal } from "@/ui/components/ProjectComponents/CreateProjectModal";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useMutation } from "@/ui/external/data";

import { Project } from "@/types/data/Project";

import { cb } from "@/utils/cb";


export const ProjectsHeading = ({ onCreate }: { onCreate: () => void }) => {
  const { data, loading, error, post } = useMutation<Project>();
  const [projectName, setName] = useState("");
  const [createCaseActive, setCreateCaseActive] = useState(false);

  const create = useCallback(() => {
    if (!projectName.trim()) {
      return toast.warning("Project name must be at least 2 characters long");
    }

    post(Entity.Project, "/projects/create", { name: projectName });
  }, [projectName]);

  useEffect(() => {
    if (data.length) {
      onCreate();
      setCreateCaseActive(false);
      toast.success(`Successfully created project: ${data[0]?.name}`);
    }
  }, [data]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [!!error]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-10">
        <div className="textheading">
          <h3 className="text-2xl font-sans1 font-bold text-white	">
            My projects
          </h3>

          <h5 className="text-switchs text-lg font-sans1">
            Collections of contracts you created or want to be in the loop
            about.
          </h5>
        </div>
        <div
          className={"cursor-pointer"}
          onClick={cb(setCreateCaseActive, true)}
        >
          <div className="flex text-yellow text-sm font-bold mt-5">
            <div className=" bg-yellowrgba p-1 mr-2 rounded-md flex items-center justify-center w-8">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66699 7.00008H7.00033M12.3337 7.00008H7.00033M7.00033 7.00008V1.66675M7.00033 7.00008V12.3334"
                  stroke="#D5FF64"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            New project
          </div>
        </div>
      </div>
      {createCaseActive && loading && (
        <Modal>
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-black bg-clip-padding rounded-md outline-none text-gray-text">
            <Spinner />
          </div>
        </Modal>
      )}
      {createCaseActive && !loading && (
        <CreateProjectModal
          change={setName}
          toggle={setCreateCaseActive}
          onCreate={create}
        />
      )}
    </>
  );
};