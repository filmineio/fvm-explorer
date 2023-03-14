import { defaultNetwork } from "../src/filters/defaultNetwork";
import { Network } from "@/enums/Network";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { Main } from "@/ui/components/Main/Main";
import { Page } from "@/ui/components/Page/Page";

import { Filters } from "@/ui/modules/Filters/Filters";

import { useStore } from "@/ui/state/Store";

import { getHttpClient } from "@/ui/ctx/http/getHttpClient";
import { updateRouteState } from "@/ui/utils/updateRouteState";

import { OperationStatus } from "@/types/ApiResponse";
import { AppQuery } from "@/types/AppQuery";
import { ApplicationStats } from "@/types/stats";

import { isEnum } from "@/utils/isEnum";
import { Spinner } from "@/ui/components/Spinner/Spinner";
import Link from "next/link";
import React from "react";
import { humanReadableSize, roundNumber, timePassFromTimestamp, truncateString } from "@/ui/utils/general";
import CopyText from "@/ui/components/CopyText/CopyText";
import Crown from "@/ui/components/Common/Icons/Crown";


type ApplicationData = {
  data:
    | {
    status: OperationStatus.Ok;
    data: ApplicationStats;
    exception: null;
  }
    | {
    status: OperationStatus.Error;
    exception: Record<"exception" | "message", string>;
    data: null;
  };
}

