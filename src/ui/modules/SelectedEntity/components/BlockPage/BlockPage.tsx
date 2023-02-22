import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { useEffect, useMemo, useState } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { BlockTransactions } from "@/ui/modules/SelectedEntity/components/BlockPage/components/BlockTransactions";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useQuery } from "@/ui/external/data";

import { BlockResults } from "@/types/DataResult";
import { Block } from "@/types/data/Block";
import { Transaction } from "@/types/data/Transaction";

import { getZeroIndexOffset } from "@/utils/getZeroIndexOffset";


type Props = { data: BlockResults };

export const BlockPage = ({ data }: Props) => {
  const block = useMemo(() => data.rows[0] as Block, [data]);
  const chainBlock: Block["block"] = useMemo(
    () => JSON.parse(block.block as unknown as string),
    [block.block]
  );

  const query = useLocationQuery<{ network: Network }>();
  const {
    get,
    loading,
    error,
    data: blockTransactions,
    total,
  } = useQuery<Transaction>();
  const [page, paginate] = useState<number>(1);

  useEffect(() => {
    get(Entity.Transaction, {
      network: data.network,
      query: { block: { is: block.cid } },
      order: ["timestamp", "ASC"],
      pagination: { limit: PAGE_SIZE, offset: getZeroIndexOffset(page) },
      selection: [
        "cid",
        "method",
        "messageRctExitCode",
        "messageRctGasUsed",
        "value",
      ],
    });
  }, [page]);

  return (
    <div className=" pt-7">
      <div className="w-full">
        <div className="project relative p-7 min-w-0 break-words bg-gray-dark border-2 border-lightgray rounded-base shadow-lg ">
          <div className="absolute bg-lightgray py-1 px-2 -top-3 left-0">
            <p className="text-xs text-white font-normal ">BLOCK</p>
          </div>
          <div className="md:lex-wrap flex items-center">
            <div className="relative pr-4 ">
              <div className="bg-bglight w-24 h-24 rounded-base py-3 px-3 flex justify-center items-center ">
                <img src="/images/block-icon.svg" alt={"block-icon"} />
              </div>
            </div>

            <div className="pl-1">
              <h3 className="text-2xl font-sans1 font-bold text-white mb-2 relative">
                <CopyWrapper data={block.cid}>{block.cid}</CopyWrapper>
              </h3>
              <div className=" flex md:flex-wrap gap-1 items-center">
                <p className="text-white font-mono1 font-normal text-sm pr-3 w-9/12 truncate">
                  <span className="text-lightgray font-mono1 font-normal text-sm">
                    Block signature:{" "}
                  </span>
                  {chainBlock.BlockSig?.Data}
                </p>
                <button className="bg-bglight rounded-base py-1 px-3 font-normal font-mono1	text-xs	leading-5 text-white tracking-wider lg:w-2/12">
                  TYPE {chainBlock.BlockSig?.Type}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlockTransactions
        transactions={blockTransactions}
        paginate={paginate}
        page={page}
        total={total}
        network={data.network}
        loading={loading}
      />
    </div>
  );
};