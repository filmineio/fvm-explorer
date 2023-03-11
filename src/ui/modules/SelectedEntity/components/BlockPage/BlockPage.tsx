import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { useEffect, useMemo, useState } from "react";

import { BlockTransactions } from "@/ui/modules/SelectedEntity/components/BlockPage/components/BlockTransactions";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useQuery } from "@/ui/external/data";

import { BlockResults } from "@/types/DataResult";
import { Block } from "@/types/data/Block";
import { Transaction } from "@/types/data/Transaction";

import { getZeroIndexOffset } from "@/utils/getZeroIndexOffset";
import BlockIcon from "@/ui/components/Common/Icons/BlockIcon";
import CopyText from "@/ui/components/CopyText/CopyText";


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
        <div className="project relative bg-body_opacity-50 p-7.5 mb-15 rounded-6 break-words">
          <div className="absolute bg-label py-1.25 px-2 -top-3 left-0 rounded-1110">
            <p className="text-white text-12 leading-compact">BLOCK</p>
          </div>
          <div className="md:lex-wrap flex items-center">
            <div className="relative pr-4 ">
              <div className="bg-label_opacity-30 w-24 h-24 rounded-4 py-3 px-3 flex justify-center items-center ">
                <BlockIcon/>
              </div>
            </div>

            <div className="pl-1 overflow-hidden pr-2">
              <CopyText text={block.cid} additionalClass="copy-animate-width">
                <span className="w-auto break-all text-2xl font-bold text-white mb-2 relative overflow-hidden truncate max-w-fit">
                  {block.cid}{block.cid}
                </span>
              </CopyText>
              <div className="flex md:flex-wrap gap-5 items-center mt-3">
                <p className="relative text-white font-normal text-14 pr-3 w-9/12 truncate">
                  <span className="text-label font-medium text-14 mr-5">
                    Block signature
                  </span>
                  {chainBlock.BlockSig?.Data}
                </p>
                <button className="bg-label_opacity-30 rounded-4 py-1 px-3 font-normal text-14 leading-normal text-white  lg:w-2/12">
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