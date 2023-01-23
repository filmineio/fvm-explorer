import { defaultNetwork } from "../src/filters/defaultNetwork";
import { ResultsPresenter } from "../ui/modules/Results/components/ResultsPresenter";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { isEmpty } from "ramda";
import { useCallback, useEffect } from "react";

import { Main } from "@/ui/components/Main/Main";
import { Page } from "@/ui/components/Page/Page";

import { Filters } from "@/ui/modules/Filters/Filters";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useStore } from "@/ui/state/Store";
import { DEFAULT_FILTERS } from "@/ui/state/default";
import { setDataErrorTransformer } from "@/ui/state/transformers/data/setDataError.transformer";
import { setDataLoadingTransformer } from "@/ui/state/transformers/data/setDataLoading.transformer";
import { setDataReceivedFromServer } from "@/ui/state/transformers/data/setDataReceivedFromServer";
import { setDataResultsTransformer } from "@/ui/state/transformers/data/setDataResults.transformer";
import { resetFiltersToQueryTransformer } from "@/ui/state/transformers/filters/setFiltersValueTransformer";
import { FilterState } from "@/ui/state/types/AppState";

import { getHttpClient } from "@/ui/ctx/http/getHttpClient";
import { dataAPI, useDataClient } from "@/ui/external/data";
import { filtersToResourceQuery } from "@/ui/utils/filtersToResourceQuery";
import { processResponse } from "@/ui/utils/processResponse";
import { updateRouteState } from "@/ui/utils/updateRouteState";

import { ApplicationData, ResponseStatus } from "@/types/ApiResponse";
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
      if (serverResponse.status === ResponseStatus.Ok)
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
        <div className="filecoin py-7 space-y-5">
          <h3 className="text-2xl font-bold leading-8 text-white">
            Filecoin contracts explorer
          </h3>
          <Filters search={requestData} />
        </div>

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

  const dataQuery = filtersToResourceQuery(resource, network, query);

  const data = await dataAPI(getHttpClient(() => null)()).get(
    resource,
    dataQuery
  );

  return {
    props: {
      data: processResponse(data, resource),
    },
  };
}

export default Home;