const Home: NextPage<ApplicationData> = ({ data}) => {
  const { push } = useRouter();
  const {
    state: { filters },
  } = useStore();

  const run = useCallback(() => {
    updateRouteState(push, filters);
  }, [filters]);

  if (!data || data.status === OperationStatus.Error) {
    return (
      <Page showHeader showFooter>
        <Main>
          <Filters search={run} />
          <div
            className={
              "flex flex-col rounded border border-gray-text p-32 text-center gap-6"
            }
          >
            <p className={"text-violet-600 text-2xl"}>Something Went Wrong</p>
            <p className={"text-gray-text text-lg"}>{data.exception?.message}</p>
          </div>
        </Main>
      </Page>
    );
  }
  console.log(data.data);

  return (
    <Page showHeader showFooter>
      <Main>
        <Filters search={run} />
        <div>
          <div className="grid grid-cols-6 gap-5">
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">{data.data.ethOverview.numContractsDeployed || <Spinner inline />}</h6>
              <p className="text-12 mb-0 text-label">contracts deployed</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">{data.data.ethOverview.numEthAccounts || <Spinner inline />}</h6>
              <p className="text-12 mb-0 text-label">eth accounts</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">19.185 EiB</h6>
              <p className="text-12 mb-0 text-label">storage power</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">17.68 FIL</h6>
              <p className="text-12 mb-0 text-label">avg. mining reward</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">13556</h6>
              <p className="text-12 mb-0 text-label">placeholders</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">1527</h6>
              <p className="text-12 mb-0 text-label">contracts deployed</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">{roundNumber(data.data.ethOverview.avgNumUniqueAddressesInteractingWithContract, 7) || <Spinner inline />}</h6>
              <p className="text-12 mb-0 text-label">unique addresses interacting per contract</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">{roundNumber(data.data.ethOverview.avgNumInteractionsPerContract, 2) || <Spinner inline />}</h6>
              <p className="text-12 mb-0 text-label">interactions per contract</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">{roundNumber(data.data.ethOverview.avgGasUsagePerContract, 2) || <Spinner inline />}</h6>
              <p className="text-12 mb-0 text-label">gas usage per contract</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">1527 FIL</h6>
              <p className="text-12 mb-0 text-label">total value locked</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">{data.data.ethOverview.filTransferredFromContracts ? `${roundNumber(parseInt(data.data.ethOverview.filTransferredFromContracts) / Math.pow(10, 12), 0)} tn` : <Spinner inline />}</h6>
              <p className="text-12 mb-0 text-label">Fil transferred from contracts</p>
            </div>
            <div className="bg-grayscale_opacity-50 rounded-10 p-4">
              <h6 className="text-[28px] text-white mb-2">{data.data.ethOverview.filTransferredToContracts ? `${roundNumber(parseInt(data.data.ethOverview.filTransferredToContracts.substring(1)) / Math.pow(10, 12), 0)} tn` : <Spinner inline />}</h6>
              <p className="text-12 mb-0 text-label">Fil transferred to contracts</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 my-7">
          <div className="col-span-2 bg-grayscale_opacity-50 rounded-10 p-12">
            <h2 className="text-[24px] text-white mb-7">Latest tipsets</h2>
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="bg-body text-14 text-white font-bold px-5 py-4 rounded-4004">HEIGHT</th>
                  <th className="bg-body text-14 text-white font-bold px-5 py-4">BLOCK ID</th>
                  <th className="bg-body text-14 text-white font-bold px-5 py-4 rounded-0440">MINER</th>
                </tr>
              </thead>
              <tbody>
                {data.data.latestTipSets.map((item, index) => (
                  <tr key={`${item.height}-lts-${index}`}>
                    <td className="bg-body text-14 text-white font-bold px-5 py-4 rounded-4004">{item.height}</td>
                    <td className="bg-body text-14 text-white font-bold px-5 py-4">
                      {item.blocks.map((blockItem, index) => (
                        <CopyText key={`${blockItem.cid}-ltsbi1-${index}`} text={blockItem.cid}>
                          <div className="text-blue-500">{truncateString(blockItem.cid, 20)}</div>
                        </CopyText>
                      ))}
                    </td>
                    <td className="bg-body text-14 text-white font-bold px-5 py-4 rounded-0440">
                      {item.blocks.map((blockItem, index) => (
                        <div key={`${blockItem.miner}-ltsbi2-${index}`}>{blockItem.miner}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-grayscale_opacity-50 rounded-4 p-12">
            <h2 className="text-[24px] text-white mb-7">Latest called contracts</h2>
            {data.data.latestCalledContracts.map((item) => (
              <div key={`${item.contractAddress}-lcc`} className="bg-grayscale_opacity-50 rounded-10 p-4 flex items-start justify-between mb-4 last:mb-0">
                <div>
                  <h6 className="text-[18px] text-white mb-2">{truncateString(item.contractAddress, 14)}</h6>
                  <p className="text-12 mb-0 text-label">{timePassFromTimestamp(item.timestamp)}</p>
                </div>
                <Link href={`/explore/contract/${item.contractAddress}`}>
                  <a className="text-14 font-bold text-blue-400 mt-1">
                    View contract
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 bg-grayscale_opacity-50 rounded-10 p-12">
          <h2 className="text-[24px] text-white mb-7">Top storage providers</h2>
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                {/* TODO */}
                <th className="bg-body text-14 text-white font-bold px-5 py-4 rounded-4004">RANK</th>
                <th className="bg-body text-14 text-white font-bold px-5 py-4">MINER</th>
                <th className="bg-body text-14 text-white font-bold px-5 py-4">RAW POWER</th>
                <th className="bg-body text-14 text-white font-bold px-5 py-4">24H REWARD</th>
                <th className="bg-body text-14 text-white font-bold px-5 py-4 rounded-0440">MINING EFFICIENCY</th>
              </tr>
            </thead>
            <tbody>
              {data.data.topMiners.map((item, index) => (
                <tr key={`${item.address}-lts-${index}`}>
                  {/* TODO */}
                  <td className="bg-body text-14 text-white font-bold px-5 py-4 rounded-4004">
                    <span className="flex items-center">
                      {index + 1}
                      <span className="ml-2">{index < 3 && <Crown />}</span>
                    </span>
                  </td>
                  <td className="bg-body text-14 text-white font-bold px-5 py-4">{item.address}</td>
                  <td className="bg-body text-14 text-white font-bold px-5 py-4">{humanReadableSize(parseInt(item.rawBytePower, 10), false, 2, 'B')}</td>
                  <td className="bg-body text-14 text-white font-bold px-5 py-4">{item.rawBytePowerDelta}</td>
                  <td className="bg-body text-14 text-white font-bold px-5 py-4 rounded-0440">{item.rawBytePower}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-5 my-7">
          <div className="bg-grayscale_opacity-50 rounded-4 p-12">
            <h2 className="text-[24px] text-white mb-7">Latest transactions</h2>
            {data.data.latestCalledContracts.map((item) => (
              <div key={`${item.contractAddress}-lcc`} className="bg-grayscale_opacity-50 rounded-10 p-4 flex items-start justify-between mb-4 last:mb-0">
                <div>
                  <h6 className="text-[18px] text-white mb-2">{truncateString(item.contractAddress, 20)}</h6>
                  <p className="text-12 mb-0 text-label">{item.timestamp}</p>
                </div>
                <Link href={`/explore/contract/${item.contractAddress}`}>
                  <a className="text-14 font-bold text-blue-400 mt-1">
                    View contract
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div className="bg-grayscale_opacity-50 rounded-10 p-12">
            <h2 className="text-[24px] text-white mb-7">Rich list</h2>
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="bg-body text-14 text-white font-bold px-5 py-4 rounded-4004">RANK</th>
                  <th className="bg-body text-14 text-white font-bold px-5 py-4">ADDRESS</th>
                  <th className="bg-body text-14 text-white font-bold px-5 py-4 rounded-0440">BALANCE</th>
                </tr>
              </thead>
              <tbody>
                {data.data.richList.map((item, index) => (
                  <tr key={`${item.address}-lts-${index}`}>
                    <td className="bg-body text-14 text-white font-bold px-5 py-4 rounded-4004">
                      <span className="flex items-center">
                        {index + 1}
                        <span className="ml-2">{index < 3 && <Crown />}</span>
                      </span>
                    </td>
                    <td className="bg-body text-14 text-white font-bold px-5 py-4">{truncateString(item.address, 20)}</td>
                    <td className="bg-body text-14 text-white font-bold px-5 py-4 rounded-0440">{item.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Main>
    </Page>
  );
};

export async function getServerSideProps({
  query,
}: {
  locale: string;
  query: AppQuery;
}) {
  const network = query.network || defaultNetwork();

  if (!isEnum(Network, network)) {
    return {
      notFound: true,
    };
  }

  const response = await getHttpClient(() => null)().get(
    `stats?network=${network}`
  );

  return {
    props: {
      data: {
        status:
          response.status !== 200 ? OperationStatus.Error : OperationStatus.Ok,
        data: response.status !== 200 ? null : response.data,
        exception: response.status !== 200 ? response.data : null,
      },
    },
  };
}

export default Home;