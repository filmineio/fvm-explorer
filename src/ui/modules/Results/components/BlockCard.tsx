import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { useMemo } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { Block } from "@/types/data/Block";
import BlockIcon from "@/ui/components/Common/Icons/BlockIcon";


type BlockCardProps = {
  data: Block;
  network: Network;
};
export const BlockCard = ({ data, network }: BlockCardProps) => {
  const block: Block["block"] = useMemo(
    () => JSON.parse(data.block as unknown as string),
    [data.block]
  );

  return (
    <div className="w-full sm:min-w-full max-w-xs md:w-1/2 lg:w-1/3xs:w-full sm:pr-5 px-0 cursor-pointer">
      <Link href={`/explore/${Entity.Block}/${data.cid}?network=${network}`}>
        <div className="relative flex flex-col break-words bg-body_opacity-50 border-2 border-transparent hover:border-label rounded-9 shadow-lg">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="relative w-4/12">
                <div className="flex bg-label_opacity-30 rounded-6 justify-center items-center w-20 h-20">
                  <BlockIcon/>
                </div>
              </div>
              <div className="relative w-8/12">
                <CopyWrapper data={data.cid}>
                  <h4 className="font-space text-white text-lg font-bold leading-compact truncate">
                    {data.cid}
                  </h4>
                </CopyWrapper>
                <p className="font-roboto text-blue-400 text-xs font-bold leading-compact mt-1.5">
                  {data.height} transactions
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-1">
              <div className="w-full">
                <div className="flex items-center">
                  <h5 className="font-roboto text-label text-sm font-medium leading-4 lowercase">
                    BLOCK SIGNATURE
                  </h5>
                  <h4 className="bg-label_opacity-30 rounded-3 ml-2.5 px-3 py-1.25 font-roboto font-medium text-sm leading-4 text-blue-400 truncate">
                    Type {block.BlockSig?.Type}
                  </h4>
                </div>
              </div>
              <div className="w-full font-roboto text-white text-sm font-normal leading-normal truncate">
                {block.BlockSig?.Data}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};