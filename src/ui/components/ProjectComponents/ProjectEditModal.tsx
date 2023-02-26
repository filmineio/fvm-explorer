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
        <div className="modal-content border-none shadow-none relative flex flex-col w-[590px] mx-auto pointer-events-auto bg-slate rounded-10">
          <div className="modal-header flex flex-shrink-0 items-center">
            <button
              className="btn-close absolute right-7 top-7 z-10 hover:opacity-50 transition-all [transition:opacity_.0.16s_ease_in_out]"
              onClick={compose(cb(change, ""), cb(toggle, false))}
            >
              <X />
            </button>
          </div>
          <div className="modal-body relative p-[70px]">
            <h3 className="font-space text-white text-24 mb-5">
              Delete project
            </h3>
            <p className="mb-0 text-white">
              Are you sure you want to delete {name} project?
            </p>
            <div className="flex items-center gap-5 mt-[70px]">
              <button
                onClick={onDelete}
                className="btn bg-red text-white"
              >
                YES, DELETE PROJECT
              </button>
              <button
                className="btn link flex items-center text-label"
                onClick={cb(setConfirm, false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className="modal-content border-none shadow-none relative flex flex-col w-[590px] mx-auto pointer-events-auto bg-slate rounded-10">
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
              className="btn link flex items-center text-red ml-auto"
              onClick={cb(setConfirm, true)}
            >
              <div className="bg-label_opacity-30 mr-5 rounded-3 flex items-center justify-center w-8 h-8">
                <Delete />
              </div>
              Delete Project
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};