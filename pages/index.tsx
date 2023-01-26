import { defaultNetwork } from "../src/filters/defaultNetwork";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { isEmpty } from "ramda";
import { useCallback, useEffect } from "react";

import { Main } from "@/ui/components/Main/Main";
import { Page } from "@/ui/components/Page/Page";

import { Filters } from "@/ui/modules/Filters/Filters";
import { ResultsPresenter } from "@/ui/modules/Results/components/ResultsPresenter";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useStore } from "@/ui/state/Store";
import { DEFAULT_FILTERS } from "@/ui/state/default";
import { setDataErrorTransformer } from "@/ui/state/transformers/data/setDataError.transformer";
import { setDataLoadingTransformer } from "@/ui/state/transformers/data/setDataLoading.transformer";
import { setDataReceivedFromServer } from "@/ui/state/transformers/data/setDataReceivedFromServer";
import { setDataResultsTransformer } from "@/ui/state/transformers/data/setDataResults.transformer";
import { resetFiltersToQueryTransformer } from "@/ui/state/transformers/filters/setFiltersValueTransformer";
import { FilterState } from "@/ui/state/types/AppState";

import { useDataClient } from "@/ui/external/data";
import { filtersToResourceQuery } from "@/ui/utils/filtersToResourceQuery";
import { updateRouteState } from "@/ui/utils/updateRouteState";

import { ApplicationData, OperationStatus } from "@/types/ApiResponse";
import { AppQuery } from "@/types/AppQuery";

import { cb } from "@/utils/cb";
import { isEnum } from "@/utils/isEnum";


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

  const requestData = useCallback(
    (newPage?: number) => {
      const page = typeof newPage === "number" ? newPage : filters.page;
      updateRouteState(push, { ...filters, page });
    },
    [filters, get, mod]
  );

  const handleServerData = useCallback(
    (serverResponse: ApplicationData) => {
      if (receivedServerData) return;
      if (serverResponse.status === OperationStatus.Ok)
        mod(
          setDataResultsTransformer(serverResponse.data),
          setDataLoadingTransformer(false),
          setDataReceivedFromServer()
        );
      else
        mod(
          setDataLoadingTransformer(false),
          setDataErrorTransformer(serverResponse.data.exception),
          setDataReceivedFromServer()
        );
    },
    [mod]
  );

  useEffect(cb(mod, resetFiltersToQueryTransformer(query)), [query]);
  useEffect(cb(handleServerData, serverData), [serverData]);

  useEffect(() => {
    if (isEmpty(query)) {
      return updateRouteState(push, DEFAULT_FILTERS);
    }

    get(
      query.filteredBy as Entity,
      filtersToResourceQuery(
        query.filteredBy as Entity,
        query.network as Network,
        query
      )
    );
  }, [query]);

  return (
    <Page showHeader showFooter>
      <Main>
        <Filters search={requestData} />

        <ResultsPresenter
          error={error}
          loading={loading}
          results={results}
          paginate={requestData}
          filters={filters}
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