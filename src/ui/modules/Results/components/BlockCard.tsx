import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { useMemo } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { Block } from "@/types/data/Block";


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
    <div className="w-full sm:min-w-full max-w-xs md:w-1/2 lg:w-1/3xs:w-full my-2 sm:pr-5 px-0 cursor-pointer">
      <Link href={`/explore/${Entity.Block}/${data.cid}?network=${network}`}>
        <div className="relative flex flex-col min-w-0 break-words bg-gray-dark border-2 border-gray-dark hover:border-lightgray rounded-base  shadow-lg">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="relative pr-4 w-4/12">
                <div className="bg-bglight rounded-base py-3 px-3 flex justify-center items-center">
                  <img src="/images/block-icon.svg" alt={""} />
                </div>
              </div>
              <div className="relative w-8/12 flex flex-col gap-2">
                <CopyWrapper data={data.cid}>
                  <h4 className="text-white leading-6 text-base font-bold font-sans1 truncate	">
                    {data.cid}
                  </h4>
                </CopyWrapper>

                <p className="text-sm text-white leading-4 font-mono1">
                  Height: {data.height}
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-2">
              <div className="w-full">
                <div className="text-gray-text font-normal	text-sm	 tracking-wider">
                  <span>BLOCK SIGNATURE: </span>
                  <button className="bg-bglight rounded-base px-2 py-1 font-medium font-mono1	text-sm	leading-5 text-white truncate max-w-xs">
                    Type {block.BlockSig?.Type}
                  </button>
                </div>
              </div>
              <div className="text-white text-sm truncate">
                {block.BlockSig?.Data}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};