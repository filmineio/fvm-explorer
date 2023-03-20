import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { useMemo } from "react";

import { Block } from "@/types/data/Block";
import BlockIcon from "@/ui/components/Common/Icons/BlockIcon";
import CopyText from "@/ui/components/CopyText/CopyText";


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
    <div className="w-full cursor-pointer">
      <Link href={`/explore/${Entity.Block}/${data.cid}?network=${network}`}>
        <div className="relative flex flex-col break-words bg-body_opacity-50 border-2 border-transparent rounded-9 hover:border-label">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="w-20 h-20 flex bg-label_opacity-30 rounded-6 justify-center items-center">
                <BlockIcon/>
              </div>
              <div className="ml-5 min-w-0 flex-1 overflow-hidden">
                <CopyText text={data.cid} additionalClass="copy-animate-width">
                  <span className="font-space text-white text-18 font-bold leading-compact truncate">
                    {data.cid}
                  </span>
                </CopyText>
                <p className="text-blue-400 text-12 font-bold leading-compact mt-1.5">
                  {data.height} transactions
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-5 gap-1.5">
              <div className="w-full">
                <div className="flex items-center">
                  <h5 className="text-label text-14 font-medium leading-4 lowercase">
                    BLOCK SIGNATURE
                  </h5>
                  <h4 className="bg-label_opacity-30 rounded-3 ml-2.5 px-3 py-1.25 font-medium text-14 leading-4 text-blue-400 truncate">
                    Type {block.BlockSig?.Type}
                  </h4>
                </div>
              </div>
              <div className="w-full text-white text-14 font-normal leading-normal truncate">
                {block.BlockSig?.Data}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};