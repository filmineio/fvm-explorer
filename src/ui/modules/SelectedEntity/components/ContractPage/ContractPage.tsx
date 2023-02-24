import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { useEffect, useMemo, useState } from "react";

import { TabHeader } from "@/ui/components/TabHeader/TabHeader";

import { ContractBaseInfo } from "@/ui/modules/SelectedEntity/components/ContractPage/components/ContractBaseInfo";
import { ContractTransactions } from "@/ui/modules/SelectedEntity/components/ContractPage/components/ContractTransactions";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useQuery } from "@/ui/external/data";

import { ContractResults } from "@/types/DataResult";
import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

import { getZeroIndexOffset } from "@/utils/getZeroIndexOffset";


type Props = { data: ContractResults };

export const ContractPage = ({ data }: Props) => {
  const contract = useMemo(() => data.rows[0] as Contract, [data]);
  const [activeTab, setActiveTab] = useState(0);
  const query = useLocationQuery<{ network: Network }>();
  const { get, loading, data: transactions, total } = useQuery<Transaction>();
  const [page, paginate] = useState<number>(1);

  useEffect(() => {
    get(Entity.Transaction, {
      network: data.network,
      query: [
        ["from", "to"].map((f) => ({ [f]: { is: contract.contractId } })),
        ["robustTo", "robustFrom"].map((f) => ({
          [f]: { is: contract.contractAddress },
        })),
      ].flat(),
      order: ["timestamp", "ASC"],
      pagination: { limit: PAGE_SIZE, offset: getZeroIndexOffset(page) },
      selection: [
        "cid",
        "method",
        "messageRctExitCode",
        "messageRctGasUsed",
        "value",
        "height",
      ],
    });
  }, [page]);

  return (
    <div className="py-7">
      <ContractBaseInfo
        contract={contract}
        network={data.network}
        totalTransactions={total}
      />
      <ul className="nav nav-tabs flex justify-end  md:flex-row flex-wrap list-none border-b-0 pl-0">
        <TabHeader
          tabIndex={0}
          activeTab={activeTab}
          toggle={setActiveTab}
          label={"Transactions"}
        />
        <TabHeader
          tabIndex={1}
          activeTab={activeTab}
          toggle={setActiveTab}
          label={"Source Code"}
        />
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active">
          {activeTab === 0 && (
            <ContractTransactions
              contract={contract}
              transactions={transactions}
              paginate={paginate}
              page={page}
              total={total}
              network={data.network}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};