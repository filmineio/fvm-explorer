import { defaultNetwork } from "../../src/filters/defaultNetwork";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { isEmpty } from "ramda";
import { useCallback, useEffect } from "react";

import { Main } from "@/ui/components/Main/Main";
import { Page } from "@/ui/components/Page/Page";

import { Filters } from "@/ui/modules/Filters/Filters";
import { mapFieldQueryToApiQuery } from "@/ui/modules/Filters/state/mapFieldQueryToApiQuery";
import { ResultsPresenter } from "@/ui/modules/Results/components/ResultsPresenter";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { Mod, useStore } from "@/ui/state/Store";
import { DEFAULT_FILTERS } from "@/ui/state/default";
import { setDataErrorTransformer } from "@/ui/state/transformers/data/setDataError.transformer";
import { setDataLoadingTransformer } from "@/ui/state/transformers/data/setDataLoading.transformer";
import { setDataReceivedFromServer } from "@/ui/state/transformers/data/setDataReceivedFromServer";
import { setDataResultsTransformer } from "@/ui/state/transformers/data/setDataResults.transformer";
import { resetFiltersToQueryTransformer } from "@/ui/state/transformers/filters/resetFiltersToQueryTransformer";
import { FilterState } from "@/ui/state/types/AppState";

import { useDataClient } from "@/ui/external/data";
import { filtersToResourceQuery } from "@/ui/utils/filtersToResourceQuery";
import { updateRouteState } from "@/ui/utils/updateRouteState";

import { ApplicationData, OperationStatus } from "@/types/ApiResponse";
import { AppQuery } from "@/types/AppQuery";

import { cb } from "@/utils/cb";
import { fromHex, toHex } from "@/utils/hex";
import { isEnum } from "@/utils/isEnum";
import { parse } from "@/utils/parse";


const handleServerData =
  (receivedServerData: number | null | undefined, mod: Mod) =>
  (serverResponse: ApplicationData) => {
    if (receivedServerData) return;

    const common = [
      setDataLoadingTransformer(false),
      setDataReceivedFromServer(),
    ];

    if (serverResponse.status === OperationStatus.Ok)
      mod(...common, setDataResultsTransformer(serverResponse.data));
    else mod(...common, setDataErrorTransformer(serverResponse.data.exception));
  };

const getData =
  (push: Router["push"], filters: FilterState) =>
  (data?: number | Network | Entity) => {
    if (isEnum(Network, data))
      return updateRouteState(push, { ...filters, network: data as Network });
    else if (isEnum(Entity, data))
      return updateRouteState(push, {
        ...filters,
        filteredBy: data as Entity,
      });

    const page = typeof data === "number" ? data : filters.page;

    updateRouteState(push, {
      ...filters,
      page,
      advancedFilter: filters.advancedFilter
        ? (toHex(JSON.stringify(filters.advancedFilter)) as never)
        : undefined,
    });
  };

const Home: NextPage<{ data: ApplicationData }> = ({ data: serverData }) => {
  const { push } = useRouter();

  const {
    mod,
    state: {
      data: { results, error, loading, receivedServerData },
      filters,
    },
  } = useStore();

  const query = useLocationQuery<FilterState>();

  const { get } = useDataClient();

  const requestData = useCallback(getData(push, filters), [filters, get]);

  const onServerData = useCallback(handleServerData(receivedServerData, mod), [
    mod,
  ]);

  const handleQuery = useCallback((query: FilterState) => {
    if (isEmpty(query)) {
      return updateRouteState(push, DEFAULT_FILTERS);
    }

    query.advancedFilter = mapFieldQueryToApiQuery(
      parse(fromHex(query.advancedFilter as never), undefined)
    ) as never;

    get(
      query.filteredBy as Entity,
      filtersToResourceQuery(
        query.filteredBy as Entity,
        query.network as Network,
        query
      )
    );
  }, []);

  useEffect(cb(mod, resetFiltersToQueryTransformer(query as never)), [query]);
  useEffect(cb(onServerData, serverData), [serverData]);
  useEffect(cb(handleQuery, query), [query]);

  return (
    <Page showHeader showFooter>
      <Main>
        <Filters search={requestData} />

        <ResultsPresenter
          error={error}
          loading={loading}
          results={results}
          paginate={requestData}
          page={filters.page}
        />
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
  const resource = query.filteredBy || Entity.Contract;
  const network = query.network || defaultNetwork();

  if (!isEnum(Entity, resource) || !isEnum(Network, network)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        status: OperationStatus.Ok,
        data: { network, kind: resource, total: 0, rows: [] },
      } as ApplicationData,
    },
  };
}

export default Home;