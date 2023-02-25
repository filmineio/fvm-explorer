import axios from "axios";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import React from "react";

const DEFAULT_QUERY = `{
  transaction(
    query:{ timestamp: { greaterThan: 4} }, 
    network: "hyperspace", 
    order: { orderBy: "timestamp", orderDirection: "DESC" }
    pagination: { limit: 20, offset: 0}
  ) {
    cid
    block
    timestamp
    version
  }
}`;

const NoEditor = () => <></>;
export const GraphQLEditor = ({
  query = DEFAULT_QUERY,
}: {
  query?: string;
}) => {
  return (
    <GraphiQL
      fetcher={async (graphQLParams) => {
        const res = await axios.post(`/api/graphql`, graphQLParams);
        return res.data;
      }}
      defaultQuery={query}
    >
      <GraphiQL.Logo> </GraphiQL.Logo>
    </GraphiQL>
  );
};