import { defaultNetwork } from "../src/filters/defaultNetwork";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Main } from "@/ui/components/Main/Main";
import { Page } from "@/ui/components/Page/Page";

import { ApplicationData, OperationStatus } from "@/types/ApiResponse";
import { AppQuery } from "@/types/AppQuery";

import { isEnum } from "@/utils/isEnum";


const Home: NextPage<{ data: ApplicationData }> = ({ data: serverData }) => {
  const { push } = useRouter();


  return (
    <Page showHeader showFooter>
      <Main>
        {/*<Filters search={requestData} />*/}
        
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