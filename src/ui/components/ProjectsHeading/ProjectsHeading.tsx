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
      <div className="flex flex-wrap items-center justify-between mb-20">
        <div className="textheading">
          <h3 className="text-24 text-white mb-4 font-space">
            My projects
          </h3>
          <p className="text-white text-16">
            Collections of contracts you created or want to be in the loop
            about.
          </p>
        </div>
        <div
          className={"cursor-pointer"}
          onClick={cb(setCreateCaseActive, true)}
        >
          <div className="flex items-center text-blue-400 text-14 font-bold hover:text-blue-600 transition-colors">
            <div className="bg-label-30 mr-5 rounded-3 flex items-center justify-center w-8 h-8">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66699 7.00008H7.00033M12.3337 7.00008H7.00033M7.00033 7.00008V1.66675M7.00033 7.00008V12.3334"
                  stroke="#0576F0"
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
          <div className="modal-content border-none shadow-none relative flex flex-col w-full pointer-events-auto bg-slate rounded-10">
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