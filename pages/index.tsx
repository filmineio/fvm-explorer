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


type ApplicationData =
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

const Home: NextPage<ApplicationData> = ({ data, status, exception }) => {
  const { push } = useRouter();
  const {
    state: { filters },
  } = useStore();

  const run = useCallback(() => {
    updateRouteState(push, filters);
  }, [filters]);

  if (status === OperationStatus.Error) {
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
            <p className={"text-gray-text text-lg"}>{exception.message}</p>
          </div>
        </Main>
      </Page>
    );
  }

  return (
    <Page showHeader showFooter>
      <Main>
        <Filters search={run} />
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