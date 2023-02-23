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
        <div className="relative flex flex-col break-words bg-body_opacity-50 border-2 border-transparent hover:border-label rounded-base shadow-lg">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="relative pr-4 w-4/12">
                <div className="flex bg-label_opacity-30 rounded-msm justify-center items-center w-20 h-20">
                  <BlockIcon/>
                </div>
              </div>
              <div className="relative w-8/12">
                <CopyWrapper data={data.cid}>
                  <h4 className="font-roboto text-white text-lg font-bold leading-compact truncate">
                    {data.cid}
                  </h4>
                </CopyWrapper>

                <p className="font-roboto text-white text-sm font-normal leading-normal tracking-wider mt-1">
                  Height: {data.height}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-5 gap-2">
              <div className="w-full">
                <div className="text-label font-normal text-sm tracking-wider ">
                  <span>BLOCK SIGNATURE: </span>
                  <button className="bg-label_opacity-30 rounded-msm px-2 py-1 font-roboto font-normal text-sm leading-5 text-blue-400 truncate max-w-xs">
                    Type {block.BlockSig?.Type}
                  </button>
                </div>
              </div>
              <div className="font-roboto text-white text-sm font-normal leading-compact truncate">
                {block.BlockSig?.Data}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};