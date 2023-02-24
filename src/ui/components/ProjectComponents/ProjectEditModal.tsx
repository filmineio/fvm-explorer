import { compose } from "ramda";
import { useState } from "react";

import Modal from "@/ui/components/Modal/Modal";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { cb } from "@/utils/cb";
import { onChange } from "@/utils/unpack";

export const ProjectEditModal = ({
  value,
  toggle,
  onEdit,
  onDelete,
  loading,
}: {
  value: string;
  loading: boolean;
  toggle: (b: boolean) => void;
  onEdit: (name: string) => void;
  onDelete: () => void;
}) => {
  const [confirm, setConfirm] = useState(false);
  const [name, change] = useState(value);

  if (loading) {
    return (
      <Modal>
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-black bg-clip-padding rounded-md outline-none text-gray-text">
          <Spinner />
        </div>
      </Modal>
    );
  }

  if (confirm) {
    return (
      <Modal>
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-black bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center">
            <button
              className="btn-close absolute right-3 z-50 top-3 box-content w-4 h-4 p-1 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
              onClick={compose(cb(change, ""), cb(toggle, false))}
            >
              x
            </button>
          </div>
          <div className="modal-body relative p-12  text-2xl text-white">
            <p className="text-2xl text-white font-sans1 font-bold">
              Are you sure you want to delete {name} project?
            </p>
            <button
              onClick={onDelete}
              className="mt-[70px] btn bg-analogous py-3.5 mr-2 px-[30px] rounded-[9px] font-bold text-black text-[14px]"
            >
              YES, DELETE PROJECT
            </button>
            <button
              className="text-lightgray hover:bg-yellow mt-[70px] btn  py-3.5 px-[30px] rounded-[9px] font-bold font-sans1 hover:text-black text-base"
              onClick={cb(setConfirm, false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-black bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center">
          <button
            className="btn-close absolute right-3 z-50 top-3 box-content w-4 h-4 p-1 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
            onClick={compose(cb(change, ""), cb(toggle, false))}
          >
            x
          </button>
        </div>
        <div className="modal-body relative p-12  text-2xl text-white">
          <p className="text-2xl text-white font-sans1 font-bold">
            Edit {value} project
          </p>
          <h4 className="text-white text-sm mt-5 font-sans1 ">Change Name</h4>
          <input
            className="font-mono1 p-3 bg-gray-dark placeholder-lightgray focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md focus:ring-1 w-full min-h-sm  font-medium text-sm "
            placeholder="Project name..."
            onChange={onChange(change)}
            value={name}
          />
          <div className="flex gap-4">
            <button
              onClick={cb(onEdit, name)}
              className="mt-[70px] btn bg-yellow py-3.5 mr-2 px-[30px] rounded-[9px] font-bold text-black text-[14px]"
            >
              SAVE PROJECT
            </button>
            <button
              className="text-analogous mt-[70px] btn  py-3.5 px-[30px] rounded-[9px] font-bold font-sans1 text-base flex gap-1 items-center"
              onClick={cb(setConfirm, true)}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4997 11.8333V11.8333C13.4997 10.4526 14.619 9.33333 15.9997 9.33333V9.33333C17.3804 9.33333 18.4997 10.4526 18.4997 11.8333V11.8333M13.4997 11.8333H18.4997M13.4997 11.8333H10.9997M18.4997 11.8333H20.9997M22.6663 11.8333H20.9997M9.33301 11.8333H10.9997M10.9997 11.8333V20.6667C10.9997 21.7712 11.8951 22.6667 12.9997 22.6667H18.9997C20.1042 22.6667 20.9997 21.7712 20.9997 20.6667V11.8333"
                  stroke="#B7006E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Delete Project
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};