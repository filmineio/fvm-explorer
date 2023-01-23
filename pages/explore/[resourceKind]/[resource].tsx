import { defaultNetwork } from "../../../src/filters/defaultNetwork";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextPage } from "next";

import { Main } from "@/ui/components/Main/Main";
import { Page } from "@/ui/components/Page/Page";
import { SearchFeedback } from "@/ui/components/SearchFeedback";

import { SelectedEntity } from "@/ui/modules/SelectedEntity/SelectedEntity";

import { getHttpClient } from "@/ui/ctx/http/getHttpClient";
import { dataAPI } from "@/ui/external/data";
import { filtersToResourceQuery } from "@/ui/utils/filtersToResourceQuery";
import { processResponse } from "@/ui/utils/processResponse";

import { ApplicationData, ResponseStatus } from "@/types/ApiResponse";
import { AppQuery } from "@/types/AppQuery";

import { isEnum } from "@/utils/isEnum";


const Home: NextPage<{ data: ApplicationData }> = ({ data: serverData }) => {
  if (serverData.status === ResponseStatus.Error) {
    return <SearchFeedback kind={serverData.kind} error />;
  }

  return (
    <Page showHeader showFooter>
      <Main>
        <SelectedEntity data={serverData.data} />
      </Main>
    </Page>
  );
};

export async function getServerSideProps({
  query,
  params,
}: {
  query: AppQuery;
  params: { resourceKind: Entity; resource: string };
}) {
  const filteredBy = params.resourceKind;
  const network = query.network || defaultNetwork();
  const filterValue = params.resource;

  if (!isEnum(Entity, filteredBy) || !isEnum(Network, network)) {
    return { notFound: true };
  }

  const dataQuery = filtersToResourceQuery(filteredBy, network, {
    filteredBy,
    filterValue,
  });

  const data = await dataAPI(getHttpClient(() => null)()).get(
    filteredBy,
    dataQuery
  );

  return {
    props: {
      data: processResponse(data, filteredBy),
    },
  };
}

export default Home;