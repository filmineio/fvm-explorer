import { compose } from "ramda";

import Modal from "@/ui/components/Modal/Modal";

import { cb } from "@/utils/cb";
import { onChange } from "@/utils/unpack";
import X from "@/ui/components/Common/Icons/X";

export const CreateProjectModal = ({
  change,
  toggle,
  onCreate,
}: {
  change: (value: string) => void;
  toggle: (b: boolean) => void;
  onCreate: () => void;
}) => {
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
            Create new project
          </h3>
          <div className="input-wrapper">
            <label>PROJECT NAME</label>
            <input
              className="w-full"
              placeholder="Project name..."
              onChange={onChange(change)}
            />
          </div>
          <div className="flex items-center gap-5 mt-[70px]">
            <button
              onClick={onCreate}
              className="btn bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all"
            >
              SAVE PROJECT
            </button>
            <button
              className="btn link flex items-center text-label"
              onClick={compose(cb(change, ""), cb(toggle, false))}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};