import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";

import {
  querySchema,
  schemaAutoGenTypes,
  schemaObjectTypes,
} from "@/api/graphql/generateSchema";

const apolloServer = new ApolloServer({
  schema: querySchema,
  resolvers: {},
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  typeDefs: {
    ...schemaAutoGenTypes,
    ...schemaObjectTypes,
  } as any,
});

const startServer = apolloServer.start();

export default async function handler(req: any, res: any) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};