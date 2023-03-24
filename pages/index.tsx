import { Network } from "@/enums/Network";
import { defaultNetwork } from "../src/filters/defaultNetwork";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { Main } from "@/ui/components/Main/Main";
import { Page } from "@/ui/components/Page/Page";

import { useStore } from "@/ui/state/Store";

import { getHttpClient } from "@/ui/ctx/http/getHttpClient";
import { updateRouteStateSameRoute } from "@/ui/utils/updateRouteState";

import { OperationStatus } from "@/types/ApiResponse";
import { AppQuery } from "@/types/AppQuery";
import { ApplicationStats } from "@/types/stats";

import { isEnum } from "@/utils/isEnum";
import { Spinner } from "@/ui/components/Spinner/Spinner";
import Link from "next/link";
import Big from "big.js";
import { humanReadableSize, roundNumber, truncateString } from "@/ui/utils/general";
import CopyText from "@/ui/components/CopyText/CopyText";
import Crown from "@/ui/components/Common/Icons/Crown";
import { Entity } from "@/enums/Entity";
import { setFiltersValueTransformer } from "@/ui/state/transformers/filters/setFiltersValueTransformer";
import { useDataClient } from "@/ui/external/data";
import { getData } from "@/ui/modules/Filters/filtersUtils";
import { Header } from "@/ui/components/Page/Header/Header";
import { CustomSelect } from "@/ui/components/Select/Select";
import { availableFilters, availableNetworks } from "@/ui/modules/Filters/state/state";
import Input from "@/ui/components/Input/Input";
import { AdvancedFiltersState } from "@/ui/state/types/AppState";
import SearchBackgroundIcon from "@/ui/components/Common/Icons/SearchBackgroundIcon";

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
  const router = useRouter();
  const { get } = useDataClient();
  const {
    mod,
    state: { filters },
  } = useStore();
  const requestData = useCallback(getData(router.push, filters), [filters, get]);
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (init) {
      setInit(false);
    } else {
      router.replace(router.asPath);
    }
  }, [router.asPath]);

  const handleOnChange = (network: string) => {
    setLoading(true);
    mod(setFiltersValueTransformer(network));
    updateRouteStateSameRoute(router.push, { network: network as Network })
  }

  let network = '';
  useEffect(() => {
    network = new URLSearchParams(window.location.search).get('network') || defaultNetwork();
    mod(setFiltersValueTransformer(network));
  }, []);

  useEffect(() => {
    if (loading) setLoading(false);
  }, [data]);

  const change = useCallback(
    (v: string | AdvancedFiltersState) => {
      mod(setFiltersValueTransformer(v));
    },
    [mod]
  );

  if (!data || data.status === OperationStatus.Error) {
    return (
      <Page showHeader={false} showFooter>
        <Header filterComponent={
          <CustomSelect
            value={network || filters.network}
            onChange={handleOnChange}
            values={availableNetworks}
            selectType="transparent"
          />}
        />
        <Main>
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

  return (
    <Page showHeader={false} showFooter>
      <Header filterComponent={
        <div className="relative">
          <div className="absolute w-4 h-4 transform translate-y-3 -right-5 z-[1]">
            <div className="[&>div>svg]:mr-0">{loading && <Spinner inline />}</div>
          </div>
          <CustomSelect
            value={network || filters.network}
            onChange={handleOnChange}
            values={availableNetworks}
            selectType="transparent"
          />
        </div>}
      />
      <Main>
        <div className="relative bg-body_opacity-50 rounded-10 py-20 px-12.5 my-7.5">
          <div className="absolute left-0 top-0 overflow-hidden rounded-10">
            <SearchBackgroundIcon/>
          </div>
          <div className="relative font-space text-white text-28 leading-compact font-bold mb-10 z-20">
            Filecoin contracts explorer
          </div>
          <div className="flex justify-between gap-5">
            <div className="flex items-center flex-1 justify-center bg-slate rounded-4">
              <div className="input-group relative flex md:flex-wrap gap-4 items-stretch w-full rounded-4 border-none"> {/* border-2 border-transparent hover:border-label focus:border-blue-400 */}
                <Input
                  className="xl:w-96 form-control relative flex-auto bg-slate block w-full px-5 py-4 text-14 font-medium font-roboto text-white transition ease-in-out m-0 rounded-4 outline-none border-2 border-body hover:border-label focus:border-label"
                  placeholder="Search by Address/Txn hash/Block..."
                  handleChange={change}
                  value={filters.filterValue}
                />
              </div>
            </div>
            <div className="flex items-center">
              <CustomSelect
                value={filters.filteredBy}
                onChange={change}
                values={availableFilters}
                selectType="transparent"
                additionClass="bg-slate rounded-4 border-2 border-body px-2.5 w-44"
              />
            </div>
            <button
              className="btn border-2 border-blue-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all"
              onClick={() => requestData()}
            >
              SEARCH
            </button>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-6 gap-5">
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{data.data.ethOverview.numContractsDeployed || <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">contracts deployed</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{data.data.ethOverview.numEthAccounts || <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">eth accounts</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{humanReadableSize(parseInt(data.data.overview.totalQualityAdjPower, 10), true, 2, 'B')}</h6>
              <p className="text-12 text-label leading-large mb-0">storage power</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{data.data.overview.averageRewardPerByte ? roundNumber(data.data.overview.averageRewardPerByte, 2) : <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">avg. mining reward</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{data.data.overview.averageTipsetBlocks ? roundNumber(data.data.overview.averageTipsetBlocks, 2) : <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">avg. tipset blocks</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{data.data.overview.dailyMessages ? data.data.overview.dailyMessages : <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">daily messages</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{roundNumber(data.data.ethOverview.avgNumUniqueAddressesInteractingWithContract, 5) || <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">unique addresses interacting per contract</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{roundNumber(data.data.ethOverview.avgNumInteractionsPerContract, 2) || <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">interactions per contract</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{roundNumber(data.data.ethOverview.avgGasUsagePerContract, 0) || <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">avg. gas usage per contract</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{data.data.overview.totalPledgeCollateral ? `${roundNumber(+new Big(data.data.overview.totalPledgeCollateral).div(Math.pow(10, 21)), 0)}k Fil` : <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">total pledge collateral</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{data.data.ethOverview.filTransferredFromContracts ? `${roundNumber(+new Big(data.data.ethOverview.filTransferredFromContracts).div(Math.pow(10, 12)), 0)} tn` : <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">fil transferred from contracts</p>
            </div>
            <div className="bg-body_opacity-50 rounded-10 p-5">
              <h6 className="font-space text-22 text-white leading-compact mb-2">{data.data.ethOverview.filTransferredToContracts ? `${roundNumber(parseInt(data.data.ethOverview.filTransferredToContracts.substring(1)) / Math.pow(10, 12), 0)} tn` : <Spinner inline />}</h6>
              <p className="text-12 text-label leading-large mb-0">fil transferred to contracts</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 my-7.5">
          <div className="col-span-2 bg-body_opacity-50 rounded-10 p-12.5">
            <h2 className="font-space text-24 text-white leading-compact mb-7.5">Latest tipsets</h2>
            <table className="w-full text-left border-separate border-spacing-y-2.5 -my-2.5">
              <thead>
                <tr>
                  <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4 rounded-4004">HEIGHT</th>
                  <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4">BLOCK ID</th>
                  <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4 rounded-0440">MINER</th>
                </tr>
              </thead>
              <tbody>
                {data.data.latestTipSets.map((item, index) => (
                  <tr key={`${item.height}-lts-${index}`}>
                    <td className="bg-body_opacity-50 px-5 py-4 rounded-4004">
                      <span className="font-space text-16 text-white font-bold leading-compact">
                        {item.height}
                      </span>
                    </td>
                    <td className="bg-body_opacity-50 text-14 text-blue-500 font-bold leading-4 px-5 py-4">
                      {item.blocks.map((blockItem, index) => (
                        <div key={`${blockItem.cid}-ltsbi1-${index}`} className="mb-3 last:mb-0">
                          <CopyText text={blockItem.cid}>
                            <div>{truncateString(blockItem.cid, 20)}</div>
                          </CopyText>
                        </div>
                      ))}
                    </td>
                    <td className="bg-body_opacity-50 text-14 text-white font-normal leading-large px-5 py-4 rounded-0440">
                      {item.blocks.map((blockItem, index) => (
                        <div key={`${blockItem.miner}-ltsbi2-${index}`} className="mb-1.5 last:mb-0">
                          {blockItem.miner}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-body_opacity-50 p-12.5 rounded-10">
            <h2 className="font-space text-24 text-white leading-compact mb-7.5">Latest called contracts</h2>
            {data.data.latestCalledContracts.slice(0, 5).map((item) => (
              <div key={`${item.contractAddress}-lcc`} className="mb-4 last:mb-0 group">
                <Link href={`/explore/contract/${item.contractAddress}`}>
                  <a className="flex items-start flex-wrap justify-between bg-body_opacity-50 px-5 py-4 rounded-4 border border-transparent group-hover:border-blue-500">
                    <div className="py-1 w-[170px]">
                      <h6 className="font-space text-18 text-white font-bold leading-compact mb-0">{truncateString(item.contractAddress, 14)}</h6>
                      {/*<p className="text-12 text-label font-normal leading-large mb-0">{!init && timePassFromTimestamp(item.timestamp)}</p>*/}
                    </div>
                    <span className="text-14 text-blue-400 opacity-0 font-bold leading-4 mt-0.75 py-1 group-hover:opacity-100 transition-all duration-200">
                      View contract
                    </span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-body_opacity-50 rounded-10 p-12.5">
          <h2 className="font-space text-24 text-white leading-compact mb-7.5">Top storage providers</h2>
          <table className="w-full text-left border-separate border-spacing-y-2.5 -my-2.5">
            <thead>
              <tr>
                <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4 rounded-4004">RANK</th>
                <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4">MINER</th>
                <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4">RAW POWER</th>
                <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4">24H REWARD</th>
                <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4 rounded-0440">MINING EFFICIENCY</th>
              </tr>
            </thead>
            <tbody>
              {data.data.topMiners.map((item, index) => (
                <tr key={`${item.address}-lts-${index}`}>
                  <td className="bg-body_opacity-50 font-space text-18 text-white font-bold leading-compact px-5 py-4 rounded-4004">
                    <span className="flex items-center">
                      {index + 1}
                      <span className="ml-2.5 -mt-0.5">{index < 3 && <Crown />}</span>
                    </span>
                  </td>
                  <td className="bg-body_opacity-50 text-14 text-white font-normal leading-large px-5 py-4">{item.address}</td>
                  <td className="bg-body_opacity-50 text-14 text-white font-normal leading-large px-5 py-4">{humanReadableSize(parseInt(item.rawBytePower, 10), false, 2, 'B')}</td>
                  <td className="bg-body_opacity-50 text-14 text-white font-normal leading-large px-5 py-4">{item.totalRewards ? roundNumber(+new Big(item.totalRewards).div(10 ** 18)) : <Spinner inline />}</td>
                  <td className="bg-body_opacity-50 text-14 text-white font-normal leading-large px-5 py-4 rounded-0440">{
                    item.totalRewards && item.qualityAdjPower && item.weightedBlocksMined ? (+new Big(item.totalRewards) / (+new Big(item.qualityAdjPower).times(item.weightedBlocksMined))) : <Spinner inline />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-7.5 mb-12.5">
          <div className="bg-body_opacity-50 rounded-10 p-12.5">
            <h2 className="text-24 text-white leading-compact mb-7.5">Latest transactions</h2>
            {data.data.latestTransactions.slice(0, 4).map((item) => (
              <div key={`${item.cid}-lts`} className="mb-4 last:mb-0">
                <Link href={`/explore/${Entity.Transaction}/${item.cid}?network=${network}`}>
                  <a className="flex items-start justify-between bg-body_opacity-50 p-5 rounded-4 border border-transparent hover:border-blue-500">
                    <div>
                      <h6 className="font-space text-18 text-white leading-compact mb-0">{truncateString(item.cid, 20)}</h6>
                      <p className="text-12 text-label leading-large mb-0">{item.timestamp}</p>
                    </div>
                    <p className="font-space text-18 text-blue-500 font-bold">
                      {item.value && roundNumber(+new Big(item.value).div(10 ** 18))}
                      {item.value === '0' && '0'} Fil
                    </p>
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div className="bg-body_opacity-50 rounded-10 p-12.5">
            <h2 className="text-24 text-white leading-compact mb-7.5">Rich list</h2>
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="w-full text-left border-separate border-spacing-y-2.5 -my-2.5">
                <thead>
                  <tr>
                    <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4 rounded-4004">RANK</th>
                    <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4">ADDRESS</th>
                    <th className="bg-body text-14 text-white font-bold leading-4 px-5 py-4 rounded-0440">BALANCE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.richList.map((item, index) => (
                    <tr key={`${item.address}-lts-${index}`}>
                      <td className="bg-body_opacity-50 font-space text-18 text-white font-bold leading-compact px-5 py-4 rounded-4004">
                      <span className="flex items-center">
                        {index + 1}
                        <span className="ml-2.5 -mt-0.5">{index < 3 && <Crown />}</span>
                      </span>
                      </td>
                      <td className="bg-body_opacity-50 text-14 text-white font-normal leading-large px-5 py-4">
                        <CopyText text={item.address}>
                          <span>{truncateString(item.address, 20)}</span>
                        </CopyText>
                      </td>
                      <td className="bg-body_opacity-50 text-14 text-white font-normal leading-large px-5 py-4 rounded-0440">{item.balance.substring(0, item.balance.length - 18)} Fil</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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