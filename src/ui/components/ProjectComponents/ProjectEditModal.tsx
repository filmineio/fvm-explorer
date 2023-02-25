import { compose } from "ramda";
import { useState } from "react";

import Modal from "@/ui/components/Modal/Modal";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { cb } from "@/utils/cb";
import { onChange } from "@/utils/unpack";
import X from "@/ui/components/Common/Icons/X";
import Delete from "@/ui/components/Common/Icons/Delete";

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
        <div className="modal-content border-none shadow-none relative flex flex-col w-full pointer-events-auto bg-slate rounded-10">
          <Spinner />
        </div>
      </Modal>
    );
  }

  if (confirm) {
    return (
      <Modal>
        <div className="modal-content border-none shadow-none relative flex flex-col w-full pointer-events-auto bg-slate rounded-10">
          <div className="modal-header flex flex-shrink-0 items-center">
            <button
              className="btn-close absolute right-7 top-7 z-10 hover:opacity-50 transition-all [transition:opacity_.0.16s_ease_in_out]"
              onClick={compose(cb(change, ""), cb(toggle, false))}
            >
              <X />
            </button>
          </div>
          <div className="modal-body relative p-[70px]">
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
      <div className="modal-content border-none shadow-none relative flex flex-col w-full pointer-events-auto bg-slate rounded-10">
        <div className="modal-header flex flex-shrink-0 items-center">
          <button
            className="btn-close absolute right-7 top-7 z-10 hover:opacity-50 transition-all [transition:opacity_.0.16s_ease_in_out]"
            onClick={compose(cb(change, ""), cb(toggle, false))}
          >
            <X />
          </button>
        </div>
        <div className="modal-body relative p-[70px]">
          <h3 className="font-space text-white text-24 mb-10">
            Edit {value} project
          </h3>
          <div className="input-wrapper">
            <label>Change Name</label>
            <input
              className="w-full"
              placeholder="Project name..."
              onChange={onChange(change)}
              value={name}
            />
          </div>
          <div className="flex items-center gap-5 mt-[70px]">
            <button
              onClick={cb(onEdit, name)}
              className="btn bg-blue-500 text-white"
            >
              SAVE PROJECT
            </button>
            <button
              className="btn link flex items-center text-red"
              onClick={cb(setConfirm, true)}
            >
              <Delete />
              Delete Project
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};