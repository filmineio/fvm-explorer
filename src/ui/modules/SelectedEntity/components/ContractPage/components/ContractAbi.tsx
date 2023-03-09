import { AbiItem } from "web3-utils";

import X from "@/ui/components/Common/Icons/X";
import Modal from "@/ui/components/Modal/Modal";

import { ContractAbiItem } from "@/ui/modules/SelectedEntity/components/ContractPage/components/ContractAbiItem";

import { cb } from "@/utils/cb";


export const ContractAbi = ({
  toggle,
  data,
}: {
  toggle: (value: boolean) => void;
  data: AbiItem[] | undefined;
}) => (
  <Modal>
    <div className="modal-content border-none shadow-none relative flex flex-col w-full pointer-events-auto bg-slate rounded-10">
      <div className="modal-header flex flex-shrink-0 items-center">
        <button
          className="btn-close absolute right-7 top-7 z-10 hover:opacity-50 transition-all [transition:opacity_.0.16s_ease_in_out]"
          onClick={cb(toggle, false)}
        >
          <X />
        </button>
      </div>
      <div className="modal-body relative p-[70px]">
        <h3 className="font-space text-white text-24 mb-8">Contract ABI</h3>

        <div className="gap-5 relative flex flex-col gap-4">
          {(data || []).map((item, i) => (
            <ContractAbiItem item={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  </Modal>
);