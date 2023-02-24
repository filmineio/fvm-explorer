import { compose } from "ramda";

import Modal from "@/ui/components/Modal/Modal";

import { cb } from "@/utils/cb";
import { onChange } from "@/utils/unpack";

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
            Create new project
          </p>
          <h4 className="text-white text-sm mt-5 font-sans1 ">PROJECT NAME</h4>
          <input
            className=" font-mono1 p-3  bg-gray-dark placeholder-lightgray focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md focus:ring-1 w-full min-h-sm  font-medium text-sm "
            placeholder="Project name..."
            onChange={onChange(change)}
          />
          <div className="flex gap-4">
            <button
              onClick={onCreate}
              className="mt-[70px] btn bg-yellow py-3.5 mr-2 px-[30px] rounded-[9px] font-bold text-black text-[14px]"
            >
              SAVE PROJECT
            </button>
            <button
              className="text-lightgray hover:bg-yellow mt-[70px] btn  py-3.5 px-[30px] rounded-[9px] font-bold font-sans1 hover:text-black text-base"
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